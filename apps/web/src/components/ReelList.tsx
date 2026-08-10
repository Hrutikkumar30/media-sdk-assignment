import React, { useState, useEffect } from 'react';
import { ReelSwiper } from '@my-app/media-ui-react';
import { Media, useMediaClient } from '@my-app/media-react';
import { Play, Pause, Heart, MessageCircle, Bookmark, Share2, Music, Check, Sparkles } from 'lucide-react';

interface ReelListProps {
  items: Media[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function ReelList({ items, onLoadMore, hasNextPage, isFetchingNextPage }: ReelListProps) {
  const client = useMediaClient();
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);

  if (items.length === 0 && !isFetchingNextPage) {
    return (
      <div className="text-center py-20 text-gray-500 bg-white rounded-3xl max-w-sm mx-auto shadow-sm p-8 border border-gray-100">
        <Sparkles className="w-10 h-10 text-blue-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900">No Reels Available</h3>
        <p className="text-xs text-gray-400 mt-1">Check back later for fresh video content.</p>
      </div>
    );
  }

  const toggleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="w-full max-w-[400px] h-[calc(100vh-100px)] max-h-[720px] mx-auto bg-black rounded-[36px] overflow-hidden relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-4 border-gray-900 flex flex-col select-none">
      {/* Toast Notification for Share */}
      {showShareToast && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Reel link copied to clipboard!</span>
        </div>
      )}

      <ReelSwiper
        itemCount={items.length}
        onLoadMore={onLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {({ getSwiperProps, getItemProps, getLoadMoreProps, currentIndex }) => (
          <div 
            {...getSwiperProps({ 
              className: 'h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar flex flex-col bg-gray-950' 
            })}
          >
            {items.map((item, index) => {
              const isActive = currentIndex === index;
              const isLiked = !!likedMap[item.id];
              const isBookmarked = !!bookmarkedMap[item.id];
              const baseLikes = 1420 + ((index * 89) % 3200);
              const totalLikes = isLiked ? baseLikes + 1 : baseLikes;
              const commentsCount = 84 + ((index * 23) % 450);

              if (isActive) {
                client.trackView(item.id, item.title);
              }

              return (
                <div 
                  key={item.id} 
                  {...getItemProps({ 
                    index,
                    className: 'h-full w-full flex-shrink-0 snap-start snap-always relative overflow-hidden'
                  })}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {/* Media Content */}
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                  />

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

                  {/* Play/Pause Center Indicator */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-20 pointer-events-none">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white border border-white/40 shadow-xl">
                        <Play className="w-8 h-8 fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Left Info Panel */}
                  <div className="absolute bottom-6 left-4 right-20 text-white z-20 pointer-events-none space-y-2">
                    {/* Author Pill */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md border border-white/20">
                        {item.author.charAt(0)}
                      </div>
                      <span className="font-bold text-sm text-white drop-shadow-sm truncate">{item.author}</span>
                      <span className="bg-blue-500 text-[10px] text-white px-1.5 py-0.2 rounded-full font-bold">✓</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-base leading-snug drop-shadow-md line-clamp-2">{item.title}</h3>

                    {/* Music Ticker */}
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                      <Music className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
                      <span className="truncate">Original Sound - VisionHub Media</span>
                    </div>
                  </div>
                  
                  {/* Right Floating Actions Sidebar */}
                  <div 
                    className="absolute bottom-6 right-3 flex flex-col gap-5 items-center z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Like Button */}
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => toggleLike(item.id)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 border shadow-lg cursor-pointer ${
                          isLiked 
                            ? 'bg-rose-600/90 border-rose-500 text-white' 
                            : 'bg-black/40 hover:bg-black/60 border-white/20 text-white'
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
                      </button>
                      <span className="text-[11px] font-bold text-white drop-shadow">{totalLikes}</span>
                    </div>

                    {/* Comment Button */}
                    <div className="flex flex-col items-center gap-1">
                      <button className="w-11 h-11 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white transition-all active:scale-90 shadow-lg cursor-pointer">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <span className="text-[11px] font-bold text-white drop-shadow">{commentsCount}</span>
                    </div>

                    {/* Bookmark Button */}
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => toggleBookmark(item.id)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 border shadow-lg cursor-pointer ${
                          isBookmarked 
                            ? 'bg-amber-500/90 border-amber-400 text-white' 
                            : 'bg-black/40 hover:bg-black/60 border-white/20 text-white'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white text-white' : 'text-white'}`} />
                      </button>
                    </div>

                    {/* Share Button */}
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={handleShare}
                        className="w-11 h-11 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white transition-all active:scale-90 shadow-lg cursor-pointer"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Play/Pause Toggle */}
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-9 h-9 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer mt-1"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>
                  </div>
                </div>
              );
            })}

            {hasNextPage && (
              <div 
                {...getLoadMoreProps({ 
                  className: 'h-32 w-full flex-shrink-0 snap-start flex justify-center items-center bg-gray-950'
                })}
              >
                <div className="w-8 h-8 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}
      </ReelSwiper>
      
      {/* CSS to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
