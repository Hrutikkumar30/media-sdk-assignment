import React from 'react';
import { useGrid, UseGridProps } from '../hooks/useGrid';

export interface GridProps extends UseGridProps {
  children: (props: ReturnType<typeof useGrid>) => React.ReactNode;
}

export function Grid({ children, ...hookProps }: GridProps) {
  const gridState = useGrid(hookProps);
  return <>{children(gridState)}</>;
}
