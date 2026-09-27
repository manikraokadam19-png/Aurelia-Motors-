export interface CityExperience {
  id: string;
  name: string;
  state: string;
  hubName: string;
  address: string;
  loungeType: string;
  features: {
    showroom: string;
    privateViewing: string;
    testDrive: string;
    concierge: string;
  };
  phone: string;
  coordinates: { x: number; y: number }; // percentage on India SVG map
  fleetAvailable: number;
}

export const CITIES: CityExperience[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    hubName: 'Aurelia Reserve Worli & BKC Pavilion',
    address: 'Dr. Annie Besant Road, Worli Seaface & One BKC, Bandra Kurla Complex',
    loungeType: 'Flagship Experiential Sanctuary',
    features: {
      showroom: 'Bespoke architectural gallery overlooking the Arabian Sea, private valuation vault.',
      privateViewing: 'Sound-isolated acoustic salon with material swatch library and champagne service.',
      testDrive: 'Direct access to Coastal Road & Bandra-Worli Sea Link highway circuits.',
      concierge: '24/7 personal liaison with doorstep white-glove enclosed carrier delivery.',
    },
    phone: '+91 (022) 8800 4500',
    coordinates: { x: 32, y: 58 },
    fleetAvailable: 14,
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'National Capital Region',
    hubName: 'Aurelia Sovereign Aerocity & DLF Horizon',
    address: 'Worldmark 3, Aerocity & Two Horizon Center, Golf Course Road, Gurugram',
    loungeType: 'Diplomatic & Sovereign Suite',
    features: {
      showroom: 'Ultra-modern 12-bay luxury salon with private helipad coordination.',
      privateViewing: 'VIP boardroom suite with high-security private subterranean entrance.',
      testDrive: 'High-speed dynamic routing across Delhi-Meerut Expressway & Golf Course Ext.',
      concierge: 'Direct airport tarmac VIP transfers and ceremonial vehicle handovers.',
    },
    phone: '+91 (011) 7700 9200',
    coordinates: { x: 42, y: 28 },
    fleetAvailable: 16,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    hubName: 'Aurelia Tech-Luxe UB City',
    address: 'Level 14, Concorde Block, UB City, Vittal Mallya Road',
    loungeType: 'Innovation & Luxury Atelier',
    features: {
      showroom: 'High-resolution digital configurator cave with real-time haptic color displays.',
      privateViewing: 'Exclusive rooftop lounge with private vehicle elevator access.',
      testDrive: 'Bangalore Elevated Tollway & Airport Expressway high-speed evaluation run.',
      concierge: 'Specialized electric charging station integration and home fleet management.',
    },
    phone: '+91 (080) 6620 3100',
    coordinates: { x: 44, y: 77 },
    fleetAvailable: 11,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    hubName: 'Aurelia Royal Pavilion Jubilee Hills',
    address: 'Road No. 36, Jubilee Hills, Near Peddamma Temple',
    loungeType: 'Heritage Luxury Lounge',
    features: {
      showroom: 'Grand monolithic black granite display court with curated fine art gallery.',
      privateViewing: 'Private cigar & single malt consultation lounge with discreet valet garage.',
      testDrive: 'Outer Ring Road (ORR) 8-lane expressway handling and high-speed stability testing.',
      concierge: 'Secured armored vehicle transport and bespoke registration facilitation.',
    },
    phone: '+91 (040) 4410 8890',
    coordinates: { x: 48, y: 62 },
    fleetAvailable: 9,
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    hubName: 'Aurelia Koregaon Park Atelier',
    address: 'Lane 7, Koregaon Park & Senapati Bapat Road',
    loungeType: 'Performance & Lifestyle Studio',
    features: {
      showroom: 'Boutique garden studio designed by leading architectural visionaries.',
      privateViewing: 'Private courtyard handover bay with custom reveal curtain choreography.',
      testDrive: 'Mumbai-Pune Expressway Western Ghats twisty evaluation loops.',
      concierge: 'Doorstep mobile service van with certified European master technicians.',
    },
    phone: '+91 (020) 2615 7400',
    coordinates: { x: 35, y: 62 },
    fleetAvailable: 7,
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    hubName: 'Aurelia Boat Club Sanctuary',
    address: 'Boat Club Road, R.A. Puram & East Coast Road (ECR)',
    loungeType: 'Coastal Grand Touring Hub',
    features: {
      showroom: 'Minimalist seaside showroom with natural timber finishes and curated coffee bar.',
      privateViewing: 'Private oceanfront client pavilion with personal vehicle curator.',
      testDrive: 'East Coast Road (ECR) scenic coastal highway dynamic handling drive.',
      concierge: 'Bespoke marine and yacht transport integration with luxury car garage.',
    },
    phone: '+91 (044) 3380 1200',
    coordinates: { x: 53, y: 79 },
    fleetAvailable: 8,
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    hubName: 'Aurelia Alipore Reserve',
    address: 'Burdwan Road, Alipore & EM Bypass Platinum Corridor',
    loungeType: 'Imperial Heritage Suite',
    features: {
      showroom: 'Stately colonial-modern hybrid salon featuring vintage automotive photography.',
      privateViewing: 'Mahogany-paneled consultation study with bespoke horology showcases.',
      testDrive: 'Second Hooghly Bridge & Kona Expressway smooth suspension audit.',
      concierge: 'Full East India concierge reach with covered hydraulic transport trailers.',
    },
    phone: '+91 (033) 2479 6600',
    coordinates: { x: 74, y: 48 },
    fleetAvailable: 6,
  },
];
