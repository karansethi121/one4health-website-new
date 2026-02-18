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
      <section className="section-container section-padding pb-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="science-animate">
            <div className="relative">
              <div className="absolute -inset-4 bg-sage-100 rounded-[40px] -rotate-2" />
              <div className="relative rounded-[32px] overflow-hidden shadow-xl">
                <img
                  src="/images/ashwagandha_plant.jpg"
                  alt="Ashwagandha plant"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
          <div className="science-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sage-700 text-[10px] font-bold uppercase tracking-widest mb-8">
              <Leaf className="w-3.5 h-3.5" />
              The Gold Standard
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal-900 mb-8 leading-tight">
              Why KSM-66® Is <br /><span className="text-sage-700">The Gold Standard</span>
            </h2>
            <p className="text-lg text-charcoal-600 leading-relaxed mb-8">
              KSM-66® is the highest concentration, full-spectrum root extract of ashwagandha
              available on the market today. It's produced using a unique extraction process
              that took 14 years of R&D to refine, preserving the natural balance of the herb's
              beneficial compounds.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Full Spectrum Root', desc: 'Uses only the root, maintaining the precise ratios found in nature.' },
                { title: 'Pure Extraction', desc: 'A "Green Chemistry" process without the use of alcohol or harsh solvents.' },
                { title: 'Certified Safe', desc: 'Over 24+ clinical studies verifying safety and efficacy.' }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-white shadow-soft-sm hover:shadow-soft transition-shadow">
                  <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-sage-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Study Results */}
      <section className="section-container section-padding-large">
        <div className="bg-charcoal-900 rounded-[48px] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage-700/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest mb-8">
              <Beaker className="w-3.5 h-3.5" />
              Published Research
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
              Clinically Proven Results.
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { label: 'Cortisol Levels', value: '-27.9%', desc: 'Reduction in serum cortisol levels (the stress hormone).' },
                { label: 'Anxiety Scores', value: '-44.0%', desc: 'Improvement in self-assessed stress and anxiety scores.' },
                { label: 'Sleep Efficiency', value: '+15.2%', desc: 'Increase in overall sleep quality and time spent asleep.' },
                { label: 'Muscle Strength', value: '+1.5x', desc: 'Increase in muscle mass and strength compared to placebo.' },
                { label: 'Mental Clarity', value: '+30%', desc: 'Increase in focus and cognitive task performance.' },
                { label: 'Daily Recovery', value: '2x', desc: 'Faster recovery rates from exercise and physical stress.' },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <p className="text-sage-400 text-4xl lg:text-5xl font-bold mb-4 group-hover:scale-110 origin-left transition-transform duration-500">{stat.value}</p>
                  <p className="text-white font-bold text-lg mb-2">{stat.label}</p>
                  <p className="text-charcoal-400 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-16 text-xs text-charcoal-500 leading-relaxed italic">
              *Results based on double-blind, randomized, placebo-controlled trials. Detailed studies available on PubMed (IDs: 23439798, 26609282).
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients Breakdown */}
      <section className="bg-sage-50 section-padding">
        <div className="section-container">
          <div className="text-center mb-16 science-animate">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal-900 mb-6">
              Distilled to Essentials.
            </h2>
            <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
              Effective formulas aren't about how much you can add, but what you can't afford to leave out.
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
