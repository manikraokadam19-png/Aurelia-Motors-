import React from 'react';
import { CARS, CarModel } from '../data/cars';
import { X, Trash2, ArrowRight, Heart } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  onRemove: (carId: string) => void;
  onSelectCar: (car: CarModel) => void;
  onBookCar: (car: CarModel) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onSelectCar,
  onBookCar,
}) => {
  if (!isOpen) return null;

  const savedCars = CARS.filter((car) => wishlist.includes(car.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0A0A0E] border-l border-white/10 h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/8 flex items-center justify-between bg-[#0E0E14]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
            <h3 className="font-serif-luxury text-xl text-white font-normal">
              Curated Garage ({savedCars.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedCars.length === 0 ? (
            <div className="text-center py-20 text-neutral-500 space-y-3">
              <Heart className="w-10 h-10 text-neutral-700 mx-auto stroke-1" />
              <p className="text-sm font-light">Your curated garage is currently empty.</p>
              <p className="text-xs text-neutral-600">
                Explore the collection and tap the heart icon on any model to preserve it for comparison.
              </p>
            </div>
          ) : (
            savedCars.map((car) => (
              <div
                key={car.id}
                className="p-4 bg-[#111117] border border-white/8 rounded-sm hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-16 object-cover rounded-sm border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono uppercase text-[#D4AF37]">
                      {car.brand}
                    </div>
                    <h4 className="text-sm font-medium text-white truncate">{car.name}</h4>
                    <div className="text-xs font-mono text-neutral-400 mt-1">
                      {car.priceINR}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(car.id)}
                    className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                    title="Remove from saved"
                    aria-label={`Remove ${car.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCar(car);
                    }}
                    className="flex-1 py-2 text-[11px] font-mono uppercase tracking-wider text-neutral-300 hover:text-white bg-white/5 rounded-sm hover:bg-white/10 transition-colors"
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onBookCar(car);
                    }}
                    className="flex-1 py-2 text-[11px] font-mono uppercase tracking-wider text-black font-semibold bg-gradient-to-r from-[#D4AF37] to-[#C5A880] rounded-sm hover:brightness-110 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Consultation</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedCars.length > 0 && (
          <div className="p-6 border-t border-white/8 bg-[#0E0E14]">
            <button
              onClick={() => {
                onClose();
                onBookCar(savedCars[0]);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 active:scale-[0.98] transition-all text-center block"
            >
              Book Consultation for Saved Fleet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
