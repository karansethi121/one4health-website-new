import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Leaf, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { 
    icon: Shield, 
    label: 'FSSAI Compliant',
    desc: 'Food Safety Certified'
  },
  { 
    icon: Award, 
    label: 'GMP Certified',
    desc: 'Pharmaceutical Quality'
  },
  { 
    icon: Leaf, 
    label: '100% Vegan',
    desc: 'Plant-Based Formula'
  },
  { 
    icon: Sparkles, 
    label: 'Made in India',
    desc: 'Proudly Indian'
  },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.social-title',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.trust-badge',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      className="relative w-full py-10 lg:py-14 bg-white overflow-hidden"
    >
      <div className="section-container">
        {/* Trust Badges */}
        <div className="text-center mb-6 lg:mb-8">
          <p className="social-title text-xs lg:text-sm font-medium text-charcoal-400 uppercase tracking-wider">
            Quality You Can Trust
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="trust-badge group flex flex-col items-center"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-sage-50 rounded-xl flex items-center justify-center mb-2 group-hover:bg-sage-100 transition-colors">
                <badge.icon className="w-6 h-6 lg:w-7 lg:h-7 text-sage-600" />
              </div>
              <span className="text-xs lg:text-sm font-medium text-charcoal-700 text-center">{badge.label}</span>
              <span className="text-xs text-charcoal-400 text-center">{badge.desc}</span>
            </div>
          ))}
        </div>

        {/* Launch Message */}
        <div className="mt-8 lg:mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-coral-50 text-coral-700 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">New Launch - Be a Founding Customer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
