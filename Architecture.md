# Architecture

This project is structured as a monorepo using npm workspaces (`apps/*`, `packages/*`).

## Core Philosophy

1. **Strict Isolation & Separation of Concerns**: Business logic and API data fetching are strictly isolated from UI rendering layer.
2. **Framework Agnostic Core**: `@my-app/media-core` is pure TypeScript with zero DOM/React dependencies, capable of running in any JavaScript environment.
3. **Headless UI Components**: `@my-app/media-ui-react` uses the Prop Getter pattern to provide accessibility, keyboard navigation, and layout logic without enforcing rigid styling.
4. **Cross-Platform Adapters**: Dedicated React Native adapters (`media-native`, `media-ui-native`) reuse core state management.
5. **Clean Workspace Isolation**: The web application (`apps/web`) consumes SDK packages via workspaces without polluting monorepo dependency graphs.

## Package Dependency Graph

- `media-core` (No external runtime dependencies)
- `media-react` (Depends on `media-core`, `react`)
- `media-native` (Depends on `media-core`, `react`, `react-native`)
- `media-ui-react` (Depends on `react`, `react-dom`)
- `media-ui-native` (Depends on `react`, `react-native`)
- `web` (`apps/web` - Depends on `media-core`, `media-react`, `media-ui-react`)
