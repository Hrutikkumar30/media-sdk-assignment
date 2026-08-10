# Contributing

## Setup
1. Clone the repository
2. Run `npm install` to bootstrap all workspaces
3. Run `npm run dev` in the root to start the demo app

## Commands
- `npm run dev`: Start the Vite dev server
- `npm run build`: Build the demo app
- `npm run lint`: Run TypeScript type checking

## Guidelines
- Ensure all tests pass.
- Maintain the strict separation of concerns (do not put React code in `media-core`).
- Use the Prop Getter pattern for UI components.
