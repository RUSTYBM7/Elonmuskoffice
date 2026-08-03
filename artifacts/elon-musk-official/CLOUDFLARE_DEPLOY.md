# Cloudflare Pages Deployment Guide

This guide will help you deploy your migrated project from Vercel to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account (free tier works)
2. Wrangler CLI installed on your machine

## Quick Deployment

### Option 1: Deploy via GitHub Integration (Recommended)

1. Push your migrated project to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Select "Workers & Pages" from the sidebar
4. Click "Create application"
5. Choose "Pages" and "Connect to Git"
6. Select your GitHub repository
7. Configure the build settings:
   - **Project name**: `elonmuskoffice`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `artifacts/elon-musk-official`
8. Click "Deploy site"

### Option 2: Deploy via Wrangler CLI

```bash
# Navigate to the project directory
cd artifacts/elon-musk-official

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

## Project Structure After Migration

```
artifacts/elon-musk-official/
├── dist/                          # Built files for deployment
│   ├── index.html
│   ├── _routes.json               # Cloudflare routing config
│   ├── _headers                  # Security headers
│   ├── functions/                # Cloudflare Pages Functions
│   │   ├── api/
│   │   │   └── health.ts        # Health check API
│   │   ├── [[fallback]].ts      # SPA fallback handler
│   │   └── _middleware.ts        # Security middleware
│   └── assets/                   # Static assets
├── functions/                     # Source for Pages Functions
├── wrangler.toml                 # Cloudflare Workers config
├── vite.config.ts               # Build configuration
├── package.json                 # Updated dependencies (no Vercel)
└── _headers                     # Security headers
```

## What's Been Migrated

### Removed Vercel Dependencies
- `@vercel/analytics` - Completely removed

### Added Cloudflare Dependencies
- `@cloudflare/workers-types` - TypeScript types for Cloudflare Workers
- `wrangler` - Cloudflare CLI tool

### Cloudflare Services Configured

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Cloudflare Pages** | Static site hosting | `dist/` directory |
| **Pages Functions** | Serverless API | `functions/` directory |
| **Middleware** | Security headers, CORS | `functions/_middleware.ts` |
| **SPA Fallback** | Client-side routing | `functions/[[fallback]].ts` |

## Environment Variables (Optional)

If your app uses environment variables, configure them in Cloudflare Pages:

1. Go to Pages > Your Project > Settings > Environment Variables
2. Add any required variables (e.g., API keys)

## Custom Domain Setup

1. In Cloudflare Dashboard, go to Pages > Your Project > Custom Domains
2. Click "Set up a custom domain"
3. Follow the DNS configuration instructions

## API Backend (Future Enhancement)

The project includes a `wrangler.toml` with commented configurations for:

- **D1 Database** - SQLite-based serverless database
- **KV Namespace** - Key-value storage
- **R2 Storage** - Object storage for files

To enable these, uncomment the sections in `wrangler.toml` and run:

```bash
npx wrangler d1 create elonmuskoffice-db
npx wrangler kv:namespace create CACHE
npx wrangler r2 bucket create elonmuskoffice-assets
```

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is installed
- Run `npm install` before building

### Deployment Issues
- Run `npx wrangler whoami` to verify authentication
- If not logged in, run `npx wrangler login`

### Function Errors
- Check Cloudflare Pages logs in the dashboard
- Verify function file syntax (TypeScript)

## Performance Benefits

| Feature | Before (Vercel) | After (Cloudflare) |
|---------|-----------------|-------------------|
| Edge Network | Limited locations | 300+ locations |
| Cold Start | ~200ms | ~5ms |
| SSL Certificate | Auto | Auto + HTTP/3 |
| DDoS Protection | Basic | Enterprise-grade |
| Bandwidth | Metered | Unlimited (free tier) |
