import React, { useState } from 'react';
import { CARS, CarModel } from '../data/cars';
import { Search, X, ArrowRight, Zap } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (car: CarModel) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectCar }) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const results = CARS.filter((car) => {
    const matchesQuery =
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.brand.toLowerCase().includes(query.toLowerCase()) ||
      car.category.toLowerCase().includes(query.toLowerCase()) ||
      car.overview.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || car.category === categoryFilter;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-start justify-center pt-20 px-4 sm:px-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0B0B0F] border border-white/10 rounded-sm shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center gap-4 bg-[#101016]">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model (e.g. S-Class, 911, Range Rover), brand, or category..."
            className="flex-1 bg-transparent text-white placeholder:text-neutral-500 text-sm sm:text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-full bg-white/5"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Badges */}
        <div className="px-6 py-3 bg-[#0D0D12] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-500 font-mono text-[11px] mr-2">FILTER:</span>
          {(['ALL', 'EXECUTIVE', 'PERFORMANCE', 'SUV', 'ELECTRIC'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-sm uppercase tracking-wider font-mono text-[11px] transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-white/5">
          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-sm">
              No matching luxury automobiles found in the current sanctuary fleet.
            </div>
          ) : (
            results.map((car) => (
              <div
                key={car.id}
                onClick={() => {
                  onClose();
                  onSelectCar(car);
                }}
                className="py-4 px-3 flex items-center justify-between hover:bg-white/5 rounded-sm cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 object-cover rounded-sm border border-white/10"
                  />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#D4AF37]">
                      {car.brand} · {car.category}
                    </div>
                    <div className="text-sm font-medium text-white group-hover:text-[#E8D8C4] transition-colors">
                      {car.name}
                    </div>
                    <div className="text-xs font-mono text-neutral-400 mt-0.5">
                      {car.priceINR}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{car.specs.power.split('+')[0]}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
