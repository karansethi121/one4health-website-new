export function TrustBar() {
  const certifications = [
    { image: '/images/cert_fssai.png', alt: 'FSSAI Compliant' },
    { image: '/images/cert_gmp.png', alt: 'GMP Certified' },
    { image: '/images/cert_fssc_22000.png', alt: 'FSSC 22000' },
    { image: '/images/cert_haccp.png', alt: 'HACCP Certified' },
    { image: '/images/cert_fda.png', alt: 'US FDA Facility' },
    { image: '/images/cert_iso_clean.svg', alt: 'ISO 9001:2015' },
    { image: '/images/cert_iso_22000.png', alt: 'ISO 22000' },
    { image: '/images/cert_veg.svg', alt: '100% Vegetarian' },
    { image: '/images/cert_cruelty_free.png', alt: 'Cruelty Free' },
    { image: '/images/cert_madeinindia.png', alt: 'Made in India' },
  ];

  return (
    <div className="w-full bg-white border-y border-sage-100 py-8 lg:py-12">
      <div className="section-container">
        {/* Scrollable container for mobile, flex-wrap for desktop */}
        <div className="flex overflow-x-auto lg:overflow-visible lg:flex-wrap items-center lg:justify-center gap-8 lg:gap-12 pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
          {certifications.map((cert, index) => (
            <div key={index} className="flex flex-col items-center shrink-0 snap-center group">
              <img
                src={cert.image}
                alt={cert.alt}
                className="h-16 w-16 lg:h-20 lg:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <span className="mt-2 text-[10px] lg:text-xs text-charcoal-500 text-center whitespace-nowrap">{cert.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
