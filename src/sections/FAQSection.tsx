import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useFAQs } from '@/hooks/useSupabase';
import { LoadingState } from '@/components/ui/LoadingState';

gsap.registerPlugin(ScrollTrigger);


export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { faqs, loading } = useFAQs();
  
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

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {displayFaqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="faq-item bg-white rounded-2xl mb-3 px-6 border-none shadow-soft-sm"
              >
                <AccordionTrigger className="text-left font-medium text-charcoal-900 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal-600 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
