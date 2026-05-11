export function AllergenBar() {
  const allergens = [
    { src: '/images/allergen_gelatin_free_v8.png', alt: 'Gelatin Free' },
    { src: '/images/allergen_gluten_free_v8.png',  alt: 'Gluten Free' },
    { src: '/images/allergen_milk_free_v8.png',    alt: 'Milk Free' },
    { src: '/images/allergen_peanut_free_v8.png',  alt: 'Peanut Free' },
    { src: '/images/allergen_nut_free_v8.png',     alt: 'Nut Free' },
    { src: '/images/allergen_soy_free_v8.png',     alt: 'Soy Free' },
  ];

  const doubled = [...allergens, ...allergens];

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
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center px-6 lg:px-10"
          >
            <img
              src={item.src}
              alt={item.alt}
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
