export function AllergenBar() {
    const allergens = [
        { image: '/images/allergen_gelatin_free_v6.png', alt: 'Gelatin Free' },
        { image: '/images/allergen_gluten_free_v6.png', alt: 'Gluten Free' },
        { image: '/images/allergen_milk_free_v6.png', alt: 'Milk Free' },
        { image: '/images/allergen_peanut_free_v6.png', alt: 'Peanut Free' },
        { image: '/images/allergen_nut_free_v6.png', alt: 'Nut Free' },
        { image: '/images/allergen_soy_free_v6.png', alt: 'Soy Free' },
    ];

    return (
        <div className="w-full bg-sage-50 border-y border-sage-100 py-8 lg:py-10">
            <div className="section-container">
                <p className="text-center text-[10px] lg:text-xs font-bold text-charcoal-400 uppercase tracking-widest mb-6">
                    100% Allergen Free
                </p>
                <div className="relative flex overflow-hidden group">
                    <div className="flex w-max animate-[scroll_35s_linear_infinite] group-hover:[animation-play-state:paused] items-center gap-10 lg:gap-14 pr-10 lg:pr-14 will-change-transform">
                        {allergens.map((item, index) => (
                            <div key={index} className="flex flex-col items-center shrink-0 w-20 lg:w-28">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="h-16 w-16 lg:h-20 lg:w-20 object-contain transition-transform duration-300 hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex w-max animate-[scroll_35s_linear_infinite] group-hover:[animation-play-state:paused] items-center gap-10 lg:gap-14 pr-10 lg:pr-14" aria-hidden="true">
                        {allergens.map((item, index) => (
                            <div key={`dup-${index}`} className="flex flex-col items-center shrink-0 w-20 lg:w-28">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="h-16 w-16 lg:h-20 lg:w-20 object-contain transition-transform duration-300 hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
