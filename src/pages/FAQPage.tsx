import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useFAQs } from '@/hooks/useSupabase';
import { LoadingState } from '@/components/ui/LoadingState';
import { useSEOMeta } from '@/hooks/useSEOMeta';

export function FAQPage() {
  useSEOMeta({
    title: 'Frequently Asked Questions — One4Health™ Ashwagandha',
    description: 'Answers to common questions about One4Health™ Ashwagandha gummies: dosage, safety, results timeline, vegan certifications, shipping, and the 15-day refund guarantee.',
    canonical: 'https://one4health.com/faq',
  });
  const { faqs, loading } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number>(-1);

  if (loading) return <LoadingState message="Loading FAQs..." />;

  return (
    <main className="w-full pt-[72px] lg:pt-[84px]" style={{ background: '#F7F1E3' }}>
      <div className="section-container section-padding">

        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <span className="eyebrow mb-5 block">Got questions?</span>
          <h1
            className="text-balance"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: '#0A0A0A',
              lineHeight: 1.0,
              maxWidth: '800px',
            }}
          >
            Ashwagandha Gummies:{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              answered.
            </em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '17px', color: '#0A0A0A', opacity: 0.55, marginTop: '16px', maxWidth: '500px', lineHeight: 1.55 }}>
            Everything you need to know before you buy. No wellness buzzwords, just straight answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl space-y-3">
          {(!faqs || faqs.length === 0) ? (
            <div className="text-center py-16">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#0A0A0A', opacity: 0.4 }}>No FAQs available right now.</p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden"
                style={{
                  background: openIndex === index ? '#FBF7EC' : '#F7F1E3',
                  border: '1.5px solid #0A0A0A',
                  borderRadius: '28px',
                  boxShadow: openIndex === index ? '4px 4px 0 #0A0A0A' : undefined,
                  transform: openIndex === index ? 'translate(-2px, -2px)' : undefined,
                  transition: 'background 0.2s, box-shadow 0.25s, transform 0.25s',
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-7 py-6 flex items-center justify-between text-left"
                  aria-expanded={openIndex === index}
                >
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 2vw, 19px)', letterSpacing: '-0.02em', color: '#0A0A0A', paddingRight: '16px' }}>
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-2 border-ink transition-colors"
                    style={{
                      background: openIndex === index ? '#0A0A0A' : 'transparent',
                      color: openIndex === index ? '#C7F25C' : '#0A0A0A',
                    }}
                  >
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div style={{ maxHeight: openIndex === index ? '500px' : '0', opacity: openIndex === index ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
                  <div
                    className="px-7 pb-7"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', lineHeight: 1.65, color: '#0A0A0A', opacity: 0.65, borderTop: '1.5px solid rgba(10,10,10,0.08)', paddingTop: '16px' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ask us anything CTA */}
        <div
          className="mt-14 p-8 lg:p-12"
          style={{ background: '#0F3D2E', border: '1.5px solid #0A0A0A', borderRadius: '28px', boxShadow: '8px 8px 0 #0A0A0A', transform: 'translate(-4px,-4px)', maxWidth: '640px' }}
        >
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.03em', color: '#F7F1E3', marginBottom: '8px', lineHeight: 1.1 }}>
            Still have a question?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#F7F1E3', opacity: 0.6, marginBottom: '24px', lineHeight: 1.55 }}>
            Email the founder directly. We read every single one.
          </p>
          <a
            href="mailto:info@one4health.com"
            className="btn-lime text-sm"
          >
            info@one4health.com
          </a>
        </div>
      </div>
    </main>
  );
}
