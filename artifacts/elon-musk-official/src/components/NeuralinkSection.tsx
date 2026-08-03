import { motion } from "framer-motion";
import { 
  Brain, Cpu, Zap, Eye, Activity, Radio, 
  ExternalLink, Microscope, Shield, Globe, Users,
  ArrowUpRight
} from "lucide-react";

const SPECS = [
  { label: "Electrodes", value: "1,024", unit: "per chip", icon: Cpu },
  { label: "Threads", value: "64", unit: "polymer filaments", icon: Microscope },
  { label: "Thread width", value: "5", unit: "microns", icon: Shield },
  { label: "Data rate", value: "10", unit: "Mbps wireless", icon: Zap },
  { label: "Latency", value: "<1", unit: "millisecond", icon: Activity },
  { label: "Range", value: "5-10", unit: "meters BLE", icon: Radio },
];

const MILESTONES = [
  { year: "2016", event: "Founded, San Francisco" },
  { year: "2019", event: "N1 chip unveiled; NHP trials begin" },
  { year: "2020", event: "Pong-playing monkey demo live" },
  { year: "2021", event: "Link V0.9; pig neural mapping" },
  { year: "2023", event: "FDA approves PRIME human study" },
  { year: "Jan 2024", event: "First human implant — Noland Arbaugh" },
  { year: "Mar 2024", event: "Mind-controlled chess broadcast" },
  { year: "May 2024", event: "Second implant; thread retraction noted" },
  { year: "Aug 2024", event: "Blindsight FDA Breakthrough Device" },
  { year: "2025", event: "CONVOY multi-patient cohort active" },
  { year: "2026", event: "Telepathy v2: 90 WPM thought-to-text" },
];

const APPLICATIONS = [
  {
    title: "Telepathy",
    status: "Active",
    desc: "Control computers through thought. First patient achieved 8-bit cursor control within hours. Now streaming 90 WPM text output.",
    icon: Brain,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Blindsight",
    status: "FDA Breakthrough",
    desc: "Camera-to-cortex visual restoration for the blind. Bypasses damaged optic nerves. First human trials 2026.",
    icon: Eye,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Neural Repair",
    status: "Preclinical",
    desc: "Targeted stimulation for spinal cord injury, stroke recovery, and neurodegenerative reversal. Motor cortex remapping protocols.",
    icon: Activity,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    title: "Cognitive Expansion",
    status: "Research",
    desc: "Memory prosthetics, accelerated learning, direct knowledge transfer. The path to human-AI symbiosis.",
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

const TEAM_STATS = [
  { value: "600+", label: "Engineers", icon: Users },
  { value: "7", label: "Patient cohorts", icon: Brain },
  { value: "3", label: "Trial continents", icon: Globe },
  { value: "$8B+", label: "Valuation", icon: Shield },
];

export default function NeuralinkSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-foreground/[0.02] border-y border-border relative overflow-hidden">
      {/* Subtle neural grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="0.8" fill="currentColor" className="text-foreground/10" />
              <path d="M40 40 L80 40 M40 40 L40 80 M40 40 L0 40 M40 40 L40 0" 
                stroke="currentColor" strokeWidth="0.3" className="text-foreground/5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Brain-Computer Interface</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-3">
            Neuralink
          </h2>
          <p className="text-base text-foreground/60 max-w-xl leading-relaxed">
            1,024 electrodes. 64 threads. One direct connection to the human cortex. 
            Wireless, implantable, and already changing lives.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[16/9] bg-muted/30 border border-border rounded-sm overflow-hidden group"
            >
              <img
                src="https://neuralink.com/images/n1-implant-render.jpg"
                alt="N1 Implant — 23mm × 8mm wireless neural interface"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">N1 Implant</p>
                <p className="text-sm text-white/70">23mm × 8mm × 0.25mm · Hermetically sealed · Inductive charging</p>
              </div>
            </motion.div>

            {/* Technical deep dive */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-[0.12em] text-muted-foreground font-medium">The N1 System</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                The N1 is a fully integrated BMI in a 23mm × 8mm hermetic package. It contains 
                1,024 electrodes across 64 polymer threads — each 5 microns in diameter, thinner 
                than a human hair. A custom surgical robot inserts these threads 3-4mm into the 
                motor cortex, avoiding vasculature with micron precision.
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Unlike legacy BCIs requiring external hardware and wired tethers, the N1 is fully 
                implantable. Neural data transmits at 10 Mbps via Bluetooth Low Energy to a nearby 
                device, where on-device ML decodes motor intentions in real time with sub-millisecond 
                latency. The battery charges inductively through the scalp — no ports, no wires, no 
                infection vectors.
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Noland Arbaugh received the first implant in January 2024. Within hours he controlled 
                an 8-bit cursor. Within weeks he played Civilization VI and chess using thought alone. 
                The Telepathy protocol now sustains 90 characters per minute in 2026 cohorts — approaching 
                thumb-typing speed on a phone.
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-px bg-border">
              {SPECS.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-background p-4"
                  >
                    <Icon className="w-3.5 h-3.5 text-muted-foreground mb-2" />
                    <p className="text-xl font-medium text-foreground tabular-nums">{spec.value}</p>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground mt-0.5">{spec.label}</p>
                    <p className="text-[9px] text-muted-foreground/50">{spec.unit}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Applications */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">Applications</p>
              <div className="space-y-3">
                {APPLICATIONS.map((app, i) => {
                  const Icon = app.icon;
                  return (
                    <motion.div
                      key={app.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`border ${app.border} bg-background p-4 hover:bg-white/[0.02] transition-colors`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded ${app.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${app.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-foreground">{app.title}</p>
                            <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${app.bg} ${app.color}`}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/55 leading-relaxed">{app.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">Timeline</p>
              <div className="relative border-l border-border ml-1.5 space-y-4">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="pl-5 relative"
                  >
                    <span className="absolute -left-[3.5px] top-1.5 w-[7px] h-[7px] rounded-full bg-foreground/30" />
                    <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{m.year}</p>
                    <p className="text-sm text-foreground/75 mt-0.5">{m.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-border">
              {TEAM_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-background p-4 text-center">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-2" />
                    <p className="text-lg font-medium text-foreground">{stat.value}</p>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-14 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              {[
                { label: "neuralink.com", href: "https://neuralink.com" },
                { label: "Patient Registry", href: "https://neuralink.com/patient-registry" },
                { label: "Careers", href: "https://neuralink.com/careers" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-foreground/40 hover:text-foreground transition-colors group"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-[10px] uppercase tracking-[0.12em] font-semibold hover:bg-foreground/90 transition-colors"
            >
              <Brain className="w-3.5 h-3.5" />
              Ask Grok about Neuralink
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
