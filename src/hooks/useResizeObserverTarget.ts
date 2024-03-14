import { useLayoutEffect, useRef } from 'react';

type ResizeObserverCallback = (entries: ResizeObserverEntry) => void;

export function useResizeObserverTarget<T extends HTMLElement = HTMLElement>(
  callback: ResizeObserverCallback,
) {
  const savedCallback = useRef(callback);
  const targetRef = useRef<T>(null);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  });

  useLayoutEffect(() => {
    const targetEl = targetRef.current;

    if (!targetEl) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) {
        return;
      }

      savedCallback.current(entries[0]);
    });

    observer.observe(targetEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return targetRef;
}
