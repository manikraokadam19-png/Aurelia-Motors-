import React, { useRef } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-28 sm:py-36 bg-[#0B0B0F] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                Client Experiences
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="text-neutral-400 font-light text-base sm:text-lg mt-3 max-w-xl">
              Discretion and distinction. Reflections from our esteemed patrons across India’s premier financial and cultural epicenters.
            </p>
          </div>

          {/* Navigation Arrows & Sample Content Notice */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline-block">
              Sample Patron Portfolio
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-11 h-11 rounded-full border border-white/15 bg-black/40 text-neutral-300 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all"
                aria-label="Scroll left testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-11 h-11 rounded-full border border-white/15 bg-black/40 text-neutral-300 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all"
                aria-label="Scroll right testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Testimonial Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="min-w-[320px] sm:min-w-[420px] max-w-[460px] p-8 sm:p-10 bg-[#0E0E14] border border-white/8 rounded-sm snap-start flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-300 group"
            >
              <div>
                {/* 5-Star Rating & Trust Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D4AF37]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Acquisition</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="font-serif-luxury text-lg sm:text-xl text-neutral-200 font-light leading-relaxed italic mb-8">
                  “{item.quote}”
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-medium text-white text-sm">
                    {item.clientName}
                  </div>
                  <div className="text-xs text-neutral-400 font-light">
                    {item.role} · {item.city}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-mono">
                    Delivered Marque
                  </span>
                  <span className="text-xs text-[#D4AF37] font-medium">
                    {item.vehicle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency note as requested */}
        <div className="mt-8 text-center text-xs text-neutral-500 font-light font-mono">
          * Representative sample client profiles for illustrative showcase purposes. Patron confidentiality strictly maintained.
        </div>
      </div>
    </section>
  );
};
