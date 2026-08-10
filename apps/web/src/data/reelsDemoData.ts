/**
 * @file reelsDemoData.ts
 * @description Curated sample dataset for short video Reels feed demonstration.
 * Intentionally isolated from core SDK and Pexels API logic.
 */

import { Media } from '@my-app/media-core';

export const REELS_DEMO_DATA: Media[] = [
  {
    id: 'reel-1',
    url: 'https://picsum.photos/seed/reel_nature_1/800/1400',
    thumbnailUrl: 'https://picsum.photos/seed/reel_nature_1/400/600',
    title: 'Serene Alpine Waterfall Escape',
    author: 'Elena Rostova',
    width: 800,
    height: 1400,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel-2',
    url: 'https://picsum.photos/seed/reel_city_2/800/1400',
    thumbnailUrl: 'https://picsum.photos/seed/reel_city_2/400/600',
    title: 'Neon Nights in Tokyo Alleyways',
    author: 'Kenji Takahashi',
    width: 800,
    height: 1400,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel-3',
    url: 'https://picsum.photos/seed/reel_ocean_3/800/1400',
    thumbnailUrl: 'https://picsum.photos/seed/reel_ocean_3/400/600',
    title: 'Deep Ocean Coral Reef Exploration',
    author: 'Sarah Jenkins',
    width: 800,
    height: 1400,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel-4',
    url: 'https://picsum.photos/seed/reel_arch_4/800/1400',
    thumbnailUrl: 'https://picsum.photos/seed/reel_arch_4/400/600',
    title: 'Futuristic Architecture & Lines',
    author: 'Marcus Vance',
    width: 800,
    height: 1400,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel-5',
    url: 'https://picsum.photos/seed/reel_sunset_5/800/1400',
    thumbnailUrl: 'https://picsum.photos/seed/reel_sunset_5/400/600',
    title: 'Golden Hour Desert Horizon',
    author: 'Amara Diop',
    width: 800,
    height: 1400,
    createdAt: new Date().toISOString(),
  },
];
