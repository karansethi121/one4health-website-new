import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Leaf, Sun, Sparkles, Check, Cherry, Ban, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    name: 'KSM-66® Ashwagandha',
    amount: '300mg',
    desc: 'Full-spectrum root extract supports stress response & calm',
    icon: Leaf,
    highlight: '24+ clinical studies†'
  },
  {
    name: 'Vitamin D2',
    amount: '400 IU',
    desc: 'Supports mood balance & healthy immune function',
    icon: Sun,
    highlight: 'Essential for indoor lifestyles'
  },
  {
    name: 'BioPerine®',
    amount: '10mg',
    desc: 'Enhances nutrient absorption',
    icon: Sparkles,
    highlight: 'Patented black pepper extract'
  },
];

export function WhatsInsideSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.inside-content',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.inside-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.inside-image',
        { x: 50, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      className="relative w-full py-16 lg:py-24 bg-sage-50 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-100/30 to-transparent" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left - Content */}
          <div className="inside-content">
            <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl mb-4">
              <Search className="w-5 h-5 lg:w-6 lg:h-6 text-sage-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-4">
              What's inside
            </h2>
            <p className="text-base lg:text-lg text-charcoal-500 mb-8 lg:mb-10 max-w-md">
              Three ingredients. Each chosen for a reason. No fillers. No compromises.
            </p>

            {/* Ingredient List */}
            <div className="space-y-3 lg:space-y-4">
              {ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="inside-card flex items-start gap-3 lg:gap-4 bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 hover-lift"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sage-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ing.icon className="w-5 h-5 lg:w-6 lg:h-6 text-sage-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base">{ing.name}</h4>
                      <span className="text-xs lg:text-sm font-bold text-sage-700 bg-sage-50 px-2 py-0.5 rounded-full">
                        {ing.amount}
                      </span>
                    </div>
                    <p className="text-xs lg:text-sm text-charcoal-500 mt-1">{ing.desc}</p>
                    <p className="text-xs text-sage-600 mt-2 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {ing.highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2">
              <Info className="w-4 h-4 text-charcoal-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal-400">
                †Clinical studies on KSM-66® Ashwagandha. Individual results may vary.
              </p>
            </div>

            <Link
              to="/science"
              className="inline-flex items-center gap-2 mt-6 lg:mt-8 text-sage-700 font-medium hover:gap-3 transition-all group text-sm lg:text-base"
            >
              See the full supplement facts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right - Image */}
          <div className="inside-image flex justify-center">
            <div className="relative">
              <img
                src="/images/product_transparent.png"
                alt="One4Health Gummies"
                className="w-64 sm:w-72 lg:w-80 xl:w-96 h-auto drop-shadow-2xl"
              />
              {/* Badges */}
              <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-coral-100 text-coral-700 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium flex items-center gap-1.5">
                <Cherry className="w-3.5 h-3.5" />
                Mixed berry flavor
              </div>
              <div className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 bg-sunshine-100 text-sunshine-700 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5" />
                Zero sugar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
