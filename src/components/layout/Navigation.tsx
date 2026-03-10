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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft py-0'
          : 'bg-transparent py-1 lg:py-2'
          }`}
      >
        <nav className="w-full px-2 sm:px-4 lg:px-8 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group -ml-2 lg:-ml-6">
              <img
                src="/images/logo_cropped.webp"
                alt="One4Health™"
                className="h-20 lg:h-32 w-auto object-contain transition-transform duration-500 hover:scale-110 scale-100 origin-left"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md border border-white/40 rounded-full px-1.5 py-1 shadow-soft-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative px-5 py-2 text-[13px] font-bold uppercase tracking-widest rounded-full transition-all duration-500 ${isActive(item.href)
                    ? 'bg-sage-700 text-white shadow-md'
                    : 'text-charcoal-700 hover:bg-white/80 hover:text-sage-700'
                    }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-3 rounded-full bg-white/60 backdrop-blur-md border border-white/40 hover:bg-white/80 transition-all duration-500 hover:scale-110 shadow-soft-sm group"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 text-charcoal-900 group-hover:text-sage-700 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sage-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Shop Now Button - Desktop */}
              <Link
                to="/shop"
                className="hidden md:inline-flex bg-charcoal-900 hover:bg-sage-700 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-7 py-4 rounded-full transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop All
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-full bg-white/60 backdrop-blur-md border border-white/40 hover:bg-white/80 transition-all duration-300 flex items-center justify-center"
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
