import { useEffect, useRef } from 'react';
import { Beaker } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mainProduct } from '@/data/products';
import { useSEO } from '@/hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

export function SciencePage() {
  useSEO({
    title: 'The Science of KSM-66® Ashwagandha',
    description: 'Explore clinical studies, stats, and scientific research backing our KSM-66® Ashwagandha gummies. Learn how adaptogens reduce cortisol and support calm focus.',
    keywords: 'Ashwagandha science, KSM-66 research, cortisol reduction studies, ashwagandha clinical trials, stress relief study',
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      tl.fromTo('.sci-animate', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.stat-value',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 75%',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="w-full pt-[72px] lg:pt-[84px]" style={{ background: '#F7F1E3' }}>
      
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section ref={sectionRef} className="section-container section-padding">
        <div className="max-w-4xl">
          <div className="sci-animate mb-6">
            <span className="eyebrow">Evidence over hype.</span>
          </div>
          <h1 
            className="sci-animate text-balance mb-8"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(44px, 7vw, 96px)',
              color: '#0A0A0A',
              lineHeight: 0.95,
            }}
          >
            Backed by research.{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              Powered by nature.
            </em>
          </h1>
          <p 
            className="sci-animate"
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: '18px', 
              lineHeight: 1.6, 
              color: '#0A0A0A', 
              opacity: 0.65, 
              maxWidth: '600px' 
            }}
          >
            Every ingredient in our formula is carefully selected based on clinical evidence 
            and traditional wisdom. We believe in transparency—no hidden ingredients, no compromises.
          </p>
        </div>
      </section>

      {/* ── KSM-66 Section ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32" style={{ background: '#0F3D2E' }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="relative group">
              <div 
                className="relative overflow-hidden"
                style={{ border: '1.5px solid #0A0A0A', borderRadius: '28px', boxShadow: '8px 8px 0 #C7F25C' }}
              >
                <img
                  src="/images/ashwagandha_plant.webp"
                  alt="KSM-66 Ashwagandha root extract botanical plant source"
                  className="w-full h-[500px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <span 
                className="inline-block mb-6"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontSize: '11px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.12em', 
                  color: '#C7F25C' 
                }}
              >
                The Gold Standard
              </span>
              <h2 
                className="text-balance mb-8"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  color: '#F7F1E3',
                  lineHeight: 1.05,
                }}
              >
                Why KSM-66® Is{' '}
                <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#C7F25C' }}>
                  India's Gift
                </em>{' '}
                to Wellness.
              </h2>
              <p 
                style={{ 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontSize: '17px', 
                  lineHeight: 1.65, 
                  color: '#F7F1E3', 
                  opacity: 0.7, 
                  marginBottom: '40px' 
                }}
              >
                KSM-66® is the highest concentration, full-spectrum root extract of ashwagandha 
                available on the market today. Developed after 14 years of rigorous R&D, 
                it preserves the natural balance of the herb's beneficial compounds.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Full Spectrum Root', desc: 'Uses only the root, maintaining nature\'s ratios.' },
                  { title: 'Pure Extraction', desc: 'A "Green Chemistry" process without harsh solvents.' },
                  { title: 'Certified Safe', desc: '24+ clinical studies verifying safety and efficacy.' },
                  { title: 'Clinical Dosing', desc: '300mg per serving—the exact dose used in trials.' }
                ].map((item) => (
                  <div 
                    key={item.title} 
                    className="p-5"
                    style={{ border: '1.5px solid rgba(247,241,227,0.15)', borderRadius: '20px' }}
                  >
                    <h4 
                      style={{ 
                        fontFamily: "'Bricolage Grotesque', sans-serif", 
                        fontWeight: 700, 
                        fontSize: '15px', 
                        color: '#C7F25C', 
                        marginBottom: '6px' 
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#F7F1E3', opacity: 0.5 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Clinical Stats ────────────────────────────────────────────── */}
      <section className="section-padding stats-grid" style={{ background: '#F7F1E3' }}>
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="eyebrow mb-5 inline-flex">The evidence</span>
            <h2 
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                letterSpacing: '-0.035em',
                fontSize: 'clamp(32px, 4vw, 52px)',
                color: '#0A0A0A',
                lineHeight: 1.05,
              }}
            >
              Numbers don't{' '}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#FF5A6B' }}>
                lie.
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              { label: 'Cortisol Levels', value: '-27.9%', desc: 'Reduction in serum cortisol levels (stress hormone).' },
              { label: 'Anxiety Scores', value: '-44.0%', desc: 'Improvement in self-assessed stress scores.' },
              { label: 'Sleep Efficiency', value: '+15.2%', desc: 'Increase in overall sleep quality and time.' },
              { label: 'Muscle Strength', value: '+1.5x', desc: 'Increase in muscle mass compared to placebo.' },
              { label: 'Mental Clarity', value: '+30%', desc: 'Increase in focus and cognitive task performance.' },
              { label: 'Daily Recovery', value: '2x', desc: 'Faster recovery rates from physical stress.' },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="stat-value p-8 lg:p-10 flex flex-col justify-between"
                style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '28px' }}
              >
                <div 
                  style={{ 
                    fontFamily: "'Bricolage Grotesque', sans-serif", 
                    fontWeight: 800, 
                    fontSize: 'clamp(32px, 5vw, 64px)', 
                    color: '#0F3D2E', 
                    letterSpacing: '-0.04em',
                    lineHeight: 1
                  }}
                >
                  {stat.value}
                </div>
                <div className="mt-6">
                  <h4 
                    style={{ 
                      fontFamily: "'JetBrains Mono', monospace", 
                      fontSize: '11px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      color: '#0A0A0A',
                      fontWeight: 700,
                      marginBottom: '8px'
                    }}
                  >
                    {stat.label}
                  </h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#0A0A0A', opacity: 0.5, lineHeight: 1.45 }}>
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p 
            className="mt-12 text-center" 
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', opacity: 0.35 }}
          >
            *Based on double-blind, randomized, placebo-controlled trials. PubMed IDs: 23439798, 26609282.
          </p>
        </div>
      </section>

      {/* ── Ingredients Grid ─────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: '#0A0A0A' }}>
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                letterSpacing: '-0.035em',
                fontSize: 'clamp(32px, 4vw, 52px)',
                color: '#F7F1E3',
                lineHeight: 1.05,
              }}
            >
              Essential formula.{' '}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#C7F25C' }}>
                Zero fluff.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mainProduct.ingredients.map((ingredient) => (
              <div
                key={ingredient.name}
                className="p-8 group"
                style={{ border: '1.5px solid rgba(247,241,227,0.1)', borderRadius: '28px', background: 'rgba(247,241,227,0.03)' }}
              >
                <div 
                  className="w-14 h-14 flex items-center justify-center mb-8 rounded-2xl transition-all group-hover:scale-110"
                  style={{ background: '#C7F25C' }}
                >
                  <Beaker className="w-7 h-7" style={{ color: '#0F3D2E' }} />
                </div>
                <h3 
                  style={{ 
                    fontFamily: "'Bricolage Grotesque', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '20px', 
                    color: '#F7F1E3', 
                    marginBottom: '16px' 
                  }}
                >
                  {ingredient.name}
                </h3>
                <div className="flex gap-6 mb-6">
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', color: '#C7F25C', opacity: 0.6 }}>Dose</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#F7F1E3' }}>{ingredient.amount}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', color: '#C7F25C', opacity: 0.6 }}>Daily</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#F7F1E3' }}>{ingredient.dailyAmount}</p>
                  </div>
                </div>
                <p 
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif", 
                    fontSize: '14px', 
                    lineHeight: 1.6, 
                    color: '#F7F1E3', 
                    opacity: 0.5 
                  }}
                >
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Section ────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <div 
          className="p-10 lg:p-20 text-center"
          style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '48px', boxShadow: '8px 8px 0 #0A0A0A', transform: 'translate(-4px,-4px)' }}
        >
          <span className="eyebrow mb-6 inline-flex">Quality Promise</span>
          <h2 
            className="mb-12"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: '#0A0A0A',
              lineHeight: 1.05,
            }}
          >
            We're obsessed with{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              transparency.
            </em>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {[
              { title: 'Third-Party Tested', icon: '🔬' },
              { title: 'GMP Certified', icon: '🏭' },
              { title: 'Vegan Friendly', icon: '🌱' },
              { title: 'ISO Certified', icon: '✅' },
              { title: 'Gluten Free', icon: '🌾' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 
                  style={{ 
                    fontFamily: "'JetBrains Mono', monospace", 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em', 
                    color: '#0A0A0A',
                    fontWeight: 700
                  }}
                >
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
