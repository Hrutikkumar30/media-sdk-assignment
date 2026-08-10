# @my-app/media-core

A pure TypeScript API client for media fetching, supporting authentication, caching, deduplication, and events.

## Features

- **Pure TypeScript**: No dependencies on React, React Native, or DOM.
- **Caching**: Built-in memory cache to prevent redundant network requests.
- **Request Deduplication**: Prevents duplicate requests for the same resource simultaneously.
- **Event Emitter**: Emits lifecycle events for requests and cache hits.
- **Typed Models**: Fully typed responses for search, curated, and singular media fetching.
- **Error Handling**: Custom error classes for rate limiting, authentication, and not found.

## Installation

\`\`\`bash
npm install @my-app/media-core
\`\`\`

## Usage

\`\`\`typescript
import { MediaClient, MediaApiError } from '@my-app/media-core';

// Initialize the client
const client = new MediaClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://api.example.com/v1', // Optional
  timeout: 5000 // Optional, defaults to 10000ms
});

// Subscribe to events
client.events.on('request:start', ({ url }) => console.log('Starting fetch:', url));
client.events.on('cache:hit', ({ key }) => console.log('Cache hit:', key));

// Fetch curated media
async function loadCurated() {
  try {
    const response = await client.getCurated({ page: 1, perPage: 20 });
    console.log(response.data);
  } catch (err) {
    if (err instanceof MediaApiError) {
      console.error(err.message);
    }
  }
}

// Search media
async function searchMedia(query: string) {
  const response = await client.search({ query, page: 1 });
  console.log(response.data);
}

// Get media by ID
async function getMediaById(id: string) {
  const media = await client.getById(id);
  console.log(media.title);
}
\`\`\`

## Architecture

- \`MediaClient\`: The main entrypoint. Handles auth and orchestrates cache and deduplication.
- \`MemoryCache\`: A TTL-based in-memory cache.
- \`RequestDeduplicator\`: Keeps track of pending requests by a unique cache key to avoid race conditions.
- \`EventEmitter\`: Provides a publish-subscribe mechanism for library lifecycle events.
