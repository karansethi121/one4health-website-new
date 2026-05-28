import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useSupabase';
export function HeroSection() {
  const { addToCart, loading: cartLoading } = useCart();
  const { products } = useProducts();
  const sectionRef = useRef<HTMLElement>(null);

  const handleAddToCart = () => {
    const product = products.find(p => p.id === 'ashwagandha-gummies-ksm66') || products[0];
    if (product) {
      addToCart(product.shopifyVariantId || product.id, 1, undefined, undefined, product.price, product.name);
    } else {
      // Products not yet loaded — navigate to product page to let Shopify handle it
      window.location.href = '/product/ashwagandha-gummies-ksm66';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-eyebrow', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1)
        .fromTo('.hero-line-1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.17)
        .fromTo('.hero-line-2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.24)
        .fromTo('.hero-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.4)
        .fromTo('.hero-pills', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.5)
        .fromTo('.hero-cta', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.58)
        .fromTo('.hero-trust', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.66)
        .fromTo('.hero-image', { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 1.1 }, 0.3)
        .to('.hero-image-inner', { y: -14, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 1.5);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#F7F1E3' }}
    >
      {/* Content grid */}
      <div className="relative z-10 lg:min-h-screen flex items-center">
        <div className="section-container w-full py-8 pt-6 lg:pt-36 lg:py-24">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center">

            {/* ── Left: Text ────────────────────────────────────────── */}
            <div className="order-2 lg:order-1 max-w-2xl">
              {/* Eyebrow */}
              <div className="hero-eyebrow mb-4 lg:mb-6">
                <span className="eyebrow">Ashwagandha that doesn't suck.</span>
              </div>

              {/* Headline */}
              <h1 className="text-balance mb-4 lg:mb-6 overflow-hidden" style={{ lineHeight: 1.0 }}>
                <span
                  className="hero-line-1 block"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    letterSpacing: '-0.035em',
                    fontSize: 'clamp(36px, 9vw, 96px)',
                    color: '#0A0A0A',
                  }}
                >
                  Calm in a chew.
                </span>
                <span
                  className="hero-line-2 block"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    letterSpacing: '-0.035em',
                    fontSize: 'clamp(36px, 9vw, 96px)',
                    color: '#0A0A0A',
                  }}
                >
                  Loud on the{' '}
                  <em
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      color: '#FF5A6B',
                    }}
                  >
                    feed.
                  </em>
                </span>
              </h1>

              {/* Subheadline — hidden on mobile to keep hero compact */}
              <p
                className="hero-sub hidden sm:block mb-5 lg:mb-7"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', lineHeight: 1.55, color: '#0A0A0A', opacity: 0.68, maxWidth: '440px' }}
              >
                KSM-66® Ashwagandha + Vitamin D2 + Black Pepper Extract.
                Strawberry flavour. No soil taste. Pinky promise.
              </p>

              {/* Benefit pills */}
              <div className="hero-pills flex flex-wrap gap-2 mb-6 lg:mb-8">
                {['Vegan', 'Sugar-free', '24+ clinical studies', 'Made in India'].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center px-3 py-1.5"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      background: 'rgba(10,10,10,0.06)',
                      borderRadius: '14px',
                      color: '#0A0A0A',
                      border: '1.5px solid rgba(10,10,10,0.12)',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* CTA Row */}
              <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-5 lg:mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className="btn-ink text-base flex items-center justify-center gap-2 group"
                >
                  {cartLoading ? 'Adding…' : (
                    <>
                      Buy Now · Save ₹199
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <Link
                  to="/product/ashwagandha-gummies-ksm66"
                  className="flex items-center justify-center px-8 py-4 rounded-pill border-2 border-ink text-ink font-semibold text-base transition-all duration-200 hover:bg-ink/5 min-h-[52px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  View Details
                </Link>
              </div>

              {/* Trust line */}
              <div className="hero-trust flex flex-wrap items-center gap-4 lg:gap-5">
                {[
                  { icon: '🔒', text: '15-day refund, no questions' },
                  { icon: '🚚', text: 'Free shipping on all orders' },
                ].map((t) => (
                  <div
                    key={t.text}
                    className="flex items-center gap-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#0A0A0A', opacity: 0.55 }}
                  >
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>

              <div className="sr-only" aria-hidden="true">
                <h2>One4Health™ — India's Premier Ashwagandha Gummies</h2>
                <p>
                  One4Health Ashwagandha Gummies use KSM-66®, the most clinically studied full-spectrum
                  ashwagandha root extract. Formulated with 300mg KSM-66, 400IU Vitamin D2, and 10mg
                  black pepper extract. Vegan, sugar-free, gelatin-free. ₹369 per jar. Made in India.
                </p>
              </div>
            </div>

            {/* ── Right: Product Image ──────────────────────────────── */}
            <div className="hero-image relative flex justify-center items-center order-1 lg:order-2 pt-4 lg:pt-0">
              {/* Symmetric padding so top-1/2 aligns with the image center */}
              <div className="relative w-full flex justify-center items-center py-6 lg:py-0">

                {/* Lime circle — centered on the image, not the padded container */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px]"
                  style={{ background: '#C7F25C', opacity: 0.9 }}
                  aria-hidden="true"
                />

                {/* Image + price badge as a single relative unit */}
                <div className="relative z-10 w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[460px] xl:max-w-[500px]">
                  <Link
                    to="/product/ashwagandha-gummies-ksm66"
                    className="block"
                    style={{ filter: 'drop-shadow(0 24px 48px rgba(15,61,46,0.22))' }}
                    aria-label="View Ashwagandha Gummies product page"
                  >
                    <img
                      className="hero-image-inner w-full h-auto object-contain"
                      src="/images/hero-v2.webp"
                      alt="One4Health™ Ashwagandha Gummies KSM-66 jar"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                      width={520}
                      height={520}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/hero-v2.png'; }}
                    />
                  </Link>

                  {/* Price badge anchored to the image, not the full section */}
                  <div
                    className="absolute -bottom-4 -right-4 sm:-bottom-2 sm:-right-2 z-20 animate-gentle-bounce"
                    style={{
                      background: '#FF5A6B',
                      border: '1.5px solid #0A0A0A',
                      borderRadius: '14px',
                      padding: '10px 16px',
                      boxShadow: '4px 4px 0 #0A0A0A',
                    }}
                  >
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', opacity: 0.8 }}>
                      Launch price
                    </div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '22px', color: '#fff', letterSpacing: '-0.03em' }}>
                      ₹369
                      <span style={{ fontSize: '14px', fontWeight: 400, textDecoration: 'line-through', opacity: 0.6, marginLeft: '6px' }}>₹449</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
