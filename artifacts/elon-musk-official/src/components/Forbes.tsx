import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, TrendingDown, Info, ExternalLink, ChevronDown, ChevronUp, Calculator, DollarSign, Percent, Building, MapPin, Award } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Forbes Real-Time Rank", value: "#1", icon: Award },
  { label: "Estimated Net Worth", value: "$706B", icon: DollarSign },
  { label: "Source of Wealth", value: "Tesla, SpaceX, xAI", icon: Building },
  { label: "Residence", value: "Austin, Texas", icon: MapPin },
];

const highlights = [
  { label: "Tesla Stake", value: "~13%", note: "Largest individual shareholder", icon: Percent },
  { label: "SpaceX Stake", value: "~42%", note: "Founder & CEO", icon: Percent },
  { label: "xAI Valuation", value: "$200B+", note: "Founded 2023", icon: DollarSign },
  { label: "Starship Program", value: "Active", note: "Fully reusable rocket system", icon: TrendingUp },
];

// Wealth history data for chart
const wealthHistory = [
  { year: "2020", value: 100, label: "$100B" },
  { year: "2021", value: 250, label: "$250B" },
  { year: "2022", value: 180, label: "$180B" },
  { year: "2023", value: 220, label: "$220B" },
  { year: "2024", value: 350, label: "$350B" },
  { year: "2025", value: 800, label: "$800B" },
  { year: "2026", value: 706, label: "$706B" },
];

// Wealth breakdown by company
const wealthBreakdown = [
  { name: "Tesla (~13% stake)", value: 40, color: "#e11d48" },
  { name: "SpaceX (~42% stake)", value: 35, color: "#3b82f6" },
  { name: "xAI (~60% stake)", value: 10, color: "#f59e0b" },
  { name: "X (~79% stake)", value: 5, color: "#000000" },
  { name: "Neuralink, Boring Co.", value: 3, color: "#8b5cf6" },
  { name: "Other assets", value: 7, color: "#6b7280" },
];

export default function Forbes() {
  const [showMethodology, setShowMethodology] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const maxValue = Math.max(...wealthHistory.map(d => d.value));

  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Forbes Profile
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
              The world's wealthiest entrepreneur
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-foreground/75 leading-relaxed">
              Per Forbes' Real-Time Billionaires list, Elon Musk holds the
              position of the wealthiest person in the world. His fortune is
              anchored by Tesla, where he is the largest shareholder, SpaceX,
              the most valuable private aerospace company on the planet, and xAI,
              whose Grok model ranks among the world's leading AI systems.
            </p>
          </div>

          <a
            href="https://www.forbes.com/profile/elon-musk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-foreground hover:text-foreground/70 dark:hover:text-primary transition-colors group whitespace-nowrap"
          >
            View on Forbes
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Disclaimer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-4 border border-amber-500/30 bg-amber-500/5 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Real-Time Data · Not Financial Advice
              </p>
              <p className="text-xs text-foreground/70 leading-relaxed">
                The $706B net worth figure is based on current market valuations and ownership stakes.
                Actual net worth fluctuates with market conditions. This data is for informational purposes only.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Primary net worth stat - the headline number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 relative overflow-hidden border border-border bg-gradient-to-br from-secondary/30 to-background p-8 md:p-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3" />
                UP $93B YTD
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                AS OF JUNE 2026
              </span>
            </div>
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              Methodology
              {showMethodology ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Methodology Panel */}
          {showMethodology && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 p-4 bg-secondary/20 border border-border rounded-lg text-xs text-foreground/70"
            >
              <p className="font-medium text-foreground mb-2">Calculation Methodology</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Tesla stake (~13%): Current market cap × ownership percentage</li>
                <li>SpaceX stake (~42%): Last tender offer valuation × ownership</li>
                <li>xAI stake (~60%): Last funding round valuation × ownership</li>
                <li>X stake (~79%): Estimated based on comparable valuations</li>
                <li>Neuralink, Boring Co., other: Last known valuations</li>
                <li>Cash & other assets: Estimated based on public disclosures</li>
              </ul>
              <p className="mt-3 text-[10px] text-muted-foreground">
                Sources: SEC filings, Forbes, Bloomberg, SpaceX tender offer disclosures
              </p>
            </motion.div>
          )}

          <div className="flex items-baseline gap-3 md:gap-5">
            <span className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-foreground dark:text-primary leading-none">
              $706
            </span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground/80 dark:text-primary/80">
              Billion
            </span>
          </div>
          <p className="mt-4 text-xs md:text-sm text-foreground/60 max-w-2xl">
            Elon Musk is the founder and CEO of multiple technology companies including Tesla, SpaceX, xAI, Neuralink, and The Boring Company. His wealth is primarily derived from his stakes in Tesla and SpaceX.
          </p>
        </motion.div>

        {/* Interactive Wealth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 border border-border bg-background"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Net Worth Growth</span>
            </div>
            <button
              onClick={() => setShowChart(!showChart)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showChart ? "Hide" : "Show"} Chart
            </button>
          </div>

          {showChart && (
            <div className="p-6">
              <div className="flex items-end gap-2 h-48">
                {wealthHistory.map((d, i) => (
                  <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full h-full flex items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.value / maxValue) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="w-8 sm:w-12 bg-gradient-to-t from-foreground to-foreground/60 rounded-t-sm cursor-pointer relative group"
                        onMouseEnter={() => setHoveredBar(i)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Tooltip */}
                        <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ${hoveredBar === i ? 'opacity-100' : ''}`}>
                          {d.label}
                        </div>
                      </motion.div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d.year}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground text-center">
                Hover over bars to see exact values · Source: Forbes Real-Time Billionaires
              </p>
            </div>
          )}
        </motion.div>

        {/* Wealth Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 border border-border bg-background"
        >
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Wealth Breakdown by Asset</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {wealthBreakdown.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/80">{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground">
              Percentages are approximate estimates based on public filings and known valuations
            </p>
          </div>
        </motion.div>

        {/* Secondary stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-12 md:mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-6 md:p-8 flex flex-col gap-3"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground dark:text-primary">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Wealth breakdown */}
        <div className="border-t border-border pt-12">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Wealth Breakdown
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background p-5 md:p-6"
                >
                  <Icon className="w-4 h-4 text-muted-foreground mb-2" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground dark:text-primary mb-1">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-foreground/55">{item.note}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* External Resources */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 p-6 border border-border bg-secondary/10 rounded-lg"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Related Resources
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.forbes.com/profile/elon-musk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-border hover:border-foreground/40 hover:bg-background transition-colors"
            >
              Forbes Profile
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.tesla.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-border hover:border-foreground/40 hover:bg-background transition-colors"
            >
              Tesla Investor Relations
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.spacex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-border hover:border-foreground/40 hover:bg-background transition-colors"
            >
              SpaceX Official
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://x.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-border hover:border-foreground/40 hover:bg-background transition-colors"
            >
              xAI Grok
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <p className="mt-8 text-[11px] tracking-wide text-muted-foreground">
          Figures are approximate and fluctuate with market conditions. Source: Forbes Real-Time Billionaires, Bloomberg.
        </p>
      </div>
    </section>
  );
}
