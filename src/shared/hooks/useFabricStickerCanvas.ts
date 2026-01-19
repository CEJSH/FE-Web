import { logger } from "@/shared/utils/logger";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type UseFabricStickerCanvasParams = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
};

function requestRender(canvas: any) {
  if (typeof canvas?.requestRenderAll === "function") {
    canvas.requestRenderAll();
  } else if (typeof canvas?.renderAll === "function") {
    canvas.renderAll();
  }
}

export function useFabricStickerCanvas({
  canvasRef,
  width,
  height,
}: UseFabricStickerCanvasParams) {
  const fabricModuleRef = useRef<typeof import("fabric") | null>(null);
  const fabricCanvasRef = useRef<any>(null);
  const hasListenersRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const ensureFabric = useCallback(async () => {
    if (!fabricModuleRef.current) {
      fabricModuleRef.current = await import("fabric");
    }
    return fabricModuleRef.current;
  }, []);

  const ensureCanvas = useCallback(async () => {
    const fabric = await ensureFabric();
    const canvasEl = canvasRef.current;
    if (!canvasEl) throw new Error("Fabric canvas element is not mounted");

    if (!fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasEl, {
        width,
        height,
      });
      requestAnimationFrame(() => fabricCanvasRef.current?.calcOffset?.());
    }

    if (!hasListenersRef.current) {
      hasListenersRef.current = true;
      const canvas = fabricCanvasRef.current;

      const handleSelectionCreated = (e: any) => {
        const activeObj = e.target;
        if (activeObj) {
          activeObj.setControlsVisibility({
            mtr: true,
            deleteControl: true,
          });
          requestRender(canvas);
        }
      };

      const handleSelectionCleared = () => {
        requestRender(canvas);
      };

      canvas.on("selection:created", handleSelectionCreated);
      canvas.on("selection:updated", handleSelectionCreated);
      canvas.on("selection:cleared", handleSelectionCleared);

      canvas.__lightyCleanup = () => {
        canvas.off("selection:created", handleSelectionCreated);
        canvas.off("selection:updated", handleSelectionCreated);
        canvas.off("selection:cleared", handleSelectionCleared);
      };
    }

    return { fabric, canvas: fabricCanvasRef.current };
  }, [canvasRef, ensureFabric, height, width]);

  const dispose = useCallback(() => {
    try {
      const canvas = fabricCanvasRef.current;
      canvas?.__lightyCleanup?.();
      canvas?.dispose?.();
    } catch (e) {
      logger.warn("useFabricStickerCanvas.dispose failed", e);
    } finally {
      fabricCanvasRef.current = null;
      hasListenersRef.current = false;
      setIsReady(false);
    }
  }, []);

  useEffect(() => dispose, [dispose]);

  const setBackgroundFromDataUrl = useCallback(
    async (dataUrl: string) => {
      const { fabric, canvas } = await ensureCanvas();

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = dataUrl;
      try {
        await img.decode();
      } catch {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () =>
            reject(new Error("useFabricStickerCanvas background load failed"));
        });
      }

      const bgImage = new fabric.Image(img, {
        originX: "left",
        originY: "top",
        crossOrigin: "anonymous",
      });

      const canvasAspectRatio = canvas.width / canvas.height;
      const imageAspectRatio = img.width / img.height;

      if (imageAspectRatio > canvasAspectRatio) {
        bgImage.scaleToWidth(canvas.width);
      } else {
        bgImage.scaleToHeight(canvas.height);
      }

      canvas.backgroundImage = bgImage;
      requestRender(canvas);
      setIsReady(true);
      requestAnimationFrame(() => canvas.calcOffset?.());
    },
    [ensureCanvas]
  );

  const addSticker = useCallback(
    async (path: string) => {
      const { fabric, canvas } = await ensureCanvas();

      const renderDeleteIcon = (
        ctx: CanvasRenderingContext2D,
        left: number,
        top: number,
        _: any,
        fabricObject: any
      ) => {
        const size = 20;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));

        ctx.fillStyle = "#979797";
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-size / 5, -size / 5);
        ctx.lineTo(size / 5, size / 5);
        ctx.moveTo(size / 5, -size / 5);
        ctx.lineTo(-size / 5, size / 5);
        ctx.stroke();
        ctx.restore();
      };

      const stickerObj = await fabric.Image.fromURL(path, {
        crossOrigin: "anonymous",
      });

      stickerObj.set({
        scaleX: 0.22,
        scaleY: 0.22,
        cornerSize: 9,
        cornerColor: "white",
        cornerStrokeColor: "#AEAEAE",
        transparentCorners: false,
        borderColor: "#AEAEAE",
        borderScaleFactor: 1,
      });

      stickerObj.controls = {
        ...stickerObj.controls,
        deleteControl: new fabric.Control({
          x: 0.5,
          y: -0.5,
          offsetY: -16,
          offsetX: 16,
          cursorStyle: "pointer",
          render: renderDeleteIcon,
          mouseUpHandler: (_: any, transformData: any) => {
            const target = transformData.target;
            const targetCanvas = target.canvas;
            targetCanvas?.remove(target);
            targetCanvas?.requestRenderAll?.();
            targetCanvas?.renderAll?.();
            return true;
          },
        }),
      };

      canvas.add(stickerObj);
      canvas.setActiveObject(stickerObj);
      requestRender(canvas);
      setIsReady(true);
    },
    [ensureCanvas]
  );

  const exportPng = useCallback((multiplier = 2) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return null;

    canvas.discardActiveObject?.();
    requestRender(canvas);

    return canvas.toDataURL?.({
      format: "png",
      multiplier,
    }) as string | null;
  }, []);

  return {
    isReady,
    setBackgroundFromDataUrl,
    addSticker,
    exportPng,
    dispose,
  };
}
