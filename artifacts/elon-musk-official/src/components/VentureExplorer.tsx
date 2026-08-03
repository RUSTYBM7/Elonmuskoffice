import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Calendar,
  User,
  ExternalLink,
  ArrowRight,
  Zap,
  Rocket,
  Brain,
  Cpu,
  Globe,
  Satellite,
  Flame,
} from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.png";
import spacexLogo from "@/assets/spacex-brand-logo.png";
import xaiLogo from "@/assets/xai-logo-new.png";
import xLogo from "@/assets/x-logo-new.png";
import neuralinkLogo from "@/assets/neuralink.png";
import boringLogo from "@/assets/boring-company-logo-new.png";
import starlinkLogo from "@/assets/starlink-logo-new.png";
import grokLogo from "@/assets/grok-logo-new.png";

type Venture = {
  id: string;
  name: string;
  logo: string;
  icon: React.ElementType;
  color: string;
  founded: number;
  hq: string;
  mission: string;
  description: string;
  role: string;
  products: string[];
  category: string;
  href: string;
  valuation?: string;
  employees?: string;
};

const ventures: Venture[] = [
  {
    id: "tesla",
    name: "Tesla",
    logo: teslaLogo,
    icon: Zap,
    color: "#E31937",
    founded: 2003,
    hq: "Austin, TX",
    mission: "Accelerate the world's transition to sustainable energy",
    description:
      "Electric vehicles, energy storage, solar and manufacturing. The largest EV maker on Earth. We build the machine that builds the machine.",
    role: "Technoking & CEO",
    products: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Semi", "Roadster", "Optimus", "FSD"],
    category: "Electric Vehicles · Energy · AI",
    href: "https://www.tesla.com",
    valuation: "$800B+",
    employees: "140,000+",
  },
  {
    id: "spacex",
    name: "SpaceX",
    logo: spacexLogo,
    icon: Rocket,
    color: "#005288",
    founded: 2002,
    hq: "Starbase, TX",
    mission: "Make humanity multiplanetary",
    description:
      "Reusable rockets, Starlink, and Starship — the largest rocket ever built. First private company to send humans to orbit. Mars is the goal.",
    role: "Founder, CEO & Chief Engineer",
    products: ["Falcon 9", "Falcon Heavy", "Starship", "Dragon", "Raptor", "Merlin"],
    category: "Aerospace · Mars · Satellite Internet",
    href: "https://www.spacex.com",
    valuation: "$350B+",
    employees: "13,000+",
  },
  {
    id: "xai",
    name: "xAI",
    logo: xaiLogo,
    icon: Brain,
    color: "#1a1a1a",
    founded: 2023,
    hq: "Memphis, TN",
    mission: "Understand the true nature of the universe",
    description:
      "Building the most truthful AI. Grok runs on the Colossus supercluster — the largest GPU cluster in the world. We move fast and ship weekly.",
    role: "Founder",
    products: ["Grok 3", "Grok 4", "Grok Code", "Colossus", "Aurora"],
    category: "Artificial Intelligence · Compute",
    href: "https://x.ai",
    valuation: "$80B+",
    employees: "500+",
  },
  {
    id: "neuralink",
    name: "Neuralink",
    logo: neuralinkLogo,
    icon: Cpu,
    color: "#8B5CF6",
    founded: 2016,
    hq: "Austin, TX",
    mission: "Create a generalized brain interface",
    description:
      "Implanted brain-computer interfaces to restore autonomy to those with unmet medical needs. First human trials are live. Blindsight is next.",
    role: "Co-founder",
    products: ["N1 Implant", "R1 Robot", "Telepathy", "Blindsight", "CONVOY"],
    category: "Neurotechnology · Medical Devices",
    href: "https://neuralink.com",
    valuation: "$8B+",
    employees: "600+",
  },
  {
    id: "boring",
    name: "The Boring Company",
    logo: boringLogo,
    icon: Flame,
    color: "#F97316",
    founded: 2016,
    hq: "Bastrop, TX",
    mission: "Solve traffic, enable rapid point-to-point travel",
    description:
      "Low-cost tunnels for transportation, utilities and freight. Prufrock digs 10x faster than legacy TBMs. Vegas Loop is operational with 2M+ riders.",
    role: "Founder",
    products: ["Prufrock", "Vegas Loop", "Hyperloop", "Utility Tunnels"],
    category: "Infrastructure · Tunneling",
    href: "https://www.boringcompany.com",
    valuation: "$7B+",
    employees: "200+",
  },
  {
    id: "x",
    name: "𝕏",
    logo: xLogo,
    icon: Globe,
    color: "#0a0a0a",
    founded: 2023,
    hq: "San Francisco, CA",
    mission: "The everything app",
    description:
      "The global town square. Free speech, creator monetization, video, payments, and Grok integration. 600M+ monthly active users. The future of news.",
    role: "Executive Chairman & CTO",
    products: ["X Posts", "X Premium", "X Money", "X Video", "Grok on X"],
    category: "Social Media · Communications · Finance",
    href: "https://x.com",
    valuation: "$44B",
    employees: "1,500+",
  },
  {
    id: "starlink",
    name: "Starlink",
    logo: starlinkLogo,
    icon: Satellite,
    color: "#3B82F6",
    founded: 2019,
    hq: "Redmond, WA",
    mission: "High-speed internet to anywhere on Earth",
    description:
      "7,000+ satellites in low Earth orbit. 4M+ subscribers across 100+ countries. The largest satellite constellation ever deployed. Direct-to-cell is live.",
    role: "SpaceX Constellation",
    products: ["Starlink Standard", "Starlink Mini", "Starlink Roam", "Starlink Maritime", "Starlink Aviation", "Direct-to-Cell"],
    category: "Satellite Internet · Telecom",
    href: "https://www.starlink.com",
    valuation: "$180B+",
    employees: "3,000+",
  },
];

export default function VentureExplorer() {
  const [activeId, setActiveId] = useState<string>(ventures[0].id);
  const active = ventures.find((v) => v.id === activeId)!;

  return (
    <section className="relative py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Portfolio
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            What I'm building
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/65">
            Seven companies. One mission: a better future. Click any to explore.
          </p>
        </motion.div>

        {/* LOGO SHOWCASE BAR */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 p-6 border border-border bg-background rounded-xl"
        >
          <div className="flex items-center justify-between gap-4">
            {ventures.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${
                  activeId === v.id
                    ? 'bg-secondary/50 border-2 scale-105'
                    : 'opacity-50 hover:opacity-80'
                }`}
                style={{ borderColor: activeId === v.id ? v.color : 'transparent' }}
              >
                <img
                  src={v.logo}
                  alt={v.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Venture selector — horizontal scroll on mobile */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {ventures.map((v) => {
            const Icon = v.icon;
            const isActive = activeId === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                className={`shrink-0 inline-flex items-center gap-2.5 px-5 py-3 text-xs uppercase tracking-[0.12em] border transition-all duration-200 ${
                  isActive
                    ? "bg-foreground text-background border-foreground dark:bg-primary dark:text-background dark:border-primary shadow-lg"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-background" : "text-muted-foreground"}`} />
                {v.name}
              </button>
            );
          })}
        </div>

        {/* Active venture detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* Logo & brand block */}
            <div className="lg:col-span-4">
              <div
                className="aspect-[4/3] w-full flex items-center justify-center p-12 border border-border relative overflow-hidden group"
                style={{ backgroundColor: active.color + '10' }}
              >
                <div
                  className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
                  style={{ backgroundColor: active.color }}
                />
                <img
                  src={active.logo}
                  alt={active.name}
                  className="max-w-[85%] max-h-[75%] object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: "none" }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-px bg-border mt-4">
                {active.valuation && (
                  <div className="bg-background p-4">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Valuation</p>
                    <p className="text-sm font-medium text-foreground mt-1">{active.valuation}</p>
                  </div>
                )}
                {active.employees && (
                  <div className="bg-background p-4">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Team</p>
                    <p className="text-sm font-medium text-foreground mt-1">{active.employees}</p>
                  </div>
                )}
              </div>

              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-xs uppercase tracking-[0.12em] font-semibold hover:bg-foreground/90 transition-colors group w-full justify-center"
              >
                Visit {active.name}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Details */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  {active.category}
                </p>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground dark:text-primary">
                  {active.name}
                </h3>
                <p className="mt-3 text-base md:text-lg italic text-foreground/75 font-light">
                  "{active.mission}"
                </p>
              </div>

              <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                {active.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-px bg-border">
                <div className="bg-background p-5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-1.5 mb-2">
                    <User className="w-3 h-3" />
                    My Role
                  </p>
                  <p className="text-sm font-medium text-foreground">{active.role}</p>
                </div>
                <div className="bg-background p-5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3 h-3" />
                    Founded
                  </p>
                  <p className="text-sm font-medium text-foreground">{active.founded}</p>
                </div>
                <div className="bg-background p-5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3 h-3" />
                    HQ
                  </p>
                  <p className="text-sm font-medium text-foreground">{active.hq}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  Key Products
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.products.map((p) => (
                    <span
                      key={p}
                      className="text-xs px-3 py-2 border border-border bg-background text-foreground/80 hover:border-foreground/30 hover:text-foreground transition-colors cursor-default"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground dark:hover:text-primary transition-colors group w-fit"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Ask Grok about {active.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
