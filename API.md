# API Documentation

## MediaClient
The `MediaClient` class from `@my-app/media-core` is the main entry point for data fetching.

### Methods
- `getCurated(options: CuratedOptions)`: Fetches a paginated list of curated media.
- `search(options: SearchOptions)`: Searches for media by query.
- `getById(id: string)`: Fetches a single media item by ID.

## Hooks (React / Native)
- `useMediaCurated(options)`
- `useMediaSearch(options)`
- `useMediaById(id)`
