import { useEffect, useRef } from 'react';
import { Truck, RefreshCw, Clock, MapPin, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const shippingMethods = [
  {
    icon: Truck,
    title: 'Standard Shipping',
    duration: '3-5 business days',
    price: 'Free',
    freeThreshold: 'Free on all orders',
  },
];

const policies = [
  {
    icon: RefreshCw,
    title: 'Refund Policy',
    description: 'Due to health and safety standards, we do not accept physical returns. If there is an issue, we provide refunds.',
  },
  {
    icon: Shield,
    title: 'Satisfaction Guarantee',
    description: 'We stand behind our products. If you\'re not happy, we\'ll make it right.',
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    description: 'Orders are processed within 1-2 business days of purchase.',
  },
];

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function ShippingPage() {
  useDocumentTitle('Shipping & Delivery');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shipping-animate',
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
    <main className="w-full pt-[72px] lg:pt-[84px] pb-16">
      {/* Hero */}
      <section ref={heroRef} className="section-container mb-16">
        <div className="text-center max-w-2xl mx-auto shipping-animate">
          <Truck className="w-12 h-12 text-sage-700 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Shipping & Refunds
          </h1>
          <p className="text-lg text-charcoal-600">
            Fast, reliable delivery with a hassle-free refund policy. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="section-container mb-16">
        <h2 className="shipping-animate text-2xl font-heading font-bold text-charcoal-900 mb-8">
          Shipping Options
        </h2>
        <div className="grid gap-6 max-w-md">
          {shippingMethods.map((method) => (
            <div
              key={method.title}
              className="shipping-animate bg-white rounded-3xl p-8 shadow-soft-sm"
            >
              <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center mb-6">
                <method.icon className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                {method.title}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-charcoal-600">
                  <span className="font-medium">Delivery:</span> {method.duration}
                </p>
                <p className="text-charcoal-600">
                  <span className="font-medium">Cost:</span>{' '}
                  <span className="text-sage-700 font-semibold">{method.price}</span>
                </p>
              </div>
              {method.freeThreshold && (
                <p className="text-sm text-sage-700 bg-sage-50 px-3 py-2 rounded-lg inline-block">
                  {method.freeThreshold}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-sage-100 py-16 mb-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="shipping-animate">
              <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-6">
                How Delivery Works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sage-700 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-1">Order Placed</h4>
                    <p className="text-charcoal-600">
                      You place your order and receive an immediate confirmation email.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sage-700 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-1">Processing</h4>
                    <p className="text-charcoal-600">
                      We process your order within 1-2 business days.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sage-700 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-1">Shipped</h4>
                    <p className="text-charcoal-600">
                      Your order ships with tracking information sent to your email.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sage-700 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-1">Delivered</h4>
                    <p className="text-charcoal-600">
                      Your wellness package arrives at your doorstep!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shipping-animate">
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <MapPin className="w-10 h-10 text-sage-700 mb-4" />
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Delivery Coverage
                </h3>
                <p className="text-charcoal-600 mb-6">
                  We currently deliver to all major cities and towns across India.
                  Check if we deliver to your pincode during checkout.
                </p>
                <div className="bg-sage-50 rounded-xl p-4">
                  <p className="text-sm text-charcoal-600">
                    <span className="font-medium">Note:</span> Delivery times may vary
                    for remote locations. We'll keep you updated every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="section-container mb-16">
        <h2 className="shipping-animate text-2xl font-heading font-bold text-charcoal-900 mb-8">
          Our Policies
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy.title}
              className="shipping-animate bg-white rounded-3xl p-8 shadow-soft-sm text-center"
            >
              <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <policy.icon className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">
                {policy.title}
              </h3>
              <p className="text-charcoal-600">{policy.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Refund Process */}
      <section className="section-container">
        <div className="shipping-animate bg-white rounded-3xl p-8 md:p-12 shadow-soft">
          <div className="text-center mb-10">
            <RefreshCw className="w-12 h-12 text-sage-700 mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-4">
              Our Refund Policy
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              As One4Health™ provides premium health supplements, we cannot accept physical returns of our products to ensure the highest safety and quality standards for all customers.
            </p>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto mt-4 font-medium">
              However, your satisfaction is extremely important to us. If you experience any issues with your order, here is how we can help:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sage-700 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Contact Us</h4>
              <p className="text-sm text-charcoal-600">
                Email us at info@one4health.com with your order number and detail the issue you experienced.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sage-700 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Review Process</h4>
              <p className="text-sm text-charcoal-600">
                Our team will review your request within 1-2 business days. We may ask for photos if there was damage during transit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sage-700 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Get Refunded</h4>
              <p className="text-sm text-charcoal-600">
                If approved, we'll process your refund to the original payment method within 5-7 business days, no return required!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
