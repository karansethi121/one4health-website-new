import { useEffect, useRef } from 'react';
import { Target, Brain, Moon, Zap, Home } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Brain,
    problem: 'Daily stress piling up',
    solution: 'KSM-66® supports a healthy stress response',
    color: 'bg-coral-50',
    iconColor: 'text-coral-600',
  },
  {
    icon: Moon,
    problem: 'Tired but wired at night',
    solution: 'Promotes relaxation for better rest',
    color: 'bg-lavender-50',
    iconColor: 'text-lavender-600',
  },
  {
    icon: Zap,
    problem: 'Energy crashes midday',
    solution: 'Helps maintain sustained energy',
    color: 'bg-sunshine-50',
    iconColor: 'text-sunshine-600',
  },
  {
    icon: Home,
    problem: 'Indoor lifestyle',
    solution: 'Vitamin D2 supports mood & immunity',
    color: 'bg-sage-50',
    iconColor: 'text-sage-600',
  },
];

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ps-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.ps-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
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
      className="relative w-full section-padding-large bg-sage-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] lg:w-[800px] h-[300px] lg:h-[400px] bg-gradient-to-b from-sage-100/50 to-transparent rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="ps-title text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-100 rounded-xl mb-6">
            <Target className="w-6 h-6 text-sage-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-charcoal-900 leading-tight mb-6">
            Stress doesn't wait.
            <br />
            <span className="text-sage-700">Neither should you.</span>
          </h2>
          <p className="text-lg lg:text-xl text-charcoal-500 leading-relaxed">
            Modern high-performance life demands a resilient mind. We've combined the world's most
            awarded Ashwagandha with active Vitamin D2 to create the ultimate daily ritual.
          </p>
        </div>

        {/* Problem-Solution Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {problems.map((item) => (
            <div
              key={item.problem}
              className={`ps-card ${item.color} rounded-2xl lg:rounded-3xl p-5 lg:p-6 hover-lift group`}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${item.iconColor}`} />
              </div>
              <p className="text-charcoal-500 text-xs mb-1 font-medium uppercase tracking-wider">
                You feel
              </p>
              <p className="text-charcoal-900 font-semibold text-sm lg:text-base mb-3">
                {item.problem}
              </p>
              <div className="h-px bg-charcoal-200/50 mb-3" />
              <p className="text-sage-700 text-xs lg:text-sm font-medium">
                {item.solution}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="ps-title mt-8 lg:mt-12 text-center">
          <p className="text-charcoal-500 text-sm lg:text-base">
            Two gummies. One daily ritual.{' '}
            <span className="text-sage-700 font-medium">Simple.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
