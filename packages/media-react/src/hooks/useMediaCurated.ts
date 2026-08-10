import { useState, useEffect } from 'react';
import { CuratedOptions, Media, PaginatedResponse } from '@my-app/media-core';
import { useMediaClient } from './useMediaClient';
import { AsyncState } from '../types';

export function useMediaCurated(options?: CuratedOptions): AsyncState<PaginatedResponse<Media>> {
  const client = useMediaClient();
  const [state, setState] = useState<AsyncState<PaginatedResponse<Media>>>({
    data: null,
    loading: true,
    error: null,
  });

  // Stringify options to avoid unnecessary refetches on reference change
  const optionsKey = JSON.stringify(options || {});

  useEffect(() => {
    let mounted = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    client.getCurated(options)
      .then((data) => {
        if (mounted) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (mounted) setState({ data: null, loading: false, error });
      });

    return () => {
      mounted = false;
    };
  }, [client, optionsKey]);

  return state;
}
