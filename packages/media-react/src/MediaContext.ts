import { createContext } from 'react';
import { MediaClient } from '@my-app/media-core';

export const MediaContext = createContext<MediaClient | null>(null);
