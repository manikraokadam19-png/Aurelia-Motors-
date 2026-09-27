import React, { useEffect, useRef, useState } from 'react';
import { Gauge, Flame, Wind, Activity } from 'lucide-react';

export const ScrollExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const [activeMode, setActiveMode] = useState<'COMFORT' | 'SPORT' | 'CORSA'>('SPORT');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if entering view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setInView(true);
        // Calculate progress from 0 (entered from bottom) to 1 (passed through top)
        const totalDistance = windowHeight + rect.height;
        const currentProgress = (windowHeight - rect.top) / totalDistance;
        const clamped = Math.max(0, Math.min(1, currentProgress));
        setScrollProgress(clamped);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute translateX for car: moves from right to left as user scrolls
  // At progress 0: +25%, at progress 1: -25%
  const carTranslateX = (0.5 - scrollProgress) * 70; // in percentage

  // Mode specific data
  const modeData = {
    COMFORT: { zeroToHundred: '4.2s', power: '580 HP', topSpeed: '290 KM/H', suspension: 'Active Air Float', exhaust: 'Stealth Whispering Acoustic' },
    SPORT: { zeroToHundred: '3.8s', power: '612 HP', topSpeed: '315 KM/H', suspension: 'Adaptive Dynamic Damping', exhaust: 'Twin Active Bimodal Valves' },
    CORSA: { zeroToHundred: '3.4s', power: '640 HP', topSpeed: '330 KM/H', suspension: 'Track-Stiffened Aero Stance', exhaust: 'Titanium Straight Symphony' },
  };

  const currentSpecs = modeData[activeMode];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] py-24 sm:py-32 bg-gradient-to-b from-[#070709] via-[#0B0B0F] to-[#070709] overflow-hidden flex flex-col justify-center border-y border-white/5"
    >
      {/* Background Subtle Track Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#20202a_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Aerodynamics & Powertrain
            </span>
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl text-white font-normal tracking-tight text-balance">
            ENGINEERED TO BE FELT.
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg mt-3">
            Every millimeter shaped by wind tunnels; every revolution calibrated to elevate your heartbeat on India’s open expressways.
          </p>
        </div>

        {/* Dynamic Drive Mode Segmented Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 bg-[#14141A] rounded-sm border border-white/10">
            {(['COMFORT', 'SPORT', 'CORSA'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-300 rounded-sm ${
                  activeMode === mode
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black shadow-lg shadow-[#D4AF37]/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {mode} MODE
              </button>
            ))}
          </div>
        </div>

        {/* Full-width Cinematic Car Movement Stage */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] max-h-[380px] overflow-hidden my-4 rounded-sm border border-white/8 bg-[#0B0B0E]/80 shadow-2xl flex items-center justify-center">
          {/* Asphalt Motion Road Scrim */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10" />

          {/* Horizontally Moving Luxury Sports Car */}
          <div
            className="w-full h-full flex items-center justify-center will-change-transform transition-transform duration-100 ease-out"
            style={{
              transform: `translateX(${carTranslateX}%) scale(${1 + (scrollProgress - 0.5) * 0.1})`,
            }}
          >
            <img
              src="/src/assets/images/showcase_supercar_silver_1790513441570.jpg"
              alt="Engineered To Be Felt - High Performance Grand Tourer"
              referrerPolicy="no-referrer"
              className="w-[115%] sm:w-[105%] max-w-none h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
            />
          </div>

          {/* Dynamic Laser Stance Line Overlays */}
          <div className="absolute top-6 left-6 text-xs text-neutral-400 font-mono tracking-wider z-20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>DYNAMIC CHASSIS: {currentSpecs.suspension}</span>
          </div>

          <div className="absolute bottom-6 right-6 text-xs text-neutral-400 font-mono tracking-wider z-20 hidden sm:flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EXHAUST MAP: {currentSpecs.exhaust}</span>
          </div>
        </div>

        {/* Specifications Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {/* 0-100 km/h */}
          <div className="p-8 bg-[#0E0E14] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors text-center sm:text-left relative overflow-hidden group">
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-2 flex items-center justify-center sm:justify-start gap-2">
              <Wind className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>0–100 KM/H ACCELERATION</span>
            </div>
            <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white champagne-gradient-text tabular-nums">
              {inView ? currentSpecs.zeroToHundred : '0.0s'}
            </div>
            <p className="text-neutral-500 text-xs mt-2 font-light">
              Instant torque launch control with active aero downforce.
            </p>
          </div>

          {/* Power */}
          <div className="p-8 bg-[#0E0E14] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors text-center sm:text-left relative overflow-hidden group">
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-2 flex items-center justify-center sm:justify-start gap-2">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>RAW HORSEPOWER</span>
            </div>
            <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white champagne-gradient-text tabular-nums">
              {inView ? currentSpecs.power : '0 HP'}
            </div>
            <p className="text-neutral-500 text-xs mt-2 font-light">
              Twin-scroll forced induction with hybrid boost assistance.
            </p>
          </div>

          {/* Top Speed */}
          <div className="p-8 bg-[#0E0E14] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors text-center sm:text-left relative overflow-hidden group">
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-2 flex items-center justify-center sm:justify-start gap-2">
              <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>TOP VELOCITY</span>
            </div>
            <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white champagne-gradient-text tabular-nums">
              {inView ? currentSpecs.topSpeed : '0 KM/H'}
            </div>
            <p className="text-neutral-500 text-xs mt-2 font-light">
              Electronically unlocked on sanctioned closed circuit testing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
