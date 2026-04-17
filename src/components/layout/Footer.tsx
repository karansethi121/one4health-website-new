import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Sparkles, Shield } from 'lucide-react';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const footerLinks = {
  shop: [
    { label: 'Ashwagandha Gummies', href: '/product/ashwagandha-gummies-ksm66' },
    { label: 'Shop All', href: '/shop' },
  ],
  learn: [
    { label: 'Our Science', href: '/science' },
    { label: 'Our Mission', href: '/about' },
  ],
  support: [
    { label: 'Help Center & FAQ', href: '/#faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Privacy & Terms', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/one_4_health', label: 'Instagram' },
  { icon: XLogo, href: 'https://x.com/one_4_health', label: 'X' },
  { icon: Mail, href: 'mailto:info@one4health.com', label: 'Email' },
];

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white overflow-hidden">
      {/* CTA Section */}
      <div className="bg-sage-700 py-12 lg:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
        <div className="section-container text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 lg:mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">The Daily Ritual Awaits</span>
          </div>
          <p className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 lg:mb-8 leading-tight max-w-2xl mx-auto px-4">
            Experience the Daily Ritual
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/product/ashwagandha-gummies-ksm66"
              className="inline-flex items-center justify-center px-8 py-4 lg:px-10 lg:py-5 bg-white text-sage-700 font-bold rounded-full hover:bg-sage-50 transition-all duration-300 hover:scale-105 shadow-xl text-sm lg:text-base"
            >
              Shop Ashwagandha Gummies
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container section-padding pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/images/logo_v2.webp"
                alt="One4Health™"
                className="h-10 lg:h-12 w-auto"
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
                <div className="flex items-center gap-3">
                  <Shield className="w-3.5 h-3.5 text-sage-500" />
                  <span className="leading-none">FSSAI Lic. 12725998000541</span>
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
              © 2025 One4Health™. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
