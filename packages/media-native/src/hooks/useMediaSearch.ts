import { useState, useEffect } from 'react';
import { SearchOptions, Media, PaginatedResponse } from '@my-app/media-core';
import { useMediaClient } from './useMediaClient';
import { AsyncState } from '../types';

export function useMediaSearch(options: SearchOptions): AsyncState<PaginatedResponse<Media>> {
  const client = useMediaClient();
  const [state, setState] = useState<AsyncState<PaginatedResponse<Media>>>({
    data: null,
    loading: true,
    error: null,
  });

  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    let mounted = true;
    
    if (!options.query) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    client.search(options)
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
