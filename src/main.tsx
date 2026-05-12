// Product Build v1.0.3 - Cache Bust

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { injectMockShopifyDataIfNeeded } from './data/mockShopifyData'

// Inject mock Shopify data for dev mode (no-op on live Shopify store)
injectMockShopifyDataIfNeeded();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
