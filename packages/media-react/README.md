# @my-app/media-react

React bindings for `@my-app/media-core`. Provides a Provider and a set of hooks for seamless integration of the media API within your React applications.

## Features

- **Context Provider**: Globally inject the API client instance.
- **Hooks**: Simple hooks to fetch curated content, search media, and get media by ID.
- **State Management**: Handles loading and error states out of the box.
- **Pure React Wrapper**: Contains absolutely no business logic. Strictly adapts `@my-app/media-core` for React.

## Installation

\`\`\`bash
npm install @my-app/media-react @my-app/media-core
\`\`\`

## Usage

### 1. Wrap your application with `MediaProvider`

You can either pass a pre-configured `MediaClient` instance or a configuration object.

\`\`\`tsx
import { MediaProvider } from '@my-app/media-react';

function App() {
  return (
    <MediaProvider config={{ apiKey: 'YOUR_API_KEY' }}>
      <YourAppComponents />
    </MediaProvider>
  );
}
\`\`\`

### 2. Use Hooks in Your Components

\`\`\`tsx
import { useMediaCurated, useMediaSearch, useMediaById } from '@my-app/media-react';

function CuratedGallery() {
  const { data, loading, error } = useMediaCurated({ page: 1, perPage: 15 });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.data.map(item => <li key={item.id}>{item.title}</li>)}
    </ul>
  );
}
\`\`\`

### Advanced: Accessing the Client

If you need to access the pure client (e.g., to manually fetch data or clear cache):

\`\`\`tsx
import { useMediaClient } from '@my-app/media-react';

function ClearCacheButton() {
  const client = useMediaClient();

  return (
    <button onClick={() => client.clearCache()}>
      Clear Cache
    </button>
  );
}
\`\`\`
