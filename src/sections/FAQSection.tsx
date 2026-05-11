import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
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
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
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

  if (loading) return <LoadingState message="Loading FAQs..." />;

  const displayFaqs = faqs.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full section-padding overflow-hidden"
      style={{ background: '#F7F1E3' }}
    >
      <div className="section-container">
        {/* Title */}
        <div className="faq-title max-w-3xl mb-14 lg:mb-20">
          <span className="eyebrow mb-5 block">Common questions</span>
          <h2
            className="text-balance"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(36px, 5vw, 60px)',
              color: '#0A0A0A',
              lineHeight: 1.05,
            }}
          >
            You asked.{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              We answered.
            </em>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl space-y-3">
          {(!faqs || faqs.length === 0) ? (
            <div className="text-center py-10" style={{ color: '#0A0A0A', opacity: 0.4 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif" }}>No FAQs available at the moment.</p>
            </div>
          ) : (
            displayFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className="faq-item overflow-hidden"
                style={{
                  background: openIndex === index ? '#FBF7EC' : '#F7F1E3',
                  border: '1.5px solid #0A0A0A',
                  borderRadius: '28px',
                  ...(openIndex === index ? { boxShadow: '4px 4px 0 #0A0A0A' } : {}),
                  transition: 'background 0.2s, box-shadow 0.25s, transform 0.25s',
                  ...(openIndex === index ? { transform: 'translate(-2px, -2px)' } : {}),
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-7 py-6 flex items-center justify-between text-left"
                  aria-expanded={openIndex === index}
                >
                  <span
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(16px, 2vw, 19px)',
                      letterSpacing: '-0.02em',
                      color: '#0A0A0A',
                    }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 ml-4 w-9 h-9 flex items-center justify-center rounded-full border-2 border-ink transition-colors duration-200"
                    style={{
                      background: openIndex === index ? '#0A0A0A' : 'transparent',
                      color: openIndex === index ? '#C7F25C' : '#0A0A0A',
                    }}
                  >
                    {openIndex === index
                      ? <Minus className="w-4 h-4" />
                      : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0',
                    opacity: openIndex === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <div
                    className="px-7 pb-7"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      lineHeight: 1.65,
                      color: '#0A0A0A',
                      opacity: 0.65,
                      borderTop: '1.5px solid rgba(10,10,10,0.08)',
                      paddingTop: '16px',
                    }}
                  >
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
