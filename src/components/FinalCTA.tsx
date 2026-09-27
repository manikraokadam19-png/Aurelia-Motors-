import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onExploreClick: () => void;
  onBookConsultationClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onExploreClick,
  onBookConsultationClick,
}) => {
  return (
    <section className="relative min-h-[640px] sm:min-h-[720px] bg-[#070709] flex items-center justify-center overflow-hidden border-b border-white/5 py-24 sm:py-32">
      {/* Background Cinematic Image with Subtle Zoom on Hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none group">
        <img
          src="/src/assets/images/lifestyle_performance_coupe_1790513459304.jpg"
          alt="Aurelia Motors Grand Finale"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105 transition-transform duration-[4000ms] ease-out will-change-transform"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/75 to-[#070709]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/50 to-[#070709]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-[#D4AF37]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
            Begin Your Legacy
          </span>
          <span className="w-8 h-[1px] bg-[#D4AF37]" />
        </div>

        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight mb-6 text-balance leading-[1.05]">
          YOUR NEXT JOURNEY <br className="hidden sm:inline" />
          <span className="italic font-light champagne-gradient-text">STARTS HERE.</span>
        </h2>

        <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Step beyond the ordinary. Let our automotive concierges coordinate your personal test drive, bespoke commission, or sovereign delivery anywhere in India.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/25 hover:border-white text-white font-medium text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 backdrop-blur-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Cars</span>
          </button>

          <button
            onClick={onBookConsultationClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-sm hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <span>Book a Private Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Markers */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>100% Certified Sovereign Provenance</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Discreet All-India Delivery</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Dedicated Personal Concierge</span>
          </div>
        </div>
      </div>
    </section>
  );
};
