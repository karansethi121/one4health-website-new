import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Navigation } from '@/components/layout/Navigation';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { AboutPage } from '@/pages/AboutPage';
import { SciencePage } from '@/pages/SciencePage';
import { FAQPage } from '@/pages/FAQPage';
import { ShippingPage } from '@/pages/ShippingPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';
import { AdminPage } from '@/pages/AdminPage';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/layout/ScrollToTop';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isComingSoon = location.pathname === '/coming-soon';
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
