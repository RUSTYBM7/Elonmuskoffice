'use client';
import { motion } from 'framer-motion';
import { Bot, Cpu, Battery, Wifi, Zap, Heart, Shield, Activity, ChevronRight, Play, Pause, Layers, Eye, Armchair } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const optimusSpecs = [
  { label: 'Height', value: '173 cm', icon: Layers },
  { label: 'Weight', value: '73 kg', icon: Battery },
  { label: 'Payload', value: '45 kg', icon: Cpu },
  { label: 'Runtime', value: '5+ hours', icon: Zap },
];

const capabilities = [
  { name: 'Precision Control', description: 'Human-level dexterity with 22 actuated degrees of freedom in each hand', icon: Hand },
  { name: 'Vision System', description: 'Neural network-powered vision for real-time environment mapping', icon: Eye },
  { name: 'AI Brain', description: 'End-to-end neural networks trained with real robot data', icon: Cpu },
  { name: 'Safety First', description: 'Designed to work safely alongside humans with force feedback', icon: Shield },
  { name: 'FSD Integration', description: 'Leverages Tesla\'s Full Self-Driving technology for navigation', icon: Wifi },
  { name: 'Auto Learning', description: 'Improves by watching humans perform tasks in minutes', icon: Activity },
];

const milestones = [
  { year: '2021', event: 'Tesla AI Day - Optimus Concept Reveal', status: 'complete' },
  { year: '2022', event: 'First Walking Demo', status: 'complete' },
  { year: '2023', event: 'Manual Assembly Task Demo', status: 'complete' },
  { year: '2024', event: 'Autonomous Factory Tasks', status: 'in-progress' },
  { year: '2025', event: 'Limited Production Start', status: 'in-progress' },
  { year: '2026', event: 'Mass Production & Sales', status: 'planned' },
];

function Hand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

export default function OptimusShowcase() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [activeCapability, setActiveCapability] = useState(0);
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

      // Draw robot body outline
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;

      // Head
      ctx.beginPath();
      ctx.arc(centerX, centerY - 120, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(centerX - 10, centerY - 125, 4, 0, Math.PI * 2);
      ctx.arc(centerX + 10, centerY - 125, 4, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.strokeStyle = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(centerX - 40, centerY - 90);
      ctx.lineTo(centerX + 40, centerY - 90);
      ctx.lineTo(centerX + 50, centerY + 20);
      ctx.lineTo(centerX - 50, centerY + 20);
      ctx.closePath();
      ctx.stroke();

      // Core glow
      ctx.fillStyle = `rgba(99, 102, 241, ${0.3 + Math.sin(frame * 0.05) * 0.2})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 40, 15, 0, Math.PI * 2);
      ctx.fill();

      // Arms with animation
      const armSwing = isAnimating ? Math.sin(frame * 0.03) * 20 : 0;

      ctx.beginPath();
      ctx.moveTo(centerX - 40, centerY - 80);
      ctx.lineTo(centerX - 80 + armSwing, centerY - 20);
      ctx.lineTo(centerX - 90 + armSwing, centerY + 60);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 40, centerY - 80);
      ctx.lineTo(centerX + 80 - armSwing, centerY - 20);
      ctx.lineTo(centerX + 90 - armSwing, centerY + 60);
      ctx.stroke();

      // Legs with animation
      const legSwing = isAnimating ? Math.sin(frame * 0.03) * 15 : 0;

      ctx.beginPath();
      ctx.moveTo(centerX - 25, centerY + 20);
      ctx.lineTo(centerX - 30 - legSwing, centerY + 100);
      ctx.lineTo(centerX - 25 - legSwing, centerY + 160);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 25, centerY + 20);
      ctx.lineTo(centerX + 30 + legSwing, centerY + 100);
      ctx.lineTo(centerX + 25 + legSwing, centerY + 160);
      ctx.stroke();

      // Data nodes
      ctx.fillStyle = '#22d3ee';
      const nodes = [
        { x: centerX - 60, y: centerY - 60 },
        { x: centerX + 60, y: centerY - 60 },
        { x: centerX - 70, y: centerY + 40 },
        { x: centerX + 70, y: centerY + 40 },
      ];

      nodes.forEach((node, i) => {
        const pulse = Math.sin(frame * 0.05 + i) * 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4 + pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isAnimating]);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-violet-950/20 to-black border-t border-violet-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-violet-500/30 bg-violet-500/5 rounded-full">
            <Bot className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400 font-medium">
              Humanoid Robot
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Optimus Robot
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            The future of humanoid robotics. A general-purpose robot capable of dangerous, repetitive, or boring tasks.
          </p>
        </motion.div>

        {/* Robot Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-900/30 to-cyan-900/30 border border-violet-500/20 relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={450}
                className="w-full h-full"
              />

              {/* Controls */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isAnimating ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
                <span className="text-white/60 text-sm">Robot Animation</span>
              </div>

              {/* Status */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {optimusSpecs.map((spec, i) => {
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
                <Icon className="w-6 h-6 text-violet-500 mx-auto mb-3" />
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
          <h3 className="text-2xl font-medium text-white text-center mb-8">Core Capabilities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`p-5 rounded-xl border transition-colors cursor-pointer ${
                    activeCapability === i
                      ? 'bg-violet-500/10 border-violet-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveCapability(i)}
                >
                  <Icon className="w-6 h-6 text-violet-500 mb-3" />
                  <h4 className="text-white font-medium mb-1">{cap.name}</h4>
                  <p className="text-sm text-white/60">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-medium text-white text-center mb-8">Development Roadmap</h3>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-cyan-500 to-violet-500" />

              <div className="space-y-6">
                {milestones.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="ml-10 md:ml-0 md:w-1/2 pl-8 md:pl-0 md:pr-8">
                      <div className={`p-4 rounded-xl ${
                        item.status === 'complete' ? 'bg-green-500/10 border border-green-500/30' :
                        item.status === 'in-progress' ? 'bg-violet-500/10 border border-violet-500/30' :
                        'bg-white/5 border border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-violet-500 font-medium">{item.year}</p>
                          {item.status === 'complete' && <span className="text-green-400 text-xs">✓</span>}
                          {item.status === 'in-progress' && <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
                        </div>
                        <p className="text-white text-sm">{item.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-500 border-4 border-black" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.tesla.com/optimus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium rounded-full hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25"
          >
            <Bot className="w-4 h-4" />
            Learn More About Optimus
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
