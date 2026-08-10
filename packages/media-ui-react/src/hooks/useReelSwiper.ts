import { useState, useCallback, useEffect, useRef } from 'react';
import { PropGetter } from '../types';
import { useIntersectionObserver } from './useIntersectionObserver';

export interface UseReelSwiperProps {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  itemCount: number;
}

export interface UseReelSwiperReturn {
  currentIndex: number;
  getSwiperProps: PropGetter;
  getItemProps: PropGetter<{ index: number }>;
  getLoadMoreProps: PropGetter;
  scrollToIndex: (index: number) => void;
}

export function useReelSwiper({ onLoadMore, hasNextPage, isFetchingNextPage, itemCount }: UseReelSwiperProps): UseReelSwiperReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<HTMLElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage && onLoadMore) {
        onLoadMore();
      }
    },
    [hasNextPage, isFetchingNextPage, onLoadMore]
  );

  const setLoadMoreRef = useIntersectionObserver(handleObserver, {
    enabled: !!hasNextPage,
    rootMargin: '200px',
  });

  const scrollToIndex = useCallback((index: number) => {
    if (swiperRef.current) {
       const children = Array.from(swiperRef.current.children) as HTMLElement[];
       if (children[index]) {
           children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
       }
    }
  }, []);

  const getSwiperProps: PropGetter = useCallback((props: any = {}) => ({
    role: 'region',
    'aria-roledescription': 'carousel',
    tabIndex: 0,
    ...props,
    ref: (node: HTMLElement | null) => {
        swiperRef.current = node;
        if (typeof props.ref === 'function') {
            props.ref(node);
        } else if (props.ref) {
            (props.ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
    },
  }), []);

  const getItemProps: PropGetter<{ index: number }> = useCallback(({ index, ...props }: any = { index: -1 }) => ({
    role: 'group',
    'aria-roledescription': 'slide',
    'aria-hidden': currentIndex !== index,
    'data-reel-index': index,
    ...props,
  }), [currentIndex]);

  const getLoadMoreProps: PropGetter = useCallback((props: any = {}) => ({
    ref: setLoadMoreRef,
    ...props,
  }), [setLoadMoreRef]);

  // Active item detection via IntersectionObserver on container scroll
  useEffect(() => {
    const swiperEl = swiperRef.current;
    if (!swiperEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const indexAttr = entry.target.getAttribute('data-reel-index');
            if (indexAttr !== null) {
              const idx = parseInt(indexAttr, 10);
              if (!isNaN(idx)) {
                setCurrentIndex(idx);
              }
            }
          }
        });
      },
      {
        root: swiperEl,
        threshold: 0.5,
      }
    );

    const children = Array.from(swiperEl.children);
    children.forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
    };
  }, [itemCount]);

  return { currentIndex, getSwiperProps, getItemProps, getLoadMoreProps, scrollToIndex };
}
