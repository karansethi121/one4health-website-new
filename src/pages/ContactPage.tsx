import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  useDocumentTitle('Contact Us');
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      
      const { data, error } = await supabase.functions.invoke('shopify-contact-sync', {
        body: formData
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: 'Message Sent!',
        description: 'Your message has been synced with Shopify. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('[Contact] Submission error:', err);
      toast({
        title: 'Submission Failed',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* Main Content */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info & FAQ */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="contact-animate bg-white rounded-3xl p-8 shadow-soft-sm flex items-start gap-6"
                >
                  <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-sage-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-sage-700 font-medium mb-1">{info.content}</p>
                    <p className="text-sm text-charcoal-500">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Preview */}
            <div className="contact-animate bg-sage-700 rounded-3xl p-8 text-white">
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

          {/* Right: Custom Form (Shopify Synced) */}
          <div className="contact-animate bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-soft-md border border-sage-100">
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-2">
                Send a Message
              </h2>
              <p className="text-charcoal-600">
                Your message will be synced directly with your Shopify profile for efficient support.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-2xl border-sage-200 focus:ring-sage-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-2xl border-sage-200 focus:ring-sage-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="rounded-2xl border-sage-200 focus:ring-sage-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[150px] rounded-2xl border-sage-200 focus:ring-sage-400 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-sage-900 hover:bg-black text-white py-6 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {submitting ? 'Syncing...' : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
