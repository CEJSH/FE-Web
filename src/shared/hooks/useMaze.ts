import { useEffect } from "react";
import { logger } from "@/shared/utils/logger";

export default function useMaze() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (function (m, a, z, e) {
        let t;
        try {
          t = m.sessionStorage.getItem("maze-us");
        } catch (err) {
          logger.debug(err);
        }

        if (!t) {
          t = new Date().getTime();
          try {
            m.sessionStorage.setItem("maze-us", String(t));
          } catch (err) {
            logger.debug(err);
          }
        }

        if (a.querySelector(`script[src="${z}"]`)) return;

        const s = a.createElement("script");
        s.src = z + "?apiKey=" + e;
        s.async = true;
        s.defer = true;
        const head = a.getElementsByTagName("head")[0];

        if (head.firstChild) {
          head.insertBefore(s, head.firstChild);
        } else {
          head.appendChild(s);
        }
        m.mazeUniversalSnippetApiKey = e;
      })(
        window,
        document,
        "https://snippet.maze.co/maze-universal-loader.js",
        "53e53558-0ca6-41d1-b326-df8de0da9cf4"
      );
    }
  }, []);
}
