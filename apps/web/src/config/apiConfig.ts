/// <reference types="vite/client" />

import { ClientConfig } from '@my-app/media-core';

/**
 * Centralized API Configuration layer
 */
export const API_CONFIG: ClientConfig = {
  apiKey: import.meta.env.VITE_PEXELS_API_KEY || 'DEMO_KEY',
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.pexels.com/v1',
  timeout: 10000,
};
