import React from 'react';
import { Grid } from '@my-app/media-ui-react';
import { useMediaClient, Media } from '@my-app/media-react';
import { Eye, Heart, Sparkles } from 'lucide-react';

interface MediaGridProps {
  items: Media[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onItemClick: (index: number) => void;
}

export function MediaGrid({ items, onLoadMore, hasNextPage, isFetchingNextPage, onItemClick }: MediaGridProps) {
  const client = useMediaClient();

  if (items.length === 0 && !isFetchingNextPage) {
    return (
      <div className="text-center py-24 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800 max-w-md mx-auto my-8 p-8 shadow-2xl">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No media found</h3>
        <p className="text-slate-400 text-sm">Try searching for something else or browse curated categories.</p>
      </div>
    );
  }

  return (
    <Grid
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      {({ getGridProps, getItemProps, getLoadMoreProps }) => (
        <div 
          {...getGridProps({ 
            className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2' 
          })}
        >
          {items.map((item, index) => {
            const likesCount = 120 + ((index * 37) % 480);
            
            return (
              <div 
                key={item.id} 
                {...getItemProps({ 
                  index,
                  className: 'group relative aspect-[4/3] sm:aspect-square bg-slate-900 rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 border border-slate-800 hover:border-blue-500/50',
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Track view event through SDK
                    client.trackView(item.id, item.title);
                    onItemClick(index);
                  }
                })}
              >
                {/* Media Image */}
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  loading="lazy"
                />

                {/* Ambient Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Quality Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 pointer-events-none">
                  4K Ultra
                </div>

                {/* Hover Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Details Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <h4 className="text-white font-bold text-base leading-snug truncate drop-shadow-md">{item.title}</h4>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-300">
                    <span className="truncate font-medium text-gray-200">by {item.author}</span>
                    <div className="flex items-center gap-1 text-rose-400 font-semibold bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                      <Heart className="w-3 h-3 fill-rose-400" />
                      <span>{likesCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {hasNextPage && (
            <div 
              {...getLoadMoreProps({ 
                className: 'col-span-full py-12 flex flex-col justify-center items-center gap-3' 
              })}
            >
              <div className="w-9 h-9 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Loading more media...</span>
            </div>
          )}
        </div>
      )}
    </Grid>
  );
}
