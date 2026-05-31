import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Rocket,
  Brain,
  Pickaxe,
  Sparkles,
  MessageCircle,
  MapPin,
  Calendar,
  User,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";

// Venture data type
interface Venture {
  id: string;
  name: string;
  emoji: string;
  svgLogo: React.ReactNode;
  primaryColor: string;
  founded: number;
  hq: string;
  mission: string;
  description: string;
  role: string;
  products: string[];
  category: string;
}

// Venture data
const ventures: Venture[] = [
  {
    id: "tesla",
    name: "Tesla",
    emoji: "⚡",
    svgLogo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <defs>
          <linearGradient id="teslaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e82127" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
        </defs>
        <path
          d="M58.5 10C45 10 34 21 34 34.5c0 13.5 11 24.5 24.5 24.5 13.5 0 24.5-11 24.5-24.5C83 21 72 10 58.5 10zm0 42c-9.7 0-17.5-7.8-17.5-17.5S48.8 17 58.5 17 76 24.8 76 34.5 68.2 52 58.5 52z"
          fill="url(#teslaGrad)"
        />
        <text x="58.5" y="88" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor">
          T
        </text>
      </svg>
    ),
    primaryColor: "#e82127",
    founded: 2003,
    hq: "Austin, TX",
    mission: "Sustainable energy for everyone",
    description:
      "Tesla accelerates the world's transition to sustainable energy with electric vehicles, solar and integrated energy storage solutions.",
    role: "Technoking & CEO",
    products: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Solar Roof", "Powerwall"],
    category: "Electric Vehicles, Energy",
  },
  {
    id: "spacex",
    name: "SpaceX",
    emoji: "🚀",
    svgLogo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <defs>
          <linearGradient id="spaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#005500" />
            <stop offset="100%" stopColor="#003300" />
          </linearGradient>
        </defs>
        <path
          d="M60 10 L90 40 L85 90 L60 105 L35 90 L30 40 Z"
          fill="none"
          stroke="url(#spaceGrad)"
          strokeWidth="4"
        />
        <circle cx="60" cy="50" r="12" fill="url(#spaceGrad)" />
        <path d="M48 75 L60 90 L72 75" fill="url(#spaceGrad)" />
      </svg>
    ),
    primaryColor: "#005500",
    founded: 2002,
    hq: "Hawthorne, CA",
    mission: "Multi-planetary life for humanity",
    description:
      "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company is pioneering the technology to make life multi-planetary.",
    role: "Founder, CEO & Chief Engineer",
    products: ["Falcon 9", "Falcon Heavy", "Starship", "Dragon", "Starlink"],
    category: "Aerospace, Mars",
  },
  {
    id: "neuralink",
    name: "Neuralink",
    emoji: "🧠",
    svgLogo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <defs>
          <linearGradient id="neuroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6e40aa" />
            <stop offset="100%" stopColor="#3c1361" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="35" fill="none" stroke="url(#neuroGrad)" strokeWidth="3" />
        <circle cx="45" cy="50" r="6" fill="url(#neuroGrad)" />
        <circle cx="75" cy="50" r="6" fill="url(#neuroGrad)" />
        <circle cx="60" cy="75" r="6" fill="url(#neuroGrad)" />
        <circle cx="40" cy="70" r="4" fill="url(#neuroGrad)" />
        <circle cx="80" cy="70" r="4" fill="url(#neuroGrad)" />
        <path d="M45 50 L60 75 L75 50" fill="none" stroke="url(#neuroGrad)" strokeWidth="2" />
        <path d="M40 70 L45 50" fill="none" stroke="url(#neuroGrad)" strokeWidth="2" />
        <path d="M80 70 L75 50" fill="none" stroke="url(#neuroGrad)" strokeWidth="2" />
      </svg>
    ),
    primaryColor: "#6e40aa",
    founded: 2016,
    hq: "San Francisco, CA",
    mission: "Human-AI symbiosis",
    description:
      "Neuralink is developing ultra-high bandwidth brain-machine interfaces to connect humans and computers, with the goal of enhancing human cognition and treating neurological conditions.",
    role: "Co-founder",
    products: ["N1 Chip", "R1 Robot", "Telepathy", "Blindsight"],
    category: "Brain-Computer Interface",
  },
  {
    id: "boring",
    name: "The Boring Company",
    emoji: "🔨",
    svgLogo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <defs>
          <linearGradient id="boringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d3d3d" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>
        <rect x="25" y="60" width="70" height="40" rx="5" fill="url(#boringGrad)" />
        <circle cx="40" cy="100" r="12" fill="url(#boringGrad)" stroke="#555" strokeWidth="2" />
        <circle cx="80" cy="100" r="12" fill="url(#boringGrad)" stroke="#555" strokeWidth="2" />
        <path d="M35 60 L35 40 L50 25 L70 25 L85 40 L85 60" fill="none" stroke="url(#boringGrad)" strokeWidth="6" />
        <circle cx="60" cy="45" r="8" fill="#ffcc00" />
      </svg>
    ),
    primaryColor: "#3d3d3d",
    founded: 2016,
    hq: "Austin, TX",
    mission: "Solve traffic, transform cities",
    description:
      "The Boring Company builds tunnels to create affordable, fast-to-dig, and environmentally friendly underground transportation and utility networks.",
    role: "Founder",
    products: ["Prufrock", "Loop", "Vegas Loop", "Hyperloop"],
    category: "Tunnels, Infrastructure",
  },
  {
    id: "xai",
    name: "xAI",
    emoji: "✨",
    svgLogo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <defs>
          <linearGradient id="xaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#f72585" />
          </linearGradient>
        </defs>
        <polygon points="60,15 75,45 105,50 82,72 88,102 60,85 32,102 38,72 15,50 45,45" fill="url(#xaiGrad)" />
        <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">
          x
        </text>
      </svg>
    ),
    primaryColor: "#ff6b35",
    founded: 2023,
    hq: "San Francisco, CA",
    mission: "Understand the universe",
    description:
      "xAI is building artificial intelligence to accelerate human scientific discovery and understand the true nature of the universe.",
    role: "Founder",
    products: ["Grok-1", "Grok-2", "Grok-1.5", "Grok-beta"],
    category: "Artificial Intelligence",
  },
  {
    id: "xcorp",
    name: "X Corp",
    emoji: "💬",
    svgLogo: (
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        <defs>
          <linearGradient id="xCorpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="45" fill="url(#xCorpGrad)" />
        <path
          d="M30 35 L90 85 M90 35 L30 85"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    ),
    primaryColor: "#000000",
    founded: 2022,
    hq: "San Francisco, CA",
    mission: "Global town square for free speech",
    description:
      "X is the everything app — a global digital town square for conversation, news, finance and creators, built on the principle of free speech.",
    role: "Executive Chairman & CTO",
    products: ["X Premium", "X Ads", "X Money", "X Live", "Audio/Video Spaces"],
    category: "Social Media",
  },
];

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const detailVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 16,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

// Venture card component
function VentureCard({
  venture,
  isExpanded,
  onToggle,
  index,
}: {
  venture: Venture;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const isDark = venture.primaryColor === "#000000";

  return (
    <motion.article
      variants={cardVariants}
      className="group relative"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl border backdrop-blur-sm
          transition-all duration-500 cursor-pointer
          ${isExpanded
            ? "bg-gradient-to-br from-card/95 to-card/80 border-primary/30 shadow-2xl shadow-primary/10"
            : "bg-card/60 border-border/50 hover:border-primary/20"
          }
        `}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`venture-detail-${venture.id}`}
        aria-label={`${venture.name} - ${venture.mission}. Press to ${isExpanded ? 'collapse' : 'expand'} details.`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Background glow effect */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
            ${isExpanded ? "opacity-30" : ""}
          `}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${venture.primaryColor}40, transparent 70%)`,
          }}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            padding: "1px",
            background: `linear-gradient(135deg, ${venture.primaryColor}60, transparent, ${venture.primaryColor}40)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`
                p-3 rounded-xl transition-transform duration-500
                ${isExpanded ? "scale-110" : "group-hover:scale-105"}
              `}
              style={{
                background: `${venture.primaryColor}15`,
              }}
            >
              <div
                className="transition-transform duration-300"
                style={{ color: venture.primaryColor }}
              >
                {venture.svgLogo}
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: `${venture.primaryColor}20`,
                  color: venture.primaryColor,
                }}
              >
                {venture.founded}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-full bg-muted/50"
              >
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-colors ${
                    isExpanded ? "text-primary" : ""
                  }`}
                />
              </motion.div>
            </div>
          </div>

          {/* Company name & mission */}
          <h3
            className="text-2xl font-bold tracking-tight mb-2 transition-colors"
            style={{
              color: isExpanded ? venture.primaryColor : undefined,
            }}
          >
            {venture.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {venture.mission}
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{venture.hq}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Est. {venture.founded}</span>
            </div>
          </div>

          {/* Category badge */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground">
              {venture.category}
            </span>
          </div>

          {/* Expandable detail panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id={`venture-detail-${venture.id}`}
                variants={detailVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-border/50">
                  {/* Role */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: `${venture.primaryColor}20` }}
                    >
                      <User className="w-4 h-4" style={{ color: venture.primaryColor }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Elon's Role</p>
                      <p className="text-sm font-semibold">{venture.role}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {venture.description}
                  </p>

                  {/* Products */}
                  <div className="mb-5">
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                      Key Products
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {venture.products.map((product) => (
                        <motion.span
                          key={product}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg"
                          style={{
                            background: `${venture.primaryColor}15`,
                            color: venture.primaryColor,
                            border: `1px solid ${venture.primaryColor}30`,
                          }}
                        >
                          {product}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Visit button */}
                  <a
                    href={`https://www.${venture.id === "boring" ? "boringcompany" : venture.id === "xcorp" ? "x.com" : venture.id}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                      text-sm font-medium transition-all duration-300
                      group/btn
                      ${isDark ? "bg-white text-black hover:bg-gray-100" : "text-white"}
                    `}
                    style={{ background: isDark ? undefined : venture.primaryColor }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Visit ${venture.name} website`}
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.article>
  );
}

// Main component
export default function VentureExplorer() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden"
      aria-labelledby="venture-explorer-title"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Interactive Explorer
            </span>
          </motion.div>

          <h2
            id="venture-explorer-title"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">Elon's</span>{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Ventures
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the ecosystem of companies pushing the boundaries of technology,
            energy, and human potential.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
        >
          {[
            { value: "20+", label: "Years of Innovation" },
            { value: "6", label: "Companies" },
            { value: "∞", label: "Vision" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ventures.map((venture, index) => (
            <VentureCard
              key={venture.id}
              venture={venture}
              isExpanded={expandedId === venture.id}
              onToggle={() => handleToggle(venture.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-16"
        >
          Click on any card to explore more details about each venture.
        </motion.p>
      </div>
    </section>
  );
}
