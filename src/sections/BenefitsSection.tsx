import { useEffect, useRef } from 'react';
import { Moon, Heart, Beaker } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Heart,
    title: 'Relax without drowsiness',
    description: 'Feel calm and centered throughout your day',
    color: 'bg-coral-100 text-coral-600',
    emoji: '💆',
  },
  {
    icon: Moon,
    title: 'Sleep better',
    description: 'Wake up refreshed and ready to go',
    color: 'bg-lavender-100 text-lavender-600',
    emoji: '😴',
  },
  {
    icon: Beaker,
    title: 'Clinically studied',
    description: 'KSM-66® Ashwagandha, the gold standard',
    color: 'bg-sage-100 text-sage-700',
    emoji: '🔬',
  },
];

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.benefits-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.benefit-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-100/50 rounded-full blur-3xl -translate-y-1/2" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="benefits-title text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-4xl mb-4">✨</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-4">
            Stress relief you can{' '}
            <span className="relative inline-block">
              taste
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" fill="none">
                <path d="M2 8C20 3 50 3 98 8" stroke="#7A9B6A" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-charcoal-500">
            Our delicious mixed berry-flavored gummies make wellness something you look forward to.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="benefit-card group bg-white rounded-3xl p-8 hover-lift cursor-default"
            >
              <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{benefit.emoji}</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-charcoal-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
