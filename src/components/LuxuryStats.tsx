import React, { useEffect, useRef, useState } from 'react';

export const LuxuryStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    models: 0,
    cities: 0,
    delivered: 0,
    support: '24/7',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 2000;
          const steps = 50;
          const intervalTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCounts({
              models: Math.round(25 * progress),
              cities: Math.round(15 * progress),
              delivered: Math.round(500 * progress),
              support: '24/7',
            });

            if (step >= steps) {
              clearInterval(timer);
              setCounts({ models: 25, cities: 15, delivered: 500, support: '24/7' });
            }
          }, intervalTime);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    {
      value: `${counts.models}+`,
      label: 'Premium Models',
      detail: 'Curated European & British luxury marques',
    },
    {
      value: `${counts.cities}+`,
      label: 'Indian Cities',
      detail: 'Metropolitan salons & concierge transit hubs',
    },
    {
      value: `${counts.delivered}+`,
      label: 'Vehicles Delivered',
      detail: 'Ceremonial white-glove handovers executed',
    },
    {
      value: '24/7',
      label: 'Concierge Support',
      detail: 'Direct dedicated liaison for every patron',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-28 bg-[#070709] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center sm:text-left ${
                idx !== 0 ? 'sm:border-l sm:border-white/10 sm:pl-8' : ''
              }`}
            >
              <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 champagne-gradient-text tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-wider text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-400 font-light max-w-[200px] mx-auto sm:mx-0">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
