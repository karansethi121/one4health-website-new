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
      <section ref={heroRef} className="section-container mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="about-animate">
            <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal-900 leading-[1.1] mb-6">
              Daily wellness,{' '}
              <span className="text-sage-700">simplified.</span>
            </h1>
            <p className="text-lg text-charcoal-600 leading-relaxed mb-6">
              One4Health was born from a simple belief: wellness shouldn't be complicated. 
              In a world of overwhelming choices and conflicting advice, we set out to create 
              something different—clean, effective supplements that fit seamlessly into your life.
            </p>
            <p className="text-lg text-charcoal-600 leading-relaxed">
              We're a team of health enthusiasts, scientists, and everyday people who understand 
              the challenges of modern life. Stress, poor sleep, and low energy affect us all. 
              That's why we created our first product: Ashwagandha Gummies with KSM-66®.
            </p>
          </div>
          <div className="about-animate">
            <div className="rounded-3xl overflow-hidden shadow-soft">
              <img
                src="/images/about_lifestyle.jpg"
                alt="One4Health team"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-sage-100 py-20 mb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center about-animate">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-charcoal-700 leading-relaxed">
              To make premium wellness accessible to everyone. We believe that when you feel 
              your best, you can do your best. Our goal is to help ambitious, health-conscious 
              individuals find balance without adding complexity to their lives.
            </p>
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
