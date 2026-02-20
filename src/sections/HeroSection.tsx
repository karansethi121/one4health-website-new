import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, Leaf, Zap, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';

export function HeroSection() {
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      )
        .fromTo(
          '.hero-title span',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.3
        )
        .fromTo(
          '.hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.6
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.7
        )
        .fromTo(
          '.hero-image',
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9 },
          0.4
        )
        .fromTo(
          '.hero-float',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          0.8
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-sage-50/50" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-48 h-48 lg:w-64 lg:h-64 bg-sage-100/40 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-5 w-32 h-32 lg:w-48 lg:h-48 bg-sage-200/20 rounded-full blur-3xl animate-pulse-soft" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="section-container w-full py-12 lg:py-16 pt-12 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="max-w-xl order-2 lg:order-1">
              {/* Launch Badge */}
              <div className="hero-badge flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest border border-sage-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  New Launch Special
                </span>
              </div>

              {/* Headline */}
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-charcoal-900 leading-[1.05] mb-6">
                <span className="inline-block">Stay</span>{' '}
                <span className="inline-block text-sage-700">calm.</span>
                <br />
                <span className="inline-block">Stay</span>{' '}
                <span className="inline-block text-sage-700">sharp.</span>
              </h1>

              {/* Subheadline */}
              <p className="hero-desc text-base lg:text-lg text-charcoal-600 leading-relaxed mb-6">
                Clinically studied KSM-66® Ashwagandha with Vitamin D2 & BioPerine®
                for daily stress support and relaxation.
              </p>

              {/* Benefit pills */}
              <div className="hero-badge flex flex-wrap gap-2 mb-8">
                <span className="inline-flex items-center gap-1.5 text-sm text-charcoal-600 bg-white/80 px-3 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5 text-sage-600" />
                  Supports stress response
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-charcoal-600 bg-white/80 px-3 py-1.5 rounded-full">
                  <Leaf className="w-3.5 h-3.5 text-sage-600" />
                  No added sugar & vegan
                </span>
              </div>

              {/* Primary CTA */}
              <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-5">
                <button
                  onClick={() => {
                    const shopifyProduct = window.ShopifyData?.all_products?.["ashwagandha-gummies-ksm66"];
                    const variantId = shopifyProduct?.variants?.[0]?.id;
                    if (variantId) {
                      addToCart(variantId, 1);
                    } else {
                      // Fallback to navigating if data isn't loaded yet
                      window.location.href = "/product/ashwagandha-gummies-ksm66";
                    }
                  }}
                  className="bg-sage-700 hover:bg-sage-800 text-white font-semibold px-6 lg:px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group text-base min-h-[56px]"
                >
                  Buy Now | Save 30%
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/science"
                  className="bg-white border-2 border-charcoal-200 text-charcoal-900 font-semibold px-6 lg:px-8 py-4 rounded-full hover:border-sage-300 hover:bg-sage-50 transition-all flex items-center justify-center min-h-[56px]"
                >
                  See the Science
                </Link>
              </div>

              {/* Money back guarantee & ISO */}
              <div className="hero-float flex flex-wrap items-center gap-4 lg:gap-6 text-xs lg:text-sm text-charcoal-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sage-600" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
              </div>

              {/* FDA Disclaimer */}
              <p className="hero-float mt-4 text-[10px] text-charcoal-400 leading-relaxed max-w-sm">
                *These statements have not been evaluated by the Food and Drug Administration or FSSAI.
                This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>

            </div>

            {/* Right - Product Image */}
            <div className="hero-image relative flex justify-center items-center order-1 lg:order-2">
              <div className="relative">
                {/* Main product image - transparent PNG */}
                <div className="relative z-10">
                  <img
                    src="/images/product_transparent.webp"
                    alt="One4Health Ashwagandha Gummies bottle containing 30-day supply of KSM-66 clinical grade gummies"
                    className="w-80 sm:w-96 lg:w-[32rem] xl:w-[38rem] h-auto drop-shadow-2xl"
                    loading="eager"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
