import React, { useMemo } from 'react';
import { MediaClient, ClientConfig } from '@my-app/media-core';
import { MediaContext } from './MediaContext';

export interface MediaProviderProps {
  children: React.ReactNode;
  client?: MediaClient;
  config?: ClientConfig;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children, client, config }) => {
  const activeClient = useMemo(() => {
    if (client) {
      return client;
    }
    if (config) {
      return new MediaClient(config);
    }
    throw new Error('MediaProvider requires either a "client" instance or a "config" object.');
  }, [client, config]);

  return (
    <MediaContext.Provider value={activeClient}>
      {children}
    </MediaContext.Provider>
  );
};
