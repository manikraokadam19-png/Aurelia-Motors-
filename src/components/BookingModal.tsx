import React, { useState } from 'react';
import { CARS, CarModel } from '../data/cars';
import { CITIES, CityExperience } from '../data/cities';
import { PatronUser, BookingRecord } from '../types/auth';
import { X, Check, CheckCircle2, ChevronRight, ChevronLeft, Calendar, Clock, MapPin, Car, User, Phone, Mail, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar?: CarModel | null;
  preselectedCity?: CityExperience | null;
  currentUser?: PatronUser | null;
  onBookingCreated?: (booking: BookingRecord) => void;
}

type ServiceType = 'Test Drive' | 'Private Viewing' | 'Consultation';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedCar,
  preselectedCity,
  currentUser,
  onBookingCreated,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedCarId, setSelectedCarId] = useState<string>(preselectedCar?.id || CARS[0].id);
  const [selectedCityId, setSelectedCityId] = useState<string>(
    preselectedCity?.id || (currentUser ? CITIES.find((c) => c.name.toLowerCase() === currentUser.city.toLowerCase())?.id || CITIES[0].id : CITIES[0].id)
  );
  const [selectedService, setSelectedService] = useState<ServiceType>('Test Drive');
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Afternoon (2:00 PM – 5:00 PM)');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const chosenCar = CARS.find((c) => c.id === selectedCarId) || CARS[0];
  const chosenCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];

  const handleNext = () => {
    // Validate step 4
    if (step === 4) {
      const newErrors: { [key: string]: string } = {};
      if (!name.trim()) newErrors.name = 'Please provide your full name';
      if (!phone.trim()) {
        newErrors.phone = 'Please provide your contact number';
      } else if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please provide a valid 10-digit Indian mobile number';
      }
      if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Please provide a valid email address';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }

    // Validate step 5
    if (step === 5) {
      if (!preferredDate) {
        setErrors({ date: 'Please select a preferred date' });
        return;
      }
      setErrors({});
      // Generate booking reference
      const randomId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(randomId);

      if (onBookingCreated) {
        onBookingCreated({
          id: randomId,
          carId: chosenCar.id,
          carName: chosenCar.name,
          cityName: chosenCity.name,
          hubName: chosenCity.hubName,
          serviceType: selectedService,
          date: preferredDate,
          timeSlot: preferredTime.split('(')[0].trim(),
          status: 'Confirmed',
          curatorName: chosenCity.name + ' Senior Curator',
          createdAt: 'Just now',
        });
      }
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#09090D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Header Bar */}
        <div className="bg-[#0D0D14] px-6 sm:px-8 py-5 border-b border-white/8 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] block">
              Aurelia Motors · Private Atelier
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal mt-0.5">
              {step <= 5 ? 'Schedule Your Private Consultation' : 'Consultation Confirmed'}
            </h2>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator (Steps 1 to 5) */}
        {step <= 5 && (
          <div className="px-6 sm:px-8 pt-4 pb-3 bg-[#0A0A0E] border-b border-white/5">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-400 mb-2">
              <span>STEP {step} OF 5</span>
              <span className="text-[#D4AF37]">
                {step === 1 && 'Vehicle Selection'}
                {step === 2 && 'City & Atelier'}
                {step === 3 && 'Service Privilege'}
                {step === 4 && 'Patron Details'}
                {step === 5 && 'Preferred Slot'}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880] transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Body Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[70vh]">
          {/* STEP 1: SELECT VEHICLE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Select Automobile</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Choose the flagship marque you wish to inspect or experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CARS.map((car) => {
                  const isSelected = selectedCarId === car.id;
                  return (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCarId(car.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#14141E] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'border-white/10 bg-[#0E0E14] hover:border-white/25 hover:bg-[#12121A]'
                      }`}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-14 object-cover rounded-sm shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase font-mono text-[#D4AF37]">
                          {car.brand}
                        </div>
                        <div className="text-sm font-medium text-white truncate">
                          {car.name}
                        </div>
                        <div className="text-xs font-mono text-neutral-400 mt-0.5">
                          {car.priceINR}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                            : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT CITY */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Select Consultation Atelier</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Choose your nearest metropolitan hub or private home delivery district.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CITIES.map((city) => {
                  const isSelected = selectedCityId === city.id;
                  return (
                    <div
                      key={city.id}
                      onClick={() => setSelectedCityId(city.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#14141E] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'border-white/10 bg-[#0E0E14] hover:border-white/25 hover:bg-[#12121A]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{city.name}</span>
                          </div>
                          <div className="text-xs text-neutral-400 font-light mt-1">
                            {city.hubName}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                              : 'border-white/20'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] font-mono text-neutral-500">
                        {city.fleetAvailable} Vehicles available for immediate evaluation
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE SERVICE */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Choose Service Experience</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Select how you would like our automotive specialists to serve you.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 'Test Drive' as const,
                    title: 'Dynamic Test Drive',
                    subtitle: 'Atelier or Doorstep Delivery',
                    desc: 'Take the vehicle on open highway and urban circuits with a certified performance curator.',
                  },
                  {
                    id: 'Private Viewing' as const,
                    title: 'Private Viewing Lounge',
                    subtitle: 'Acoustic Sound-Isolated Salon',
                    desc: 'Quiet inspection with bespoke champagne service, material leather swatches, and lighting preview.',
                  },
                  {
                    id: 'Consultation' as const,
                    title: 'One-on-One Commission Consultation',
                    subtitle: 'Treasury & Bespoke Build Guidance',
                    desc: 'Deep consultation regarding custom interior palettes, corporate lease structures, and provenance history.',
                  },
                ].map((serv) => {
                  const isSelected = selectedService === serv.id;
                  return (
                    <div
                      key={serv.id}
                      onClick={() => setSelectedService(serv.id)}
                      className={`p-5 rounded-sm border cursor-pointer transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#14141E] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'border-white/10 bg-[#0E0E14] hover:border-white/25 hover:bg-[#12121A]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                            : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {serv.title}
                        </div>
                        <div className="text-xs font-mono text-[#D4AF37] mt-0.5">
                          {serv.subtitle}
                        </div>
                        <p className="text-xs text-neutral-400 font-light mt-1.5">
                          {serv.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: PATRON DETAILS */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Patron Information</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Your credentials remain confidential in accordance with our Discretion Charter.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-3 pl-10 pr-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                    Contact Phone (India +91) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-3 pl-10 pr-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                    Corporate or Personal Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patron@company.com"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-3 pl-10 pr-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                    Bespoke Notes or Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific route preferences, chauffeur arrival requirements, or color questions..."
                    className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm p-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PREFERRED DATE & TIME */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Select Schedule</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Indicate when you would prefer the session to commence.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-3 pl-10 pr-4 text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.date && <p className="text-xs text-rose-400 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                    Time Window *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Morning (10:00 AM – 1:00 PM)',
                      'Afternoon (2:00 PM – 5:00 PM)',
                      'Evening Twilight (6:00 PM – 8:30 PM)',
                      'Midnight Private Session (9:30 PM – 11:30 PM)',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`p-3 text-xs font-mono text-left rounded-sm border transition-all ${
                          preferredTime === slot
                            ? 'border-[#D4AF37] bg-[#14141E] text-[#D4AF37] font-semibold'
                            : 'border-white/10 bg-[#0E0E14] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-[#111117] rounded-sm border border-white/10 mt-6">
                  <div className="text-xs font-mono uppercase text-[#D4AF37] mb-2">
                    Experience Synopsis
                  </div>
                  <div className="text-xs text-neutral-300 space-y-1 font-light">
                    <div>Automobile: <strong className="text-white font-medium">{chosenCar.name}</strong></div>
                    <div>Location: <strong className="text-white font-medium">{chosenCity.name} ({chosenCity.hubName})</strong></div>
                    <div>Service: <strong className="text-white font-medium">{selectedService}</strong></div>
                    <div>Contact: <strong className="text-white font-medium">{name} ({phone})</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION SCREEN */}
          {step === 6 && (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Reference: {bookingRef}
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal">
                  YOUR PRIVATE EXPERIENCE AWAITS.
                </h3>
                <p className="text-neutral-400 text-sm font-light mt-3 max-w-lg mx-auto">
                  Our Senior Automotive Curator for <strong className="text-white">{chosenCity.name}</strong> has received your confidential request. You will receive an encrypted itinerary via WhatsApp & email within two hours.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-6 bg-[#0E0E14] border border-white/10 rounded-sm max-w-md mx-auto text-left text-xs font-mono space-y-2 text-neutral-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Vehicle:</span>
                  <span className="text-white font-semibold">{chosenCar.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Privilege:</span>
                  <span className="text-[#D4AF37]">{selectedService}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Atelier Hub:</span>
                  <span className="text-white">{chosenCity.hubName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Date & Slot:</span>
                  <span className="text-white">{preferredDate} · {preferredTime.split('(')[0]}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Patron:</span>
                  <span className="text-white">{name} ({phone})</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Return to Aurelia Sanctuary
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step <= 5 && (
          <div className="bg-[#0D0D14] px-6 sm:px-8 py-4 border-t border-white/8 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
            >
              <span>{step === 5 ? 'Confirm Consultation' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
