import { useEffect } from 'react';
import { EventCallback } from '@my-app/media-core';
import { useMediaClient } from './useMediaClient';

export function useMediaEvent<T = any>(event: string, callback: EventCallback<T>): void {
  const client = useMediaClient();

  useEffect(() => {
    const unsubscribe = client.events.on<T>(event, callback);
    return () => {
      unsubscribe();
    };
  }, [client, event, callback]);
}
