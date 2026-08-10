import type { ClientConfig } from "@my-app/media-react";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "https://api.pexels.com/v1";

export const API_CONFIG: ClientConfig = {
  apiKey,
  baseUrl,
  timeout: 10000,
};
