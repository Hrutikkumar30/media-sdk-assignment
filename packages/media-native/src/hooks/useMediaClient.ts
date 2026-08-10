import { useContext } from 'react';
import { MediaClient } from '@my-app/media-core';
import { MediaContext } from '../MediaContext';

export function useMediaClient(): MediaClient {
  const client = useContext(MediaContext);
  if (!client) {
    throw new Error('useMediaClient must be used within a MediaProvider');
  }
  return client;
}
