export * from './types';
export * from './MediaContext';
export * from './MediaProvider';
export * from './hooks/useMediaClient';
export * from './hooks/useMediaCurated';
export * from './hooks/useMediaSearch';
export * from './hooks/useMediaById';
export * from './hooks/useMediaEvent';

// Re-export core models and types so React consumer applications do not need direct imports from media-core
export type {
  Media,
  PaginatedResponse,
  SearchOptions,
  CuratedOptions,
  ClientConfig,
  EventCallback,
} from '@my-app/media-core';
export {
  MediaClient,
  MediaApiError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
} from '@my-app/media-core';

