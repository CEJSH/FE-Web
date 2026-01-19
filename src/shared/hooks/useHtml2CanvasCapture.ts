import { logger } from "@/shared/utils/logger";
import { useCallback, useState } from "react";

type CaptureOptions = {
  scale?: number;
  useCORS?: boolean;
  backgroundColor?: string | null;
};

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map(async (imgEl) => {
      if (imgEl.complete && imgEl.naturalWidth > 0) return;
      try {
        await imgEl.decode();
      } catch {
        await new Promise<void>((resolve) => {
          imgEl.addEventListener("load", () => resolve(), { once: true });
          imgEl.addEventListener("error", () => resolve(), { once: true });
        });
      }
    })
  );
}

async function nextFrame() {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

export function useHtml2CanvasCapture<T extends HTMLElement>(
  getTarget: () => T | null,
  options?: CaptureOptions
) {
  const [dataUrl, setDataUrl] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setDataUrl("");
    setError(null);
    setIsCapturing(false);
  }, []);

  const capture = useCallback(async () => {
    const target = getTarget();
    if (!target) return null;

    setIsCapturing(true);
    setError(null);

    try {
      const [{ default: html2canvas }] = await Promise.all([import("html2canvas")]);

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await waitForImages(target);
      await nextFrame();

      const canvas = await html2canvas(target, {
        scale: options?.scale ?? 3,
        useCORS: options?.useCORS ?? true,
        backgroundColor: options?.backgroundColor ?? null,
      });

      const url = canvas.toDataURL("image/png", 1.0);
      setDataUrl(url);
      return url;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      logger.error("useHtml2CanvasCapture.capture failed", err);
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [getTarget, options?.backgroundColor, options?.scale, options?.useCORS]);

  return { dataUrl, isCapturing, error, capture, reset };
}

