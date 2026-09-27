export interface CarSpecification {
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  engine: string;
  transmission: string;
  rangeOrFuel: string;
  drivetrain: string;
}

export interface CarModel {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  category: 'EXECUTIVE' | 'PERFORMANCE' | 'SUV' | 'ELECTRIC';
  priceINR: string;
  rawPriceCr: number; // in Crores for sorting
  image: string;
  interiorImage?: string;
  gallery: string[];
  specs: CarSpecification;
  overview: string;
  designHighlight: string;
  techHighlight: string;
  safetyHighlight: string;
  availableColors: { name: string; hex: string }[];
  featured?: boolean;
}

export const CARS: CarModel[] = [
  {
    id: 'mercedes-s-class',
    name: 'Mercedes-Benz S-Class S 450',
    brand: 'Mercedes-Benz',
    tagline: 'The Pinnacle of Automotive Luxury and Refinement',
    category: 'EXECUTIVE',
    priceINR: '₹1.79 Cr onwards',
    rawPriceCr: 1.79,
    image: '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
    gallery: [
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
      '/src/assets/images/lifestyle_executive_limousine_1790513473756.jpg',
      '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
    ],
    specs: {
      power: '367 HP + 22 HP EQ Boost',
      torque: '500 Nm',
      acceleration: '5.1 sec',
      topSpeed: '250 km/h (electronically limited)',
      engine: '3.0L Inline-6 Turbocharged with 48V Mild Hybrid',
      transmission: '9G-TRONIC Automatic',
      rangeOrFuel: '12.8 km/l (ARAI)',
      drivetrain: '4MATIC All-Wheel Drive',
    },
    overview: 'The Mercedes-Benz S-Class defines the global benchmark for executive mobility. In India’s metropolitan landscape, it represents effortless stature with rear-seat first-class lounge recliners, active noise cancellation, and proactive E-Active Body Control suspension that floats above uneven city streets.',
    designHighlight: 'Seamless flush door handles that glide outwards as you approach, Digital Light projection headlamps with 1.3 million micro-mirrors, and an elongated stately silhouette.',
    techHighlight: '12.8-inch OLED central touchscreen with MBUX Augmented Reality Head-Up Display, 31-speaker Burmester® High-End 4D Surround Sound System with exciters integrated into seat cushions.',
    safetyHighlight: 'Rear passenger frontal airbags (world first), PRE-SAFE® Impulse Side that lifts the vehicle chassis milliseconds before an impending lateral impact.',
    availableColors: [
      { name: 'Obsidian Black Metallic', hex: '#0F0F12' },
      { name: 'High-Tech Silver', hex: '#D1D5DB' },
      { name: 'Nautic Blue', hex: '#1E293B' },
      { name: 'Designo Cashmere White', hex: '#F8FAFC' },
    ],
    featured: true,
  },
  {
    id: 'bmw-7-series',
    name: 'BMW 7 Series 740i M Sport',
    brand: 'BMW',
    tagline: 'Bold Presence with Monolithic Authority',
    category: 'EXECUTIVE',
    priceINR: '₹1.82 Cr onwards',
    rawPriceCr: 1.82,
    image: '/src/assets/images/lifestyle_executive_limousine_1790513473756.jpg',
    gallery: [
      '/src/assets/images/lifestyle_executive_limousine_1790513473756.jpg',
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
      '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
    ],
    specs: {
      power: '381 HP',
      torque: '520 Nm',
      acceleration: '5.4 sec',
      topSpeed: '250 km/h',
      engine: '3.0L TwinPower Turbo 6-Cylinder',
      transmission: '8-Speed Steptronic Sport',
      rangeOrFuel: '12.6 km/l',
      drivetrain: 'Rear-Wheel Drive with Integral Active Steering',
    },
    overview: 'The 7th-generation BMW 7 Series brings cinematic theater to the Indian chauffeur experience. Centered around an immense 31.3-inch 8K Theatre Screen dropping from the roof liner, it converts rear cabin journeys across Mumbai or Delhi into an ultra-exclusive private screening room.',
    designHighlight: 'Illuminated BMW Iconic Glow kidney grille with Swarovski crystal headlights, monolithic clean body surfacing, and automatic opening/closing doors with gesture proximity.',
    techHighlight: '31.3-inch 8K Rear Theatre Screen with Amazon Fire TV built-in, Bowers & Wilkins Diamond Surround Sound with 4D sound experience and 36 speakers.',
    safetyHighlight: 'Active Cruise Control with Stop&Go, Parking Assistant Professional with Reversing Assistant up to 200 meters stored paths.',
    availableColors: [
      { name: 'Mineral White Metallic', hex: '#F1F5F9' },
      { name: 'Black Sapphire', hex: '#09090B' },
      { name: 'Dravit Grey Metallic', hex: '#475569' },
      { name: 'Tanzanite Blue', hex: '#1E3A8A' },
    ],
    featured: true,
  },
  {
    id: 'range-rover-autobiography',
    name: 'Range Rover Autobiography LWB',
    brand: 'Land Rover',
    tagline: 'Peerless Luxury Meets Masterful All-Terrain Command',
    category: 'SUV',
    priceINR: '₹3.16 Cr onwards',
    rawPriceCr: 3.16,
    image: '/src/assets/images/lifestyle_luxury_suv_1790513488066.jpg',
    gallery: [
      '/src/assets/images/lifestyle_luxury_suv_1790513488066.jpg',
      '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
    ],
    specs: {
      power: '530 HP',
      torque: '750 Nm',
      acceleration: '4.6 sec',
      topSpeed: '250 km/h',
      engine: '4.4L Twin-Turbocharged V8 Petrol',
      transmission: '8-Speed Automatic with Twin-Speed Transfer Box',
      rangeOrFuel: '8.9 km/l',
      drivetrain: 'Intelligent All-Wheel Drive with All-Wheel Steering',
    },
    overview: 'The Long Wheelbase Autobiography is the quintessential vehicle for India’s top industrialists and film icons. Offering unrivaled ground clearance and electronic air suspension that adjusts dynamically to monsoon conditions, paired with twenty-four-way heated and cooled massage seats.',
    designHighlight: 'Flush glazing, invisible waistline finishers, and hidden-until-lit vertical rear lights that appear carved from an unbroken billet of stone.',
    techHighlight: 'Meridian™ Signature Sound System with 35 speakers including headrest speakers with next-generation Active Noise Cancellation for silence at highway velocities.',
    safetyHighlight: 'ClearSight Ground View transparent hood camera, Terrain Response 2 with automatic wade sensing up to 900mm water depth.',
    availableColors: [
      { name: 'Santorini Black', hex: '#111827' },
      { name: 'Batumi Gold Satin', hex: '#D4AF37' },
      { name: 'Belgravia Green', hex: '#14532D' },
      { name: 'Carpathian Grey', hex: '#374151' },
    ],
    featured: true,
  },
  {
    id: 'porsche-911-carrera',
    name: 'Porsche 911 Carrera GTS',
    brand: 'Porsche',
    tagline: 'The Definitive Thoroughbred Sports Car',
    category: 'PERFORMANCE',
    priceINR: '₹2.75 Cr onwards',
    rawPriceCr: 2.75,
    image: '/src/assets/images/lifestyle_performance_coupe_1790513459304.jpg',
    gallery: [
      '/src/assets/images/lifestyle_performance_coupe_1790513459304.jpg',
      '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
    ],
    specs: {
      power: '541 HP',
      torque: '610 Nm',
      acceleration: '3.0 sec',
      topSpeed: '312 km/h',
      engine: '3.6L Twin-Turbo Boxer-6 with T-Hybrid Technology',
      transmission: '8-Speed Porsche Doppelkupplung (PDK)',
      rangeOrFuel: '9.4 km/l',
      drivetrain: 'Rear-Wheel Drive with Rear-Axle Steering',
    },
    overview: 'The latest 911 Carrera GTS brings Porsche’s revolutionary T-Hybrid performance to Indian expressways and track days. Blistering instant throttle response from the electrically assisted turbocharger combined with front-axle lift system for tackling city ramps with ease.',
    designHighlight: 'Active front cooling air flaps, light bar rear with three-dimensional PORSCHE script, staggered center-lock forged lightweight alloy wheels.',
    techHighlight: 'Fully digital curved instrument cluster with classic five-tube display layout, Porsche Communication Management with real-time telemetry recording.',
    safetyHighlight: 'Porsche Wet Mode sensors inside front wheel arches detecting surface water and tuning stability management proactively.',
    availableColors: [
      { name: 'Guards Red', hex: '#DC2626' },
      { name: 'GT Silver Metallic', hex: '#9CA3AF' },
      { name: 'Crayon Grey', hex: '#E5E7EB' },
      { name: 'Gentian Blue Metallic', hex: '#1D4ED8' },
    ],
    featured: true,
  },
  {
    id: 'aston-martin-db12',
    name: 'Aston Martin DB12 Super Tourer',
    brand: 'Aston Martin',
    tagline: 'The World’s First Super Tourer',
    category: 'PERFORMANCE',
    priceINR: '₹4.59 Cr onwards',
    rawPriceCr: 4.59,
    image: '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
    gallery: [
      '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
      '/src/assets/images/lifestyle_performance_coupe_1790513459304.jpg',
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
    ],
    specs: {
      power: '680 HP',
      torque: '800 Nm',
      acceleration: '3.6 sec',
      topSpeed: '325 km/h',
      engine: '4.0L Hand-Built Twin-Turbo V8',
      transmission: '8-Speed Torque Converter with Electronic Rear Differential (E-Diff)',
      rangeOrFuel: '8.2 km/l',
      drivetrain: 'Rear Mid-Mounted Transaxle RWD',
    },
    overview: 'Aston Martin DB12 is a monumental leap forward in sculpture and visceral acoustic intensity. With 680 brake horsepower, a bespoke hand-stitched Bridge of Weir leather interior, and an ultra-rigid bonded aluminum architecture tailored for cross-country grand touring.',
    designHighlight: 'Wider track, commanding front grille flanked by redesigned LED matrix headlights with new daytime running signatures, frameless rear mirrors.',
    techHighlight: 'All-new in-house infotainment software paired with 15-speaker Bowers & Wilkins 1,170W surround sound engineered with aluminum double-dome tweeters.',
    safetyHighlight: 'Next-generation Electronic Stability Programme (ESP) with 4-stage intervention and intelligent predictive 6D yaw motion sensors.',
    availableColors: [
      { name: 'Iridescent Emerald', hex: '#064E3B' },
      { name: 'Aluminite Silver', hex: '#CBD5E1' },
      { name: 'Onyx Black', hex: '#020617' },
      { name: 'Cosmopolitan Red', hex: '#991B1B' },
    ],
    featured: false,
  },
  {
    id: 'audi-rs-e-tron-gt',
    name: 'Audi RS e-tron GT Performance',
    brand: 'Audi',
    tagline: 'Gran Turismo Reimagined for the Electric Era',
    category: 'ELECTRIC',
    priceINR: '₹2.05 Cr onwards',
    rawPriceCr: 2.05,
    image: '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
    gallery: [
      '/src/assets/images/showcase_supercar_silver_1790513441570.jpg',
      '/src/assets/images/lifestyle_performance_coupe_1790513459304.jpg',
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
    ],
    specs: {
      power: '646 HP (Boost Mode)',
      torque: '830 Nm',
      acceleration: '3.3 sec',
      topSpeed: '250 km/h',
      engine: 'Dual Permanent-Magnet Synchronous Electric Motors',
      transmission: '2-Speed Transmission on Rear Axle',
      rangeOrFuel: '504 km (WLTP Cycle)',
      drivetrain: 'Electric quattro® All-Wheel Drive',
    },
    overview: 'The Audi RS e-tron GT represents electric high performance without compromise. Built on an 800-volt architecture enabling 270 kW high-speed DC charging (5% to 80% in just 22.5 minutes), it glides across Mumbai’s coastal road and national expressways with whisper-quiet dominance.',
    designHighlight: 'Sculpted muscular aero rear haunches, active rear aerodynamic spoiler, aerodynamically optimized 21-inch alloy wheels, matrix laser lights.',
    techHighlight: 'Bang & Olufsen 3D Premium Sound System with acoustic e-sound exterior speakers generating a bespoke electric sports car acoustics profile.',
    safetyHighlight: 'Adaptive cruise assist with lane guidance, 360-degree cameras with virtual top-down 3D bird’s eye view and curb detection.',
    availableColors: [
      { name: 'Daytona Grey Pearl', hex: '#334155' },
      { name: 'Mythos Black Metallic', hex: '#0B0F19' },
      { name: 'Tactical Green', hex: '#166534' },
      { name: 'Kemora Grey', hex: '#64748B' },
    ],
    featured: false,
  },
  {
    id: 'mercedes-maybach-gls-600',
    name: 'Mercedes-Maybach GLS 600',
    brand: 'Mercedes-Maybach',
    tagline: 'The Ultimate Sovereign SUV Sanctuary',
    category: 'SUV',
    priceINR: '₹3.35 Cr onwards',
    rawPriceCr: 3.35,
    image: '/src/assets/images/lifestyle_luxury_suv_1790513488066.jpg',
    gallery: [
      '/src/assets/images/lifestyle_luxury_suv_1790513488066.jpg',
      '/src/assets/images/lifestyle_executive_limousine_1790513473756.jpg',
      '/src/assets/images/hero_luxury_sedan_night_1790513420325.jpg',
    ],
    specs: {
      power: '557 HP + 22 HP EQ Boost',
      torque: '730 Nm',
      acceleration: '4.9 sec',
      topSpeed: '250 km/h',
      engine: '4.0L V8 Biturbo with 48-Volt System',
      transmission: '9G-TRONIC Automatic',
      rangeOrFuel: '8.5 km/l',
      drivetrain: '4MATIC All-Wheel Drive with Maybach Drive Mode',
    },
    overview: 'The pinnacle of luxury SUVs. The Mercedes-Maybach GLS 600 delivers unmatched prestige with electrically extending illuminated aluminum running boards, champagne flutes chilled in a dedicated rear refrigerator, and autonomous executive first-class reclining seats.',
    designHighlight: 'Distinctive Maybach vertical pinstripe chrome grille, available two-tone exterior paintwork hand-finished in Sindelfingen, Maybach emblems on D-pillars.',
    techHighlight: 'E-ACTIVE BODY CONTROL with dedicated Maybach drive program that minimizes body roll and pitch for effortless glide over road undulations.',
    safetyHighlight: 'Driving Assistance Package Plus with Active Steering Assist, PRE-SAFE® PLUS rear impact occupant protection.',
    availableColors: [
      { name: 'Obsidian Black / Kalahari Gold Two-Tone', hex: '#C5A880' },
      { name: 'Emerald Green Metallic', hex: '#064E3B' },
      { name: 'Selenite Grey', hex: '#4B5563' },
      { name: 'Rubellite Red', hex: '#7F1D1D' },
    ],
    featured: false,
  },
];
