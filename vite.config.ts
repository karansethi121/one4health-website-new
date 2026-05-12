import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// Post-build plugin: clean up files that are invalid in Shopify's assets folder
// and ensure bundle.css/bundle.js are optimized for the Shopify environment
function shopifyAssetCleanup() {
  return {
    name: 'shopify-asset-cleanup',
    closeBundle() {
      const assetsDir = path.resolve(__dirname, 'assets')

      // 1. Remove index.html — Shopify doesn't allow HTML files in assets/
      const htmlFile = path.join(assetsDir, 'index.html')
      if (fs.existsSync(htmlFile)) {
        fs.unlinkSync(htmlFile)
        console.log('🗑  Removed assets/index.html (not valid in Shopify)')
      }

      // 2. Copy index.css → bundle.css (theme.liquid loads bundle.css)
      const indexCss = path.join(assetsDir, 'index.css')
      const bundleCss = path.join(assetsDir, 'bundle.css')
      if (fs.existsSync(indexCss)) {
        fs.copyFileSync(indexCss, bundleCss)
        fs.unlinkSync(indexCss)
        console.log('✅ Copied assets/index.css → assets/bundle.css')
      }

      // 3. Post-build string replacements (replacing logic from final_fix.py)
      const bundleJs = path.join(assetsDir, 'bundle.js')
      if (fs.existsSync(bundleJs)) {
        let content = fs.readFileSync(bundleJs, 'utf-8')
        const replacements = {
          'window.ShopifyAssetsUrl + ': '(window.ShopifyAssetsUrl||"/images/") + ',
          '300mg KSM-66® per day': 'Daily serving',
          '24+ studies on KSM-66® efficacy.': '24+ clinical studies on efficacy.',
          '300 mg': 'Daily serving',
        }

        let modified = false
        for (const [old, replacement] of Object.entries(replacements)) {
          if (content.includes(old)) {
            content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement)
            modified = true
          }
        }

        if (modified) {
          fs.writeFileSync(bundleJs, content)
          console.log('✨ Applied post-build string replacements in assets/bundle.js')
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : './',
  plugins: [
    inspectAttr(), 
    react(), 
    !process.env.VERCEL && shopifyAssetCleanup()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'assets',
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    emptyOutDir: false,
  },
  // @ts-ignore - vitest types are not picked up by vite script but work at runtime
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
