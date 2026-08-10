# @my-app/media-ui-react

Headless, accessible UI components and hooks for building media galleries.

## Features

- **Headless**: Complete control over styling and DOM structure.
- **Prop Getters**: Easy binding of ARIA attributes, event handlers, and refs.
- **Accessibility**: Keyboard navigation, ARIA roles, and focus management built-in.
- **Infinite Scroll**: Built-in IntersectionObserver logic for loading more items.
- **Independent**: No dependencies on business logic or API clients. Just React.

## Components & Hooks

- **Grid**: `useGrid` / `<Grid>` - For masonry or standard grid layouts.
- **Lightbox**: `useLightbox` / `<Lightbox>` - Accessible modal image viewer with keyboard navigation.
- **ReelSwiper**: `useReelSwiper` / `<ReelSwiper>` - Horizontal scrolling reel/carousel.

## Installation

\`\`\`bash
npm install @my-app/media-ui-react
\`\`\`

## Usage Example: Lightbox

\`\`\`tsx
import { useLightbox } from '@my-app/media-ui-react';

function MyLightbox({ images, isOpen, onClose }) {
  const { 
    currentIndex, 
    getDialogProps, 
    getCloseButtonProps, 
    getNextButtonProps, 
    getPreviousButtonProps,
    getImageProps 
  } = useLightbox({
    isOpen,
    onClose,
    itemCount: images.length,
  });

  if (!isOpen) return null;

  return (
    <div {...getDialogProps({ className: 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center' })}>
      <button {...getCloseButtonProps({ className: 'absolute top-4 right-4 text-white' })}>Close</button>
      
      <button {...getPreviousButtonProps({ className: 'absolute left-4 text-white' })}>Prev</button>
      
      <img {...getImageProps({ src: images[currentIndex].url, className: 'max-h-[90vh] object-contain' })} />
      
      <button {...getNextButtonProps({ className: 'absolute right-4 text-white' })}>Next</button>
    </div>
  );
}
\`\`\`

## Infinite Scroll Example: Grid

\`\`\`tsx
import { useGrid } from '@my-app/media-ui-react';

function MyGrid({ items, onLoadMore, hasNextPage }) {
  const { getGridProps, getItemProps, getLoadMoreProps } = useGrid({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage: false,
  });

  return (
    <div {...getGridProps({ className: 'grid grid-cols-3 gap-4' })}>
      {items.map((item, index) => (
        <div key={item.id} {...getItemProps({ index, className: 'bg-gray-100 p-2' })}>
          <img src={item.url} alt={item.title} />
        </div>
      ))}
      {hasNextPage && (
        <div {...getLoadMoreProps({ className: 'h-10 w-full' })}>Loading more...</div>
      )}
    </div>
  );
}
\`\`\`
