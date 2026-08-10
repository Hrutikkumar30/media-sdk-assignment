import React, { useEffect, useState } from 'react';
import { Lightbox } from '@my-app/media-ui-react';
import { useMediaClient, Media } from '@my-app/media-react';
import { X, ChevronLeft, ChevronRight, Download, Calendar, Maximize2, User, Check } from 'lucide-react';

interface MediaLightboxProps {
  items: Media[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

export function MediaLightbox({ items, isOpen, onClose, initialIndex }: MediaLightboxProps) {
  const client = useMediaClient();
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !items.length) return null;

  const handleDownload = async (imageUrl: string, title: string, id: string) => {
    // Emit download event through SDK
    client.trackDownload(id, imageUrl);
    setDownloading(true);

    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeName = (title || 'visionhub_media').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${safeName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      // Direct link fallback
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.download = `${title || 'download'}.jpg`;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Lightbox 
      key={`lightbox-${initialIndex}-${isOpen}`}
      isOpen={isOpen} 
      onClose={onClose} 
      itemCount={items.length} 
      initialIndex={initialIndex}
    >
      {({ currentIndex, getDialogProps, getCloseButtonProps, getNextButtonProps, getPreviousButtonProps, getImageProps }) => {
        const currentItem = items[currentIndex] || items[initialIndex] || items[0];

        // Emit view event through SDK when index changes
        useEffect(() => {
          if (isOpen && currentItem) {
            client.trackView(currentItem.id, currentItem.title);
          }
        }, [currentIndex, isOpen, currentItem, client]);

        if (!currentItem) return null;

        const formattedDate = currentItem.createdAt 
          ? new Date(currentItem.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
          : null;

        return (
          <div 
            {...getDialogProps({ 
              className: 'fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 md:p-6 select-none animate-fadeIn',
              onClick: (e: React.MouseEvent) => {
                if (e.target === e.currentTarget) {
                  onClose();
                }
              }
            })}
          >
            {/* Header bar */}
            <div className="w-full flex items-center justify-between text-white z-30 pb-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-3 rounded-b-xl">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-white shadow-sm border border-white/10">
                  {currentIndex + 1} / {items.length}
                </span>
                <span className="hidden sm:inline-block text-xs text-gray-300 font-mono">
                  ID: {currentItem.id}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg border cursor-pointer ${
                    downloaded
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-blue-400/30 active:scale-95'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(currentItem.url, currentItem.title, currentItem.id);
                  }}
                  disabled={downloading}
                  title="Download Image to Local Device"
                >
                  {downloaded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Downloaded</span>
                    </>
                  ) : downloading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>

                <button 
                  {...getCloseButtonProps({ 
                    className: 'p-2 text-gray-200 hover:text-white bg-white/15 hover:bg-white/30 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer shadow-md border border-white/10',
                    title: 'Close (Esc)'
                  })}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="relative w-full flex-1 flex items-center justify-center min-h-0 my-2">
              {/* Previous Button */}
              <button 
                {...getPreviousButtonProps({ 
                  className: 'absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 hover:bg-black/80 rounded-full transition-all border border-white/15 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed z-30 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer' 
                })}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Image Container */}
              <div 
                className="w-full h-full flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  {...getImageProps({ 
                    src: currentItem.url, 
                    alt: currentItem.title,
                    className: 'max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300' 
                  })} 
                />
              </div>

              {/* Next Button */}
              <button 
                {...getNextButtonProps({ 
                  className: 'absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 hover:bg-black/80 rounded-full transition-all border border-white/15 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed z-30 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer' 
                })}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            {/* Footer Information Panel */}
            <div 
              className="w-full max-w-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-4 text-white z-30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white truncate">{currentItem.title}</h2>
                  <div className="flex items-center gap-1.5 text-sm text-gray-300 mt-0.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>{currentItem.author}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-4">
                  {currentItem.width && currentItem.height && (
                    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-slate-800">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{currentItem.width} × {currentItem.height} px</span>
                    </div>
                  )}

                  {formattedDate && (
                    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{formattedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Lightbox>
  );
}
