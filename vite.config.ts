import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// Post-build plugin: clean up files that are invalid in Shopify's assets folder
// and ensure bundle.css is always in sync with the generated index.css
function shopifyAssetCleanup() {
  return {
    name: 'shopify-asset-cleanup',
    closeBundle() {
      const assetsDir = path.resolve(__dirname, 'assets')

      // Remove index.html — Shopify doesn't allow HTML files in assets/
      const htmlFile = path.join(assetsDir, 'index.html')
      if (fs.existsSync(htmlFile)) {
        fs.unlinkSync(htmlFile)
        console.log('🗑  Removed assets/index.html (not valid in Shopify)')
      }

      // Copy index.css → bundle.css (theme.liquid loads bundle.css)
      const indexCss = path.join(assetsDir, 'index.css')
      const bundleCss = path.join(assetsDir, 'bundle.css')
      if (fs.existsSync(indexCss)) {
        fs.copyFileSync(indexCss, bundleCss)
        fs.unlinkSync(indexCss)
        console.log('✅ Copied assets/index.css → assets/bundle.css')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), shopifyAssetCleanup()],
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
});
