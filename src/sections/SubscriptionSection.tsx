import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Truck, Pause, Package, Sparkles, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Zap, text: 'Save 25% every month', desc: '₹599 instead of ₹799' },
  { icon: Truck, text: 'Free shipping', desc: 'Always free, no minimum' },
  { icon: Pause, text: 'Pause or cancel anytime', desc: 'No commitments' },
];

export function SubscriptionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sub-content',
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
        '.sub-card',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
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
      <div className="absolute inset-0 bg-gradient-to-br from-sage-100/50 to-transparent" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="sub-content">
            <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl mb-4">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-sage-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-4">
              Subscribe & save
            </h2>
            <p className="text-base lg:text-lg text-charcoal-500 mb-6">
              Consistency is key. Join our community and never miss your daily calm.
            </p>

            {/* Key benefit */}
            <div className="bg-sage-100 rounded-2xl p-4 lg:p-5 mb-6 lg:mb-8">
              <p className="text-sm text-charcoal-600">
                <span className="font-semibold text-charcoal-900">Daily support, delivered.</span>{' '}
                300mg KSM-66® to help your body's stress response.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-3 lg:gap-4"
                >
                  <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <span className="text-charcoal-900 font-medium text-sm lg:text-base">{benefit.text}</span>
                    <p className="text-xs lg:text-sm text-charcoal-400">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Link
                to="/product/ashwagandha-gummies-ksm66"
                state={{ purchaseType: 'subscribe' }}
                className="bg-sage-700 hover:bg-sage-800 text-white font-semibold px-6 lg:px-8 py-3.5 lg:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group text-sm lg:text-base"
              >
                Start subscription
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/product/ashwagandha-gummies-ksm66"
                state={{ purchaseType: 'onetime' }}
                className="bg-white border-2 border-charcoal-200 text-charcoal-900 font-semibold px-6 lg:px-8 py-3.5 lg:py-4 rounded-full hover:border-sage-300 hover:bg-sage-50 transition-all flex items-center justify-center text-sm lg:text-base"
              >
                Buy once
              </Link>
            </div>
          </div>

          {/* Right - Card */}
          <div className="sub-card relative">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft">
              {/* Price comparison */}
              <div className="flex items-baseline gap-2 lg:gap-3 mb-5 lg:mb-6 flex-wrap">
                <span className="text-3xl lg:text-4xl font-bold text-sage-700">₹599</span>
                <span className="text-lg lg:text-xl text-charcoal-400 line-through">₹799</span>
                <span className="px-2 py-1 bg-coral-100 text-coral-700 rounded-full text-xs font-medium">
                  Save 25%
                </span>
              </div>

              {/* What's included */}
              <div className="space-y-2 lg:space-y-3 mb-5 lg:mb-6">
                <p className="text-xs lg:text-sm font-medium text-charcoal-500 uppercase tracking-wider">
                  Monthly delivery includes:
                </p>
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-sage-600" />
                  </div>
                  <span className="text-charcoal-700 text-sm lg:text-base">1 jar (60 gummies, 30-day supply)</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-sage-600" />
                  </div>
                  <span className="text-charcoal-700 text-sm lg:text-base">Free shipping to your door</span>
                </div>
              </div>

              {/* Community CTA */}
              <div className="flex items-center gap-2 lg:gap-3 pt-4 lg:pt-5 border-t border-charcoal-100">
                <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-sage-600" />
                </div>
                <span className="text-sm text-charcoal-500">Join our community</span>
              </div>
            </div>

            {/* Benefit tag */}
            <div className="absolute -bottom-3 lg:-bottom-4 -right-3 lg:-right-4 bg-sage-700 text-white rounded-xl lg:rounded-2xl px-3 lg:px-4 py-2 lg:py-3 shadow-fun">
              <p className="text-xs text-sage-200">Daily serving</p>
              <p className="font-bold text-sm">300mg KSM-66®</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
