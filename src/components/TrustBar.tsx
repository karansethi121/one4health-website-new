export function TrustBar() {
  const certifications = [
    { image: '/images/cert_fssai_new.png', alt: 'FSSAI Compliant' },
    { image: '/images/cert_gmp_new.png', alt: 'GMP Certified' },
    { image: '/images/cert_labtested_new.png', alt: 'Lab Tested' },
    { image: '/images/cert_vegan_new.png', alt: '100% Vegan' },
    { image: '/images/cert_sugarfree_new.png', alt: 'Sugar-Free' },
    { image: '/images/cert_madeinindia.png', alt: 'Made in India' },
  ];

  return (
    <div className="w-full bg-white border-y border-sage-100 py-8 lg:py-12">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {certifications.map((cert, index) => (
            <div key={index} className="flex flex-col items-center group">
              <img 
                src={cert.image} 
                alt={cert.alt}
                className="h-16 w-16 lg:h-20 lg:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <span className="mt-2 text-xs text-charcoal-500 text-center">{cert.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
