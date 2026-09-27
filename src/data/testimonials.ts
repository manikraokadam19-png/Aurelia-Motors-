export interface Testimonial {
  id: string;
  clientName: string;
  city: string;
  vehicle: string;
  role: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Vikramaditya S.',
    city: 'Mumbai',
    vehicle: 'Mercedes-Benz S-Class S 450',
    role: 'Managing Partner, Private Equity',
    quote: 'Aurelia Motors orchestrated a private midnight viewing in Worli that was nothing short of cinematic. The white-glove doorstep delivery to my residence in Malabar Hill with zero administrative friction set an entirely new standard.',
    rating: 5,
  },
  {
    id: 't-2',
    clientName: 'Ayesha M. K.',
    city: 'Delhi NCR',
    vehicle: 'Range Rover Autobiography LWB',
    role: 'Industrialist & Tech Founder',
    quote: 'Acquiring our Autobiography through Aurelia Concierge was effortless. Their team curated a private test drive through the Aerocity pavilion, pre-configured with our exact bespoke leather interior selections.',
    rating: 5,
  },
  {
    id: 't-3',
    clientName: 'Raghav N.',
    city: 'Bengaluru',
    vehicle: 'Porsche 911 Carrera GTS',
    role: 'Angel Investor & Supercar Collector',
    quote: 'The level of automotive knowledge at Aurelia Motors is exceptional. They understand high-performance engineering in depth and arranged closed-circuit track sessions before vehicle finalization. Remarkable precision.',
    rating: 5,
  },
  {
    id: 't-4',
    clientName: 'Devika R. V.',
    city: 'Hyderabad',
    vehicle: 'Audi RS e-tron GT',
    role: 'Creative Director & Entrepreneur',
    quote: 'Transitioning to an electric grand tourer felt seamless with Aurelia. Their technicians surveyed my Jubilee Hills villa, installed a high-capacity fast charger, and coordinated ceremonial delivery on Diwali eve.',
    rating: 5,
  },
  {
    id: 't-5',
    clientName: 'Sameer B.',
    city: 'Pune',
    vehicle: 'Aston Martin DB12 Super Tourer',
    role: 'Automotive Enthusiast & Executive',
    quote: 'From the private sound-isolated consultation suite in Koregaon Park to the bespoke sound profile calibration of the DB12, Aurelia delivers the true European atelier luxury experience right here in India.',
    rating: 5,
  },
];
