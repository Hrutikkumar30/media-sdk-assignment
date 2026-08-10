# SKILL: Data & State Management (`@my-app/media-core` & `@my-app/media-react`)

This skill document defines authoritative rules, patterns, and guidelines for data fetching, API configuration, event telemetry, and state management across the Media SDK monorepo.

---

## 1. Core Architecture & Dependency Isolation

- **Pure Core Isolation**: All external API interactions, HTTP requests (Pexels), caching, request deduplication, and event emissions **MUST** take place within `@my-app/media-core`.
- **Framework Wrappers**: `@my-app/media-react` (Web) and `@my-app/media-native` (React Native) are thin adapters wrapping `@my-app/media-core`.
- **NEVER Call External APIs Directly**: UI components and consumer applications (`apps/web`) MUST NOT make direct `fetch()` or `axios` calls to Pexels or third-party endpoints. All data requests must flow through `media-react` hooks or `MediaClient`.
- **Strict Dependency Boundaries**:
  - `apps/web` -> `@my-app/media-react` & `@my-app/media-ui-react`
  - `@my-app/media-react` -> `@my-app/media-core`
  - `@my-app/media-core` -> Pure TypeScript only (NO React, NO DOM, NO UI dependencies).

---

## 2. Centralized Provider & API Setup

Wrap your application root with `MediaProvider` passing configuration details:

```tsx
import { MediaProvider } from '@my-app/media-react';

const API_CONFIG = {
  apiKey: import.meta.env.VITE_PEXELS_API_KEY || 'DEMO_KEY',
  baseUrl: 'https://api.pexels.com/v1',
  timeout: 10000,
};

export function App() {
  return (
    <MediaProvider config={API_CONFIG}>
      <YourAppContent />
    </MediaProvider>
  );
}
```

---

## 3. Available Data Hooks (`@my-app/media-react`)

### A. `useMediaCurated(options?: CuratedOptions)`
Fetches paginated curated/trending media from the SDK.
```tsx
const { data, loading, error } = useMediaCurated({ page: 1, perPage: 24 });
// data contains: { data: Media[], page: number, perPage: number, totalItems: number, totalPages: number }
```

### B. `useMediaSearch(options: SearchOptions)`
Searches for media given a search query string and page index.
```tsx
const { data, loading, error } = useMediaSearch({ query: 'nature', page: 1, perPage: 24 });
```

### C. `useMediaById(id?: string)`
Fetches a single media item by its unique identifier.
```tsx
const { data: mediaItem, loading, error } = useMediaById('12345');
```

### D. `useMediaClient()`
Accesses the `MediaClient` instance from context for imperative operations or event tracking.
```tsx
const client = useMediaClient();
client.trackView('123', 'Sample Title');
client.trackDownload('123', 'https://example.com/image.jpg');
```

### E. `useMediaEvent(eventName: string, callback: EventCallback)`
Idiomatically subscribes to SDK telemetry events inside React components:
```tsx
useMediaEvent('media:view', (payload) => {
  console.log('View event recorded:', payload);
});
```

---

## 4. Standardized AsyncState Structure

All media data hooks return a unified `AsyncState<T>` object:

```typescript
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
```

Always check `loading` and `error` states gracefully in the UI.

---

## 5. Caching & Request Deduplication

- `@my-app/media-core` automatically handles in-memory TTL caching via `MemoryCache`.
- Concurrent duplicate requests are deduplicated using `RequestDeduplicator`.
- Developers do NOT need to implement manual fetching state guards or custom cache maps in component logic.
