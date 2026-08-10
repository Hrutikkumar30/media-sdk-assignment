/// <reference types="vite/client" />
import type { ClientConfig } from "@my-app/media-react";

const apiKey = (import.meta as any).env?.VITE_PEXELS_API_KEY;

const baseUrl =
  (import.meta as any).env?.VITE_API_BASE_URL || "https://api.pexels.com/v1";

export const API_CONFIG: ClientConfig = {
  apiKey: apiKey || "DEMO_KEY",
  baseUrl,
  timeout: 10000,
};
