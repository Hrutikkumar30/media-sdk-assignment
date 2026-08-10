import React, { useState, useCallback, useEffect } from 'react';
import { useMediaCurated, useMediaSearch } from '@my-app/media-react';
import { MediaSearch } from '../components/MediaSearch';
import { MediaGrid } from '../components/MediaGrid';
import { MediaLightbox } from '../components/MediaLightbox';
import { Sparkles, Zap, ShieldCheck, Layers } from 'lucide-react';

export function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Using hooks from media-react
  const curatedState = useMediaCurated(activeQuery ? undefined : { page, perPage: 24 });
  const searchState = useMediaSearch(activeQuery ? { query: activeQuery, page, perPage: 24 } : { query: '' });

  const currentState = activeQuery ? searchState : curatedState;
  const { data, loading, error } = currentState;

  // Track accumulated items for infinite scroll
  const [accumulatedItems, setAccumulatedItems] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAccumulatedItems(data.data);
      } else {
        setAccumulatedItems(prev => {
          const newItems = data.data.filter(newItem => !prev.some(p => p.id === newItem.id));
          return [...prev, ...newItems];
        });
      }
    }
  }, [data, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
    setAccumulatedItems([]);
  }, [activeQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
  };

  const handleLoadMore = useCallback(() => {
    if (!loading && data && page < data.totalPages) {
      setPage(p => p + 1);
    }
  }, [loading, data, page]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Animated Hero Header */}
      <div className="relative overflow-hidden pt-12 pb-8 px-4">
        {/* Background ambient glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-blue-400 text-xs font-semibold tracking-wide mb-6 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>High-Performance Media SDK</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Discover & Explore <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Extraordinary Visuals
            </span>
          </h1>

          <MediaSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
            onSubmit={handleSearch}
            onClear={() => {
              setSearchQuery('');
              setActiveQuery('');
            }}
          />

          {/* Feature Metric Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400 mt-2">
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800/80">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>60 FPS Smooth Rendering</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800/80">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Headless UI Prop Getters</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Deduplicated Cache</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {error ? (
          <div className="bg-red-950/80 text-red-200 p-6 rounded-2xl text-center shadow-xl border border-red-800/80 max-w-xl mx-auto my-12">
            <h3 className="font-semibold text-lg mb-1">Failed to load media</h3>
            <p className="text-sm mb-4 text-red-300">{error.message}</p>
            <button 
              onClick={() => setPage(1)} 
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <MediaGrid
              items={accumulatedItems}
              onLoadMore={handleLoadMore}
              hasNextPage={!!data && page < data.totalPages}
              isFetchingNextPage={loading && page > 1}
              onItemClick={setLightboxIndex}
            />
            
            {loading && page === 1 && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Loading Curated Gallery...</span>
              </div>
            )}

            <MediaLightbox
              items={accumulatedItems}
              isOpen={lightboxIndex !== -1}
              initialIndex={Math.max(0, lightboxIndex)}
              onClose={() => setLightboxIndex(-1)}
            />
          </>
        )}
      </div>
    </div>
  );
}
