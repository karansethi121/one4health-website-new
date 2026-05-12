import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { CartProvider } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/layout/Navigation';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { StickyAddToCart } from '@/components/cart/StickyAddToCart';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/layout/ScrollToTop';
import './App.css';

// HomePage loads eagerly — it's the entry point
import { HomePage } from '@/pages/HomePage';

// All other pages are lazy-loaded — only downloaded when visited
const ShopPage       = lazy(() => import('@/pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProductPage    = lazy(() => import('@/pages/ProductPage').then(m => ({ default: m.ProductPage })));
const AboutPage      = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SciencePage    = lazy(() => import('@/pages/SciencePage').then(m => ({ default: m.SciencePage })));
const FAQPage        = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ShippingPage   = lazy(() => import('@/pages/ShippingPage').then(m => ({ default: m.ShippingPage })));
const ContactPage    = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage    = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage      = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage').then(m => ({ default: m.ComingSoonPage })));
const AdminPage      = lazy(() => import('@/pages/AdminPage').then(m => ({ default: m.AdminPage })));
const AccountPage    = lazy(() => import('@/pages/AccountPage').then(m => ({ default: m.AccountPage })));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" style={{ background: '#F7F1E3' }}>
      <div className="w-6 h-6 rounded-full border-2 border-forest border-t-transparent animate-spin" />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const isComingSoon = location.pathname === '/coming-soon';

  useEffect(() => {
    if (searchParams.get('contact_posted') === 'true') {
      toast({
        title: 'Message Sent!',
        description: 'Thanks for reaching out! We\'ll get back to you soon.',
      });
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, toast]);

  const isAdminPage = location.pathname.startsWith('/admin');
  const hideLayout = isComingSoon || isAdminPage;

  return (
    <div className="min-h-screen" style={{ background: '#F7F1E3' }}>
      {!hideLayout && <Navigation />}
      {!hideLayout && <CartDrawer />}

      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/home"           element={<HomePage />} />
            <Route path="/shop"           element={<ShopPage />} />
            <Route path="/product/:id"    element={<ProductPage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/science"        element={<SciencePage />} />
            <Route path="/faq"            element={<FAQPage />} />
            <Route path="/shipping"       element={<ShippingPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/privacy"        element={<PrivacyPage />} />
            <Route path="/terms"          element={<TermsPage />} />
            <Route path="/coming-soon"    element={<ComingSoonPage />} />
            <Route path="/account"        element={<AccountPage />} />
            <Route path="/admin/*"        element={<AdminPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {!hideLayout && <Footer />}
      <Toaster position="bottom-right" />
      {!hideLayout && <StickyAddToCart />}
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
