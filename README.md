# Headless Media SDK & Component Library Monorepo

A production-grade monorepo featuring a pure TypeScript Media SDK (`@my-app/media-core`), React and React Native framework adapters (`@my-app/media-react`, `@my-app/media-native`), headless UI component libraries (`@my-app/media-ui-react`, `@my-app/media-ui-native`), and a modern consumer web application (`apps/web`).

---

## Architectural Principles & Strict Isolation

The monorepo enforces strict package boundaries and dependency direction:

```
                    apps/web
                       |
             +---------+---------+
             |                   |
             v                   v
        media-react        media-ui-react
             |
             v
        media-core

Additionally:
        media-native
        media-ui-native
```

### Package Isolation Matrix

- **`apps/web`**: Composition layer. Consumes `@my-app/media-react` for state/data and `@my-app/media-ui-react` for headless UI layout.
- **`@my-app/media-core`**: Pure TypeScript only. Zero React, React Native, or DOM dependencies. Responsible for Pexels API fetching, pagination, in-memory caching (`MemoryCache`), request deduplication (`RequestDeduplicator`), typed errors, and activity event telemetry (`media:view`, `media:download`).
- **`@my-app/media-react`**: React adapter. Wraps `media-core` in `MediaProvider`, `useMediaSearch`, `useMediaCurated`, `useMediaById`, `useMediaClient`, and `useMediaEvent`. Re-exports core types so web applications never need to import `media-core` directly.
- **`@my-app/media-native`**: React Native adapter. Equivalent hooks and provider for React Native applications.
- **`@my-app/media-ui-react`**: Headless React UI library (`Grid`, `Lightbox`, `ReelSwiper`) implementing the Prop Getter pattern. **MUST NOT** import `media-core`, `media-react`, or any SDK logic.
- **`@my-app/media-ui-native`**: Headless React Native UI library.

---

## Workspace Structure

```
.
├── packages/
│   ├── media-core/          # Pure TypeScript API client (No React/DOM dependencies)
│   ├── media-react/         # React hooks and context provider adapter
│   ├── media-native/        # React Native hooks adapter
│   ├── media-ui-react/      # Headless React UI components (Prop Getter pattern)
│   └── media-ui-native/     # React Native UI components
├── apps/
│   └── web/                 # Consumer web app (React 19 + Vite + Tailwind CSS)
├── SKILL-data.md            # Architecture guidelines for SDK & data management
├── SKILL-components.md      # Architecture guidelines for headless UI components
├── package.json             # Root workspace config
└── tsconfig.json            # Monorepo TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Environment Setup & Pexels API Key

Create a `.env` file in `apps/web` (or at root for local dev):

```env
VITE_PEXELS_API_KEY=your_pexels_api_key_here
VITE_API_BASE_URL=https://api.pexels.com/v1
```

> [!NOTE]
> If `VITE_PEXELS_API_KEY` is omitted or set to `DEMO_KEY`, the application automatically activates a high-fidelity client-side mock provider that mimics live Pexels response payloads with simulated network latency.

---

## Quickstart & Verification Commands

```bash
# 1. Install workspace dependencies
npm install

# 2. Run dev server for the web app (http://localhost:5173)
npm run dev

# 3. Perform monorepo TypeScript typecheck
npm run lint

# 4. Execute unit test suite across workspace packages
npm test

# 5. Build production bundle for web app
npm run build
```

---

## SDK & Component Library Usage

### 1. SDK Provider Setup (`@my-app/media-react`)

```tsx
import { MediaProvider } from '@my-app/media-react';

const API_CONFIG = {
  apiKey: import.meta.env.VITE_PEXELS_API_KEY || 'DEMO_KEY',
  baseUrl: 'https://api.pexels.com/v1',
};

export default function App() {
  return (
    <MediaProvider config={API_CONFIG}>
      <MainGallery />
    </MediaProvider>
  );
}
```

### 2. Consuming Data Hooks & Telemetry

```tsx
import { useMediaCurated, useMediaClient } from '@my-app/media-react';

export function Gallery() {
  const { data, loading, error } = useMediaCurated({ page: 1, perPage: 24 });
  const client = useMediaClient();

  const handleMediaClick = (id: string, title: string) => {
    client.trackView(id, title);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading media</div>;

  return (
    <div>
      {data?.data.map((item) => (
        <div key={item.id} onClick={() => handleMediaClick(item.id, item.title)}>
          {item.title}
        </div>
      ))}
    </div>
  );
}
```

### 3. Consuming Headless UI Components (`@my-app/media-ui-react`)

```tsx
import { Grid } from '@my-app/media-ui-react';

export function MediaGridView({ items, onLoadMore, hasNextPage }) {
  return (
    <Grid onLoadMore={onLoadMore} hasNextPage={hasNextPage}>
      {({ getGridProps, getItemProps, getLoadMoreProps }) => (
        <div {...getGridProps({ className: "grid grid-cols-3 gap-4" })}>
          {items.map((item, index) => (
            <div key={item.id} {...getItemProps({ index, className: "aspect-square cursor-pointer" })}>
              <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
          ))}
          {hasNextPage && (
            <div {...getLoadMoreProps({ className: "col-span-full text-center" })}>
              Loading more...
            </div>
          )}
        </div>
      )}
    </Grid>
  );
}
```

---

## Known Limitations & Security Tradeoffs

1. **Client-Side API Key Security**: In browser single-page applications (`apps/web`), environment variables embedded into front-end assets (`VITE_PEXELS_API_KEY`) are visible to client browsers. In production enterprise deployments, requests should be proxied through a lightweight backend API gateway to keep API secrets confidential.
2. **Web Browser Audio Autoplay Policies**: Modern web browsers restrict unmuted autoplay of video media until the user interacts with the document.

---

## Engineering Design & Code Review Verification

### 1. Architectural Boundaries & Isolation
- **Monorepo Structure**: Strict monorepo isolation rules were established to ensure `@my-app/media-core` remains framework-agnostic. Re-exported core types from `@my-app/media-react` prevent `apps/web` from direct coupling to `media-core`.
- **Headless UI Component Contracts**: `useReelSwiper` and `useLightbox` ensure prop getters emit WAI-ARIA accessible attributes (`aria-modal`, `role`, keyboard navigation listeners).
- **Telemetry Event Wiring**: Integrated default activity listeners in `MediaClient` and linked `client.trackView()` and `client.trackDownload()` throughout `apps/web`.

### 2. Architecture Specifications Validation
- **`SKILL-data.md`**: Enforces how React components consume data hooks (`useMediaSearch`, `useMediaCurated`), register event subscribers (`useMediaEvent`), handle `AsyncState<T>`, and prevent direct external fetch calls from UI code.
- **`SKILL-components.md`**: Mandates the Prop Getter pattern and zero SDK/data imports inside `@my-app/media-ui-react`. Audited to confirm zero imports of `@my-app/media-core` or `@my-app/media-react` within UI package directories.

---

## Related Documentation

- [Architecture Guide](./Architecture.md)
- [Folder Structure](./FolderStructure.md)
- [API Reference](./API.md)
- [Contributing](./Contributing.md)
- [Deployment Guide](./Deployment.md)
- [SKILL-data](./SKILL-data.md)
- [SKILL-components](./SKILL-components.md)
