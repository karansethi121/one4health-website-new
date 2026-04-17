import { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { LoadingState } from '@/components/ui/LoadingState';
import { useProducts } from '@/hooks/useSupabase';

gsap.registerPlugin(ScrollTrigger);

export function ShopPage() {
  useDocumentTitle('Shop Premium Ashwagandha Gummies');
  const { addToCart, loading: cartLoading } = useCart();
  const { products, loading: productsLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.subtitle.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Get the main ashwagandha product from Supabase
  const ashwagandhaProduct = useMemo(() => {
    return filteredProducts.find(p => p.id === 'ashwagandha-gummies-ksm66') || filteredProducts[0];
  }, [filteredProducts]);

  useEffect(() => {
    if (productsLoading || !products.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shop-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
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

  if (productsLoading) {
    return <LoadingState fullPage message="Fetching wellness essentials..." />;
  }

  if (!ashwagandhaProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-50/30 font-sans">
        <div className="text-center p-8 bg-white rounded-3xl shadow-soft-sm border border-sage-100">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Something went wrong</h2>
          <p className="text-charcoal-500 mb-6">We couldn't load our products. Please try again later.</p>
          <button onClick={() => window.location.reload()} className="btn-primary px-6 py-2">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const savings = ashwagandhaProduct.originalPrice 
    ? Math.round(((ashwagandhaProduct.originalPrice - ashwagandhaProduct.price) / ashwagandhaProduct.originalPrice) * 100)
    : 0;

  return (
    <main className="w-full pt-24 pb-16 min-h-screen bg-sage-50/30">
      {/* Hero */}
      <div ref={heroRef} className="section-container mb-16">
        <div className="text-center max-w-2xl mx-auto shop-animate">
          <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            Our Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal-900 mb-6 leading-tight">
            Shop One4Health™
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed">
            Clean, science-backed supplements designed for modern life.
            Formulated for maximum absorption and efficacy.
          </p>
        </div>

        {/* Search Bar */}
        <div className="shop-animate max-w-lg mx-auto mt-10 relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 group-focus-within:text-sage-600 transition-colors" />
            <input
              type="text"
              placeholder="Search products, ingredients, or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border border-sage-100 rounded-2xl shadow-soft-sm focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-300 transition-all text-charcoal-900 placeholder:text-charcoal-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-sage-50 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-charcoal-400" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-3 text-center">
              <p className="text-sm text-charcoal-500">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-container">
        {!filteredProducts.length ? (
          <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-sage-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-50 rounded-full mb-4">
              <Search className="w-8 h-8 text-sage-300" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">No products found</h3>
            <p className="text-charcoal-500 mb-6">We couldn't find any products matching "{searchQuery}".</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sage-600 font-semibold hover:text-sage-700 transition-colors"
            >
              Clear search and see all collection
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Main Product Card */}
            <div className="shop-animate md:col-span-2 lg:col-span-1 lg:col-start-2 group">
              <div className="bg-white rounded-[32px] overflow-hidden shadow-soft-sm hover:shadow-soft transition-all duration-500 transform hover:-translate-y-2 border border-charcoal-50/50">
                {/* Image Section */}
                <Link to={`/product/${ashwagandhaProduct.id}`} className="block relative overflow-hidden aspect-square bg-sage-50/50">
                  <div className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-110">
                    <img
                      src={ashwagandhaProduct.image}
                      alt={`One4Health™ ${ashwagandhaProduct.name}`}
                      className="w-full h-full object-contain drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/5 transition-colors duration-500" />

                  {ashwagandhaProduct.badge && (
                    <span className="absolute top-6 left-6 px-3 py-1.5 bg-sage-700 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      {ashwagandhaProduct.badge}
                    </span>
                  )}

                  {savings > 0 && (
                    <span className="absolute top-6 right-6 px-3 py-1.5 bg-amber-400 text-amber-950 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      Save {savings}%
                    </span>
                  )}
                </Link>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <Link to={`/product/${ashwagandhaProduct.id}`}>
                        <h3 className="text-2xl font-bold text-charcoal-900 mb-2 hover:text-sage-700 transition-colors tracking-tight">
                          {ashwagandhaProduct.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-medium text-charcoal-400">Flavor: Strawberry</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-charcoal-400 font-bold uppercase tracking-widest mb-1">Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-sage-700">
                          {formatPrice(ashwagandhaProduct.price)}
                        </span>
                        {ashwagandhaProduct.originalPrice && (
                          <span className="text-sm text-charcoal-300 line-through font-medium">
                            {formatPrice(ashwagandhaProduct.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button
                      onClick={() => {
                        console.log('[Shop] Clicking Add to Cart for:', ashwagandhaProduct.id);
                        // Pass explicit price and title to prevent resets
                        addToCart(
                          ashwagandhaProduct.shopifyVariantId || ashwagandhaProduct.id, 
                          1, 
                          undefined, 
                          undefined, 
                          ashwagandhaProduct.price, // already in Paise from useProducts()
                          ashwagandhaProduct.name
                        );
                      }}
                      disabled={cartLoading}
                      className="btn-primary py-4 text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center group/btn"
                    >
                      {cartLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                    <Link
                      to={`/product/${ashwagandhaProduct.id}`}
                      className="btn-secondary py-4 text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 group/link"
                    >
                      Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coming Soon */}
      <div className="mt-16 text-center">
        <p className="text-charcoal-500 mb-4">More products coming soon</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sm text-sage-700">
          <span className="w-2 h-2 bg-sage-700 rounded-full animate-pulse" />
          Subscribe for early access
        </div>
      </div>
    </main>
  );
}
