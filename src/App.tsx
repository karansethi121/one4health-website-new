import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { CartProvider } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/layout/Navigation';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { LoadingState } from '@/components/ui/LoadingState';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/layout/ScrollToTop';
import './App.css';

// Eagerly loaded — these are the primary landing pages
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';

// Lazy loaded — secondary pages that are rarely visited on first load
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SciencePage = lazy(() => import('@/pages/SciencePage').then(m => ({ default: m.SciencePage })));
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ShippingPage = lazy(() => import('@/pages/ShippingPage').then(m => ({ default: m.ShippingPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage').then(m => ({ default: m.ComingSoonPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then(m => ({ default: m.AdminPage })));

function AppContent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const isComingSoon = location.pathname === '/coming-soon';

  useEffect(() => {
    if (searchParams.get('contact_posted') === 'true') {
      toast({
        title: 'Message Sent!',
        description: 'Thanks for reaching out! We will get back to you soon.',
      });
      // Clean up URL so refresh doesn't re-trigger toast
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, toast]);
  const isAdminPage = location.pathname.startsWith('/admin');
  const hideLayout = isComingSoon || isAdminPage;

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation - Hidden on special pages */}
      {!hideLayout && <Navigation />}

      {/* Cart Drawer */}
      {!hideLayout && <CartDrawer />}

      {/* Main Content */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingState message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {/* Footer - Hidden on special pages */}
      {!hideLayout && <Footer />}

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
