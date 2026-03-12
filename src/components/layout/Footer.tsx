import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, Sparkles, Shield } from 'lucide-react';

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
          <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight max-w-2xl mx-auto">
            Experience the Daily Ritual
          </p>
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
                src="/images/logo_cropped.webp"
                alt="One4Health™"
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

        {/* Consolidated Certifications & Legal */}
        <div className="mt-8 pt-8 border-t border-charcoal-800">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            {/* Certifications & Licensing */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-charcoal-500 uppercase tracking-wider mb-6">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sage-500" />
                  <span>FSSAI Lic. 12725998000541</span>
                </div>
                <span>GMP</span>
                <span>FSSC 22000</span>
                <span>ISO 9001:2015</span>
                <span>US FDA REGISTERED FACILITY</span>
                <span>MADE IN INDIA</span>
              </div>

              {/* Legal Disclaimer */}
              <p className="text-[10px] text-charcoal-500 leading-relaxed max-w-2xl">
                <span className="text-charcoal-400 font-medium uppercase tracking-tight mr-1">Safety & Compliance:</span>
                *These statements have not been evaluated by the FDA or FSSAI. Not intended to diagnose, treat, or cure any disease.
                Dietary supplement only. Consult your physician if pregnant, nursing, or on medication. Max 2 gummies/day. Adults 18+ only.
                Keep out of reach of children. Store in a cool, dry place.
              </p>
            </div>

            {/* Copyright */}
            <div className="text-[10px] text-charcoal-600 whitespace-nowrap pt-1">
              © 2026 One4Health™. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
