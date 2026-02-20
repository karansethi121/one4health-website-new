export function TrustBar() {
  const certifications = [
    { image: '/images/cert_fssai.webp', alt: 'FSSAI Compliant' },
    { image: '/images/cert_gmp.webp', alt: 'GMP Certified' },
    { image: '/images/cert_fssc_22000.svg', alt: 'FSSC 22000' },
    { image: '/images/cert_haccp.svg', alt: 'HACCP Certified' },
    { image: '/images/cert_fda.svg', alt: 'US FDA Facility' },
    { image: '/images/cert_iso_clean.svg', alt: 'ISO 9001:2015' },
    { image: '/images/cert_iso_22000.webp', alt: 'ISO 22000' },
    { image: '/images/cert_veg.svg', alt: '100% Vegetarian' },
    { image: '/images/cert_cruelty_free.svg', alt: 'Cruelty Free' },
    { image: '/images/cert_madeinindia.webp', alt: 'Made in India' },
  ];

  return (
    <div className="w-full bg-white border-y border-sage-100 py-8 lg:py-12">
      <div className="section-container">
        <div className="relative flex overflow-hidden group">
          <div className="flex w-max animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused] items-center gap-12 lg:gap-16 pr-12 lg:pr-16 will-change-transform">
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col items-center shrink-0 w-24">
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="h-16 w-16 lg:h-20 lg:w-20 object-contain transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <span className="mt-3 text-[10px] lg:text-xs text-charcoal-500 text-center font-medium">{cert.alt}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="flex w-max animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused] items-center gap-12 lg:gap-16 pr-12 lg:pr-16" aria-hidden="true">
            {certifications.map((cert, index) => (
              <div key={`dup-${index}`} className="flex flex-col items-center shrink-0 w-24">
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="h-16 w-16 lg:h-20 lg:w-20 object-contain transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <span className="mt-3 text-[10px] lg:text-xs text-charcoal-500 text-center font-medium">{cert.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
