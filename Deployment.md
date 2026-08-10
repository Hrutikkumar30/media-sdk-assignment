# Deployment Guide

The web application is built using Vite and can be deployed as a static site.

## Build Process
Run `npm run build` from the root directory. The output will be in the `dist` folder.

## Hosting
The `dist` folder can be hosted on any static hosting service:
- Vercel
- Netlify
- AWS S3 / CloudFront
- Google Cloud Storage
- Cloud Run (using a static file server like Nginx or Express)

Ensure that all routes fall back to `index.html` since this is a Single Page Application (SPA).
