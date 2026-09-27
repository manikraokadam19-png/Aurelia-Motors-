import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Zap, Award, Compass } from 'lucide-react';

interface LifestyleSectionProps {
  onSelectCategory: (category: 'PERFORMANCE' | 'EXECUTIVE' | 'SUV' | 'ELECTRIC') => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ onSelectCategory }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const lifestyles = [
    {
      category: 'PERFORMANCE' as const,
      title: 'PERFORMANCE',
      tagline: 'Built for adrenaline.',
      description: 'Precision engineered for the circuit and the open highway. Relentless acceleration and razor-sharp steering feedback.',
      image: '/src/assets/images/lifestyle_performance_coupe_1790513459304.jpg',
      icon: Zap,
      curatedCount: '4 Flagship Models',
    },
    {
      category: 'EXECUTIVE' as const,
      title: 'EXECUTIVE',
      tagline: 'Command every arrival.',
      description: 'An acoustic sanctuary where business and solace converge. Chauffeur-driven master suites with uninterrupted composure.',
      image: '/src/assets/images/lifestyle_executive_limousine_1790513473756.jpg',
      icon: Award,
      curatedCount: '5 Stately Saloons',
    },
    {
      category: 'SUV' as const,
      title: 'SUV',
      tagline: 'Luxury without limits.',
      description: 'Uncompromising altitude and supreme all-terrain mastery. Unfazed by monsoon downpours or rugged mountain passes.',
      image: '/src/assets/images/lifestyle_luxury_suv_1790513488066.jpg',
      icon: Compass,
      curatedCount: '6 Sovereign Vehicles',
    },
    {
      category: 'ELECTRIC' as const,
      title: 'ELECTRIC',
      tagline: 'The future, electrified.',
      description: 'Silent velocity with zero local emissions. Next-generation 800V fast-charging architectures designed for modern India.',
      image: '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
      icon: ShieldCheck,
      curatedCount: '3 Avant-Garde EVs',
    },
  ];

  return (
    <section id="lifestyle" className="py-28 sm:py-36 bg-[#070709] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Curated Philosophies
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight">
            EXPLORE BY LIFESTYLE
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg mt-3">
            Whether you command the boardroom from a sound-isolated rear lounge or carve through mountain switchbacks at dawn, discover your natural alignment.
          </p>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lifestyles.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.category}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectCategory(item.category)}
                className="group relative h-[440px] sm:h-[480px] rounded-sm overflow-hidden border border-white/8 hover:border-[#D4AF37]/60 transition-all duration-700 cursor-pointer shadow-xl flex flex-col justify-end p-8 sm:p-10"
              >
                {/* Background Photography with Parallax/Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className={`w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05] transition-all duration-1000 ease-out will-change-transform ${
                      isHovered ? 'scale-110 brightness-[0.88]' : 'scale-100'
                    }`}
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent" />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Top Badge (Unboxed text with icon) */}
                <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#D4AF37] font-medium">
                    <Icon className="w-4 h-4" />
                    <span>{item.curatedCount}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-black group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content at Bottom */}
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-1 font-light">
                    Category {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>

                  <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal tracking-wide mb-2 group-hover:text-[#E8D8C4] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-serif-luxury text-xl sm:text-2xl italic text-[#D4AF37] font-light mb-3">
                    “{item.tagline}”
                  </p>

                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>

                  {/* Explore Link */}
                  <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-medium border-b border-[#D4AF37]/30 pb-0.5 group-hover:border-[#D4AF37] transition-all">
                    <span>Explore {item.title} Range</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
