import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
  { label: 'Shop', href: '/shop' },
  { label: 'Science', href: '/science' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Our Story', href: '/about' },
];

export function Navigation() {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle hash anchor links (e.g. /#reviews)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.slice(2);
      if (location.pathname !== '/') {
        window.location.href = href;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-xl shadow-[0_1px_0_#0A0A0A]'
            : 'bg-cream'
        } border-b border-ink`}
        style={{ borderBottomWidth: '1.5px' }}
      >
        <nav className="section-container">
          <div className="flex items-center justify-between h-[72px] lg:h-[84px]">

            <Link
              to="/"
              className="flex items-center group flex-shrink-0"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img
                src="/images/logo_nav.webp"
                alt="One4Health"
                className="h-14 lg:h-16 w-auto object-contain transition-opacity group-hover:opacity-80"
                draggable={false}
              />
            </Link>

            {/* ── Desktop Nav ───────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-0.5 border border-ink/20 rounded-pill px-1 py-1 transition-colors duration-200 hover:border-ink/50 hover:bg-ink/[0.03]">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2 rounded-pill text-sm font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-ink text-cream'
                      : 'text-ink hover:bg-ink/8'
                  }`}
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* ── Right Actions ──────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              {/* Account */}
              <Link
                to="/account"
                className="p-2.5 rounded-full hover:bg-ink/8 transition-colors"
                aria-label="My orders"
              >
                <User className="w-5 h-5 text-ink" />
              </Link>

              {/* Cart pill — "Cart · ₹369" */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 bg-lime text-forest rounded-pill px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-hard-sm"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", border: '1.5px solid #0A0A0A' }}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-cream"
                    style={{ background: '#FF5A6B', color: '#fff' }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full hover:bg-ink/8 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen
                  ? <X className="w-5 h-5 text-ink" />
                  : <Menu className="w-5 h-5 text-ink" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu ───────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-250 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-[calc(72px+1.5px)] left-0 right-0 bg-cream border-b-2 border-ink transition-transform duration-250 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="section-container py-5">
            <div className="flex flex-col gap-2">
              <div className="px-5 mb-4">
                <img
                  src="/images/logo_nav.webp"
                  alt="One4Health"
                  className="h-14 lg:h-16 w-auto object-contain"
                />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-5 py-4 rounded-card text-base font-semibold transition-all min-h-[52px] flex items-center ${
                    isActive(item.href)
                      ? 'bg-ink text-cream'
                      : 'text-ink hover:bg-ink/8'
                  }`}
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-ink/10 my-1" />
              <Link
                to="/product/ashwagandha-gummies-ksm66"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ink justify-center text-base"
              >
                Shop Now · ₹369
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
