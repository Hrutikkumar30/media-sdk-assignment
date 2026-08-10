import React from 'react';
import { useReelSwiper, UseReelSwiperProps } from '../hooks/useReelSwiper';

export interface ReelSwiperProps extends UseReelSwiperProps {
  children: (props: ReturnType<typeof useReelSwiper>) => React.ReactNode;
}

export function ReelSwiper({ children, ...hookProps }: ReelSwiperProps) {
  const swiperState = useReelSwiper(hookProps);
  return <>{children(swiperState)}</>;
}
