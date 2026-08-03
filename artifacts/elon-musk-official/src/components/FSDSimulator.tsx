'use client';
import { motion } from 'framer-motion';
import { Car, MapPin, Navigation, Eye, Zap, AlertTriangle, CheckCircle, Radio, Signal, Cpu, Play, Pause, RotateCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const roadScenarios = [
  { id: 'highway', name: 'Highway Driving', difficulty: 'Easy', description: 'Lane keeping and lane changes on open highway' },
  { id: 'city', name: 'City Streets', difficulty: 'Medium', description: 'Navigate urban environment with traffic lights' },
  { id: 'complex', name: 'Complex Intersection', difficulty: 'Hard', description: 'Handle unprotected turns and pedestrians' },
];

const sensorStatus = [
  { name: 'Cameras', status: 'Active', value: '8/8', color: 'text-green-400' },
  { name: 'Radar', status: 'Active', value: '1/1', color: 'text-green-400' },
  { name: 'Ultrasonic', status: 'Active', value: '12/12', color: 'text-green-400' },
  { name: 'Neural Net', status: 'Running', value: '142M params', color: 'text-cyan-400' },
];

export default function FSDSimulator() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeScenario, setActiveScenario] = useState('highway');
  const [carPosition, setCarPosition] = useState({ x: 50, y: 50 });
  const [speed, setSpeed] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw road
      const roadGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      roadGradient.addColorStop(0, '#374151');
      roadGradient.addColorStop(1, '#1f2937');
      ctx.fillStyle = roadGradient;
      ctx.fillRect(canvas.width * 0.2, 0, canvas.width * 0.6, canvas.height);

      // Road lanes
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([40, 20]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Side lines
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.2, 0);
      ctx.lineTo(canvas.width * 0.2, canvas.height);
      ctx.moveTo(canvas.width * 0.8, 0);
      ctx.lineTo(canvas.width * 0.8, canvas.height);
      ctx.stroke();

      // Draw objects on road
      const time = Date.now() / 1000;

      // Other vehicles
      ctx.fillStyle = '#6b7280';
      ctx.fillRect(canvas.width * 0.55 + Math.sin(time) * 20, canvas.height * 0.3, 40, 70);
      ctx.fillRect(canvas.width * 0.35 + Math.cos(time * 0.7) * 30, canvas.height * 0.6, 40, 70);

      // Pedestrian
      if (activeScenario !== 'highway') {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(canvas.width * 0.7 + Math.sin(time * 2) * 50, canvas.height * 0.5 + Math.cos(time) * 20, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Detection boxes
      if (isSimulating) {
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2;

        // Vehicle detection
        ctx.strokeRect(canvas.width * 0.55 + Math.sin(time) * 20 - 5, canvas.height * 0.3 - 5, 50, 80);

        // Detection label
        ctx.fillStyle = '#22d3ee';
        ctx.font = '10px monospace';
        ctx.fillText('Vehicle 95%', canvas.width * 0.55 + Math.sin(time) * 20 - 5, canvas.height * 0.3 - 10);
      }

      // Draw Tesla car
      const carX = canvas.width * (carPosition.x / 100);
      const carY = canvas.height * (carPosition.y / 100);

      // Car shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(carX, carY + 35, 25, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Car body
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.roundRect(carX - 20, carY - 25, 40, 55, 5);
      ctx.fill();

      // Car roof
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.roundRect(carX - 15, carY - 35, 30, 20, 3);
      ctx.fill();

      // Wheels
      ctx.fillStyle = '#111827';
      ctx.fillRect(carX - 22, carY - 15, 6, 15);
      ctx.fillRect(carX + 16, carY - 15, 6, 15);
      ctx.fillRect(carX - 22, carY + 10, 6, 15);
      ctx.fillRect(carX + 16, carY + 10, 6, 15);

      // Car lights
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(carX - 12, carY - 22, 3, 0, Math.PI * 2);
      ctx.arc(carX + 12, carY - 22, 3, 0, Math.PI * 2);
      ctx.fill();

      // Sensor view cones
      if (isSimulating) {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.1)';
        ctx.beginPath();
        ctx.moveTo(carX, carY - 20);
        ctx.lineTo(carX - 80, carY - 150);
        ctx.lineTo(carX + 80, carY - 150);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(34, 211, 238, 0.05)';
        ctx.beginPath();
        ctx.moveTo(carX, carY + 20);
        ctx.lineTo(carX - 100, carY + 100);
        ctx.lineTo(carX + 100, carY + 100);
        ctx.closePath();
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isSimulating, carPosition, activeScenario]);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSpeed(prev => {
        const target = activeScenario === 'highway' ? 70 : activeScenario === 'city' ? 35 : 15;
        return prev + (target - prev) * 0.05;
      });

      setCarPosition(prev => ({
        x: 50 + Math.sin(Date.now() / 1000) * 10,
        y: Math.max(20, Math.min(80, prev.y + (Math.random() - 0.5) * 2))
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isSimulating, activeScenario]);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-red-950/20 to-black border-t border-red-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-red-500/30 bg-red-500/5 rounded-full">
            <Car className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-red-600 dark:text-red-400 font-medium">
              Full Self-Driving
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            FSD Simulator
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Experience Tesla's neural network in action. Real-time object detection and path planning visualization.
          </p>
        </motion.div>

        {/* Main Simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-red-500/20 bg-black">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full"
            />

            {/* HUD Overlay */}
            <div className="absolute top-4 left-4 space-y-3">
              {/* Speed */}
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Speed</p>
                <p className="text-2xl font-bold text-white">{Math.round(speed)} <span className="text-sm text-white/50">mph</span></p>
              </div>

              {/* Status */}
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">FSD Status</p>
                <p className={`text-lg font-medium ${isSimulating ? 'text-green-400' : 'text-yellow-400'}`}>
                  {isSimulating ? 'Active' : 'Standby'}
                </p>
              </div>
            </div>

            {/* Sensor Status */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Sensors</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {sensorStatus.map(sensor => (
                  <div key={sensor.name} className="flex items-center gap-1">
                    <Signal className={`w-3 h-3 ${sensor.color}`} />
                    <span className="text-white/70">{sensor.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="p-3 bg-red-500 hover:bg-red-400 rounded-full transition-colors"
                >
                  {isSimulating ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
                <button
                  onClick={() => {
                    setIsSimulating(false);
                    setCarPosition({ x: 50, y: 50 });
                    setSpeed(0);
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex gap-2">
                {roadScenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      activeScenario === scenario.id
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {scenario.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scenario Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-white">{roadScenarios.find(s => s.id === activeScenario)?.name}</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                roadScenarios.find(s => s.id === activeScenario)?.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                roadScenarios.find(s => s.id === activeScenario)?.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {roadScenarios.find(s => s.id === activeScenario)?.difficulty}
              </span>
            </div>
            <p className="text-white/60">{roadScenarios.find(s => s.id === activeScenario)?.description}</p>
          </div>
        </motion.div>

        {/* Detection Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Eye, label: 'Object Detection', value: '99.1%', sub: 'Precision' },
            { icon: Navigation, label: 'Path Planning', value: 'Real-time', sub: 'Updates' },
            { icon: Zap, label: 'Reaction Time', value: '<100ms', sub: 'Latency' },
            { icon: Cpu, label: 'Compute', value: '72 TOPS', sub: 'FSD Chip' },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-center"
            >
              <feature.icon className="w-6 h-6 text-red-500 mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-medium text-white mb-1">{feature.value}</p>
              <p className="text-sm text-white/60">{feature.sub}</p>
              <p className="text-xs text-white/40">{feature.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.tesla.com/autopilot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium rounded-full hover:from-red-500 hover:to-red-400 transition-all shadow-lg shadow-red-500/25"
          >
            <Car className="w-4 h-4" />
            Experience Full Self-Driving
          </a>
        </motion.div>
      </div>
    </section>
  );
}
