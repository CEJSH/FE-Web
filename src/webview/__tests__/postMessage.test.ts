import { describe, expect, it, vi } from "vitest";

import { postMessage } from "@/webview/postMessage";

describe("postMessage", () => {
  it("stringifies payload and calls ReactNativeWebView when available", () => {
    const postSpy = vi.fn();
    // @ts-expect-error mocking RN bridge
    window.ReactNativeWebView = { postMessage: postSpy };

    postMessage("OPEN_SETTINGS", { foo: "bar" });

    expect(postSpy).toHaveBeenCalledWith(
      JSON.stringify({ type: "OPEN_SETTINGS", data: { foo: "bar" } })
    );
  });

  it("no-ops when ReactNativeWebView is missing", () => {
    // @ts-expect-error remove mock
    window.ReactNativeWebView = undefined;
    expect(() => postMessage("OPEN_SETTINGS")).not.toThrow();
  });
});
