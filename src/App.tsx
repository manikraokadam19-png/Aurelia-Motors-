/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CARS, CarModel } from './data/cars';
import { CITIES, CityExperience } from './data/cities';
import { PatronUser, BookingRecord } from './types/auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCollection } from './components/FeaturedCollection';
import { ScrollExperience } from './components/ScrollExperience';
import { LifestyleSection } from './components/LifestyleSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { IndiaExperience } from './components/IndiaExperience';
import { ConciergeSection } from './components/ConciergeSection';
import { Testimonials } from './components/Testimonials';
import { LuxuryStats } from './components/LuxuryStats';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { BookingModal } from './components/BookingModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PatronAuthModal } from './components/PatronAuthModal';
import { PatronProfileModal } from './components/PatronProfileModal';

export default function App() {
  // Modal states
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedBookingCar, setPreselectedBookingCar] = useState<CarModel | null>(null);
  const [preselectedBookingCity, setPreselectedBookingCity] = useState<CityExperience | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);

  // Authentication & Patron State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<PatronUser | null>(() => {
    try {
      const stored = localStorage.getItem('aurelia_current_patron');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const stored = localStorage.getItem('aurelia_bookings');
      if (stored) return JSON.parse(stored);
      return [
        {
          id: 'AUR-541920',
          carId: 'mercedes-s-class',
          carName: 'Mercedes-Benz S-Class S 450',
          cityName: 'Mumbai',
          hubName: 'Aurelia Reserve Worli & BKC Pavilion',
          serviceType: 'Private Viewing Lounge',
          date: '2026-10-05',
          timeSlot: 'Evening Twilight',
          status: 'Confirmed',
          curatorName: 'Aaditya Deshmukh (Senior Curator)',
          createdAt: '2 days ago',
        },
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state (persisted locally)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_wishlist');
      return saved ? JSON.parse(saved) : ['mercedes-s-class', 'porsche-911-carrera'];
    } catch {
      return ['mercedes-s-class', 'porsche-911-carrera'];
    }
  });

  const handleLoginSuccess = (user: PatronUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('aurelia_current_patron', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('aurelia_current_patron');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookingCreated = (newBooking: BookingRecord) => {
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('aurelia_bookings', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleWishlist = (carId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId];
      try {
        localStorage.setItem('aurelia_wishlist', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleOpenBooking = (car?: CarModel, city?: CityExperience) => {
    setPreselectedBookingCar(car || null);
    setPreselectedBookingCity(city || null);
    setBookingModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectLifestyleCategory = (category: 'PERFORMANCE' | 'EXECUTIVE' | 'SUV' | 'ELECTRIC') => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#F3F3F5] selection:bg-[#D4AF37] selection:text-black">
      {/* 1. Sticky Navigation */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWishlist={() => setWishlistDrawerOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setProfileModalOpen(true)}
        currentUser={currentUser}
        wishlistCount={wishlist.length}
      />

      {/* 2. Cinematic Hero Section */}
      <Hero
        onExploreClick={scrollToCollection}
        onBookViewingClick={() => handleOpenBooking()}
      />

      {/* 3. Featured Collection */}
      <FeaturedCollection
        onSelectCar={(car) => setSelectedCar(car)}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />

      {/* 4. Scroll-Based Luxury Animation */}
      <ScrollExperience />

      {/* 5. Explore by Lifestyle */}
      <LifestyleSection onSelectCategory={handleSelectLifestyleCategory} />

      {/* 6. Premium Vehicle Showcase */}
      <ShowcaseSection
        onSelectCar={(car) => setSelectedCar(car)}
        onBookTestDrive={(car) => handleOpenBooking(car)}
      />

      {/* 7. India Experience Section */}
      <IndiaExperience
        onBookInCity={(city) => handleOpenBooking(undefined, city)}
      />

      {/* 8. Private Concierge Section */}
      <ConciergeSection
        onRequestConcierge={() => handleOpenBooking()}
        onOpenAuth={handleOpenAuth}
      />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Luxury Statistics */}
      <LuxuryStats />

      {/* 11. Final CTA */}
      <FinalCTA
        onExploreClick={scrollToCollection}
        onBookConsultationClick={() => handleOpenBooking()}
      />

      {/* 12. Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Modals & Drawers */}
      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onBookTestDrive={(car) => handleOpenBooking(car)}
        onToggleWishlist={toggleWishlist}
        isWishlisted={selectedCar ? wishlist.includes(selectedCar.id) : false}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedCar={preselectedBookingCar}
        preselectedCity={preselectedBookingCity}
        currentUser={currentUser}
        onBookingCreated={handleBookingCreated}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCar={(car) => setSelectedCar(car)}
      />

      <WishlistDrawer
        isOpen={wishlistDrawerOpen}
        onClose={() => setWishlistDrawerOpen(false)}
        wishlist={wishlist}
        onRemove={toggleWishlist}
        onSelectCar={(car) => setSelectedCar(car)}
        onBookCar={(car) => handleOpenBooking(car)}
      />

      {/* Patron Authentication Modal (Login & Sign Up) */}
      <PatronAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />

      {/* Patron Profile Modal */}
      <PatronProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        bookings={bookings}
        onOpenWishlist={() => {
          setProfileModalOpen(false);
          setWishlistDrawerOpen(true);
        }}
        onBookNew={() => {
          setProfileModalOpen(false);
          handleOpenBooking();
        }}
      />
    </div>
  );
}
