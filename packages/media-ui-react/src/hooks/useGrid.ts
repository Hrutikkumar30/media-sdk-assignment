import { useState, useCallback } from 'react';
import { PropGetter } from '../types';
import { useIntersectionObserver } from './useIntersectionObserver';
import { KeyCodes } from '../utils/keyCodes';

export interface UseGridProps {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export interface UseGridReturn {
  getGridProps: PropGetter;
  getItemProps: PropGetter<{ index: number }>;
  getLoadMoreProps: PropGetter;
}

export function useGrid({ onLoadMore, hasNextPage, isFetchingNextPage }: UseGridProps = {}): UseGridReturn {
  const [activeIndex, setActiveIndex] = useState(-1);

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

  const getGridProps: PropGetter = useCallback((props: any = {}) => ({
    role: 'grid',
    tabIndex: 0,
    ...props,
    onKeyDown: (e: React.KeyboardEvent) => {
      // Basic keyboard navigation logic can be added here
      props.onKeyDown?.(e);
    },
  }), []);

  const getItemProps: PropGetter<{ index: number }> = useCallback(({ index, ...props }: any = { index: -1 }) => ({
    role: 'gridcell',
    tabIndex: activeIndex === index ? 0 : -1,
    'aria-selected': activeIndex === index,
    ...props,
    onFocus: (e: React.FocusEvent) => {
      setActiveIndex(index);
      props.onFocus?.(e);
    },
  }), [activeIndex]);

  const getLoadMoreProps: PropGetter = useCallback((props: any = {}) => ({
    ref: setLoadMoreRef,
    ...props,
  }), [setLoadMoreRef]);

  return { getGridProps, getItemProps, getLoadMoreProps };
}
