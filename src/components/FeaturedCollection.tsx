import React, { useState } from 'react';
import { CARS, CarModel } from '../data/cars';
import { Heart, ArrowRight, Gauge, Zap } from 'lucide-react';

interface FeaturedCollectionProps {
  onSelectCar: (car: CarModel) => void;
  onToggleWishlist: (carId: string) => void;
  wishlist: string[];
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  onSelectCar,
  onToggleWishlist,
  wishlist,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'EXECUTIVE' | 'PERFORMANCE' | 'SUV' | 'ELECTRIC'>('ALL');

  const filteredCars = filter === 'ALL' ? CARS : CARS.filter((c) => c.category === filter);

  return (
    <section id="collection" className="py-28 sm:py-36 bg-[#070709] relative">
      {/* Decorative subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                The Aurelia Sanctuary
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight">
              THE COLLECTION
            </h2>
            <p className="text-neutral-400 font-light text-base sm:text-lg mt-3 max-w-xl">
              Exceptional machines. Curated for exceptional journeys. Every automobile is thoroughly authenticated and held to sovereign provenance standards.
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented Tabs) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#121217] rounded-sm border border-white/5 overflow-x-auto">
            {(['ALL', 'EXECUTIVE', 'PERFORMANCE', 'SUV', 'ELECTRIC'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 rounded-sm whitespace-nowrap ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column / 2-Column Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => {
            const isSaved = wishlist.includes(car.id);
            return (
              <div
                key={car.id}
                onClick={() => onSelectCar(car)}
                className="group relative bg-[#0D0D12] rounded-sm border border-white/8 overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.12)] transition-all duration-500 flex flex-col cursor-pointer hover:-translate-y-1.5"
              >
                {/* Image Container with Slow Zoom & Scrim */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#15151C]">
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-108 transition-all duration-700 ease-out"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-black/30 group-hover:from-[#0D0D12]/95 group-hover:via-[#0D0D12]/40 transition-all duration-500" />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(car.id);
                    }}
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isSaved
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80'
                    }`}
                    aria-label={`Save ${car.name} to wishlist`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* Unboxed Metadata on Card */}
                  <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-[11px] tracking-widest uppercase text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4AF37] font-medium">{car.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{car.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-300 font-mono">
                      <Zap className="w-3 h-3 text-[#D4AF37]" />
                      <span>{car.specs.power.split('+')[0].trim()}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal group-hover:text-[#E8D8C4] transition-colors leading-snug">
                      {car.name}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                      {car.overview}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-6 pt-5 border-t border-white/6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-light">
                        Starting From
                      </span>
                      <span className="text-base sm:text-lg font-medium text-white font-mono tracking-tight text-amber-50">
                        {car.priceINR}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#D4AF37] font-medium group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Metallic Glow Line at Bottom on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* View All Cars Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setFilter('ALL')}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-sm bg-transparent border border-white/20 text-neutral-300 hover:text-white hover:border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 group"
          >
            <span>View All Curated Automobiles ({CARS.length})</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
