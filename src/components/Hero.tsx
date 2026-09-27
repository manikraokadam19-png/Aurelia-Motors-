import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBookViewingClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBookViewingClick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#070709] flex items-end pb-20 sm:pb-24">
      {/* Background Cinematic Image with Subtle Slow Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg"
          alt="Aurelia Motors Flagship Luxury Automobile at Night"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] transition-all duration-[2400ms] ease-out will-change-transform ${
            loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />

        {/* Ambient Dark Scrims & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/90 via-[#070709]/30 to-transparent max-w-4xl" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#070709]/80 to-transparent" />

        {/* Ambient Golden Light Sweep Across Road & Bodywork */}
        <div
          className={`absolute inset-0 opacity-40 mix-blend-screen pointer-events-none transition-opacity duration-1000 ${
            loaded ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse 65% 45% at 45% 75%, rgba(212, 175, 55, 0.18) 0%, rgba(197, 168, 128, 0.05) 50%, transparent 80%)',
          }}
        />

        {/* Subtle Stardust / Floating Light Reflections */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping [animation-duration:4s]" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse [animation-duration:5s]" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[#E5C378] rounded-full animate-pulse [animation-duration:6s]" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl">
          {/* Subtle Brand Tagline Kicker */}
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              Where Luxury Meets Motion · India
            </span>
          </div>

          {/* Line-by-Line Headline Reveal */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.98] tracking-tight text-white mb-6 text-balance">
            <span
              className={`block transition-all duration-1000 delay-500 will-change-transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              DRIVE THE
            </span>
            <span
              className={`block italic font-light champagne-gradient-text transition-all duration-1000 delay-700 will-change-transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              EXTRAORDINARY.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-neutral-300 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10 transition-all duration-1000 delay-900 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Discover a curated collection of exceptional automobiles designed for those who expect more. Sovereign saloons, grand tourers, and all-terrain commanding prestige.
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-1000 delay-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-sm hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Collection</span>
            </button>

            <button
              onClick={onBookViewingClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black/40 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-sm border border-white/20 hover:border-white/40 active:scale-[0.98] transition-all duration-300 backdrop-blur-md"
            >
              <span>Book a Private Viewing</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        className={`absolute bottom-8 right-6 sm:right-10 z-10 flex items-center gap-3 transition-all duration-1000 delay-1200 cursor-pointer ${
          loaded ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        onClick={onExploreClick}
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-light hover:text-white transition-colors">
          SCROLL TO EXPLORE
        </span>
        <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 animate-bounce">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
};
