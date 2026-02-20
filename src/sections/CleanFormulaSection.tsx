import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cleanPoints = [
  { text: 'No artificial dyes or colors', emoji: '🎨', why: 'Just natural berry flavor' },
  { text: 'No high-fructose corn syrup', emoji: '🌽', why: 'Sweetened naturally, not chemically' },
  { text: 'No artificial flavors', emoji: '🍓', why: 'Real fruit taste you can trust' },
  { text: 'Third-party tested', emoji: '✅', why: 'Every batch verified for purity' },
  { text: 'Vegan & gluten-free', emoji: '🌱', why: 'Inclusive wellness for everyone' },
];

export function CleanFormulaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.clean-title',
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
        '.clean-image',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.clean-point',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-sage-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage-100/50 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Title */}
        <div className="clean-title text-center mb-16">
          <span className="inline-block text-4xl mb-4">🌟</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-charcoal-900 leading-tight">
            No junk.{' '}
            <span className="relative inline-block">
              Just results.
              <svg className="absolute -bottom-2 left-0 w-full text-sage-600" viewBox="0 0 140 12" fill="none">
                <path d="M2 8C30 2 100 2 138 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-charcoal-500 mt-4 max-w-xl mx-auto">
            We believe clean ingredients matter. Here's what you'll never find in our gummies:
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="clean-image">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg">
              <img
                src="/images/clean_formula_gummies.webp"
                alt="Close-up of premium, natural berry flavored Ashwagandha gummies without artificial dyes"
                className="w-full h-80 lg:h-96 object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 right-6 bg-white rounded-2xl px-5 py-4 shadow-soft animate-gentle-bounce">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-xs text-charcoal-400">Certified</p>
                  <p className="font-bold text-charcoal-900">GMP Facility</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="space-y-3 mb-8">
              {cleanPoints.map((point) => (
                <div
                  key={point.text}
                  className="clean-point flex items-center gap-4 bg-white rounded-2xl p-4 hover-lift"
                >
                  <span className="text-2xl">{point.emoji}</span>
                  <div className="flex-1">
                    <p className="text-charcoal-900 font-medium">{point.text}</p>
                    <p className="text-sm text-charcoal-400">{point.why}</p>
                  </div>
                  <Check className="w-5 h-5 text-sage-600 flex-shrink-0" />
                </div>
              ))}
            </div>

            <Link
              to="/science"
              className="inline-flex items-center gap-2 text-sage-700 font-medium hover:gap-3 transition-all group"
            >
              See the full label
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
