import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'When will I feel results?',
    answer: 'Everyone\'s body is different. Many people report feeling more balanced within the first week, with optimal support typically experienced after 2-4 weeks of consistent daily use. Consistency is key—take your two gummies at the same time each day.',
  },
  {
    question: 'Can I take this with other medications?',
    answer: 'We recommend consulting with your healthcare provider before combining supplements or if you\'re taking any medications, especially sedatives. While Ashwagandha is generally well-tolerated, it\'s always best to check with your doctor first.',
  },
  {
    question: 'Is this safe for long-term use?',
    answer: 'KSM-66® Ashwagandha has been studied for both short-term and long-term use. Many people incorporate it into their daily wellness routine for extended periods. As with any supplement, we recommend periodic check-ins with your healthcare provider.',
  },
  {
    question: 'What\'s the difference between KSM-66 and regular Ashwagandha?',
    answer: 'KSM-66® is a full-spectrum root extract (using only the root, not leaves) backed by 24+ clinical studies. Most generic Ashwagandha supplements use lower-quality extracts or include leaves, which contain different compounds. KSM-66® maintains the natural balance of the herb for optimal efficacy.',
  },
  {
    question: 'Is it safe for pregnancy/breastfeeding?',
    answer: 'We do not recommend taking this product during pregnancy or while breastfeeding. Please consult your healthcare provider for personalized guidance on supplements during these periods.',
  },
  {
    question: 'What\'s the difference between Vitamin D2 and D3?',
    answer: 'We use Vitamin D2 (Ergocalciferol)—a 100% plant-based form suitable for vegans. Unlike typical animal-derived D3, our D2 is sourced from plants, making it ideal for those following a vegan lifestyle while still supporting mood balance and immune function.',
  },
  {
    question: 'Is this Ayurvedic?',
    answer: 'Ashwagandha (Withania somnifera) is a revered herb in traditional Ayurvedic medicine, used for thousands of years as a Rasayana (rejuvenative tonic). Our KSM-66® extract uses the traditional root-only preparation method, staying true to Ayurvedic principles while being validated by modern clinical research.',
  },
  {
    question: 'Is Cash on Delivery (COD) available?',
    answer: 'Yes! We offer Cash on Delivery (COD) across India for orders above ₹499. A small COD fee of ₹49 applies. You can also pay via UPI, Credit/Debit cards, Net Banking, or Wallets for instant order processing.',
  },
  {
    question: 'Can I return opened products?',
    answer: 'Yes, we stand behind our product! If you\'re not satisfied after trying One4Health, you can return opened bottles within 30 days for a full refund. We want you to feel confident trying our gummies risk-free.',
  },
  {
    question: 'What\'s your return policy?',
    answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your purchase, contact us for a full refund—no questions asked. We want you to feel confident trying One4Health.',
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-title',
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
        '.faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
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
      id="faq"
      className="relative w-full py-24 lg:py-32 bg-sage-50 overflow-hidden"
    >
      <div className="section-container">
        {/* Title */}
        <div className="faq-title text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-4xl mb-4">❓</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-charcoal-500">
            Everything you need to know about One4Health.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`} 
                className="faq-item bg-white rounded-2xl mb-3 px-6 border-none shadow-soft-sm"
              >
                <AccordionTrigger className="text-left font-medium text-charcoal-900 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal-600 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
