'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

// Detailed data for each city supporting multiple entries
const CITY_SPECS: Record<string, any[]> = {
  TORONTO: [
    {
      nodeId: 'NODE_01',
      role: 'Derivatives Specialist',
      company: 'CIBC Mellon',
      duration: '2025.07',
      directive: 'Responsible for automated data processing, transaction capture, system reconciliation, and anomaly monitoring of daily derivative transactions, ensuring that millions of transactions are processed within T+0 time, meeting the timeliness and compliance requirements of exchanges and regulators.'
    },
    {
      nodeId: 'NODE_03',
      role: 'Co-Founder',
      company: 'Campus Eats',
      duration: '2023.09',
      directive: "Co-founded and led a team of 15+ tech and business professionals to create Campus Eats, providing students with over 5 new dining options and reducing costs by 30%. Successfully accepted into the University of Toronto's incubator program, and conducted market research on over 50 restaurants and 500+ students, developing a business plan and a 5-year cash flow analysis."
    },
    {
      nodeId: 'NODE_02',
      role: 'Performance Test Analyst',
      company: 'CIBC',
      duration: '2022.09',
      directive: 'Built and maintained an automated testing framework, integrating it into the CI/CD pipeline to significantly reduce manual testing workload. Participated in API performance analysis and microservice architecture optimization for enterprise-level banking systems, conduct stress testing and throughput analysis, identify performance bottlenecks, and collaborate with the development team to perform system tuning.'
    }
  ],
  NEWCASTLE: [
    {
      nodeId: 'NODE_04',
      role: 'Student Intern',
      company: 'Greaves West & Ayre',
      duration: '2015.07',
      directive: 'Experienced in most financial, business departments and spending time as a proactive IT supporter. Responsible for import and sort data using Xero, Sage, while giving quality advice to our clients.'
    }
  ],
  BEIJING: [
    {
      nodeId: 'NODE_05',
      role: 'Business Analyst',
      company: 'Digital China',
      duration: '2026.03',
      directive: 'Conducted requirements analysis and research, design business processes, prepare requirement documentation, oversee development quality and issue tracking, and produce system documentation such as user manuals.'
    }
  ]
};

const CITIES = [
  { name: 'TORONTO', lat: 43.6532, lng: -79.3832 },
  { name: 'NEWCASTLE', lat: 54.9783, lng: -1.6178 },
  { name: 'BEIJING', lat: 39.9042, lng: 116.4074 },
];

const MissionSpecsPanel: React.FC<{ 
  city: string; 
  onClose: () => void 
}> = ({ city, onClose }) => {
  const specsList = CITY_SPECS[city];
  if (!specsList) return null;

  // Disable global scroll when panel is open using fixed positioning for maximum reliability
  useEffect(() => {
    const scrollY = window.scrollY;
    const originalBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY
    };

    // Lock the body in its current position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';

    return () => {
      // Restore original styles
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.overflowY = originalBodyStyle.overflowY;
      
      // Jump back to the exact scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-black border-l border-[#00d4ff]/20 z-[100] p-8 overflow-y-auto"
    >
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 
            className="text-3xl font-bold text-[#00d4ff] tracking-[0.1em] uppercase"
            style={{ fontFamily: 'var(--font-brandon), system-ui, sans-serif' }}
          >
            MISSION_SPECS
          </h2>
          <p className="text-[10px] text-[#00d4ff]/60 font-mono tracking-widest mt-1">
            LOCATION: {city}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-[#00d4ff]/10 rounded-none transition-colors group"
        >
          <X className="w-6 h-6 text-[#00d4ff] group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div className="space-y-16">
        {specsList.map((specs, index) => (
          <div key={specs.nodeId} className="space-y-8">
            {index > 0 && <div className="h-[1px] w-full bg-[#00d4ff]/10" />}
            
            <section>
              <label className="text-[10px] text-[#00d4ff]/40 font-mono tracking-[0.2em] uppercase">NODE_ID: {specs.nodeId}</label>
              <h3 
                className="text-2xl font-bold text-white tracking-wide mt-2 uppercase"
                style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
              >
                {specs.role}
              </h3>
              <p 
                className="text-[#00d4ff]/80 text-sm mt-1 font-medium"
                style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
              >
                {specs.company}
              </p>
            </section>

            <section>
              <label className="text-[10px] text-[#00d4ff]/40 font-mono tracking-[0.2em] uppercase">STARTED AT</label>
              <p className="text-lg text-[#00d4ff] font-mono mt-2">{specs.duration}</p>
            </section>

            <section className="bg-[#00d4ff]/5 border-l-2 border-[#00d4ff] p-6">
              <label className="text-[10px] text-[#00d4ff] font-mono tracking-[0.2em] uppercase">CORE_DIRECTIVE</label>
              <p 
                className="text-neutral-300 text-sm leading-relaxed mt-3 text-left"
                style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
              >
                {specs.directive}
              </p>
            </section>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const CityPulse: React.FC<{ x: number; y: number; name: string; onClick: () => void }> = ({ x, y, name, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute flex items-center justify-center pointer-events-auto cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute whitespace-nowrap bg-black border border-[#00d4ff]/30 px-2 py-1 rounded-none text-[10px] text-[#00d4ff] font-mono tracking-widest uppercase pointer-events-none"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative flex items-center justify-center"
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="relative bg-[#00d4ff]"
          style={{
            width: '6px',
            height: '6px',
            borderTopRightRadius: '30%',
            transform: 'rotate(-60deg) skewX(-30deg) scale(1,.866)',
            boxShadow: '0 0 10px rgba(0,212,255,0.75)',
          }}
        >
          <div
            className="absolute bg-inherit w-full h-full"
            style={{
              borderTopRightRadius: '30%',
              transform: 'rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%)',
            }}
          />
          <div
            className="absolute bg-inherit w-full h-full"
            style={{
              borderTopRightRadius: '30%',
              transform: 'rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export const WorldMapSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json');
        const topo = await res.json();
        const { arcs: rawArcs, transform } = topo;
        const { scale, translate } = transform;

        const decoded = rawArcs.map((arc: number[][]) => {
          let x = 0, y = 0;
          return arc.map(([dx, dy]) => {
            x += dx; y += dy;
            return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
          });
        });

        if (cancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        const W = canvas.width;
        const H = canvas.height;

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.12)';
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.35)';
        ctx.lineWidth = 1;

        const drawRing = (coords: number[][]) => {
          if (coords.length === 0) return;
          const isAntarctica = coords.every(([_, lat]) => lat < -60);
          if (isAntarctica) return;

          ctx.beginPath();
          let prevLng = coords[0][0];
          coords.forEach(([lng, lat], i) => {
            const x = ((lng + 180) / 360) * W;
            const y = ((90 - lat) / 180) * H;
            if (i > 0 && Math.abs(lng - prevLng) > 180) {
              ctx.moveTo(x, y);
            } else {
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            prevLng = lng;
          });
          ctx.fill();
          ctx.stroke();
        };

        const walk = (g: any) => {
          if (g.type === 'GeometryCollection') g.geometries.forEach(walk);
          else if (g.type === 'Polygon') {
            const coords = g.arcs[0].map((idx: number) => 
              idx >= 0 ? decoded[idx] : [...decoded[~idx]].reverse()
            ).flat();
            drawRing(coords);
          } else if (g.type === 'MultiPolygon') {
            g.arcs.forEach((poly: any) => {
              const coords = poly[0].map((idx: number) => 
                idx >= 0 ? decoded[idx] : [...decoded[~idx]].reverse()
              ).flat();
              drawRing(coords);
            });
          }
        };

        walk(topo.objects.land);
        setIsLoaded(true);
      } catch (err) {
        console.error('WorldMap: failed to load data', err);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const project = (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100
  });

  return (
    <section
      id="world-map"
      className="w-full bg-black pt-12 pb-12 px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center gap-8 scroll-mt-16 relative"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        <div className="text-center leading-none mb-4 select-none">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[0.2em] uppercase text-center leading-tight"
            style={{ fontFamily: 'var(--font-brandon), system-ui, sans-serif' }}
          >
            EXPERIENCE
          </h2>
        </div>

        <div className="relative w-full aspect-[2/1] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={2048}
            height={1024}
            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,212,255,0.15)]"
          />

          {isLoaded && CITIES.map((city) => {
            const pos = project(city.lat, city.lng);
            return (
              <CityPulse 
                key={city.name} 
                x={pos.x} 
                y={pos.y} 
                name={city.name}
                onClick={() => setSelectedCity(city.name)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedCity && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCity(null)}
              className="fixed inset-0 bg-black/40 z-[90] pointer-events-auto"
            />
            <MissionSpecsPanel 
              city={selectedCity} 
              onClose={() => setSelectedCity(null)} 
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
