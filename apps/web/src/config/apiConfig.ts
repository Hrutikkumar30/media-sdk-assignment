import type { ClientConfig } from "@my-app/media-react";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_PEXELS_API_KEY is not configured. Please add it to your environment variables.",
  );
}

export const API_CONFIG: ClientConfig = {
  apiKey,
  baseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.pexels.com/v1",
  timeout: 10000,
};
