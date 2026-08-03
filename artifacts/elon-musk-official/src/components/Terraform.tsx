'use client';
import { motion } from 'framer-motion';
import { Shovel, MapPin, ArrowRight, Layers, Truck, Route, Gauge, Shield, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { logoFor } from '@/lib/companyLogos';
import CompanyLogo from './CompanyLogo';

// Vegas Loop Stats
const loopStats = [
  { value: '65+', label: 'Miles Planned', icon: Route },
  { value: '2M+', label: 'Riders Served', icon: Truck },
  { value: '150mph', label: 'Max Speed', icon: Gauge },
  { value: '<2min', label: 'Station Wait', icon: Shield },
];

// Prufrock Specs
const prufrockSpecs = [
  { label: 'Dig Rate', value: '1 mile/week', icon: Shovel },
  { label: 'Diameter', value: '17.5 feet', icon: Layers },
  { label: 'Launch', value: 'Surface', icon: Globe },
  { label: 'Autonomy', value: 'Full 24/7', icon: Cpu },
];

// Projects
const projects = [
  {
    name: 'Vegas Strip Loop',
    location: 'Las Vegas Strip, NV',
    status: 'Under Construction',
    length: '29 miles',
    stations: 18,
    description: 'Connecting the Las Vegas Strip from Allegiant Stadium to the Welcome to Fabulous Las Vegas Sign, featuring stops at major resorts and the airport.',
    progress: 35,
  },
  {
    name: 'Vegas Convention Center Loop',
    location: 'Las Vegas, NV',
    status: 'Operational',
    length: '1.7 miles',
    stations: 3,
    description: 'The world\'s first underground express tunnel system, transporting attendees between convention halls in under 2 minutes.',
    progress: 100,
  },
  {
    name: 'Fort Lauderdale Loop',
    location: 'Fort Lauderdale, FL',
    status: 'Approved',
    length: '3 miles',
    stations: 2,
    description: 'Connecting downtown Fort Lauderdale to the beach, reducing travel time from 30 minutes to 6 minutes.',
    progress: 5,
  },
];

export default function Terraform() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="relative py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-border bg-secondary/30 rounded-full">
            <Shovel className="w-3.5 h-3.5 text-foreground" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              Earth Transformation
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
            Terraform Earth
          </h2>
          <p className="text-sm md:text-base text-foreground/65 max-w-2xl mx-auto">
            Solving traffic forever with next-generation tunnel technology. Prufrock is digging faster than ever before.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-12 md:mb-16">
          {loopStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-6 md:p-8 flex flex-col gap-3"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground dark:text-primary">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground text-center mb-8">
            The Boring Solution
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-border bg-secondary/20">
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                <Shovel className="w-5 h-5 text-foreground" />
              </div>
              <h4 className="text-base font-medium text-foreground mb-2">Dig Faster</h4>
              <p className="text-sm text-foreground/65">
                Prufrock bores 10x faster than legacy tunnel machines. Launch directly from the surface — no vertical shaft required.
              </p>
            </div>
            <div className="text-center p-6 border border-border bg-secondary/20">
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                <Truck className="w-5 h-5 text-foreground" />
              </div>
              <h4 className="text-base font-medium text-foreground mb-2">Tesla in Tunnels</h4>
              <p className="text-sm text-foreground/65">
                Standard Tesla vehicles drive through tunnels at up to 150mph. No special vehicles needed — just hop in and go.
              </p>
            </div>
            <div className="text-center p-6 border border-border bg-secondary/20">
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <h4 className="text-base font-medium text-foreground mb-2">All-Weather</h4>
              <p className="text-sm text-foreground/65">
                Underground tunnels are immune to weather, earthquakes, and surface congestion. Always on time, every time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground text-center mb-8">
            Current Projects
          </h3>

          {/* Project Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {projects.map((project, i) => (
              <button
                key={project.name}
                onClick={() => setActiveProject(i)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.12em] transition-all ${
                  activeProject === i
                    ? 'bg-foreground text-background border border-foreground'
                    : 'border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>

          {/* Active Project Display */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-border bg-background overflow-hidden"
          >
            {/* Project Header */}
            <div className="p-6 border-b border-border bg-secondary/10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-xl font-medium text-foreground">{projects[activeProject].name}</h4>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {projects[activeProject].location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CompanyLogo
                    src={logoFor('Boring Co.')}
                    alt="The Boring Company"
                    className="h-6"
                  />
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.12em] font-medium ${
                    projects[activeProject].status === 'Operational'
                      ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                      : projects[activeProject].status === 'Under Construction'
                      ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                  }`}>
                    {projects[activeProject].status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground/70">{projects[activeProject].description}</p>
            </div>

            {/* Project Stats */}
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{projects[activeProject].progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${projects[activeProject].progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-foreground rounded-full"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px bg-border">
                <div className="bg-background p-4 text-center">
                  <p className="text-xl font-medium text-foreground">{projects[activeProject].length}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1">Length</p>
                </div>
                <div className="bg-background p-4 text-center">
                  <p className="text-xl font-medium text-foreground">{projects[activeProject].stations}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1">Stations</p>
                </div>
                <div className="bg-background p-4 text-center">
                  <p className="text-xl font-medium text-foreground">150</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1">MPH Max</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Prufrock Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-6 text-center">
            Prufrock TBM Specs
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {prufrockSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div key={spec.label} className="bg-background p-6 text-center">
                  <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xl font-medium text-foreground">{spec.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1">{spec.label}</p>
                </div>
              );
            })}
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
            href="https://www.boringcompany.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-xs uppercase tracking-[0.12em] font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Learn More About The Boring Company
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
