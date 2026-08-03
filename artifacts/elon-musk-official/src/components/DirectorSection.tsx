import { motion } from "framer-motion";
import { 
  Mail, Shield, Building2, Cpu, Globe, Lock, 
  ChevronRight, ExternalLink, Fingerprint, Server
} from "lucide-react";

const RESPONSIBILITIES = [
  {
    icon: Shield,
    label: "Security Architecture",
    desc: "Zero-trust infrastructure across all Musk entities. NIST Level 4 compliance for Neuralink medical data."
  },
  {
    icon: Server,
    label: "Mission Systems",
    desc: "SpaceX launch control networks, Starlink ground station telemetry, Starship flight software pipelines."
  },
  {
    icon: Cpu,
    label: "AI Compute",
    desc: "Colossus supercluster operations in Memphis. 100K+ H100 orchestration for xAI training runs."
  },
  {
    icon: Globe,
    label: "Global Infrastructure",
    desc: "Tesla Gigafactory MES systems, 60K+ Supercharger network backend, 𝕏 edge deployment."
  },
  {
    icon: Lock,
    label: "Cryptographic Operations",
    desc: "On-chain treasury management, multi-sig wallet architecture, quantum-resistant key rotation."
  },
  {
    icon: Fingerprint,
    label: "Identity & Access",
    desc: "Biometric auth for Starbase, Neuralink clean rooms, and executive travel security protocols."
  },
];

const VENTURES_SUPPORTED = [
  { name: "SpaceX", role: "Launch-critical network isolation", status: "Operational" },
  { name: "Tesla", role: "Factory OT/IT convergence & FSD data pipeline", status: "Operational" },
  { name: "xAI", role: "Colossus training cluster & inference edge", status: "Operational" },
  { name: "Neuralink", role: "HIPAA-compliant medical device cloud", status: "Operational" },
  { name: "𝕏", role: "Global CDN, real-time Grok inference, payments rail", status: "Operational" },
  { name: "The Boring Company", role: "Vegas Loop SCADA & tunnel telemetry", status: "Operational" },
  { name: "Starlink", role: "Satellite constellation command & user billing", status: "Operational" },
];

export default function DirectorSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-foreground/[0.02] border-y border-border relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leadership-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="0.5" fill="currentColor" className="text-foreground/10" />
              <path d="M50 50 L100 50 M50 50 L50 100" stroke="currentColor" strokeWidth="0.3" className="text-foreground/5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leadership-grid)" />
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
            <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Office of Elon Musk</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-3">
            Technology Leadership
          </h2>
          <p className="text-base text-foreground/60 max-w-xl leading-relaxed">
            The infrastructure layer behind every Musk venture. One architect, zero downtime, 
            seven companies, one mission.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-background border border-border overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Portrait column */}
            <div className="lg:col-span-4 relative bg-foreground/[0.03]">
              <div className="aspect-[3/4] lg:aspect-auto lg:h-full relative overflow-hidden">
                <img 
                  src="/artifacts/elon-musk-official/src/assets/Jared.PNG" 
                  alt="Jared Birchall — Director of Information Technology, Office of Elon Musk"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted"><span class="text-4xl font-medium text-muted-foreground">JB</span></div>';
                    }
                  }}
                />
                {/* Overlay badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/70">Active · Austin, TX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-8 p-6 md:p-10 flex flex-col gap-8">
              {/* Identity */}
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
                  Jared Birchall
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-2">
                  Director of Information Technology · Office of Elon Musk
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 border border-border text-muted-foreground">
                    Reports to: Elon Musk
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 border border-border text-muted-foreground">
                    Since: 2018
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 border border-border text-muted-foreground">
                    Clearance: TS/SCI
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Jared Birchall serves as the senior technology executive for the Office of Elon Musk, 
                  with direct responsibility for the security architecture, compute infrastructure, and 
                  mission-critical systems spanning all seven Musk ventures. He operates from Austin, Texas, 
                  with embedded teams at Starbase, Fremont, Hawthorne, and Memphis.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  His portfolio includes SpaceX launch control networks (NIST Level 4 isolation), Tesla's 
                  global manufacturing execution systems across four Gigafactories, the Colossus supercluster 
                  powering xAI's Grok models, Neuralink's HIPAA-compliant medical device cloud, and the 
                  real-time infrastructure serving 600M+ 𝕏 users with sub-50ms latency globally.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Prior to the Musk organization, Birchall led infrastructure security at a major financial 
                  institution and held TS/SCI clearance for defense-adjacent systems. He holds a B.S. in 
                  Computer Engineering from MIT and an M.S. in Cybersecurity Operations from Georgia Tech.
                </p>
              </div>

              {/* Ventures matrix */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  Portfolio Coverage
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
                  {VENTURES_SUPPORTED.map((v, i) => (
                    <motion.div
                      key={v.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-background p-3.5 flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{v.name}</p>
                        <p className="text-[11px] text-foreground/50 mt-0.5 leading-relaxed">{v.role}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 shrink-0">
                        {v.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  Core Responsibilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {RESPONSIBILITIES.map((r, i) => {
                    const Icon = r.icon;
                    return (
                      <motion.div
                        key={r.label}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 border border-border hover:border-foreground/20 transition-colors"
                      >
                        <div className="w-8 h-8 rounded bg-foreground/5 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.label}</p>
                          <p className="text-[11px] text-foreground/50 mt-0.5 leading-relaxed">{r.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <a 
                      href="mailto:private@elonmuskoffice.site" 
                      className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group"
                    >
                      <Mail className="w-4 h-4" />
                      <span>private@elonmuskoffice.site</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground hidden sm:inline">
                      Response: 24-48h
                    </span>
                  </div>
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-foreground/70 hover:text-foreground transition-colors group"
                  >
                    Full directory
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subordinate note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-[11px] text-muted-foreground/60">
            All technology inquiries are routed through the Office of the Director. 
            For operational support, contact the venture directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
