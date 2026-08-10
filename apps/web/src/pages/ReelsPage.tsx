import React from 'react';
import { useMediaCurated } from '@my-app/media-react';
import { ReelList } from '../components/ReelList';
import { REELS_DEMO_DATA } from '../data/reelsDemoData';
import { Flame } from 'lucide-react';

export function ReelsPage() {
  const { data, loading } = useMediaCurated({ page: 1, perPage: 15 });
  const items = (data?.data && data.data.length > 0) ? data.data : REELS_DEMO_DATA;

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-950 to-black flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wide shadow-lg">
        <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>SDK Video Reels Feed</span>
      </div>

      <div className="w-full flex justify-center items-center relative z-10">
        <ReelList
          items={items}
          onLoadMore={() => {}}
          hasNextPage={false}
          isFetchingNextPage={loading}
        />
      </div>
    </div>
  );
}
