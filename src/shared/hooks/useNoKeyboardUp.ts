import { useEffect } from "react";

export default function useDisableKeyboardInput() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll<HTMLInputElement>(
        ".react-select__input"
      );
      elements.forEach((element) => {
        element.setAttribute("inputMode", "none");
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);
}
