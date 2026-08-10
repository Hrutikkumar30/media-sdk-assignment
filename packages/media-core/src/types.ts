export interface Media {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  author: string;
  width: number;
  height: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface SearchOptions {
  query: string;
  page?: number;
  perPage?: number;
}

export interface CuratedOptions {
  page?: number;
  perPage?: number;
}

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export type EventCallback<T = any> = (payload: T) => void;
