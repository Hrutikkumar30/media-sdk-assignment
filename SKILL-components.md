# SKILL: Headless UI Components (`@my-app/media-ui-react` & `@my-app/media-ui-native`)

This skill document defines authoritative design guidelines, usage patterns, and accessibility standards for building and consuming UI components in this repository.

---

## 1. Core Headless UI Philosophy

- **Zero Business / SDK Logic**: UI component packages (`@my-app/media-ui-react`, `@my-app/media-ui-native`) MUST NOT import `@my-app/media-core`, `@my-app/media-react`, API clients, or application data fetchers.
- **No Enforced Styling**: Headless components provide state management, accessibility attributes, and keyboard controls. Styling (e.g., Tailwind CSS, custom CSS) is applied entirely by the consumer application (`apps/web`).
- **Prop Getter Pattern**: Interactive state and accessibility properties are exposed through prop getters (`getGridProps()`, `getItemProps()`, `getDialogProps()`, `getSwiperProps()`, etc.).

---

## 2. Available Components & Usage

### A. Grid Component (`@my-app/media-ui-react`)

Exposes infinite scrolling refs, keyboard selection state, and grid cell accessibility props.

```tsx
import { Grid } from '@my-app/media-ui-react';

<Grid onLoadMore={handleLoadMore} hasNextPage={hasNextPage} isFetchingNextPage={loading}>
  {({ getGridProps, getItemProps, getLoadMoreProps }) => (
    <div {...getGridProps({ className: "grid grid-cols-3 gap-4" })}>
      {items.map((item, index) => (
        <div key={item.id} {...getItemProps({ index, className: "card" })}>
          <img src={item.thumbnailUrl} alt={item.title} />
        </div>
      ))}
      {hasNextPage && (
        <div {...getLoadMoreProps({ className: "loading-spinner" })}>
          Loading more...
        </div>
      )}
    </div>
  )}
</Grid>
```

---

### B. Lightbox Component (`@my-app/media-ui-react`)

Accessible modal lightbox supporting image display, keyboard shortcuts (`Escape` to close, `Left`/`Right` arrows to navigate), and focus containment.

```tsx
import { Lightbox } from '@my-app/media-ui-react';

<Lightbox isOpen={isOpen} onClose={onClose} itemCount={items.length} initialIndex={index}>
  {({ currentIndex, getDialogProps, getCloseButtonProps, getNextButtonProps, getPreviousButtonProps, getImageProps }) => {
    const currentItem = items[currentIndex];
    return (
      <div {...getDialogProps({ className: "modal-overlay" })}>
        <button {...getCloseButtonProps({ className: "close-btn" })}>Close</button>
        <button {...getPreviousButtonProps({ className: "prev-btn" })}>Prev</button>
        <img {...getImageProps({ src: currentItem.url, alt: currentItem.title })} />
        <button {...getNextButtonProps({ className: "next-btn" })}>Next</button>
      </div>
    );
  }}
</Lightbox>
```

---

### C. Reel Swiper Component (`@my-app/media-ui-react`)

Vertical snap-paging container with automatic active-item detection via IntersectionObserver.

```tsx
import { ReelSwiper } from '@my-app/media-ui-react';

<ReelSwiper itemCount={items.length} onLoadMore={onLoadMore} hasNextPage={hasNextPage}>
  {({ getSwiperProps, getItemProps, getLoadMoreProps, currentIndex }) => (
    <div {...getSwiperProps({ className: "reel-swiper-container" })}>
      {items.map((item, index) => {
        const isActive = currentIndex === index;
        return (
          <div key={item.id} {...getItemProps({ index, className: "reel-slide" })}>
            <img src={item.url} alt={item.title} />
            {isActive && <span className="active-badge">Active Reel</span>}
          </div>
        );
      })}
    </div>
  )}
</ReelSwiper>
```

---

## 3. Accessibility & Keyboard Navigation Requirements

All headless UI hooks must automatically emit standard WAI-ARIA roles and attributes:
- `role="grid"` and `role="gridcell"` for Grid layouts.
- `role="dialog"`, `aria-modal="true"`, and `aria-label` for Lightbox overlays.
- `role="region"`, `aria-roledescription="carousel"`, and `aria-roledescription="slide"` for Reel Swiper.
- Automatic keyboard handlers (`Escape` key for dismiss, arrow keys for navigation).
