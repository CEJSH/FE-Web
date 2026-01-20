import { render, screen } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import React, { act } from "react";

import useChangeHeaderStyle from "@/shared/hooks/useChangeHeaderStyle";
import { useScrollNew } from "@/shared/hooks/useScrollNew";
import { scrollProgressAtom } from "@/shared/state/scroll";

const originalRaf = global.requestAnimationFrame;
const originalCancelRaf = global.cancelAnimationFrame;

const setupScrollContainer = () => {
  const el = document.createElement("div");
  el.id = "scrollable-container";
  Object.defineProperty(el, "scrollHeight", { value: 200, writable: true });
  Object.defineProperty(el, "clientHeight", { value: 100, writable: true });
  document.body.appendChild(el);
  return el;
};

describe("useScrollNew and useChangeHeaderStyle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    global.requestAnimationFrame = ((cb: FrameRequestCallback) =>
      setTimeout(cb, 0)) as any;
    global.cancelAnimationFrame = ((id: any) => clearTimeout(id)) as any;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    global.requestAnimationFrame = originalRaf;
    global.cancelAnimationFrame = originalCancelRaf;
    document.body.innerHTML = "";
  });

  it("updates scroll state on scroll events", async () => {
    const container = setupScrollContainer();
    const Consumer = () => {
      const state = useScrollNew("scrollable-container", 10);
      return (
        <div data-testid="state">{JSON.stringify(state, null, 2)}</div>
      );
    };

    render(<Consumer />);

    await act(async () => {
      container.scrollTop = 100;
      container.dispatchEvent(new Event("scroll"));
      await vi.runAllTimersAsync();
    });

    const state = JSON.parse(screen.getByTestId("state").textContent || "{}");
    expect(state.scrollProgress).toBeCloseTo(1);
    expect(state.isVisible).toBe(false);
    expect(state.isPastThreshold).toBe(true);
  });

  it("syncs scroll progress into Recoil via useChangeHeaderStyle", async () => {
    const container = setupScrollContainer();
    const Consumer = () => {
      useChangeHeaderStyle({ scrollReady: true });
      const progress = useRecoilValue(scrollProgressAtom);
      return <div data-testid="progress">{progress}</div>;
    };

    render(
      <RecoilRoot>
        <Consumer />
      </RecoilRoot>
    );

    await act(async () => {
      container.scrollTop = 50;
      container.dispatchEvent(new Event("scroll"));
      await vi.runAllTimersAsync();
    });

    expect(Number(screen.getByTestId("progress").textContent)).toBeCloseTo(0.5);
  });

  it("cleans up scroll listeners on unmount", async () => {
    const container = setupScrollContainer();
    const scrollAddSpy = vi.spyOn(container, "addEventListener");
    const scrollRemoveSpy = vi.spyOn(container, "removeEventListener");
    const docRemoveSpy = vi.spyOn(document, "removeEventListener");
    const winRemoveSpy = vi.spyOn(window, "removeEventListener");

    const HookUser = () => {
      useChangeHeaderStyle({ scrollReady: true });
      return null;
    };

    const { unmount } = render(
      <RecoilRoot>
        <HookUser />
      </RecoilRoot>
    );

    expect(scrollAddSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      expect.objectContaining({ passive: true })
    );

    unmount();

    expect(scrollRemoveSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function)
    );
    expect(winRemoveSpy).toHaveBeenCalledWith("focus", expect.any(Function));
  });
});
