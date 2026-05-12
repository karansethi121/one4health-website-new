import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 4-stat row: the stat band
const stats = [
  {
    key: 'Extract',
    value: 'KSM-66®',
    sub: 'Clinical-grade root extract',
    bg: '#F7F1E3',
    border: true,
  },
  {
    key: 'Price',
    value: '₹369',
    sub: 'From ₹449 — save 23%',
    bg: '#FBF7EC',
    border: true,
    valueColor: '#FF5A6B',
  },
  {
    key: 'Gummies',
    value: '30',
    sub: 'Per jar, each serving',
    bg: '#F7F1E3',
    border: true,
  },
  {
    key: 'Supply',
    value: '15 days',
    sub: '2 per day, one jar',
    bg: '#FBF7EC',
    border: false,
  },
];

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
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
      className="relative w-full overflow-hidden"
      style={{ borderTop: '1.5px solid #0A0A0A', borderBottom: '1.5px solid #0A0A0A' }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            className="stat-card relative px-6 py-10 lg:py-14 flex flex-col justify-between"
            style={{
              background: stat.bg,
              borderRight: i < 3 ? '1.5px solid #0A0A0A' : undefined,
            }}
          >
            {/* Decorative blob */}
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-[0.18]"
              style={{ background: i % 2 === 0 ? '#C7F25C' : '#FFD66B', transform: 'translate(30%, 30%)' }}
              aria-hidden="true"
            />

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: '#0A0A0A',
                opacity: 0.45,
              }}
            >
              {stat.key}
            </span>
            <div className="mt-4">
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  color: stat.valueColor || '#0A0A0A',
                  lineHeight: 1.0,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: '#0A0A0A',
                  opacity: 0.5,
                  marginTop: '6px',
                }}
              >
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
