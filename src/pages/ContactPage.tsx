import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@one4health.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 7767-968-079',
    description: 'Mon-Sat, 10am-6pm IST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Lucknow, India',
    description: 'By appointment only',
  },
];

export function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: 'We\'ll get back to you within 24 hours.',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <main className="w-full pt-24 pb-16">
      {/* Hero */}
      <section ref={heroRef} className="section-container mb-16">
        <div className="text-center max-w-2xl mx-auto contact-animate">
          <MessageCircle className="w-12 h-12 text-sage-700 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-charcoal-600">
            Have a question or feedback? We'd love to hear from you.
            Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-container mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="contact-animate bg-white rounded-3xl p-8 shadow-soft-sm text-center"
            >
              <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <info.icon className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-1">
                {info.title}
              </h3>
              <p className="text-sage-700 font-medium mb-1">{info.content}</p>
              <p className="text-sm text-charcoal-500">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="contact-animate">
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="rounded-xl border-charcoal-200 focus:border-sage-500 focus:ring-sage-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="rounded-xl border-charcoal-200 focus:border-sage-500 focus:ring-sage-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    className="rounded-xl border-charcoal-200 focus:border-sage-500 focus:ring-sage-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your question or feedback..."
                    required
                    rows={5}
                    className="rounded-xl border-charcoal-200 focus:border-sage-500 focus:ring-sage-500 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="contact-animate">
            <div className="bg-sage-700 rounded-3xl p-8 text-white h-full">
              <Clock className="w-10 h-10 mb-6" />
              <h2 className="text-2xl font-heading font-bold mb-4">
                Quick Answers
              </h2>
              <p className="text-white/80 mb-8">
                Before reaching out, check if your question is answered in our FAQ section.
              </p>
              <div className="space-y-4">
                {[
                  'How long does shipping take?',
                  'What is your return policy?',
                  'How do I track my order?',
                  'Are your products vegan?',
                ].map((question) => (
                  <a
                    key={question}
                    href="/faq"
                    className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <p className="font-medium">{question}</p>
                  </a>
                ))}
              </div>
              <a
                href="/faq"
                className="inline-flex items-center gap-2 mt-6 text-white/90 hover:text-white"
              >
                View all FAQs
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
