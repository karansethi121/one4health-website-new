import { useEffect, useRef } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqs, shippingFAQs } from '@/data/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function FAQPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-animate',
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
      <section ref={heroRef} className="section-container mb-16">
        <div className="text-center max-w-2xl mx-auto faq-animate">
          <HelpCircle className="w-12 h-12 text-sage-700 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-charcoal-600">
            Everything you need to know about One4Health and our products.
          </p>
        </div>
      </section>

      {/* Product FAQs */}
      <section className="section-container mb-16">
        <h2 className="faq-animate text-2xl font-heading font-bold text-charcoal-900 mb-8">
          Product Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`product-${idx}`}
              className="faq-animate bg-white rounded-2xl mb-3 px-6 border-none shadow-soft-sm"
            >
              <AccordionTrigger className="text-left font-medium text-charcoal-900 hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal-600 pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Shipping FAQs */}
      <section className="section-container mb-16">
        <h2 className="faq-animate text-2xl font-heading font-bold text-charcoal-900 mb-8">
          Shipping & Delivery
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {shippingFAQs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`shipping-${idx}`}
              className="faq-animate bg-white rounded-2xl mb-3 px-6 border-none shadow-soft-sm"
            >
              <AccordionTrigger className="text-left font-medium text-charcoal-900 hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal-600 pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact CTA */}
      <section className="section-container">
        <div className="faq-animate bg-sage-700 rounded-3xl p-8 md:p-12 text-center">
          <MessageCircle className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-sage-700 font-semibold rounded-full hover:bg-sage-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
