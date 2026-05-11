export function PromoMarquee() {
  const items = [
    { base: 'FREE SHIPPING ON ALL ORDERS', highlight: 'ACROSS INDIA' },
    { base: 'LIMITED TIME OFFER', highlight: 'ENDS SUNDAY' },
    { base: 'NATURE BLESSED,', highlight: 'SCIENCE BACKED' },
    { base: 'SAVE 23% OFF WITH CODE:', highlight: 'HEALTH23' },
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{ background: '#0A0A0A', borderBottom: '1.5px solid #0A0A0A', height: '36px' }}
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0 28px',
            }}
          >
            <span style={{ color: '#ffffff', opacity: 0.85 }}>{item.base}</span>
            <span style={{ color: '#C7F25C', fontWeight: 700 }}>{item.highlight}</span>
            <span style={{ color: '#C7F25C', opacity: 0.35, marginLeft: '4px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
