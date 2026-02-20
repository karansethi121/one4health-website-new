import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
  { label: 'Shop', href: '/shop' },
  { label: 'Science', href: '/science' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.slice(1);
    }
    return location.pathname === href;
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft'
          : 'bg-transparent'
          }`}
      >
        <nav className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-24">
            {/* Logo - transparent, no background */}
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo_cropped.webp"
                alt="One4Health"
                className="h-20 lg:h-24 w-auto object-contain logo-main"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-2 py-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('/#')) {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }
                  }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive(item.href)
                    ? 'bg-sage-700 text-white'
                    : 'text-charcoal-600 hover:bg-sage-100 hover:text-sage-700'
                    }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-3 rounded-full bg-white/50 backdrop-blur-sm hover:bg-sage-100 transition-all duration-300 hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 text-charcoal-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pop">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Shop Now Button - Desktop */}
              <Link
                to="/product/ashwagandha-gummies-ksm66"
                className="hidden lg:inline-flex bg-sage-700 hover:bg-sage-800 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm"
              >
                Shop Now
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-full bg-white/50 backdrop-blur-sm hover:bg-sage-100 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-charcoal-700" />
                ) : (
                  <Menu className="w-5 h-5 text-charcoal-700" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="section-container py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.href.startsWith('/#')) {
                      setTimeout(() => scrollToSection(item.href), 100);
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all min-h-[48px] flex items-center ${isActive(item.href)
                    ? 'bg-sage-700 text-white'
                    : 'text-charcoal-700 hover:bg-sage-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-charcoal-100 my-2" />
              <Link
                to="/product/ashwagandha-gummies-ksm66"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-sage-700 hover:bg-sage-800 text-white font-semibold px-4 py-3 rounded-xl text-center transition-all min-h-[48px] flex items-center justify-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
