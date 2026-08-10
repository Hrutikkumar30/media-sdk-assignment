import React from 'react';
import { useLightbox, UseLightboxProps } from '../hooks/useLightbox';

export interface LightboxProps extends UseLightboxProps {
  children: (props: ReturnType<typeof useLightbox>) => React.ReactNode;
}

export function Lightbox({ children, ...hookProps }: LightboxProps) {
  const lightboxState = useLightbox(hookProps);
  
  if (!hookProps.isOpen) {
    return null;
  }
  
  return <>{children(lightboxState)}</>;
}
