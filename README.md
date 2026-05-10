# One4Health Website

Hybrid storefront for One4Health Ashwagandha Gummies. The customer experience is a React/Vite app, while Shopify provides theme hosting, cart, and checkout. Supabase provides dynamic product/content/order data, and Vercel can host lightweight API routes.

## Common Commands

```bash
npm ci
npm run dev
npm test -- --run
npm run build
npm run build:vercel
```

## Runtime Architecture

- `src/` contains the React storefront, cart context, pages, sections, and Supabase hooks.
- `layout/`, `templates/`, `sections/`, `config/`, and `locales/` contain the Shopify theme shell.
- `supabase/functions/` contains Edge Functions for Shopify order/contact sync.
- `api/` contains Vercel API routes, including the server-backed admin session endpoints.
- `assets/` is the Shopify theme asset output for the main production build.
- `public/images/` contains standalone/Vercel image assets used by the Vite app.

## Environment Variables

Frontend:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Admin API:

```bash
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

Supabase Edge Functions:

```bash
SHOPIFY_WEBHOOK_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_CLIENT_ID=
SHOPIFY_CLIENT_SECRET=
```

## Build Targets

`npm run build` is the Shopify build. It runs TypeScript, builds Vite into `assets/`, patches Shopify asset URLs, then verifies the theme-facing artifacts with `scripts/verify-shopify-build.mjs`.

`npm run build:vercel` is the standalone Vercel build. It skips Shopify post-processing and is intended for Vercel static output plus `/api` routes.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the implementation roadmap, completed hardening work, and remaining cleanup backlog.
