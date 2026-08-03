'use client';
import { motion } from "framer-motion";
import { Satellite, Globe, Signal, Users, Download, Zap, MapPin, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const coverageStats = [
  { value: '12,000+', label: 'Active Satellites', icon: Satellite },
  { value: '120+', label: 'Countries', icon: Globe },
  { value: '10M+', label: 'Subscribers', icon: Users },
  { value: '20-40ms', label: 'Latency', icon: Signal },
];

const servicePlans = [
  { name: 'Standard', speed: '100-200 Mbps', price: '$120/mo', latency: '20-40ms', icon: Download },
  { name: 'Priority', speed: '200-500 Mbps', price: '$180/mo', latency: '12-28ms', icon: Zap },
  { name: 'Mobile', speed: 'Up to 350 Mbps', price: '$150/mo', latency: '28-45ms', icon: Satellite },
];

const coverageRegions = [
  { name: 'North America', coverage: 98, status: 'Full Coverage' },
  { name: 'Europe', coverage: 95, status: 'Full Coverage' },
  { name: 'Asia Pacific', coverage: 78, status: 'Expanding' },
  { name: 'South America', coverage: 65, status: 'Growing' },
  { name: 'Africa', coverage: 45, status: 'Rolling Out' },
  { name: 'Oceania', coverage: 82, status: 'Good Coverage' },
];

export default function StarlinkCoverage() {
  const [activeRegion, setActiveRegion] = useState(0);
  const [satsVisible, setSatsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSatsVisible(prev => {
        if (prev >= 120) return 0;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
              Global Internet
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
            Starlink Coverage
          </h2>
          <p className="text-sm text-foreground/65 max-w-2xl mx-auto">
            High-speed, low-latency broadband internet anywhere on Earth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-secondary border border-border relative">
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-20">
                <path d="M150,100 Q200,80 250,100 T350,90 T450,100 T550,95 T650,100" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
                <path d="M100,150 Q150,130 200,150 T300,140 T400,150 T500,145 T600,155 T700,150" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
                <path d="M120,200 Q180,180 240,200 T360,190 T480,200 T600,195 T720,200" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
                <path d="M100,250 Q160,230 220,250 T340,240 T460,250 T580,245 T700,250" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
                <path d="M80,300 Q140,280 200,300 T320,290 T440,300 T560,295 T680,300" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {Array.from({ length: satsVisible }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-1 h-1 bg-foreground rounded-full"
                      style={{
                        left: `${10 + (i * 7) % 80}%`,
                        top: `${20 + (i * 11) % 60}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm rounded-xl p-4 flex justify-around border border-border">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{satsVisible}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Sats Visible</p>
                </div>
                <div className="w-px bg-foreground/20" />
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">LIVE</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Feed Active</p>
                </div>
                <div className="w-px bg-foreground/20" />
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">12,000+</p>
                  <p className="text-[10px] text-muted-foreground uppercase">In Orbit</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {coverageStats.map((stat, i) => {
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
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
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
          className="mb-12"
        >
          <h3 className="text-xl font-medium text-foreground text-center mb-8">Service Plans</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {servicePlans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-6 rounded-xl border ${i === 0 ? 'bg-secondary/30 border-foreground/20' : 'bg-secondary/20 border-border'} hover:bg-secondary/30 transition-colors`}
                >
                  <Icon className="w-8 h-8 text-foreground mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">{plan.name}</h4>
                  <p className="text-2xl font-bold text-foreground mb-1">{plan.speed}</p>
                  <p className="text-sm text-muted-foreground mb-4">{plan.latency} latency</p>
                  <p className="text-2xl font-bold text-foreground">{plan.price}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-medium text-foreground text-center mb-8">Global Coverage</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coverageRegions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-4 bg-secondary/20 border border-border rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer"
                onClick={() => setActiveRegion(i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-foreground" />
                    <span className="text-foreground font-medium">{region.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    region.status === 'Full Coverage' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                    region.status === 'Good Coverage' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                    'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {region.coverage}%
                  </span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.coverage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-foreground rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.starlink.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-colors"
          >
            <Satellite className="w-4 h-4" />
            Order Starlink
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
