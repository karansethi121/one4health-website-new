// Marquee strip — ink bg, lime text, JetBrains Mono
export function PromoMarquee() {
  const items = [
    'KSM-66®',
    'Vegan',
    'No sugar',
    'No gelatin',
    'Made in India',
    '₹12/day',
    '★ 5.0 (140 reviews)',
    'Strawberry flavour',
    '30 gummies/jar',
    'Clinically studied',
  ];

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{ background: '#0A0A0A', borderBottom: '1.5px solid #0A0A0A', height: '44px' }}
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#C7F25C',
              padding: '0 24px',
            }}
          >
            {item}
            <span style={{ color: '#C7F25C', opacity: 0.35 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
