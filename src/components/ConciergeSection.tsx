import React from 'react';
import { Eye, Car, Compass, Landmark, ShieldCheck, Truck, ArrowRight, CheckCircle2, User } from 'lucide-react';

interface ConciergeSectionProps {
  onRequestConcierge: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const ConciergeSection: React.FC<ConciergeSectionProps> = ({
  onRequestConcierge,
  onOpenAuth,
}) => {
  const services = [
    {
      icon: Eye,
      title: 'Private Vehicle Viewing',
      description: 'Experience your chosen automobile in the tranquility of a sound-isolated acoustic salon or at your private estate.',
    },
    {
      icon: Car,
      title: 'Home Test Drive',
      description: 'Our white-glove transport brings the vehicle to your residence or corporate headquarters for an undisturbed trial.',
    },
    {
      icon: Compass,
      title: 'Vehicle Consultation',
      description: 'One-on-one session with a marque specialist to configure bespoke color palettes, leathers, and technological options.',
    },
    {
      icon: Landmark,
      title: 'Finance Assistance',
      description: 'Tailored discreet financial structuring, corporate leasing, and private treasury solutions with premier Indian banking institutions.',
    },
    {
      icon: ShieldCheck,
      title: 'Insurance Assistance',
      description: 'Bespoke zero-depreciation coverage including rim protection, engine hydro-lock shield, and guaranteed invoice value return.',
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: 'Enclosed hydraulic climate-controlled carrier delivery to any destination across India, accompanied by ceremonial unveiling.',
    },
  ];

  return (
    <section id="concierge" className="py-28 sm:py-36 bg-[#070709] border-b border-white/5 relative overflow-hidden">
      {/* Background ambient dark gold glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Bespoke Privilege
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-normal tracking-tight">
            YOUR CAR. YOUR WAY.
          </h2>

          <p className="text-neutral-400 font-light text-base sm:text-lg mt-3">
            Our private concierge service brings the Aurelia Motors experience directly to you. Confidential, frictionless, and executed with uncompromising discretion.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="p-8 bg-[#0E0E14] border border-white/8 hover:border-[#D4AF37]/50 rounded-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-sm bg-[#161620] border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal mb-3 group-hover:text-[#E8D8C4] transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Available Across All 7 Ateliers</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Request Concierge CTA Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-sm bg-gradient-to-r from-[#12121A] via-[#161622] to-[#12121A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif-luxury text-2xl text-white font-normal mb-2">
              Ready for a Tailored Consultation?
            </h4>
            <p className="text-neutral-400 text-sm font-light max-w-xl">
              Connect with a Senior Automotive Curator. We orchestrate private appointments at your convenience or sign into your Patron account.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {onOpenAuth && (
              <button
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider rounded-sm border border-white/15 transition-all whitespace-nowrap"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>Patron Sign In / Register</span>
              </button>
            )}

            <button
              onClick={onRequestConcierge}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-sm hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap shadow-[0_0_25px_rgba(212,175,55,0.2)]"
            >
              <span>Request Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
