import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, Moon, Sparkles, Sunrise, Scale, Smile, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '1',
    title: 'Take 2 gummies',
    desc: 'Make it part of your nightly wind-down ritual.',
    icon: Moon,
    color: 'bg-lavender-100 text-lavender-700',
  },
  {
    number: '2',
    title: 'Let it work',
    desc: 'KSM-66® works with your body to support stress response.',
    icon: Sparkles,
    color: 'bg-sunshine-100 text-sunshine-700',
  },
  {
    number: '3',
    title: 'Feel the difference',
    desc: 'Experience natural calm without the morning fog.',
    icon: Sunrise,
    color: 'bg-sage-100 text-sage-700',
  },
];

const timeline = [
  { week: 'Week 1', text: 'Feeling more balanced', icon: Scale },
  { week: 'Week 2', text: 'Improved relaxation patterns', icon: Smile },
  { week: 'Week 4+', text: 'Consistent daily support', icon: TrendingUp },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.works-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.works-step',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.works-timeline',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
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
      className="relative w-full py-16 lg:py-24 bg-sage-100 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-56 h-56 lg:w-72 lg:h-72 bg-sage-200/40 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left - Steps */}
          <div>
            <div className="works-title mb-8 lg:mb-10">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-sage-200 rounded-xl mb-4">
                <ClipboardList className="w-5 h-5 lg:w-6 lg:h-6 text-sage-700" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-charcoal-900 leading-tight">
                How it works
              </h2>
              <p className="text-base lg:text-lg text-charcoal-500 mt-3 lg:mt-4">
                Three steps. Thirty seconds. That's it.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="works-step flex gap-4 lg:gap-5 bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-6 hover-lift"
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${step.color} rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-charcoal-400 uppercase tracking-wider">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-charcoal-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-charcoal-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/product/ashwagandha-gummies-ksm66"
              className="inline-flex items-center gap-2 mt-6 lg:mt-8 text-sage-700 font-medium hover:gap-3 transition-all group text-sm lg:text-base"
            >
              Get started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right - Timeline */}
          <div className="works-timeline lg:pt-16">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft">
              <h3 className="text-lg lg:text-xl font-semibold text-charcoal-900 mb-4 lg:mb-6">
                What to expect
              </h3>
              <p className="text-xs lg:text-sm text-charcoal-500 mb-4 lg:mb-6">
                Everyone's body is different. Here's what many people experience:
              </p>
              
              <div className="space-y-3 lg:space-y-4">
                {timeline.map((item, index) => (
                  <div key={item.week} className="flex items-center gap-3 lg:gap-4">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 bg-sage-100 rounded-xl flex items-center justify-center">
                      <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-sage-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-charcoal-400 uppercase tracking-wider">
                        {item.week}
                      </p>
                      <p className="text-sm lg:text-base text-charcoal-700 font-medium">{item.text}</p>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="hidden sm:block w-px h-8 bg-charcoal-200" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-charcoal-100">
                <p className="text-xs text-charcoal-400">
                  *Individual results may vary. Consistency is key.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
