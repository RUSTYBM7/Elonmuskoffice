# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Elon Musk Official (`artifacts/elon-musk-official/`)
- **Kind**: React + Vite web app (previewPath `/`)
- **Stack**: React, Vite, Tailwind CSS v4, framer-motion, wouter, react-icons/fa6, lucide-react, @tanstack/react-query, shadcn/ui
- **Routes**: `/` (Home), `/contact` (Contact — opens in new tab from header)
- **Assets**: Portrait + SpaceX video in `attached_assets/` (aliased as `@assets`); venture images in `src/assets/` (aliased as `@/assets`)
- **Theme**: Light/dark toggle, stored in localStorage as `"elon-theme"`, dark uses red primary (`hsl(351 80% 49%)`)
- **Components**: Header, Hero (video bg), PortraitSection, Bio, Forbes, Timeline, Ventures, Vision, Newsletter, PressTicker, QuotesMarquee, Footer
- **Custom domain**: `elonmuskoffice.space` (set via Replit deployment custom domain UI after publishing)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
