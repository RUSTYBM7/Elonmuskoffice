'use client';
import { motion } from "framer-motion";
import { Globe, Rocket, ArrowRight, Thermometer, Wind, Droplets, Radiation, CheckCircle2, Circle, Building } from "lucide-react";
import { useState } from "react";

const missionPhases = [
  { id: 1, name: 'Uncrewed Tests', year: '2026', status: 'confirmed', description: 'Starship unmanned cargo missions to establish initial infrastructure' },
  { id: 2, name: 'First Crew Landing', year: '2028', status: 'planned', description: 'Historic first human footprint on Mars with initial habitat setup' },
  { id: 3, name: 'Base Construction', year: '2030', status: 'planned', description: 'Permanent habitat construction and life support systems' },
  { id: 4, name: 'Self-Sustaining City', year: '2050', status: 'vision', description: 'City with 1 million residents, fully independent from Earth' }
];

const survivalChallenges = [
  { icon: Thermometer, label: 'Temperature', value: '-60°C avg', detail: 'Surface temperature ranges from 20°C at equator to -125°C at poles' },
  { icon: Radiation, label: 'Radiation', value: 'High', detail: 'No magnetic field means 50x higher radiation than Earth surface' },
  { icon: Wind, label: 'Atmosphere', value: '1% density', detail: 'Thin CO2 atmosphere with occasional dust storms lasting months' },
  { icon: Droplets, label: 'Water', value: 'Ice deposits', detail: 'Frozen water at poles and subsurface ice in mid-latitudes' }
];

export default function MarsMissionPlanner() {
  const [activePhase, setActivePhase] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 dark:text-green-400 bg-green-500/20';
      case 'planned': return 'text-blue-600 dark:text-blue-400 bg-blue-500/20';
      case 'vision': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/20';
      default: return 'text-muted-foreground bg-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="w-4 h-4" />;
      case 'planned': return <Circle className="w-4 h-4" />;
      case 'vision': return <Circle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-6 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-border bg-secondary/20 rounded-full">
            <Globe className="w-3.5 h-3.5 text-foreground" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              Multiplanetary Future
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
            Mars Mission Planner
          </h2>
          <p className="text-sm text-foreground/65 max-w-2xl mx-auto">
            Making humanity a multiplanetary species. Explore SpaceX&apos;s plan to establish a self-sustaining city on Mars.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-secondary border border-border">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-24 h-24 md:w-32 md:h-32 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/40 text-lg">Mars Colony Visualization</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">225M</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">km away</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">7-9</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">months travel</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">~1M</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">target pop.</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">$100K</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">ticket goal</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-foreground">Mission Timeline</h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-foreground hover:text-primary transition-colors"
            >
              {showDetails ? 'Show Less' : 'Show All'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-foreground via-foreground/50 to-foreground/20" />

            <div className="space-y-6">
              {missionPhases.slice(0, showDetails ? 4 : 2).map((phase, i) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative pl-12 md:pl-20 ${activePhase === phase.id - 1 ? 'scale-[1.02]' : ''}`}
                  onClick={() => setActivePhase(phase.id - 1)}
                >
                  <div className={`absolute left-0 md:left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    phase.status === 'confirmed' ? 'bg-green-500 text-white' :
                    phase.status === 'planned' ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    {getStatusIcon(phase.status)}
                  </div>

                  <div className={`p-4 md:p-6 rounded-xl border transition-all cursor-pointer ${
                    activePhase === phase.id - 1
                      ? 'bg-secondary/30 border-foreground/30'
                      : 'bg-secondary/20 border-border hover:border-foreground/20'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-foreground">{phase.name}</h4>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full mt-1 ${getStatusColor(phase.status)}`}>
                          {phase.status}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-foreground">{phase.year}</span>
                    </div>
                    <p className="text-sm text-foreground/65">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-xl font-medium text-foreground mb-6 text-center">
            Survival Challenges
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {survivalChallenges.map((challenge, i) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 bg-secondary/20 border border-border rounded-xl hover:bg-secondary/30 transition-colors"
                >
                  <Icon className="w-6 h-6 text-foreground mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{challenge.label}</p>
                  <p className="text-lg font-medium text-foreground mb-2">{challenge.value}</p>
                  <p className="text-xs text-muted-foreground/70">{challenge.detail}</p>
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
          className="mb-12"
        >
          <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-6 h-6 text-foreground" />
              <h4 className="text-lg font-medium text-foreground">Starship: The Interplanetary Vehicle</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-foreground/65">Height</span>
                  <span className="text-foreground font-medium">121 meters</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-foreground/65">Payload to LEO</span>
                  <span className="text-foreground font-medium">100+ metric tons</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-foreground/65">Raptor Engines</span>
                  <span className="text-foreground font-medium">33 (Super Heavy)</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-foreground/65">Propellant</span>
                  <span className="text-foreground font-medium">Liquid Methane/Oxygen</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-foreground/65">Reusability</span>
                  <span className="text-foreground font-medium">Full & Rapid</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-foreground/65">Crew Capacity</span>
                  <span className="text-foreground font-medium">100 passengers</span>
                </div>
              </div>
            </div>
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
            href="https://www.spacex.com/mars/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-colors"
          >
            <Building className="w-5 h-5" />
            Learn More About Mars Colonization
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground/50">
          Mars colonization is an ambitious long-term project. All dates and plans are subject to change based on technological progress and funding.
        </p>
      </div>
    </section>
  );
}
