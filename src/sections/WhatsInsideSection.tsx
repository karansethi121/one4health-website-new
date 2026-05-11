import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    num: '01',
    name: 'KSM-66® Ashwagandha',
    amount: '300mg',
    desc: 'Full-spectrum root extract. Clinically studied. Supports stress response and calm.',
    highlight: '22+ clinical trials',
  },
  {
    num: '02',
    name: 'Vitamin D2',
    amount: '400 IU',
    desc: 'Supports mood balance and healthy immune function — essential for India\'s indoor workforce.',
    highlight: 'Vegan-sourced',
  },
  {
    num: '03',
    name: 'Black Pepper Extract',
    amount: '10mg',
    desc: 'Increases nutrient absorption by up to 30%. The reason the KSM-66 actually hits.',
    highlight: 'Bioavailability booster',
  },
];

export function WhatsInsideSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.inside-title',
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
        '.inside-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.inside-image',
        { x: 50, opacity: 0, scale: 0.94 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.to('.inside-img', {
        y: -14,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full section-padding overflow-hidden"
      style={{ background: '#FBF7EC' }}
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left — Ingredient cards */}
          <div className="order-2 lg:order-1">
            <div className="inside-title mb-10">
              <span className="eyebrow mb-5 block">What's inside</span>
              <h2
                className="text-balance"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  color: '#0A0A0A',
                  lineHeight: 1.05,
                }}
              >
                Three ingredients.{' '}
                <em
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    color: '#0F3D2E',
                  }}
                >
                  All chosen.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '16px',
                  color: '#0A0A0A',
                  opacity: 0.55,
                  marginTop: '12px',
                  maxWidth: '380px',
                  lineHeight: 1.55,
                }}
              >
                No fillers. No compromises. Every ingredient earns its place.
              </p>
            </div>

            <div className="space-y-4">
              {ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="inside-card hover-hard p-6 lg:p-7"
                  style={{
                    background: '#F7F1E3',
                    border: '1.5px solid #0A0A0A',
                    borderRadius: '28px',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-baseline gap-3">
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          color: '#0A0A0A',
                          opacity: 0.35,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {ing.num}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 700,
                          fontSize: '17px',
                          letterSpacing: '-0.02em',
                          color: '#0A0A0A',
                        }}
                      >
                        {ing.name}
                      </h3>
                    </div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0F3D2E',
                        background: '#C7F25C',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1.5px solid #0A0A0A',
                        flexShrink: 0,
                      }}
                    >
                      {ing.amount}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      color: '#0A0A0A',
                      opacity: 0.6,
                      lineHeight: 1.55,
                      marginBottom: '10px',
                    }}
                  >
                    {ing.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#0F3D2E',
                      opacity: 0.7,
                    }}
                  >
                    ↗ {ing.highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#0A0A0A',
                  opacity: 0.35,
                }}
              >
                †Clinical studies on KSM-66® Ashwagandha. Individual results may vary.
              </p>
            </div>

            <Link
              to="/science"
              className="inline-flex items-center gap-2 mt-6 group"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                color: '#0F3D2E',
              }}
            >
              See the full supplement facts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right — Product image */}
          <div className="inside-image order-1 lg:order-2 flex justify-center w-full">
            <div className="relative w-full max-w-[260px] sm:max-w-xs lg:max-w-sm xl:max-w-md mx-auto py-8">
              {/* Lime circle bg */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ width: '260px', height: '260px', background: '#C7F25C', opacity: 0.25 }}
                aria-hidden="true"
              />
              <img
                className="inside-img relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                src="/images/whats-inside-gummies.png"
                alt="One4Health™ gummies — strawberry flavour, no sugar"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
