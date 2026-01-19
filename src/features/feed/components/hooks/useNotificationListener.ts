import { useEffect } from "react";
import { patchNotificationToken } from "@/features/users/api/users";
import { requestNotificationPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types/events";

export function useNotificationListener() {
  useEffect(() => {
    requestNotificationPermission();

    const handleMessage = (event: MessageEvent<string>) => {
      const data =
        typeof event.data === "string"
          ? event.data
          : JSON.stringify(event.data);

      let message: { type: string; notificationToken: string | null } | null =
        null;
      try {
        message = JSON.parse(data);
      } catch (error) {
        console.error("Invalid message data:", data, error);
        return;
      }

      if (
        message?.type === WEBVIEW_EVENT.AGREE_NOTIFICATION_PERMISSION &&
        message?.notificationToken
      ) {
        patchNotificationToken({ token: message.notificationToken });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}
