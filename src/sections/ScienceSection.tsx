import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScienceModal } from '@/components/ScienceModal';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    label: '100% Root Extract',
    desc: 'No leaves. No fillers. Just the pure root.',
    icon: '🌱'
  },
  {
    label: 'Clinically Studied',
    desc: '24+ clinical studies on efficacy.',
    icon: '🔬'
  },
  {
    label: 'Enhanced Absorption',
    desc: 'BioPerine® increases uptake by up to 30%.',
    icon: '⚡'
  },
];

const stats = [
  { number: '300mg', label: 'Daily serving' },
  { number: '24+', label: 'Clinical studies' },
  { number: '100%', label: 'Root extract' },
];

export function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.science-panel',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.science-image',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.science-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
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
      className="relative w-full overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        {/* Left - Content Panel */}
        <div className="science-panel bg-sage-700 flex items-center">
          <div className="section-container py-16 lg:py-24">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm mb-6">
                <ScienceModal />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                Not all Ashwagandha is created equal.
              </h2>

              <p className="text-lg text-white/80 leading-relaxed mb-8">
                We chose KSM-66® for a reason. It's the most clinically studied
                full-spectrum root extract—shown to support stress response,
                promote relaxation, and help maintain daily balance.
              </p>

              {/* Differentiators */}
              <div className="space-y-4 mb-10">
                {differentiators.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-white/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="science-stat">
                    <p className="text-3xl font-bold text-white">{stat.number}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/science"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sage-700 font-semibold rounded-full hover:bg-sage-50 transition-colors group"
              >
                Explore the science
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="science-image relative h-64 lg:h-auto">
          <img
            src="/images/science_jar_table.jpg"
            alt="Science background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-700/20 to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
