# Flow Editor

A visual workflow/diagram editor built with SolidJS and TypeScript.

## Features

- Drag and drop nodes onto a canvas
- Connect nodes with edges
- Multiple node shapes: Rectangle, Diamond, Pill, Ellipse
- Pan and zoom the canvas
- Real-time devtools overlay for debugging

## Tech Stack

- **Framework**: SolidJS
- **Language**: TypeScript (strict mode)
- **Build**: Vite
- **Styling**: Tailwind CSS v4
- **Formatting/Linting**: Biome

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the editor.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm serve` | Preview production build |
| `pnpm check` | Run Biome linter and formatter |
| `pnpm typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── edges/          # Edge components and utilities
├── editor/         # Main editor component and store
├── nodes/          # Node components and shapes
├── types.ts        # TypeScript type definitions
└── utils.ts        # Shared utilities
```
