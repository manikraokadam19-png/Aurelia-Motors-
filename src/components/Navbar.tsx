import React, { useState, useEffect } from 'react';
import { Search, Heart, Menu, X, ArrowUpRight, User, Shield } from 'lucide-react';
import { PatronUser } from '../types/auth';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenBooking: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenProfile: () => void;
  currentUser: PatronUser | null;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenWishlist,
  onOpenBooking,
  onOpenAuth,
  onOpenProfile,
  currentUser,
  wishlistCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Cars', href: '#collection' },
    { label: 'Collections', href: '#lifestyle' },
    { label: 'Experience', href: '#india-experience' },
    { label: 'About', href: '#concierge' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070709]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Brand title, one line */}
        <a
          href="#hero"
          className="font-display tracking-[0.25em] text-lg sm:text-xl font-medium text-white hover:text-[#D4AF37] transition-colors uppercase whitespace-nowrap"
        >
          AURELIA MOTORS
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.18em] uppercase font-light text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-300 hover:text-white hover:scale-105 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            aria-label="Search luxury inventory"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-neutral-300 hover:text-white hover:scale-105 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            aria-label="View saved automobiles"
          >
            <Heart className="w-[18px] h-[18px]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Login / Sign Up or Patron Profile Trigger */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#15151F] border border-[#D4AF37]/50 text-white hover:bg-[#1A1A28] transition-all text-xs font-mono"
              title="View Patron Account"
            >
              <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden md:inline max-w-[100px] truncate">{currentUser.name}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-sm text-xs font-medium uppercase tracking-wider transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Sign In</span>
              </button>
            </div>
          )}

          {/* Book Consultation Button */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-[#0A0A0C] text-xs font-semibold tracking-wider uppercase rounded-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.15)] whitespace-nowrap"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0D]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-300">
          {currentUser ? (
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="mb-4 p-3 bg-[#13131D] rounded-sm border border-[#D4AF37]/30 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-xs font-medium">{currentUser.name}</div>
                  <div className="text-[10px] text-[#D4AF37] font-mono">{currentUser.tier}</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">View Account →</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="py-2.5 bg-white/5 border border-white/10 text-white rounded-sm text-xs font-mono uppercase tracking-wider text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="py-2.5 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] rounded-sm text-xs font-mono uppercase tracking-wider text-center"
              >
                Create Account
              </button>
            </div>
          )}

          <nav className="flex flex-col gap-4 text-sm tracking-widest uppercase font-light text-neutral-300 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#D4AF37] border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-[#0A0A0C] text-xs font-semibold tracking-widest uppercase rounded-sm text-center"
          >
            Book a Consultation
          </button>
        </div>
      )}
    </header>
  );
};
