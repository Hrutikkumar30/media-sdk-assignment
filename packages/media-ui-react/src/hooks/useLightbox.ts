import { useState, useCallback, useEffect } from 'react';
import { PropGetter } from '../types';
import { KeyCodes } from '../utils/keyCodes';

export interface UseLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
  initialIndex?: number;
}

export interface UseLightboxReturn {
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  getDialogProps: PropGetter;
  getCloseButtonProps: PropGetter;
  getNextButtonProps: PropGetter;
  getPreviousButtonProps: PropGetter;
  getImageProps: PropGetter;
}

export function useLightbox({ isOpen, onClose, itemCount, initialIndex = 0 }: UseLightboxProps): UseLightboxReturn {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.ESCAPE) onClose();
      if (e.key === KeyCodes.ARROW_RIGHT) goToNext();
      if (e.key === KeyCodes.ARROW_LEFT) goToPrevious();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrevious]);

  const getDialogProps: PropGetter = useCallback((props: any = {}) => ({
    role: 'dialog',
    'aria-modal': true,
    tabIndex: -1,
    ...props,
  }), []);

  const getCloseButtonProps: PropGetter = useCallback((props: any = {}) => ({
    'aria-label': 'Close lightbox',
    ...props,
    onClick: (e: React.MouseEvent) => {
      onClose();
      props.onClick?.(e);
    },
  }), [onClose]);

  const getNextButtonProps: PropGetter = useCallback((props: any = {}) => ({
    'aria-label': 'Next item',
    disabled: itemCount <= 1,
    ...props,
    onClick: (e: React.MouseEvent) => {
      goToNext();
      props.onClick?.(e);
    },
  }), [goToNext, itemCount]);

  const getPreviousButtonProps: PropGetter = useCallback((props: any = {}) => ({
    'aria-label': 'Previous item',
    disabled: itemCount <= 1,
    ...props,
    onClick: (e: React.MouseEvent) => {
      goToPrevious();
      props.onClick?.(e);
    },
  }), [goToPrevious, itemCount]);
  
  const getImageProps: PropGetter = useCallback((props: any = {}) => ({
    role: 'img',
    ...props,
  }), []);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    getDialogProps,
    getCloseButtonProps,
    getNextButtonProps,
    getPreviousButtonProps,
    getImageProps,
  };
}
