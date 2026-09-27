import React from 'react';
import { Instagram, Youtube, Facebook, Linkedin, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#050507] text-neutral-400 py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/8">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5">
            <span className="font-display tracking-[0.25em] text-xl font-normal text-white uppercase block mb-3">
              AURELIA MOTORS
            </span>
            <p className="font-serif-luxury text-lg italic text-[#D4AF37] font-light mb-4">
              “Where Luxury Meets Motion.”
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mb-6">
              India’s distinguished luxury automotive sanctuary. Providing ultra-exclusive acquisition, bespoke customization, and white-glove concierge across the nation.
            </p>

            <div className="space-y-2 text-xs text-neutral-300 font-mono">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Concierge Desk: 1800 209 8899 / +91 (022) 8800 4500</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>curator@aureliamotors.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Worli Seaface, Mumbai · Aerocity, New Delhi · UB City, Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              Exploration
            </div>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">Cars & Marque Fleet</a>
              </li>
              <li>
                <a href="#lifestyle" className="hover:text-white transition-colors">Curated Collections</a>
              </li>
              <li>
                <a href="#india-experience" className="hover:text-white transition-colors">Atelier Experience (7 Cities)</a>
              </li>
              <li>
                <a href="#concierge" className="hover:text-white transition-colors">About Aurelia Concierge</a>
              </li>
              {onOpenAuth && (
                <>
                  <li>
                    <button
                      onClick={() => onOpenAuth('login')}
                      className="text-[#D4AF37] hover:underline transition-colors"
                    >
                      Patron Sign In
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onOpenAuth('signup')}
                      className="text-neutral-300 hover:text-white transition-colors"
                    >
                      Join Sovereign Circle (Sign Up)
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Legal & Governance (2 cols) */}
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              Governance
            </div>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#provenance" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Provenance Certificate</a>
              </li>
              <li>
                <a href="#customs" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Customs & Homologation</a>
              </li>
              <li>
                <a href="#discretion" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Client Discretion Charter</a>
              </li>
            </ul>
          </div>

          {/* Social Icons & Back to Top (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
                Connect
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#121217] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                  aria-label="Aurelia Motors Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#121217] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                  aria-label="Aurelia Motors YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#121217] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                  aria-label="Aurelia Motors Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#121217] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                  aria-label="Aurelia Motors LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                <span>TOP OF PAGE</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-mono gap-4">
          <div>
            © 2026 Aurelia Motors. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>GST Registered India</span>
            <span>·</span>
            <span>Zero-Commission Treasury Consulting</span>
            <span>·</span>
            <span>Mumbai · Delhi · Bengaluru · Hyderabad · Pune · Chennai · Kolkata</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
