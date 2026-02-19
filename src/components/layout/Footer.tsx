import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, Sparkles, Shield, AlertTriangle } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Ashwagandha Gummies', href: '/product/ashwagandha-gummies-ksm66' },
    { label: 'Shop All Products', href: '/shop' },
    { label: 'Subscribe & Save (15% Off)', href: '/shop' },
    { label: 'Best Sellers', href: '/shop' },
  ],
  learn: [
    { label: 'The Science of KSM-66®', href: '/science' },
    { label: 'Our Quality Promise', href: '/science' },
    { label: 'Ingredient Breakdown', href: '/science' },
    { label: 'Health Benefits', href: '/science' },
  ],
  company: [
    { label: 'About Our Mission', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Wholesale Info', href: '/contact' },
  ],
  support: [
    { label: 'Help Center & FAQ', href: '/#faq' },
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/shipping' },
    { label: 'Privacy & Terms', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: 'mailto:info@one4health.com', label: 'Email' },
];

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white overflow-hidden">
      {/* CTA Section */}
      <div className="bg-sage-700 py-16 lg:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
        <div className="section-container text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">The Daily Ritual Awaits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight max-w-2xl mx-auto">
            Ready to find your center?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/product/ashwagandha-gummies-ksm66"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-sage-700 font-bold rounded-full hover:bg-sage-50 transition-all duration-300 hover:scale-105 shadow-xl text-base"
            >
              Shop Ashwagandha Gummies
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container section-padding pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/images/logo_cropped.png"
                alt="One4Health"
                className="h-10 lg:h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-charcoal-400 text-sm mb-8 leading-relaxed max-w-xs">
              Distilling the best of science and nature into a single, high-performance ritual. Clean wellness for the driven.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center hover:bg-sage-700 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500">Shop</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-charcoal-400 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500">Learn</h4>
            <ul className="space-y-4">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-charcoal-400 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-charcoal-400 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-charcoal-400 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="mt-8 lg:mt-10 py-4 lg:py-5 border-y border-charcoal-800">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-xs text-charcoal-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sage-500" />
              <span>FSSAI Lic. No. 12725998000541</span>
            </div>
            <span className="hidden lg:inline">•</span>
            <span>GST No. 09ACPPS5217E1ZB</span>
            <span className="hidden lg:inline">•</span>
            <span>GMP Certified</span>
            <span className="hidden lg:inline">•</span>
            <span>Made in India</span>
            <span className="hidden lg:inline">•</span>
            <span>Dietary Supplement</span>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-6 lg:mt-8">
          {/* Medical Disclaimer */}
          <div className="bg-charcoal-800/50 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-4 lg:mb-6">
            <p className="text-xs text-charcoal-400 leading-relaxed mb-3">
              <span className="font-medium text-charcoal-300">Disclaimer:</span>{' '}
              *These statements have not been evaluated by the Food and Drug Administration or FSSAI.
              This product is not intended to diagnose, treat, cure, or prevent any disease.
              This is a dietary supplement, not a medicine. Individual results may vary.
            </p>
            <p className="text-xs text-charcoal-400 leading-relaxed mb-3">
              Consult your healthcare provider before use if you are pregnant, nursing, taking medication,
              or have a medical condition. Manufactured in a facility that follows GMP standards.
            </p>
          </div>

          {/* Safety Warnings */}
          <div className="bg-red-900/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex items-start gap-2 lg:gap-3">
              <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-red-200/80 leading-relaxed">
                <p className="font-medium text-red-200 mb-1">Important Safety Information:</p>
                <ul className="space-y-1">
                  <li>• Keep out of reach of children</li>
                  <li>• Do not exceed recommended dosage of 2 gummies per day</li>
                  <li>• For adults 18 years and older only</li>
                  <li>• This is a dietary supplement, not a medicine or drug</li>
                  <li>• Store in a cool, dry place away from direct sunlight</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 lg:gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 lg:gap-4 text-xs text-charcoal-500">
              <span>© 2026 One4Health. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
