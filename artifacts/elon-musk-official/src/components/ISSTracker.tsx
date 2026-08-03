'use client';
import { motion } from "framer-motion";
import { Satellite, MapPin, Clock, Zap, Users, Globe, Navigation, Signal } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const issStats = [
  { label: 'Altitude', value: '420 km', icon: Globe },
  { label: 'Velocity', value: '28,000 km/h', icon: Zap },
  { label: 'Orbit Time', value: '90 min', icon: Clock },
  { label: 'Crew', value: '11', icon: Users },
];

const crewMembers = [
  { name: 'Commander', agency: 'NASA', nationality: 'USA' },
  { name: 'Flight Engineer', agency: 'ESA', nationality: 'EU' },
  { name: 'Flight Engineer', agency: 'JAXA', nationality: 'Japan' },
  { name: 'Flight Engineer', agency: 'Roscosmos', nationality: 'Russia' },
];

export default function ISSTracker() {
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [isTracking, setIsTracking] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('Pacific Ocean');
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
      const radius = Math.min(canvas.width, canvas.height) * 0.35;

      const earthGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, 0,
        centerX, centerY, radius
      );
      earthGradient.addColorStop(0, '#3b82f6');
      earthGradient.addColorStop(0.5, '#1d4ed8');
      earthGradient.addColorStop(1, '#1e3a8a');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(centerX - radius * 0.4, centerY - radius * 0.2, radius * 0.2, radius * 0.15, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX - radius * 0.3, centerY + radius * 0.3, radius * 0.1, radius * 0.2, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + radius * 0.1, centerY + radius * 0.1, radius * 0.15, radius * 0.35, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + radius * 0.4, centerY - radius * 0.2, radius * 0.25, radius * 0.2, -0.2, 0, Math.PI * 2);
      ctx.fill();

      const orbitRadius = radius * 1.1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (isTracking) {
        const issAngle = frame * 0.02;
        const issX = centerX + Math.cos(issAngle) * orbitRadius;
        const issY = centerY + Math.sin(issAngle) * orbitRadius * 0.4;

        const glowGradient = ctx.createRadialGradient(issX, issY, 0, issX, issY, 20);
        glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(issX, issY, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(issX, issY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(issX - 15, issY - 2, 10, 4);
        ctx.fillRect(issX + 5, issY - 2, 10, 4);

        const lat = Math.sin(issAngle) * 51.6;
        const lon = (issAngle * 180 / Math.PI) % 360;

        setPosition({ lat, lon });

        if (lon > -30 && lon < 60) {
          setCurrentLocation('Europe/Africa Region');
        } else if (lon > 60 && lon < 150) {
          setCurrentLocation('Asia/Pacific Region');
        } else if (lon > -130 && lon < -30) {
          setCurrentLocation('North America Region');
        } else {
          setCurrentLocation('Pacific Ocean');
        }

        frame++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isTracking]);

  return (
    <section className="relative py-16 md:py-24 px-6 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-border bg-secondary/20 rounded-full">
            <Satellite className="w-3.5 h-3.5 text-foreground" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              Live Tracking
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
            ISS Live Tracker
          </h2>
          <p className="text-sm text-foreground/65 max-w-2xl mx-auto">
            Follow the International Space Station in real-time. The ultimate symbol of human space exploration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="w-full h-full"
              />

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <button
                  onClick={() => setIsTracking(!isTracking)}
                  className={`p-3 rounded-full transition-colors ${
                    isTracking ? 'bg-foreground text-background' : 'bg-secondary border border-border'
                  }`}
                >
                  {isTracking ? (
                    <Signal className="w-5 h-5" />
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                </button>
                <span className="text-sm text-foreground/70">{isTracking ? 'Live Tracking' : 'Paused'}</span>
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live Feed
                </span>
              </div>

              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Satellite className="w-4 h-4 text-foreground" />
                  <span className="text-foreground font-medium">ISS Position</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-foreground/70">
                    <span className="text-muted-foreground">Lat:</span> {position.lat.toFixed(2)}°
                  </p>
                  <p className="text-foreground/70">
                    <span className="text-muted-foreground">Lon:</span> {position.lon.toFixed(2)}°
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-foreground" />
                  <span className="text-foreground text-sm">{currentLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {issStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-secondary/20 border border-border rounded-xl text-center hover:bg-secondary/30 transition-colors"
              >
                <Icon className="w-6 h-6 text-foreground mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-medium text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <h3 className="text-xl font-medium text-foreground text-center mb-6">Current Crew</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {crewMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-4 bg-secondary/20 border border-border rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-secondary border border-border rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-foreground font-medium">{member.name}</p>
                <p className="text-muted-foreground text-sm">{member.agency}</p>
                <p className="text-muted-foreground/50 text-xs">{member.nationality}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-secondary/20 border border-border rounded-2xl p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Did You Know?</h3>
            <ul className="space-y-3 text-foreground/70">
              <li className="flex items-start gap-3">
                <Signal className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span>The ISS travels at 28,000 km/h, completing 16 orbits per day</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span>You can see the ISS with your naked eye from Earth</span>
              </li>
              <li className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span>The ISS has been continuously inhabited for over 20 years</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://spotthestation.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-colors"
          >
            <Satellite className="w-4 h-4" />
            Sign Up for ISS Sightings
          </a>
        </motion.div>
      </div>
    </section>
  );
}
