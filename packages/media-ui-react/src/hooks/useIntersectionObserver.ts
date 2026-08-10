import { useEffect, useRef, useCallback } from 'react';
import { IntersectionObserverOptions } from '../types';

export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverOptions = {}
) {
  const { enabled = true, root, rootMargin, threshold } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<Element | null>(null);

  const setTargetRef = useCallback((element: Element | null) => {
    if (targetRef.current && observerRef.current) {
      observerRef.current.unobserve(targetRef.current);
    }

    targetRef.current = element;

    if (element && observerRef.current && enabled) {
      observerRef.current.observe(element);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    observerRef.current = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    });

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, enabled, root, rootMargin, threshold]);

  return setTargetRef;
}
