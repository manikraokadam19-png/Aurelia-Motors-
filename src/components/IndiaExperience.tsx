import React, { useState } from 'react';
import { CITIES, CityExperience } from '../data/cities';
import { MapPin, Phone, Building2, Eye, KeyRound, Sparkles, ArrowRight } from 'lucide-react';

interface IndiaExperienceProps {
  onBookInCity: (city: CityExperience) => void;
}

export const IndiaExperience: React.FC<IndiaExperienceProps> = ({ onBookInCity }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('mumbai');

  const selectedCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];

  return (
    <section id="india-experience" className="py-28 sm:py-36 bg-[#070709] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              National Presence
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight">
            LUXURY, DELIVERED ACROSS INDIA.
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg mt-3">
            From the coastal sea-links of Mumbai and diplomatic corridors of Delhi NCR to the tech-capital towers of Bengaluru. Seven sovereign ateliers offering bespoke white-glove automotive privileges.
          </p>
        </div>

        {/* City Horizontal Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-white/10 scrollbar-none">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm whitespace-nowrap flex items-center gap-2 ${
                selectedCityId === city.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black font-semibold shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${selectedCityId === city.id ? 'text-black' : 'text-[#D4AF37]'}`} />
              <span>{city.name}</span>
            </button>
          ))}
        </div>

        {/* 2-Zone Grid: Left Interactive India Hub Coordinates Visual / Right Atelier Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Zone: Stylized India Network Map (5 cols) */}
          <div className="lg:col-span-5 bg-[#0C0C12] border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Map Ambient Background */}
            <div className="absolute inset-0 bg-radial from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-4 z-10">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
                Aurelia Sovereign Grid
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {selectedCity.fleetAvailable} Vehicles In Fleet
              </span>
            </div>

            {/* Stylized SVG Map of India with Interactive Hubs */}
            <div className="relative w-full aspect-[4/5] max-h-[380px] my-auto flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[360px] opacity-40 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.1)]"
              >
                {/* Simplified India Territorial Outline */}
                <path
                  d="M 38,12 L 48,15 L 56,22 L 52,32 L 62,35 L 75,40 L 78,48 L 74,52 L 62,55 L 54,65 L 52,78 L 46,88 L 40,82 L 32,68 L 26,55 L 25,40 L 30,30 Z"
                  fill="none"
                  stroke="#3A3A4A"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />
                {/* Connecting Laser Flight/Carrier Lines */}
                <polyline
                  points="32,58 42,28 44,77 48,62 35,62 53,79 74,48"
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.2)"
                  strokeWidth="0.8"
                />
              </svg>

              {/* City Node Pins on Map */}
              {CITIES.map((c) => {
                const isSelected = c.id === selectedCityId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCityId(c.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                    aria-label={`Select ${c.name} Hub`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-[#D4AF37]/30 animate-ping" />
                      )}
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#D4AF37] border-white shadow-[0_0_15px_#D4AF37] scale-125'
                            : 'bg-black border-[#D4AF37]/60 group-hover:border-white group-hover:scale-110'
                        }`}
                      />
                      <span
                        className={`absolute left-5 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm whitespace-nowrap transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#181822] text-[#D4AF37] border border-[#D4AF37]/40 font-bold opacity-100'
                            : 'text-neutral-400 group-hover:text-white opacity-80'
                        }`}
                      >
                        {c.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>NATIONWIDE COVERAGE</span>
              <span className="text-[#D4AF37]">ENCLOSED HYDRAULIC LOGISTICS</span>
            </div>
          </div>

          {/* Right Zone: Selected Atelier Profile & Services (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E0E14] border border-white/10 rounded-sm p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* City Title and Classification */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-white/8">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-1">
                    {selectedCity.state}
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal">
                    {selectedCity.name} Atelier
                  </h3>
                  <div className="text-sm font-medium text-neutral-300 mt-1">
                    {selectedCity.hubName}
                  </div>
                </div>

                <div className="text-xs text-neutral-400 flex items-center gap-2 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedCity.phone}</span>
                </div>
              </div>

              {/* Physical Address */}
              <div className="py-4 text-xs text-neutral-400 flex items-center gap-2 border-b border-white/5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{selectedCity.address}</span>
              </div>

              {/* 4 Core Pillars for that City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                {/* Pillar 1: Showroom */}
                <div className="p-4 bg-[#14141B] rounded-sm border border-white/5 hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-medium mb-2">
                    <Building2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Showroom Availability</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {selectedCity.features.showroom}
                  </p>
                </div>

                {/* Pillar 2: Private Viewing */}
                <div className="p-4 bg-[#14141B] rounded-sm border border-white/5 hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-medium mb-2">
                    <Eye className="w-4 h-4 text-[#D4AF37]" />
                    <span>Private Viewing Lounge</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {selectedCity.features.privateViewing}
                  </p>
                </div>

                {/* Pillar 3: Test Drive */}
                <div className="p-4 bg-[#14141B] rounded-sm border border-white/5 hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-medium mb-2">
                    <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                    <span>Dynamic Test Drive</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {selectedCity.features.testDrive}
                  </p>
                </div>

                {/* Pillar 4: Concierge */}
                <div className="p-4 bg-[#14141B] rounded-sm border border-white/5 hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-medium mb-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Doorstep Concierge</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {selectedCity.features.concierge}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Booking Trigger */}
            <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-light">
                Chauffeur pickup available from major commercial & airport terminals.
              </span>

              <button
                onClick={() => onBookInCity(selectedCity)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap shadow-md"
              >
                <span>Book Experience in {selectedCity.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
