'use client';
import { motion } from 'framer-motion';
import { Globe, Rocket, Building, Zap, Atom, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const marsFacts = [
  { label: 'Distance from Earth', value: '225M km', icon: Rocket },
  { label: 'Gravity', value: '38% of Earth', icon: Zap },
  { label: 'Day Length', value: '24h 37m', icon: Globe },
  { label: 'Temperature', value: '-60°C avg', icon: Atom },
];

const colonyLocations = [
  { name: 'Olympus Mons Base', lat: 18.65, lng: -226.2, status: 'Planned', color: '#ef4444' },
  { name: 'Valles Marineris Hub', lat: -14.0, lng: -70.0, status: 'Proposed', color: '#f59e0b' },
  { name: 'Hellas Planitia', lat: -47.0, lng: 50.0, status: 'Scouting', color: '#22c55e' },
];

const futureVision = [
  { year: '2026', event: 'First crewed Mars mission', milestone: true },
  { year: '2028', event: 'Permanent base established', milestone: true },
  { year: '2030', event: '10,000 colonists', milestone: false },
  { year: '2035', event: 'Self-sustaining city', milestone: true },
  { year: '2040', event: '1 million population', milestone: false },
  { year: '2050', event: 'Terraforming begins', milestone: true },
];

export default function Mars3D() {
  const [isRotating, setIsRotating] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35 * zoom;

      // Mars gradient
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, '#e07a5f');
      gradient.addColorStop(0.5, '#c1440e');
      gradient.addColorStop(1, '#8b2500');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add surface details (craters)
      ctx.fillStyle = 'rgba(139, 37, 0, 0.3)';
      for (let i = 0; i < 15; i++) {
        const craterX = centerX + Math.cos(i * 2.4 + rotation) * radius * 0.6;
        const craterY = centerY + Math.sin(i * 1.7 + rotation * 0.5) * radius * 0.4;
        const craterR = radius * (0.05 + (i % 5) * 0.02);
        ctx.beginPath();
        ctx.arc(craterX, craterY, craterR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Polar ice caps
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - radius * 0.85, radius * 0.3, radius * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + radius * 0.85, radius * 0.25, radius * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();

      // Colony markers
      colonyLocations.forEach((colony, i) => {
        const markerX = centerX + Math.cos(i * 2.1 + rotation * 0.3) * radius * 0.7;
        const markerY = centerY + Math.sin(i * 1.5 + rotation * 0.2) * radius * 0.5;

        ctx.beginPath();
        ctx.arc(markerX, markerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = colony.color;
        ctx.fill();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      if (isRotating) {
        setRotation(prev => prev + 0.002);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [isRotating, zoom, rotation]);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-red-950/30 via-neutral-950 to-black border-t border-red-900/30 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
        {/* Stars */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(2px 2px at 20px 30px, white, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, white, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, white, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, white, rgba(0,0,0,0))',
          backgroundSize: '100px 200px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-red-500/30 bg-red-500/5 rounded-full">
            <Rocket className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-red-600 dark:text-red-400 font-medium">
              Multiplanetary Species
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Destination: Mars
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Making humanity multiplanetary. The red planet awaits.
          </p>
        </motion.div>

        {/* Interactive Mars Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 px-6"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-square rounded-2xl overflow-hidden border border-red-500/20 bg-black/50">
              <canvas
                ref={canvasRef}
                width={800}
                height={800}
                className="w-full h-full"
              />

              {/* Overlay Controls */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                  onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isRotating ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Colony Sites</p>
                {colonyLocations.map((colony) => (
                  <div key={colony.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colony.color }} />
                    <span className="text-xs text-white">{colony.name}</span>
                    <span className="text-[10px] text-white/50">({colony.status})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-6">
          {marsFacts.map((fact, i) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-center"
              >
                <Icon className="w-6 h-6 text-red-500 mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-medium text-white mb-1">{fact.value}</p>
                <p className="text-sm text-white/60">{fact.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mars Colony Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6"
        >
          <h3 className="text-2xl font-medium text-white text-center mb-8">Mars Colony Roadmap</h3>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-orange-500 to-red-500" />

            <div className="space-y-8">
              {futureVision.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 pr-8 pl-4">
                    <div className={`p-4 bg-white/5 border rounded-xl ${item.milestone ? 'border-red-500/50' : 'border-white/10'}`}>
                      <p className="text-red-500 font-medium mb-1">{item.year}</p>
                      <p className="text-white text-sm">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-4 border-black" />
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 px-6"
        >
          <a
            href="https://www.spacex.com/mars/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-full hover:from-red-500 hover:to-orange-500 transition-all shadow-lg shadow-red-500/25"
          >
            <Rocket className="w-4 h-4" />
            Learn More About Mars Mission
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
