import React from 'react';
import { PatronUser, BookingRecord } from '../types/auth';
import { X, User, Phone, Mail, MapPin, Award, Calendar, Clock, LogOut, CheckCircle2, Shield, Heart } from 'lucide-react';

interface PatronProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PatronUser | null;
  onLogout: () => void;
  bookings: BookingRecord[];
  onOpenWishlist: () => void;
  onBookNew: () => void;
}

export const PatronProfileModal: React.FC<PatronProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  bookings,
  onOpenWishlist,
  onBookNew,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#09090D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Header */}
        <div className="bg-[#0E0E14] px-6 sm:px-8 py-5 border-b border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#C5A880] text-black font-semibold flex items-center justify-center font-mono text-sm shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-base">{user.name}</span>
                <span className="text-[10px] font-mono uppercase bg-[#181824] text-[#D4AF37] px-2 py-0.5 rounded-sm border border-[#D4AF37]/30">
                  {user.tier}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 block">
                ID: {user.id} · Member since {user.memberSince}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Atelier & Concierge Liaison Card */}
          <div className="p-5 bg-[#12121A] border border-white/8 rounded-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                Primary Atelier Hub
              </span>
              <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{user.city} Atelier</span>
              </div>
              <div className="text-xs text-neutral-400 mt-1">{user.phone}</div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                Assigned Senior Curator
              </span>
              <div className="text-sm font-semibold text-[#D4AF37] mt-0.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{user.conciergeAssigned || 'Senior National Curator'}</span>
              </div>
              <div className="text-xs text-neutral-400 mt-1">Direct Encrypted Liaison Line</div>
            </div>
          </div>

          {/* Consultation Itineraries & Bookings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-luxury text-xl text-white">
                Scheduled Consultations & Drives ({bookings.length})
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="text-xs font-mono text-[#D4AF37] hover:underline"
              >
                + Schedule Another
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="p-6 bg-[#0E0E14] border border-white/5 rounded-sm text-center text-xs text-neutral-400 font-light">
                No active bookings yet. You can book a test drive or private viewing from the fleet collection.
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-[#0E0E14] border border-white/8 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{b.carName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#161622] text-[#D4AF37] border border-[#D4AF37]/30">
                          {b.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 font-light mt-1 flex flex-wrap gap-2">
                        <span>{b.serviceType}</span>
                        <span>·</span>
                        <span>{b.cityName} ({b.hubName})</span>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-white/5 sm:pl-4 text-xs font-mono text-neutral-300">
                      <div>{b.date}</div>
                      <div className="text-[11px] text-neutral-500">{b.timeSlot}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              className="py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-sm text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Saved Garage</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="py-3 px-4 bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-rose-800/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
