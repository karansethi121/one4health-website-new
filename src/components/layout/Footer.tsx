import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

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
    { label: 'The Science', href: '/science' },
    { label: 'Our Story', href: '/about' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  reach: [
    { label: 'info@one4health.com', href: 'mailto:info@one4health.com' },
    { label: '@one_4_health', href: 'https://www.instagram.com/one_4_health' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/one_4_health', label: 'Instagram' },
  { icon: XLogo, href: 'https://x.com/one_4_health', label: 'X' },
  { icon: Mail, href: 'mailto:info@one4health.com', label: 'Email' },
];

export const Footer = memo(function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F3D2E', color: '#F7F1E3' }} className="overflow-hidden">

      {/* ── CTA Band ──────────────────────────────────────────────────── */}
      <div className="border-b-2 border-lime/20 py-12 lg:py-16 relative overflow-hidden">
        {/* Decorative lime blob */}
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-[0.08] pointer-events-none"
          style={{ background: '#C7F25C' }}
        />
        <div className="section-container relative z-10 text-center">
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-pill border border-lime/30"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#C7F25C' }}
          >
            First jar · ₹369
          </span>
          <h2
            className="mb-6 text-balance"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, letterSpacing: '-0.035em', fontSize: 'clamp(32px, 5vw, 56px)', color: '#F7F1E3' }}
          >
            Calm in a chew.{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#C7F25C' }}>
              Loud on the feed.
            </em>
          </h2>
          <p style={{ color: '#F7F1E3', opacity: 0.7, fontFamily: "'DM Sans', sans-serif", fontSize: '17px' }} className="mb-10 max-w-md mx-auto">
            Was ₹449. Ghost us if it doesn't work — 15-day refund, no questions asked.
          </p>
          <Link
            to="/product/ashwagandha-gummies-ksm66"
            className="btn-lime text-base"
          >
            Add to Cart — ₹369
          </Link>
        </div>
      </div>

      {/* ── Main Footer Grid ───────────────────────────────────────────── */}
      <div className="section-container py-10 lg:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-7 lg:gap-6">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img
                src="/images/logo_transparent.webp"
                alt="One4Health"
                className="h-12 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300"
                draggable={false}
              />
            </Link>

            <p style={{ color: '#F7F1E3', opacity: 0.55, fontSize: '13px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }} className="mb-5 max-w-xs">
              Ashwagandha that doesn't taste like soil. Made in India, built for the driven.
            </p>

            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-lime/20 flex items-center justify-center transition-all duration-200 hover:border-lime hover:bg-lime/10"
                  style={{ color: '#F7F1E3' }}
                  aria-label={s.label}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col} className="space-y-3">
              <h4
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#C7F25C', opacity: 0.7 }}
              >
                {col === 'reach' ? 'Reach us' : col.charAt(0).toUpperCase() + col.slice(1)}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{ color: '#F7F1E3', opacity: 0.55, fontSize: '13px', fontFamily: "'DM Sans', sans-serif" }}
                        className="hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        style={{ color: '#F7F1E3', opacity: 0.55, fontSize: '13px', fontFamily: "'DM Sans', sans-serif" }}
                        className="hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-8 pt-6 border-t border-lime/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F7F1E3', opacity: 0.35 }}
                className="flex flex-wrap gap-x-4 gap-y-1 mb-3"
              >
                <span>FSSAI · 12725998000541</span>
                <span>GMP</span>
                <span>FSSC 22000</span>
                <span>ISO 9001:2015</span>
                <span>US FDA Registered</span>
                <span>Made in India</span>
              </div>
              <p
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F7F1E3', opacity: 0.25 }}
                className="max-w-2xl leading-relaxed"
              >
                *These statements have not been evaluated by the FDA or FSSAI. Not intended to diagnose, treat, or cure any disease. Consult your physician if pregnant or on medication. Adults 18+. Max 2 gummies/day.
              </p>
            </div>
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F7F1E3', opacity: 0.4, whiteSpace: 'nowrap' }}
            >
              © 2026 One4Health · Made in India · Built for the team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});
