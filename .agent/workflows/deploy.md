---
description: Build, commit, and push changes to Shopify production
---
This workflow automates the process of building the React assets, patching them for Shopify, and pushing them to the production branch.

1. Ensure all source changes are saved.
2. Run the build and patch process:
// turbo
```bash
npm run build
```
3. Stage all changes (including built assets):
// turbo
```bash
git add .
```
4. Commit the changes:
// turbo
```bash
git commit -m "deploy: update live site"
```
5. Push to the production branch:
// turbo
```bash
git push origin shopify-production
```

After these steps, Shopify will automatically detect the changes in the `shopify-production` branch and update the live theme.
