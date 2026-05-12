export function AllergenBar() {
  const allergens = [
    { src: '/images/allergen_gelatin_free_v8.png', alt: 'Gelatin Free' },
    { src: '/images/allergen_gluten_free_v8.png',  alt: 'Gluten Free' },
    { src: '/images/allergen_milk_free_v8.png',    alt: 'Milk Free' },
    { src: '/images/allergen_peanut_free_v8.png',  alt: 'Peanut Free' },
    { src: '/images/allergen_nut_free_v8.png',     alt: 'Nut Free' },
    { src: '/images/allergen_soy_free_v8.png',     alt: 'Soy Free' },
  ];

  // 6 copies ensures half the track width exceeds any viewport (no blank gap on scroll loop)
  const track = Array(6).fill(allergens).flat() as typeof allergens;

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{
        background: '#F7F1E3',
        borderTop: '1.5px solid #0A0A0A',
        borderBottom: '1.5px solid #0A0A0A',
        height: '88px',
      }}
      aria-label="Allergen-free certifications"
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center px-8 lg:px-12"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-16 w-auto object-contain"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
