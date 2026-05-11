import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useSupabase';

gsap.registerPlugin(ScrollTrigger);

// Static reviews — masonry wall of 6 cards
const reviews = [
  {
    handle: '@priya_wellness',
    day: 'Day 14',
    quote: "I actually forgot I was stressed. That's new.",
    bg: '#FBF7EC',
    size: 'large',
    tag: 'stress',
  },
  {
    handle: '@rahul.fit',
    day: 'Day 21',
    quote: 'The taste is lowkey good? Like I actually want to take it.',
    bg: '#F7F1E3',
    size: 'normal',
    tag: 'taste',
  },
  {
    handle: '@delhi_dev',
    day: 'Day 30',
    quote: "My 3am anxiety spiral has left the chat. Bas.",
    bg: '#FFD66B',
    size: 'normal',
    tag: 'sleep',
  },
  {
    handle: '@sneha_startup',
    day: 'Day 8',
    quote: "Not a magic pill — but my cortisol definitely got the memo.",
    bg: '#FBF7EC',
    size: 'normal',
    tag: 'stress',
  },
  {
    handle: '@mumbai_ux',
    day: 'Day 45',
    quote: "Ordered the second jar before finishing the first. That's the review.",
    bg: '#C7F25C',
    size: 'normal',
    tag: 'focus',
  },
  {
    handle: '@deepak_runs',
    day: 'Day 18',
    quote: "Better recovery. Less afternoon slump. Actually showing up to 7am meetings.",
    bg: '#F7F1E3',
    size: 'normal',
    tag: 'energy',
  },
];

export function CleanFormulaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart, loading: cartLoading } = useCart();
  const { products } = useProducts();

  const handleAddToCart = () => {
    const product = products.find(p => p.id === 'ashwagandha-gummies-ksm66') || products[0];
    if (product) {
      addToCart(product.shopifyVariantId || product.id, 1, undefined, undefined, product.price, product.name);
    } else {
      window.location.href = '/product/ashwagandha-gummies-ksm66';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reviews-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.review-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [heroReview, ...otherReviews] = reviews;

  return (
    <section
      ref={sectionRef}
      className="relative w-full section-padding overflow-hidden"
      style={{ background: '#FBF7EC' }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="reviews-title text-center mb-14 lg:mb-20">
          <span className="eyebrow mb-5 inline-flex">Real people. Real results.</span>
          <h2
            className="text-balance"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#0A0A0A',
              lineHeight: 1.05,
            }}
          >
            ★ 5.0 from{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              140 reviews.
            </em>
          </h2>
        </div>

        {/* Hero quote — full width */}
        <div
          className="review-card mb-5 p-8 lg:p-12"
          style={{
            background: '#0F3D2E',
            border: '1.5px solid #0A0A0A',
            borderRadius: '28px',
            boxShadow: '8px 8px 0 #0A0A0A',
            transform: 'translate(-4px, -4px)',
          }}
        >
          <blockquote
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              color: '#F7F1E3',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            "{heroReview.quote}"
          </blockquote>
          <div className="flex items-center gap-4">
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#C7F25C',
              }}
            >
              {heroReview.handle}
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#C7F25C',
                opacity: 0.5,
              }}
            >
              · {heroReview.day}
            </span>
            <span style={{ color: '#C7F25C', fontSize: '13px' }}>★★★★★</span>
          </div>
        </div>

        {/* Masonry grid — 3 columns on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherReviews.map((r) => (
            <div
              key={r.handle}
              className="review-card hover-hard p-6 lg:p-7"
              style={{
                background: r.bg,
                border: '1.5px solid #0A0A0A',
                borderRadius: '28px',
              }}
            >
              <blockquote
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(18px, 2.2vw, 22px)',
                  letterSpacing: '-0.01em',
                  color: '#0A0A0A',
                  lineHeight: 1.3,
                  marginBottom: '20px',
                }}
              >
                "{r.quote}"
              </blockquote>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#0A0A0A',
                    opacity: 0.5,
                  }}
                >
                  {r.handle}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#0A0A0A',
                    opacity: 0.35,
                    background: 'rgba(10,10,10,0.07)',
                    padding: '3px 8px',
                    borderRadius: '14px',
                  }}
                >
                  {r.day}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Deal CTA — Strawberry bg */}
        <div
          className="mt-10 p-8 lg:p-14 text-center"
          style={{
            background: '#FF5A6B',
            border: '1.5px solid #0A0A0A',
            borderRadius: '28px',
            boxShadow: '8px 8px 0 #0A0A0A',
            transform: 'translate(-4px, -4px)',
          }}
        >
          <span
            className="inline-block mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#fff',
              opacity: 0.7,
            }}
          >
            First jar
          </span>
          <h2
            className="mb-3"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: '#fff',
              lineHeight: 1.0,
            }}
          >
            ₹369.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '17px',
              color: '#fff',
              opacity: 0.85,
              maxWidth: '440px',
              margin: '0 auto 32px',
              lineHeight: 1.5,
            }}
          >
            Was ₹449. Ghost us if it doesn't work — 30-day refund, no questions asked. bas.
          </p>
          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className="btn-ink text-base"
          >
            {cartLoading ? 'Adding…' : 'Add to Cart — ₹369'}
          </button>
        </div>
      </div>
    </section>
  );
}
