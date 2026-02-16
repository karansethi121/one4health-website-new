import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone, Sparkles, Shield, AlertTriangle } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Ashwagandha Gummies', href: '/product/ashwagandha-gummies-ksm66' },
    { label: 'Shop All', href: '/shop' },
    { label: 'Subscribe & Save', href: '/shop' },
  ],
  learn: [
    { label: 'Our Story', href: '/about' },
    { label: 'Science & Ingredients', href: '/science' },
    { label: 'FAQ', href: '/#faq' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: 'mailto:hello@one4health.com', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white">
      {/* CTA Section */}
      <div className="bg-sage-700 py-12 lg:py-16">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">New Launch Special</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start your daily ritual today.
          </h2>
          <p className="text-white/80 mb-6 lg:mb-8 max-w-lg mx-auto text-sm lg:text-base">
            Be among the first to experience One4Health. 300mg KSM-66® daily to support your stress response.
          </p>
          <Link
            to="/product/ashwagandha-gummies-ksm66"
            className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-white text-sage-700 font-semibold rounded-full hover:bg-sage-50 transition-all duration-300 hover:scale-105 text-sm lg:text-base"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-10 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/images/logo_cropped.png" 
                alt="One4Health" 
                className="h-10 lg:h-12 w-auto"
              />
            </Link>
            <p className="text-charcoal-400 text-sm mb-5 max-w-xs">
              Daily wellness, simplified. Clean, science-backed dietary supplements for modern life.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-5">
              <a href="mailto:hello@one4health.com" className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                hello@one4health.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-2 text-sm text-charcoal-400">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-charcoal-800 flex items-center justify-center hover:bg-sage-700 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 lg:mb-4 text-sm lg:text-base">Shop</h4>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-charcoal-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 lg:mb-4 text-sm lg:text-base">Learn</h4>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-charcoal-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 lg:mb-4 text-sm lg:text-base">Support</h4>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-charcoal-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
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
              <span>FSSAI Lic. No. 12345678901234</span>
            </div>
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
}
