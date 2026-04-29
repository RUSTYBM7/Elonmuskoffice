import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Forbes Real-Time Rank", value: "#1" },
  { label: "Estimated Net Worth", value: "$400B+" },
  { label: "Source of Wealth", value: "Tesla, SpaceX" },
  { label: "Residence", value: "Austin, Texas" },
];

export default function Forbes() {
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
              anchored by Tesla, where he is the largest shareholder, and by
              SpaceX, the most valuable private aerospace company on the planet.
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-6 md:p-8 flex flex-col gap-3"
            >
              <p className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground dark:text-primary">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-[11px] tracking-wide text-muted-foreground">
          Figures are approximate and fluctuate with market conditions. Source: Forbes Real-Time Billionaires.
        </p>
      </div>
    </section>
  );
}
