import { useState, useEffect } from 'react';
import { Media } from '@my-app/media-core';
import { useMediaClient } from './useMediaClient';
import { AsyncState } from '../types';

export function useMediaById(id: string | null): AsyncState<Media> {
  const client = useMediaClient();
  const [state, setState] = useState<AsyncState<Media>>({
    data: null,
    loading: !!id,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    client.getById(id)
      .then((data) => {
        if (mounted) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (mounted) setState({ data: null, loading: false, error });
      });

    return () => {
      mounted = false;
    };
  }, [client, id]);

  return state;
}
