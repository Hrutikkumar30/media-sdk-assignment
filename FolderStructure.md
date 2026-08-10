# Folder Structure

```
.
├── apps/
│   └── web/                 # Demo Web Application (React 19 + Vite)
│       ├── src/
│       │   ├── components/  # Web UI components (Grid, Lightbox, Reels)
│       │   ├── pages/       # Gallery & Reels pages
│       │   └── utils/       # Analytics & helper utilities
│       ├── index.html
│       ├── package.json
│       └── vite.config.ts
├── packages/
│   ├── media-core/          # Pure TypeScript API client
│   ├── media-react/         # React hooks & context provider
│   ├── media-native/        # React Native hooks adapter
│   ├── media-ui-react/      # Headless React UI components
│   └── media-ui-native/     # React Native UI components
├── package.json             # Root monorepo workspace configuration
└── tsconfig.json            # Base TypeScript configuration
```
