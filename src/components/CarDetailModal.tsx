import React, { useState } from 'react';
import { CarModel } from '../data/cars';
import { X, Heart, Zap, Gauge, Wind, ShieldCheck, Check, ArrowRight, Share2, Sparkles } from 'lucide-react';

interface CarDetailModalProps {
  car: CarModel | null;
  onClose: () => void;
  onBookTestDrive: (car: CarModel) => void;
  onToggleWishlist: (carId: string) => void;
  isWishlisted: boolean;
}

type TabType = 'overview' | 'performance' | 'design' | 'technology' | 'safety' | 'specs';

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onBookTestDrive,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!car) return null;

  const activeColor = car.availableColors[selectedColorIdx] || car.availableColors[0];
  const galleryImages = car.gallery.length > 0 ? car.gallery : [car.image];
  const currentImage = galleryImages[activeImageIdx] || car.image;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-[#09090D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-20 bg-[#09090D]/90 backdrop-blur-md px-6 py-4 border-b border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
              {car.brand}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-mono">{car.category}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              title="Copy link to automobile"
              aria-label="Share vehicle"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onToggleWishlist(car.id)}
              className={`p-2 rounded-full transition-colors ${
                isWishlisted ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close vehicle details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-10">
          {/* Hero Header & Gallery Zone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Main Stage Image + Thumbnails (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-black border border-white/10 group">
                <img
                  src={currentImage}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Selected Color Overlay Marker */}
                <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: activeColor.hex }} />
                  <span>{activeColor.name}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-[16/10] w-20 rounded-sm overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx ? 'border-[#D4AF37] scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Quick Spec Header & Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal leading-tight mb-2">
                  {car.name}
                </h2>
                <p className="font-serif-luxury text-lg italic text-[#D4AF37] font-light mb-4">
                  “{car.tagline}”
                </p>

                {/* Pricing Block */}
                <div className="p-5 bg-[#121218] border border-white/8 rounded-sm mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-light">
                    Indicative Ex-Showroom / On-Road India
                  </span>
                  <div className="text-3xl font-mono text-white font-semibold gold-gradient-text mt-1">
                    {car.priceINR}
                  </div>
                  <span className="text-[11px] text-neutral-500 font-light block mt-1">
                    Taxes, registration & bespoke tailoring options extra.
                  </span>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2 font-mono">
                    Palette: <strong className="text-white font-medium">{activeColor.name}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {car.availableColors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColorIdx === idx
                            ? 'border-[#D4AF37] scale-110 shadow-[0_0_10px_#D4AF37]'
                            : 'border-white/20 hover:border-white/50'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* 4 Mini Spec Chips */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/8">
                  <div className="p-3 bg-[#13131A] rounded-sm border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Power</span>
                    <span className="text-sm font-mono font-semibold text-white">{car.specs.power.split('+')[0]}</span>
                  </div>
                  <div className="p-3 bg-[#13131A] rounded-sm border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">0–100 km/h</span>
                    <span className="text-sm font-mono font-semibold text-[#D4AF37]">{car.specs.acceleration}</span>
                  </div>
                  <div className="p-3 bg-[#13131A] rounded-sm border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Top Velocity</span>
                    <span className="text-sm font-mono font-semibold text-white">{car.specs.topSpeed.split('(')[0]}</span>
                  </div>
                  <div className="p-3 bg-[#13131A] rounded-sm border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Torque</span>
                    <span className="text-sm font-mono font-semibold text-white">{car.specs.torque}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/8">
                <button
                  onClick={() => {
                    onClose();
                    onBookTestDrive(car);
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  <span>Book Test Drive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onBookTestDrive(car);
                  }}
                  className="py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-widest rounded-sm border border-white/15 transition-all text-center"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>

          {/* Tabbed In-Depth Sections */}
          <div className="pt-6 border-t border-white/10">
            {/* Tab navigation */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'overview', label: 'Overview' },
                  { id: 'performance', label: 'Performance' },
                  { id: 'design', label: 'Design' },
                  { id: 'technology', label: 'Technology' },
                  { id: 'safety', label: 'Safety' },
                  { id: 'specs', label: 'Specifications' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#1C1C24] text-[#D4AF37] border-b-2 border-[#D4AF37]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Panes */}
            <div className="pt-6">
              {activeTab === 'overview' && (
                <div className="max-w-4xl space-y-4">
                  <h3 className="font-serif-luxury text-2xl text-white">Curator’s Overview</h3>
                  <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                    {car.overview}
                  </p>
                  <div className="p-4 bg-[#111117] rounded-sm border border-white/5 mt-4 text-xs text-neutral-400 font-light">
                    Every Aurelia vehicle comes with Indian homologation compliance, 4-year unlimited kilometre warranty, dedicated concierge hotline, and door-to-door enclosed logistics.
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#111117] rounded-sm border border-white/5">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Powertrain</span>
                    <h4 className="text-lg font-medium text-white mt-1 mb-2">{car.specs.engine}</h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Transmission: {car.specs.transmission}. Equipped with electronic launch management and intelligent torque vectoring.
                    </p>
                  </div>
                  <div className="p-6 bg-[#111117] rounded-sm border border-white/5">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Dynamic Stance</span>
                    <h4 className="text-lg font-medium text-white mt-1 mb-2">{car.specs.drivetrain}</h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Active dynamic suspension tuned for Indian metropolitan avenues and cross-country expressways.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="max-w-4xl space-y-4">
                  <h3 className="font-serif-luxury text-2xl text-white">Sculptural Form & Architecture</h3>
                  <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                    {car.designHighlight}
                  </p>
                </div>
              )}

              {activeTab === 'technology' && (
                <div className="max-w-4xl space-y-4">
                  <h3 className="font-serif-luxury text-2xl text-white">Acoustics & Digital Interface</h3>
                  <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                    {car.techHighlight}
                  </p>
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="max-w-4xl space-y-4">
                  <h3 className="font-serif-luxury text-2xl text-white">Occupant Sanctuary & Predictive Safety</h3>
                  <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                    {car.safetyHighlight}
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="border border-white/10 rounded-sm overflow-hidden bg-[#0C0C12]">
                  <table className="w-full text-left text-xs font-mono">
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Engine Architecture</td>
                        <td className="p-4 text-white">{car.specs.engine}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Peak Output</td>
                        <td className="p-4 text-[#D4AF37] font-semibold">{car.specs.power}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Maximum Torque</td>
                        <td className="p-4 text-white">{car.specs.torque}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Acceleration 0–100 km/h</td>
                        <td className="p-4 text-white">{car.specs.acceleration}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Top Velocity</td>
                        <td className="p-4 text-white">{car.specs.topSpeed}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Transmission</td>
                        <td className="p-4 text-white">{car.specs.transmission}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Drivetrain System</td>
                        <td className="p-4 text-white">{car.specs.drivetrain}</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="p-4 text-neutral-400 font-medium uppercase">Fuel Economy / Range</td>
                        <td className="p-4 text-white">{car.specs.rangeOrFuel}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
