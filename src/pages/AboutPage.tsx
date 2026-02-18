import { useEffect, useRef } from 'react';
import { Leaf, Heart, Beaker, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description: 'We use only the highest quality, clinically studied ingredients. No artificial dyes, flavors, or fillers.',
  },
  {
    icon: Beaker,
    title: 'Science-Backed',
    description: 'Every formula is developed with research and tested for efficacy. We let the science speak.',
  },
  {
    icon: Heart,
    title: 'Made with Care',
    description: 'Our products are manufactured in GMP-certified facilities with rigorous quality control.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We listen to our customers and continuously improve based on real feedback.',
  },
];

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
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
      <section ref={heroRef} className="section-container section-padding pb-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="about-animate">
            <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              The One4Health Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-charcoal-900 leading-[1.05] mb-8">
              Daily wellness, <span className="text-sage-700">for the driven.</span>
            </h1>
            <div className="space-y-6 text-lg text-charcoal-600 leading-relaxed">
              <p>
                One4Health began with a simple observation: in the pursuit of modern success, our internal
                balance is often the first thing we sacrifice. We found ourselves constantly navigating
                a world of overpromise and under-delivery—where "wellness" was either too complicated
                to maintain or too diluted to actually work.
              </p>
              <p>
                As entrepreneurs, creators, and health enthusiasts, we needed a solution that was
                as high-performing as we were. We didn't want a dozen different pills or a complex
                morning ritual. We wanted the best of science and nature, distilled into a single,
                simple habit.
              </p>
              <p>
                That search led us to the world's most awarded Ashwagandha—KSM-66®. By combining this
                clinically-mastered root extract with active Vitamin D2 and BioPerine®, we created
                more than just a gummy; we created a ritual for resilience.
              </p>
            </div>
          </div>
          <div className="about-animate relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl skew-y-1 lg:skew-y-0 lg:-rotate-2 hover:rotate-0 transition-transform duration-700">
              <img
                src="/images/about_lifestyle.jpg"
                alt="Mindful living with One4Health"
                className="w-full h-[500px] lg:h-[700px] object-cover scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Our Why */}
      <section className="section-padding-large bg-sage-100/50 mt-20 lg:mt-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center about-animate">
            <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-sage-700 mb-8">Guided by Purpose</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal-900 mb-10 leading-tight">
              Our mission is to empower a million high-performers to find their center.
            </h3>
            <div className="grid md:grid-cols-2 gap-10 text-left mt-16">
              <div className="space-y-4">
                <p className="font-bold text-charcoal-900 text-xl">Standard Without Compromise</p>
                <p className="text-charcoal-600 leading-relaxed">
                  We don't settle for "good enough" ingredients. If it's not clinically studied,
                  third-party verified, and environmentally conscious, it doesn't make it into
                  our jars. Quality is our baseline, not our marketing.
                </p>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-charcoal-900 text-xl">Simplicity is Mastery</p>
                <p className="text-charcoal-600 leading-relaxed">
                  The most effective routines are the ones we actually stick to. We replace
                  complexity with clarity, giving you the focus you need to pursue your
                  ambitions without the mental load of complex supplement stacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-container mb-20">
        <div className="text-center mb-12 about-animate">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-4">
            What We Stand For
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Our values guide everything we do, from ingredient selection to customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="about-animate bg-white rounded-3xl p-8 shadow-soft-sm hover:shadow-soft transition-shadow"
            >
              <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">
                {value.title}
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* This is Just the Beginning */}
      <section className="section-container">
        <div className="bg-sage-700 rounded-3xl p-8 md:p-12 lg:p-16 text-center about-animate">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            This is just the beginning.
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            We're working on new products to support your wellness journey.
            Stay tuned for sleep support, immunity boosters, and more.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            More coming soon
          </div>
        </div>
      </section>
    </main>
  );
}
