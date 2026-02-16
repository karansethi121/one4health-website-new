import { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  {
    feature: 'KSM-66® Full Spectrum',
    one4health: true,
    generic: false,
    capsules: false,
  },
  {
    feature: '24+ Clinical Studies',
    one4health: true,
    generic: false,
    capsules: 'partial',
  },
  {
    feature: 'BioPerine® Enhanced',
    one4health: true,
    generic: false,
    capsules: false,
  },
  {
    feature: 'Sugar-Free',
    one4health: true,
    generic: 'partial',
    capsules: true,
  },
  {
    feature: 'Vitamin D2 (Vegan)',
    one4health: true,
    generic: false,
    capsules: false,
  },
  {
    feature: 'Great Taste',
    one4health: true,
    generic: 'partial',
    capsules: false,
  },
];

function CheckIcon({ status }: { status: boolean | string }) {
  if (status === true) {
    return <Check className="w-5 h-5 text-sage-600" />;
  } else if (status === 'partial') {
    return <span className="text-sm text-charcoal-400">Sometimes</span>;
  }
  return <X className="w-5 h-5 text-charcoal-300" />;
}

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.compare-title',
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
        '.compare-table',
        { y: 40, opacity: 0 },
        {
          y: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="section-container">
        {/* Title */}
        <div className="compare-title text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-4xl mb-4">⚖️</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-4">
            One4Health vs. Others
          </h2>
          <p className="text-lg text-charcoal-500">
            See why our formula stands out from the crowd.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="compare-table overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto">
            <thead>
              <tr className="border-b-2 border-sage-200">
                <th className="text-left py-4 px-4 font-semibold text-charcoal-900">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-sage-700 bg-sage-50 rounded-t-xl">
                  One4Health
                </th>
                <th className="text-center py-4 px-4 font-semibold text-charcoal-600">
                  Generic Ashwagandha
                </th>
                <th className="text-center py-4 px-4 font-semibold text-charcoal-600">
                  Capsule Competitors
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-sage-100">
                  <td className="py-4 px-4 text-charcoal-700 font-medium">{row.feature}</td>
                  <td className="py-4 px-4 text-center bg-sage-50/50">
                    <div className="flex justify-center">
                      <CheckIcon status={row.one4health} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <CheckIcon status={row.generic} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <CheckIcon status={row.capsules} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-charcoal-400 mt-8">
          Based on publicly available product information. Last updated January 2026.
        </p>
      </div>
    </section>
  );
}
