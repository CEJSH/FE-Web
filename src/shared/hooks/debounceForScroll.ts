import { useState, useCallback } from "react";

type UseDebounce = (callback: () => void, delay: number) => () => void;

const useDebounce: UseDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      callback();
    }, delay);
    setTimeoutId(id);
  }, [callback, delay, timeoutId]);
};

export default useDebounce;
