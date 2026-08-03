'use client';
import { motion } from 'framer-motion';
import { Brain, Cpu, Wifi, Battery, Activity, Zap, Heart, Eye, Hand, Mic, ChevronRight, Radio, Gauge, Waves } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const implantSpecs = [
  { label: 'Electrodes', value: '1,024', icon: Cpu },
  { label: 'Channels', value: '1,024', icon: Waves },
  { label: 'Wireless', value: '100 Mbps', icon: Wifi },
  { label: 'Battery', value: 'All-day', icon: Battery },
];

const brainRegions = [
  { name: 'Motor Cortex', function: 'Controls movement', color: '#22c55e', connected: true },
  { name: 'Somatosensory', function: 'Touch & pressure', color: '#3b82f6', connected: true },
  { name: 'Premotor', function: 'Movement planning', color: '#a855f7', connected: true },
  { name: 'Supplementary', function: 'Coordination', color: '#f59e0b', connected: false },
];

const capabilities = [
  { name: 'Neural Control', description: 'Control devices with your thoughts', icon: Brain, status: 'Active' },
  { name: 'Motor Restoration', description: 'Restore movement for paralysis patients', icon: Hand, status: 'Clinical' },
  { name: 'Vision Enhancement', description: 'Restore sight for the blind', icon: Eye, status: 'Developing' },
  { name: 'Communication', description: 'Speak directly from the brain', icon: Mic, status: 'Research' },
];

export default function NeuralinkBrain() {
  const [isActive, setIsActive] = useState(true);
  const [signalStrength, setSignalStrength] = useState(87);
  const [activeRegion, setActiveRegion] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Brain outline
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 100);
      ctx.bezierCurveTo(centerX + 80, centerY - 100, centerX + 100, centerY - 20, centerX + 90, centerY + 40);
      ctx.bezierCurveTo(centerX + 80, centerY + 80, centerX + 50, centerY + 100, centerX, centerY + 110);
      ctx.bezierCurveTo(centerX - 50, centerY + 100, centerX - 80, centerY + 80, centerX - 90, centerY + 40);
      ctx.bezierCurveTo(centerX - 100, centerY - 20, centerX - 80, centerY - 100, centerX, centerY - 100);
      ctx.fill();

      // Brain folds
      ctx.strokeStyle = '#4338ca';
      ctx.lineWidth = 2;

      // Left hemisphere
      ctx.beginPath();
      ctx.moveTo(centerX - 60, centerY - 60);
      ctx.bezierCurveTo(centerX - 30, centerY - 80, centerX, centerY - 70, centerX + 10, centerY - 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - 70, centerY);
      ctx.bezierCurveTo(centerX - 40, centerY + 10, centerX - 10, centerY, centerX + 20, centerY + 20);
      ctx.stroke();

      // Neural signals
      if (isActive) {
        ctx.fillStyle = '#22d3ee';
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + frame * 0.02;
          const radius = 30 + Math.sin(frame * 0.05 + i) * 20;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius * 0.7;
          const size = 3 + Math.sin(frame * 0.1 + i * 0.5) * 2;

          ctx.globalAlpha = 0.5 + Math.sin(frame * 0.08 + i) * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Electrode array (bottom right)
      const arrayX = centerX + 50;
      const arrayY = centerY + 50;

      ctx.fillStyle = '#6366f1';
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const px = arrayX + col * 6;
          const py = arrayY + row * 6;
          const pulse = isActive && Math.sin(frame * 0.1 + row + col) > 0 ? 1 : 0.3;
          ctx.globalAlpha = pulse;
          ctx.fillRect(px - 2, py - 2, 4, 4);
        }
      }
      ctx.globalAlpha = 1;

      // Connection lines from array to brain
      if (isActive) {
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(arrayX - 20, arrayY - 20);
        ctx.lineTo(centerX + 20, centerY + 20);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Brain regions
      brainRegions.forEach((region, i) => {
        const angle = (i / brainRegions.length) * Math.PI * 2 - Math.PI / 2;
        const dist = 60;
        const rx = centerX + Math.cos(angle) * dist;
        const ry = centerY + Math.sin(angle) * dist * 0.7;

        // Region marker
        ctx.beginPath();
        ctx.arc(rx, ry, isActive && region.connected ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = region.color + (region.connected ? '40' : '20');
        ctx.fill();
        ctx.strokeStyle = region.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pulsing effect for connected regions
        if (isActive && region.connected) {
          const pulseSize = 12 + Math.sin(frame * 0.08 + i) * 4;
          ctx.beginPath();
          ctx.arc(rx, ry, pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = region.color + '40';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isActive, activeRegion]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSignalStrength(prev => {
        const newValue = prev + (Math.random() - 0.5) * 10;
        return Math.max(70, Math.min(100, newValue));
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-indigo-950/30 to-black border-t border-indigo-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-indigo-500/30 bg-indigo-500/5 rounded-full">
            <Brain className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400 font-medium">
              Brain-Computer Interface
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Neuralink
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Connect your brain to computers. Revolutionary BCI technology for human augmentation and medical applications.
          </p>
        </motion.div>

        {/* Brain Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 relative">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-full"
              />

              {/* Signal Strength */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Signal</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-cyan-400">{Math.round(signalStrength)}%</p>
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 rounded-full ${
                          signalStrength > i * 25 ? 'bg-cyan-400' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  {isActive ? 'Active' : 'Inactive'}
                </button>
              </div>

              {/* Region Labels */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Active Regions</p>
                <div className="flex flex-wrap gap-2">
                  {brainRegions.filter(r => r.connected).map(region => (
                    <span
                      key={region.name}
                      className="px-2 py-1 text-xs rounded-full flex items-center gap-1"
                      style={{ backgroundColor: region.color + '30', color: region.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: region.color }} />
                      {region.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {implantSpecs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-center"
              >
                <Icon className="w-6 h-6 text-indigo-500 mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-medium text-white mb-1">{spec.value}</p>
                <p className="text-sm text-white/60">{spec.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-medium text-white text-center mb-8">Applications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">{cap.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          cap.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          cap.status === 'Clinical' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {cap.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">{cap.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Brain Regions Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Selected Region</h4>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: brainRegions[activeRegion].color }}
              />
              <span className="text-lg text-white font-medium">{brainRegions[activeRegion].name}</span>
              {brainRegions[activeRegion].connected && (
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Connected</span>
              )}
            </div>
            <p className="text-white/60">{brainRegions[activeRegion].function}</p>

            <div className="flex gap-2 mt-4">
              {brainRegions.map((region, i) => (
                <button
                  key={region.name}
                  onClick={() => setActiveRegion(i)}
                  className={`w-3 h-3 rounded-full transition-transform hover:scale-125 ${
                    activeRegion === i ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-950' : ''
                  }`}
                  style={{ backgroundColor: region.color }}
                />
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
          className="text-center"
        >
          <a
            href="https://neuralink.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Brain className="w-4 h-4" />
            Learn More About Neuralink
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
