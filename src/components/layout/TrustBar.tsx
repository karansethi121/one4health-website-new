export function TrustBar() {
  const certs = [
    { src: '/images/cert_fssai.webp',       alt: 'FSSAI Compliant' },
    { src: '/images/cert_fssc.png',          alt: 'FSSC 22000' },
    { src: '/images/cert_usfda_new.png',     alt: 'US FDA Registered' },
    { src: '/images/cert_gmp_new.png',       alt: 'GMP Certified' },
    { src: '/images/cert_haccp.png',         alt: 'HACCP' },
    { src: '/images/cert_iso9001_new.png',   alt: 'ISO 9001' },
    { src: '/images/cert_iso22000.png',      alt: 'ISO 22000' },
    { src: '/images/cert_cruelty_free.png',  alt: 'Cruelty Free' },
    { src: '/images/cert_madeinindia.webp',  alt: 'Made in India' },
  ];

  // Duplicate for seamless infinite scroll
  const doubled = [...certs, ...certs];

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{
        background: '#FBF7EC',
        borderTop: '1.5px solid #0A0A0A',
        borderBottom: '1.5px solid #0A0A0A',
        height: '88px',
      }}
      aria-label="Certifications"
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{ animation: 'marquee 50s linear infinite' }}
      >
        {doubled.map((cert, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center px-6 lg:px-16"
          >
            <img
              src={cert.src}
              alt={cert.alt}
              className="h-14 w-auto object-contain"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
