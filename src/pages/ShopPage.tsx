import { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/ui/LoadingState';
import { useProducts } from '@/hooks/useSupabase';

export function ShopPage() {
  useSEO({
    title: 'Shop Ashwagandha Gummies Online',
    description: 'Browse and buy premium KSM-66® Ashwagandha Gummies by ONE4HEALTH. Sugar-free, 100% vegan, and formulated for stress relief and daily balance. Free shipping across India.',
    keywords: 'Shop ashwagandha gummies, buy ashwagandha gummies online, vegan stress gummies, KSM-66 gummies',
  });
  const { addToCart, loading: cartLoading } = useCart();
  const { products, loading: productsLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.subtitle.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  useEffect(() => {
    if (productsLoading || !products.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.shop-animate',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [productsLoading, products.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  if (productsLoading) return <LoadingState fullPage message="Fetching wellness essentials..." />;

  return (
    <main className="w-full pt-[72px] lg:pt-[84px] min-h-screen" style={{ background: '#F7F1E3' }}>
      
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="section-container section-padding">
        <div className="max-w-3xl">
          <span className="shop-animate eyebrow mb-6 block">Our Collection</span>
          <h1 
            className="shop-animate text-balance mb-8"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(44px, 7vw, 96px)',
              color: '#0A0A0A',
              lineHeight: 0.95,
            }}
          >
            The Shop.{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              Built for you.
            </em>
          </h1>
          <p 
            className="shop-animate"
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: '18px', 
              lineHeight: 1.6, 
              color: '#0A0A0A', 
              opacity: 0.65, 
              maxWidth: '500px' 
            }}
          >
            Clean, science-backed supplements designed for modern life. 
            No junk, no soil taste, just clinical results.
          </p>

          {/* Search Bar */}
          <div className="shop-animate mt-12 relative max-w-lg group">
            <div 
              className="relative flex items-center transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:shadow-hard"
              style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '20px' }}
            >
              <Search className="absolute left-5 w-5 h-5 text-ink/30 group-focus-within:text-ink transition-colors" />
              <input
                type="text"
                placeholder="Search ingredients or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-5 bg-transparent outline-none font-body text-ink placeholder:text-ink/30"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 rounded-full hover:bg-ink/5 transition-colors"
                >
                  <X className="w-4 h-4 text-ink/40" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Grid ─────────────────────────────────────────────── */}
      <section className="section-container pb-24">
        {(!filteredProducts.length) ? (
          <div 
            className="text-center py-24 px-10"
            style={{ background: '#FBF7EC', border: '1.5px dashed rgba(10,10,10,0.15)', borderRadius: '48px' }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: '#0A0A0A', opacity: 0.4 }}>
              No products found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const productSavings = p.originalPrice
                ? Math.round((p.originalPrice - p.price) / 100)
                : 0;
              
              return (
                <div
                  key={p.id}
                  className="shop-animate group relative flex flex-col p-6 hover-hard"
                  style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '40px' }}
                >
                  {/* Image */}
                  <Link to={`/product/${p.id}`} className="block relative mb-6 overflow-hidden">
                    <div className="relative h-44 sm:h-48 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={`${p.name} - KSM-66 Ashwagandha Gummies`}
                      className="h-full w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                      style={{ filter: 'drop-shadow(0 16px 32px rgba(15,61,46,0.12))' }}
                      loading="lazy"
                    /></div>
                    
                    {/* Badges */}
                    {p.badge && (
                      <span 
                        className="absolute top-0 left-0 px-3 py-1.5 rounded-pill"
                        style={{ background: '#0F3D2E', color: '#C7F25C', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}
                      >
                        {p.badge}
                      </span>
                    )}
                    {productSavings > 0 && (
                      <span 
                        className="absolute top-0 right-0 px-3 py-1.5 rounded-pill"
                        style={{ background: '#FF5A6B', color: '#fff', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}
                      >
                        Save ₹{productSavings}
                      </span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <div className="mb-5">
                      <h3
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 800,
                          fontSize: '22px',
                          color: '#0A0A0A',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.15,
                          marginBottom: '6px',
                        }}
                      >
                        {p.name}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#0A0A0A', opacity: 0.5 }}>
                        {p.subtitle}
                      </p>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-4">
                      <div className="flex flex-col">
                        <span 
                          style={{ 
                            fontFamily: "'JetBrains Mono', monospace", 
                            fontSize: '11px', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.12em', 
                            color: '#0A0A0A',
                            opacity: 0.3,
                            marginBottom: '4px'
                          }}
                        >
                          Price
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '24px', color: '#0F3D2E' }}>
                            {formatPrice(p.price)}
                          </span>
                          {p.originalPrice && (
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#0A0A0A', opacity: 0.25, textDecoration: 'line-through' }}>
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(p.shopifyVariantId || p.id, 1, undefined, undefined, p.price, p.name);
                        }}
                        disabled={cartLoading}
                        className="btn-ink px-6 py-3 text-xs"
                      >
                        {cartLoading ? '...' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom indicator */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-pill" style={{ border: '1.5px solid rgba(10,10,10,0.1)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#0F3D2E' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', opacity: 0.4 }}>
              More products dropping soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
