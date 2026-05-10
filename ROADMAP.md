# One4Health Website Roadmap

## Completed

- Replaced browser-visible admin password checks with server-backed `/api/admin/login`, `/api/admin/me`, and `/api/admin/logout` routes.
- Added signed, HTTP-only admin session cookies with logout clearing.
- Prevented admin dashboard Supabase content hooks from running until the admin session is authenticated.
- Centralized Ashwagandha product pricing in `src/lib/productPricing.ts`.
- Removed bundle pricing inference from `quantity === 2`; bundles now require explicit `_bundle` intent.
- Added regression tests for product pricing, cart bundle math, and admin auth API behavior.
- Added Shopify build verification after the existing post-build asset patch.

## Next

- Replace remaining loose `any` usage and old lint suppressions so `npm run lint` can be used as a clean gate.
- Audit Supabase row-level security policies for product, FAQ, testimonial, waitlist, customer, and order tables.
- Move admin content mutations behind authorized server routes before enabling edit/delete/create actions.
- Reduce duplicate image assets across `assets/`, `assets/images/`, and `public/images/`.
- Split the large storefront bundle when Shopify loading constraints are confirmed.
- Replace placeholder GTM/Bing verification values in `layout/theme.liquid`.
