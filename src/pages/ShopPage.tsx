import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export function ShopPage() {
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);

  // Get dynamic Shopify product data
  const shopifyProduct = window.ShopifyData?.all_products?.["ashwagandha-gummies-ksm66"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shop-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  const currentVariant = useMemo(() => {
    if (!shopifyProduct) return null;
    return shopifyProduct.variants[0];
  }, [shopifyProduct]);

  if (!shopifyProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal-500 animate-pulse">Loading products...</p>
      </div>
    );
  }

  const originalPrice = currentVariant?.compare_at_price || currentVariant?.price * 1.25;
  const savings = Math.round(((originalPrice - currentVariant.price) / originalPrice) * 100);

  return (
    <main className="w-full pt-24 pb-16">
      {/* Hero */}
      <div ref={heroRef} className="section-container mb-16">
        <div className="text-center max-w-2xl mx-auto shop-animate">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Shop One4Health
          </h1>
          <p className="text-lg text-charcoal-600">
            Clean, science-backed supplements designed for modern life.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Product Card */}
          <div className="shop-animate md:col-span-2 lg:col-span-1 lg:col-start-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft transition-shadow duration-300">
              {/* Image */}
              <Link to="/product/ashwagandha-gummies-ksm66" className="block relative">
                <img
                  src={shopifyProduct.featured_image || "/images/product_transparent.png"}
                  alt={shopifyProduct.title}
                  className="w-full aspect-square object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-sage-700 text-white rounded-full text-sm font-medium">
                  {shopifyProduct.type || 'New Launch'}
                </span>
                {savings > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    Save {savings}%
                  </span>
                )}
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-charcoal-500">2,847 reviews</span>
                </div>

                {/* Title */}
                <Link to="/product/ashwagandha-gummies-ksm66">
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-1 hover:text-sage-700 transition-colors">
                    {shopifyProduct.title}
                  </h3>
                </Link>
                <p className="text-sm text-charcoal-500 mb-4">Flavor: Mixed Berry</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-sage-700">
                    {formatPrice(currentVariant.price)}
                  </span>
                  {originalPrice && (
                    <span className="text-lg text-charcoal-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 text-xs text-charcoal-600">
                    <Check className="w-3.5 h-3.5 text-sage-700" />
                    Vegan
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-charcoal-600">
                    <Check className="w-3.5 h-3.5 text-sage-700" />
                    Sugar-Free
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-charcoal-600">
                    <Check className="w-3.5 h-3.5 text-sage-700" />
                    KSM-66®
                  </span>
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <button
                    onClick={() => addToCart(currentVariant.id)}
                    className="w-full btn-primary py-3"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to="/product/ashwagandha-gummies-ksm66"
                    className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center">
          <p className="text-charcoal-500 mb-4">More products coming soon</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sm text-sage-700">
            <span className="w-2 h-2 bg-sage-700 rounded-full animate-pulse" />
            Subscribe for early access
          </div>
        </div>
      </div>
    </main>
  );
}
