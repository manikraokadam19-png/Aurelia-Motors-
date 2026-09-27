export interface PatronUser {
  id: string;
  salutation: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: 'Sovereign Black Reserve' | 'Atelier Member' | 'Patron Circle';
  memberSince: string;
  avatar?: string;
  conciergeAssigned?: string;
}

export interface RegisteredAccount extends PatronUser {
  passwordHash: string; // Stored password in encrypted/local registry
}

export interface BookingRecord {
  id: string;
  carId: string;
  carName: string;
  cityName: string;
  hubName: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Curator Assigned' | 'Vehicle Ready' | 'Completed';
  curatorName: string;
  createdAt: string;
}

