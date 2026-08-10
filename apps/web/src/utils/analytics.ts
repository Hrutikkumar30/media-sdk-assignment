export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log(`[Analytics] ${eventName}`, properties);
};

export const trackViewEvent = (mediaId: string, title: string) => {
  trackEvent('media_viewed', { mediaId, title, timestamp: Date.now() });
};

export const trackDownloadEvent = (mediaId: string, url: string) => {
  trackEvent('media_downloaded', { mediaId, url, timestamp: Date.now() });
};
