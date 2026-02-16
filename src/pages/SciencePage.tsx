import { useEffect, useRef } from 'react';
import { Check, Beaker, Leaf, Sun, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mainProduct } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function SciencePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.science-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="w-full pt-24 pb-16">
      {/* Hero */}
      <section ref={heroRef} className="section-container mb-20">
        <div className="text-center max-w-3xl mx-auto science-animate">
          <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
            <Beaker className="w-4 h-4 inline mr-1" />
            Science & Ingredients
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal-900 leading-[1.1] mb-6">
            Backed by research.{' '}
            <span className="text-sage-700">Powered by nature.</span>
          </h1>
          <p className="text-lg text-charcoal-600 leading-relaxed">
            Every ingredient in our formula is carefully selected based on clinical evidence 
            and traditional wisdom. We believe in transparency—no hidden ingredients, no compromises.
          </p>
        </div>
      </section>

      {/* KSM-66 Section */}
      <section className="section-container mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="science-animate">
            <div className="rounded-3xl overflow-hidden shadow-soft">
              <img
                src="/images/ashwagandha_plant.jpg"
                alt="Ashwagandha plant"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="science-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sage-700 text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Star Ingredient
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-4">
              What is KSM-66®?
            </h2>
            <p className="text-lg text-charcoal-600 leading-relaxed mb-6">
              KSM-66® is the highest concentration, full-spectrum root extract of ashwagandha 
              available on the market today. It's produced using a unique extraction process 
              that preserves the natural balance of the herb's beneficial compounds.
            </p>
            <ul className="space-y-3">
              {[
                'Backed by 24+ clinical studies',
                'Full-spectrum root extract (no leaves)',
                'Produced using green chemistry',
                'Highest concentration available',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-sage-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-sage-700" />
                  </div>
                  <span className="text-charcoal-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ingredients Breakdown */}
      <section className="bg-sage-100 py-20 mb-20">
        <div className="section-container">
          <div className="text-center mb-12 science-animate">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-4">
              Complete Ingredient Breakdown
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              Every ingredient serves a purpose. Here's what's in each gummy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mainProduct.ingredients.map((ingredient, idx) => (
              <div
                key={ingredient.name}
                className="science-animate bg-white rounded-3xl p-8 shadow-soft"
              >
                <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center mb-6">
                  {idx === 0 ? <Leaf className="w-7 h-7 text-sage-700" /> :
                   idx === 1 ? <Sun className="w-7 h-7 text-sage-700" /> :
                   <Beaker className="w-7 h-7 text-sage-700" />}
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                  {ingredient.name}
                </h3>
                <div className="flex gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-charcoal-400">Per gummy</p>
                    <p className="font-medium text-charcoal-900">{ingredient.amount}</p>
                  </div>
                  <div>
                    <p className="text-charcoal-400">Daily (2 gummies)</p>
                    <p className="font-medium text-sage-700">{ingredient.dailyAmount}</p>
                  </div>
                </div>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BioPerine Section */}
      <section className="section-container mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="science-animate lg:order-2">
            <div className="bg-sage-700 rounded-3xl p-8 md:p-12 text-white">
              <Beaker className="w-10 h-10 mb-6" />
              <h2 className="text-3xl font-heading font-bold mb-4">
                Why BioPerine®?
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                BioPerine® is a patented extract from black pepper fruit that has been 
                clinically shown to enhance nutrient absorption by up to 30%. This means 
                you get more benefit from every gummy.
              </p>
              <ul className="space-y-3">
                {[
                  'Enhances bioavailability of nutrients',
                  'Clinically studied and patented',
                  'Works synergistically with ashwagandha',
                  'Only 5mg per gummy needed',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="science-animate lg:order-1">
            <h3 className="text-2xl font-semibold text-charcoal-900 mb-4">
              The Science of Absorption
            </h3>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              Many supplements pass through your body without being fully absorbed. 
              BioPerine® addresses this by inhibiting certain enzymes that break down 
              nutrients, allowing more of the active compounds to reach your bloodstream.
            </p>
            <div className="bg-sage-50 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center">
                  <span className="text-sage-700 font-bold">30%</span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Increased Absorption</p>
                  <p className="text-sm text-charcoal-500">Clinically proven</p>
                </div>
              </div>
              <p className="text-sm text-charcoal-600">
                Studies show BioPerine® can increase the bioavailability of various 
                nutrients, making your supplement more effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="section-container">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft science-animate">
          <div className="text-center mb-10">
            <Shield className="w-12 h-12 text-sage-700 mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-4">
              Our Quality Promise
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              We're committed to delivering supplements you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Third-Party Tested', desc: 'Every batch verified for purity and potency' },
              { title: 'GMP Certified', desc: 'Manufactured in FDA-registered facilities' },
              { title: 'Vegan Friendly', desc: 'No animal products or byproducts' },
              { title: 'Gluten Free', desc: 'Safe for those with gluten sensitivities' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-sage-700" />
                </div>
                <h4 className="font-semibold text-charcoal-900 mb-1">{item.title}</h4>
                <p className="text-sm text-charcoal-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
