import { useLayoutEffect, useRef } from 'react';

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

export function useResizeObserver(callback: ResizeObserverCallback) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  });

  useLayoutEffect(() => {
    const targetEl = document.documentElement;
    if (!targetEl) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      savedCallback.current(entries);
    });

    observer.observe(targetEl);

    return () => {
      observer.disconnect();
    };
  }, []);
}
