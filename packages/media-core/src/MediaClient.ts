import { ClientConfig, Media, PaginatedResponse, SearchOptions, CuratedOptions } from './types';
import { EventEmitter } from './EventEmitter';
import { MemoryCache } from './MemoryCache';
import { RequestDeduplicator } from './RequestDeduplicator';
import { MediaApiError, AuthenticationError, NotFoundError, RateLimitError } from './errors';

export const DEFAULT_BASE_URL = 'https://api.pexels.com/v1';

export class MediaClient {
  private config: Required<ClientConfig>;
  public events: EventEmitter;
  private cache: MemoryCache;
  private deduplicator: RequestDeduplicator;

  constructor(config: ClientConfig) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      timeout: config.timeout || 10000,
    };
    this.events = new EventEmitter();
    this.cache = new MemoryCache();
    this.deduplicator = new RequestDeduplicator();
    this.setupDefaultListeners();
  }

  private setupDefaultListeners(): void {
    this.events.on('media:view', (payload) => {
      console.log('[SDK Event: media:view]', payload);
    });
    this.events.on('media:download', (payload) => {
      console.log('[SDK Event: media:download]', payload);
    });
    this.events.on('request:error', (payload) => {
      console.error('[SDK Event: request:error]', payload);
    });
  }

  private async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const headers = {
      'Authorization': this.config.apiKey,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      this.events.emit('request:start', { url, method: options.method || 'GET' });
      
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      const data = await response.json();
      this.events.emit('request:success', { url, data });
      return data as T;
    } catch (error) {
      this.events.emit('request:error', { url, error });
      if (error instanceof MediaApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new MediaApiError('Request timeout', 408);
      }
      throw new MediaApiError(error instanceof Error ? error.message : 'Unknown network error');
    } finally {
      clearTimeout(timeoutId);
      this.events.emit('request:complete', { url });
    }
  }

  private handleErrorResponse(response: Response): Promise<never> {
    const statusCode = response.status;
    
    if (statusCode === 401 || statusCode === 403) {
      throw new AuthenticationError();
    }
    if (statusCode === 404) {
      throw new NotFoundError();
    }
    if (statusCode === 429) {
      throw new RateLimitError();
    }
    
    throw new MediaApiError(`API Error: ${response.statusText}`, statusCode);
  }

  private normalizePexelsResponse(rawResponse: any, page: number, perPage: number): PaginatedResponse<Media> {
    if (!rawResponse) {
      return { data: [], page, perPage, totalItems: 0, totalPages: 0 };
    }

    // Handle Pexels photos array
    if (Array.isArray(rawResponse.photos)) {
      const data: Media[] = rawResponse.photos.map((photo: any) => ({
        id: String(photo.id),
        url: photo.src?.large2x || photo.src?.large || photo.src?.original || photo.url,
        thumbnailUrl: photo.src?.medium || photo.src?.small || photo.src?.tiny || photo.src?.portrait,
        title: photo.alt || `Photo by ${photo.photographer}`,
        author: photo.photographer || 'Unknown Author',
        width: photo.width || 800,
        height: photo.height || 600,
        createdAt: new Date().toISOString(),
      }));

      const totalItems = rawResponse.total_results || data.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

      return {
        data,
        page: rawResponse.page || page,
        perPage: rawResponse.per_page || perPage,
        totalItems,
        totalPages,
      };
    }

    // Standard PaginatedResponse format
    return {
      data: rawResponse.data || [],
      page: rawResponse.page || page,
      perPage: rawResponse.perPage || perPage,
      totalItems: rawResponse.totalItems || 0,
      totalPages: rawResponse.totalPages || 0,
    };
  }

  /**
   * Track view event through the SDK
   */
  trackView(mediaId: string, title?: string): void {
    this.events.emit('media:view', { mediaId, title, timestamp: Date.now() });
  }

  /**
   * Track download event through the SDK
   */
  trackDownload(mediaId: string, url?: string): void {
    this.events.emit('media:download', { mediaId, url, timestamp: Date.now() });
  }

  async getCurated(options: CuratedOptions = {}): Promise<PaginatedResponse<Media>> {
    const { page = 1, perPage = 15 } = options;
    const cacheKey = `curated:${page}:${perPage}`;
    
    const cachedData = this.cache.get<PaginatedResponse<Media>>(cacheKey);
    if (cachedData) {
      this.events.emit('cache:hit', { key: cacheKey });
      return cachedData;
    }

    const path = `/curated?page=${page}&per_page=${perPage}`;
    const rawData = await this.deduplicator.execute(cacheKey, () => this.fetch<any>(path));
    const data = this.normalizePexelsResponse(rawData, page, perPage);
    
    this.cache.set(cacheKey, data);
    return data;
  }

  async search(options: SearchOptions): Promise<PaginatedResponse<Media>> {
    const { query, page = 1, perPage = 15 } = options;
    const cacheKey = `search:${query}:${page}:${perPage}`;
    
    const cachedData = this.cache.get<PaginatedResponse<Media>>(cacheKey);
    if (cachedData) {
      this.events.emit('cache:hit', { key: cacheKey });
      return cachedData;
    }

    const path = `/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    const rawData = await this.deduplicator.execute(cacheKey, () => this.fetch<any>(path));
    const data = this.normalizePexelsResponse(rawData, page, perPage);
    
    this.cache.set(cacheKey, data);
    return data;
  }

  async getById(id: string): Promise<Media> {
    const cacheKey = `media:${id}`;
    
    const cachedData = this.cache.get<Media>(cacheKey);
    if (cachedData) {
      this.events.emit('cache:hit', { key: cacheKey });
      return cachedData;
    }

    const path = `/photos/${id}`;
    const rawData = await this.deduplicator.execute(cacheKey, () => this.fetch<any>(path));
    
    let media: Media;
    if (rawData.id && rawData.src) {
      media = {
        id: String(rawData.id),
        url: rawData.src?.large2x || rawData.src?.large || rawData.src?.original || rawData.url,
        thumbnailUrl: rawData.src?.medium || rawData.src?.small || rawData.src?.tiny,
        title: rawData.alt || `Photo by ${rawData.photographer}`,
        author: rawData.photographer || 'Unknown Author',
        width: rawData.width || 800,
        height: rawData.height || 600,
        createdAt: new Date().toISOString(),
      };
    } else {
      media = rawData as Media;
    }
    
    this.cache.set(cacheKey, media);
    return media;
  }

  clearCache(): void {
    this.cache.clear();
    this.events.emit('cache:cleared', {});
  }
}
