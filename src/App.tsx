import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
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
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-sage-50">
          {/* Grain Overlay */}
          <div className="grain-overlay" />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Cart Drawer */}
          <CartDrawer />
          
          {/* Main Content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
