import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useFAQs } from '@/hooks/useSupabase';
import { LoadingState } from '@/components/ui/LoadingState';

gsap.registerPlugin(ScrollTrigger);


export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { faqs, loading } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number>(-1);
  
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-title',
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
        '.faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
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
  }, [loading]);

  if (loading) {
    return <LoadingState message="Loading FAQs..." />;
  }

  // Get top 6 FAQs for homepage
  const displayFaqs = faqs.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full section-padding bg-sage-50 overflow-hidden"
    >
      <div className="section-container">
        {/* Title */}
        <div className="faq-title text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-4xl mb-6">❓</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-charcoal-500">
            Everything you need to know about One4Health™.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-2xl mx-auto space-y-4">
          {(!faqs || faqs.length === 0) ? (
            <div className="text-center py-10 bg-white/50 rounded-3xl border border-sage-100">
               <p className="text-charcoal-400 italic">No FAQs available at the moment.</p>
            </div>
          ) : (
            displayFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className="faq-item bg-white/80 backdrop-blur-sm border border-sage-100 rounded-3xl overflow-hidden shadow-soft-sm hover:shadow-soft transition-all duration-500"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-base lg:text-lg font-bold transition-colors duration-300 ${openIndex === index ? 'text-sage-700' : 'text-charcoal-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-sage-700 text-white rotate-180' : 'bg-sage-50 text-sage-600 group-hover:bg-sage-100'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-6 text-charcoal-600 leading-relaxed text-sm lg:text-base border-t border-sage-50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
