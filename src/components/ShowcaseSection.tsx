import React, { useState } from 'react';
import { CARS, CarModel } from '../data/cars';
import { ChevronLeft, ChevronRight, Zap, ArrowUpRight, Gauge, Activity, ShieldCheck } from 'lucide-react';

interface ShowcaseSectionProps {
  onSelectCar: (car: CarModel) => void;
  onBookTestDrive: (car: CarModel) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  onSelectCar,
  onBookTestDrive,
}) => {
  const showcaseCars = CARS.slice(0, 5); // 5 hero vehicles
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentCar = showcaseCars[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseCars.length);
    setSelectedColorIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseCars.length) % showcaseCars.length);
    setSelectedColorIndex(0);
  };

  const activeColor = currentCar.availableColors[selectedColorIndex] || currentCar.availableColors[0];

  return (
    <section id="showcase" className="py-28 sm:py-36 bg-[#0B0B0F] border-b border-white/5 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[180px] pointer-events-none rounded-full transition-colors duration-700"
        style={{
          backgroundColor: activeColor ? `${activeColor.hex}15` : 'rgba(212, 175, 55, 0.08)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                The Spotlight
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight">
              CHOOSE YOUR STATEMENT.
            </h2>
            <p className="text-neutral-400 font-light text-base sm:text-lg mt-3 max-w-xl">
              Interact with our marquee fleet. Command unmatched bespoke bespoke engineering tailored for discerning patrons.
            </p>
          </div>

          {/* Elegant Circular Navigation Controls */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm tracking-widest text-neutral-400">
              <span className="text-[#D4AF37] font-bold">0{currentIndex + 1}</span>
              <span className="mx-1 text-neutral-600">/</span>
              <span>0{showcaseCars.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/15 bg-black/40 text-neutral-300 hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                aria-label="Previous showcase vehicle"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/15 bg-black/40 text-neutral-300 hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                aria-label="Next showcase vehicle"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Central Stage: 2-Zone Grid (Left Info + Hero Image + Right Specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Car Details & Actions (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-2">
              {currentCar.brand} · {currentCar.category}
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal mb-3 leading-tight">
              {currentCar.name}
            </h3>

            <p className="font-serif-luxury text-lg italic text-neutral-300 mb-4">
              “{currentCar.tagline}”
            </p>

            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
              {currentCar.overview}
            </p>

            {/* Price in INR */}
            <div className="p-4 bg-[#14141A] border border-white/10 rounded-sm mb-6">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-light">
                Indicative On-Road Price in India
              </span>
              <span className="text-2xl font-mono text-white font-semibold gold-gradient-text">
                {currentCar.priceINR}
              </span>
            </div>

            {/* Exterior Color Swatch Selector */}
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-2 font-mono">
                Bespoke Finish: <span className="text-white">{activeColor?.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {currentCar.availableColors.map((color, cIdx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(cIdx)}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                      selectedColorIndex === cIdx
                        ? 'border-[#D4AF37] scale-110 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                        : 'border-white/20 hover:border-white/60'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select finish ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onBookTestDrive(currentCar)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>Book Test Drive</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectCar(currentCar)}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-widest rounded-sm border border-white/15 transition-all text-center"
              >
                View Specs
              </button>
            </div>
          </div>

          {/* Center Stage: Large Vehicle Showcase Image (5 cols) */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative aspect-[16/11] rounded-sm overflow-hidden border border-white/10 bg-[#070709] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                key={currentCar.id}
                src={currentCar.image}
                alt={currentCar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-all duration-700 ease-out will-change-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent opacity-80" />

              {/* Watermark-free subtle vehicle tag */}
              <div className="absolute bottom-4 left-4 text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
                Aurelia Certified Reserve
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Telemetry Specifications (3 cols) */}
          <div className="lg:col-span-3 space-y-4 order-3">
            {/* Spec 1: Power */}
            <div className="p-5 bg-[#121218] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-400 font-mono mb-1">
                <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>MAXIMUM POWER</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight tabular-nums">
                {currentCar.specs.power.split('+')[0].trim()}
              </div>
              <div className="text-[11px] text-neutral-500 font-light mt-1">
                {currentCar.specs.engine.split('with')[0].trim()}
              </div>
            </div>

            {/* Spec 2: Torque */}
            <div className="p-5 bg-[#121218] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-400 font-mono mb-1">
                <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>PEAK TORQUE</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight tabular-nums">
                {currentCar.specs.torque}
              </div>
              <div className="text-[11px] text-neutral-500 font-light mt-1">
                Delivered across broad usable rev band
              </div>
            </div>

            {/* Spec 3: 0-100 */}
            <div className="p-5 bg-[#121218] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-400 font-mono mb-1">
                <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>0–100 KM/H</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#E5C378] tracking-tight tabular-nums">
                {currentCar.specs.acceleration}
              </div>
              <div className="text-[11px] text-neutral-500 font-light mt-1">
                Top Speed: {currentCar.specs.topSpeed}
              </div>
            </div>

            {/* Spec 4: Drivetrain / Range */}
            <div className="p-5 bg-[#121218] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-400 font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DRIVETRAIN</span>
              </div>
              <div className="text-base font-medium text-white truncate">
                {currentCar.specs.drivetrain}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-1">
                Efficiency: {currentCar.specs.rangeOrFuel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
