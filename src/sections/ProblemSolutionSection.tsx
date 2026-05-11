import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    type: 'The powder',
    tagline: 'tastes like a yard',
    desc: "Ayurvedic classics. Chalky texture, muddy aftertaste. You'll make it 3 days then forget it exists.",
    score: '2/10',
    bg: '#0A0A0A',
    textColor: '#F7F1E3',
    scoreColor: '#FF5A6B',
    isHero: false,
  },
  {
    type: 'The churna',
    tagline: 'ayurveda gods called.',
    desc: "They want it back. Ground herb dust mixed with warm milk at 6am? Hard pass. Respect though.",
    score: '1/10',
    bg: '#FBF7EC',
    textColor: '#0A0A0A',
    scoreColor: '#FF5A6B',
    isHero: false,
  },
  {
    type: 'Our gummy',
    tagline: 'just strawberry.',
    desc: 'KSM-66® at clinical dose. Vitamin D2. Black pepper for absorption. Tastes like a fruit chew, works like the real thing.',
    score: '9/10',
    bg: '#C7F25C',
    textColor: '#0F3D2E',
    scoreColor: '#0F3D2E',
    isHero: true,
  },
];

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ps-title',
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
        '.ps-card',
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full section-padding overflow-hidden"
      style={{ background: '#F7F1E3' }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="ps-title text-center mb-14 lg:mb-20">
          <span className="eyebrow mb-5 inline-flex">Your options, ranked.</span>
          <h2
            className="text-balance"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.05,
              color: '#0A0A0A',
            }}
          >
            Why your current ashwagandha{' '}
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                color: '#FF5A6B',
              }}
            >
              sucks.
            </em>
          </h2>
        </div>

        {/* 3-column cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.type}
              className="ps-card relative overflow-hidden p-8 lg:p-10 flex flex-col"
              style={{
                background: card.bg,
                border: '1.5px solid #0A0A0A',
                borderRadius: '28px',
                ...(card.isHero
                  ? { boxShadow: '8px 8px 0 #0A0A0A', transform: 'translate(-4px, -4px)' }
                  : {}),
              }}
            >
              {/* Score pill */}
              <div className="mb-8 flex items-start justify-between">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: card.textColor,
                    opacity: 0.5,
                  }}
                >
                  {card.type}
                </span>
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: '28px',
                    letterSpacing: '-0.03em',
                    color: card.scoreColor,
                    lineHeight: 1,
                  }}
                >
                  {card.score}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  letterSpacing: '-0.03em',
                  color: card.textColor,
                  lineHeight: 1.1,
                  marginBottom: '16px',
                }}
              >
                {card.tagline}
              </p>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.55,
                  color: card.textColor,
                  opacity: 0.72,
                  marginTop: 'auto',
                }}
              >
                {card.desc}
              </p>

              {card.isHero && (
                <div
                  className="mt-8 inline-flex items-center gap-2"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#0F3D2E',
                    fontWeight: 700,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#0F3D2E" />
                    <path d="M4.5 8l2.5 2.5 4-5" stroke="#C7F25C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  The obvious choice
                </div>
              )}

              {/* Decorative blob */}
              <div
                className="absolute bottom-0 right-0 rounded-full pointer-events-none"
                style={{
                  width: '160px',
                  height: '160px',
                  background: card.isHero ? '#0F3D2E' : '#C7F25C',
                  opacity: 0.1,
                  transform: 'translate(40%, 40%)',
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
