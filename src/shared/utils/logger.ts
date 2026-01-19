type LogArgs = unknown[];

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  debug: (...args: LogArgs) => {
    if (!isProd) console.debug(...args);
  },
  info: (...args: LogArgs) => {
    if (!isProd) console.info(...args);
  },
  warn: (...args: LogArgs) => {
    console.warn(...args);
  },
  error: (...args: LogArgs) => {
    console.error(...args);
  },
};

