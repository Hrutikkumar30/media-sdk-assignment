# @my-app/media-native

React Native bindings for `@my-app/media-core`. Provides a Provider and a set of hooks for seamless integration of the media API within your React Native applications.

## Features

- **Context Provider**: Globally inject the API client instance.
- **Hooks**: Simple hooks to fetch curated content, search media, and get media by ID.
- **State Management**: Handles loading and error states out of the box.
- **Pure React Native Wrapper**: Contains absolutely no business logic. Strictly adapts `@my-app/media-core` for React Native.

## Installation

```bash
npm install @my-app/media-native @my-app/media-core
```

## Usage

### 1. Wrap your application with `MediaProvider`

You can either pass a pre-configured `MediaClient` instance or a configuration object.

```tsx
import { MediaProvider } from '@my-app/media-native';

function App() {
  return (
    <MediaProvider config={{ apiKey: 'YOUR_API_KEY' }}>
      <YourAppComponents />
    </MediaProvider>
  );
}
```

### 2. Use Hooks in Your Components

```tsx
import { useMediaCurated, useMediaSearch, useMediaById } from '@my-app/media-native';
import { View, Text, FlatList } from 'react-native';

function CuratedGallery() {
  const { data, loading, error } = useMediaCurated({ page: 1, perPage: 15 });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList 
      data={data?.data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}
```
