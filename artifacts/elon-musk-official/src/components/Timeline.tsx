import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  venture: string;
  description: string;
};

const milestones: Milestone[] = [
  {
    year: "1995",
    title: "Founded Zip2",
    venture: "Zip2 Corporation",
    description:
      "Co-founded Zip2 with brother Kimbal — a web software company that provided online city guides to newspapers. Sold to Compaq in 1999 for ~$307M.",
  },
  {
    year: "1999",
    title: "Co-founded X.com → PayPal",
    venture: "X.com / PayPal",
    description:
      "Founded online payments company X.com, which merged with Confinity to become PayPal. Acquired by eBay in 2002 for $1.5B in stock.",
  },
  {
    year: "2002",
    title: "Founded SpaceX",
    venture: "Space Exploration Technologies",
    description:
      "Founded SpaceX with the goal of reducing space transportation costs and ultimately enabling the colonization of Mars.",
  },
  {
    year: "2008",
    title: "Tesla Roadster ships",
    venture: "Tesla, Inc.",
    description:
      "Tesla delivers its first Roadster — the first highway-legal serial production all-electric car using lithium-ion battery cells.",
  },
  {
    year: "2015",
    title: "Falcon 9 first booster landing",
    venture: "SpaceX",
    description:
      "SpaceX successfully lands the Falcon 9 first stage on land for the first time, ushering in the era of reusable orbital-class rockets.",
  },
  {
    year: "2016",
    title: "Founded Neuralink & The Boring Company",
    venture: "Neuralink / The Boring Company",
    description:
      "Launched Neuralink to develop brain–machine interfaces, and The Boring Company to build underground transportation tunnels.",
  },
  {
    year: "2020",
    title: "Crew Dragon Demo-2",
    venture: "SpaceX",
    description:
      "First crewed orbital launch from U.S. soil since 2011, returning human spaceflight capability to the United States.",
  },
  {
    year: "2022",
    title: "Acquired Twitter (now 𝕏)",
    venture: "𝕏 Corp.",
    description:
      "Completed acquisition of Twitter for $44 billion and rebranded the platform as 𝕏 with a vision of an 'everything app'.",
  },
  {
    year: "2023",
    title: "Launched xAI",
    venture: "xAI",
    description:
      "Founded xAI to build artificial intelligence focused on understanding the true nature of the universe; released Grok later that year.",
  },
  {
    year: "2023",
    title: "Starship integrated test flight",
    venture: "SpaceX",
    description:
      "First fully-integrated launch of Starship and Super Heavy — the largest and most powerful rocket ever built, designed for Mars colonization.",
  },
];

export default function Timeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Career Timeline
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            Three decades of building the future
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground">
            Tap a milestone to read the story behind it.
          </p>
        </motion.div>

        {/* Horizontally scrollable rail */}
        <div className="relative -mx-6 px-6 overflow-x-auto pb-4 scrollbar-thin">
          <div className="relative min-w-max">
            {/* Rail */}
            <div className="absolute left-0 right-0 top-[34px] h-px bg-border" aria-hidden="true" />
            {/* Active progress */}
            <div
              className="absolute left-0 top-[34px] h-px bg-foreground dark:bg-primary transition-all duration-500"
              style={{ width: `${((active + 1) / milestones.length) * 100}%` }}
              aria-hidden="true"
            />

            <div className="flex gap-8 md:gap-12">
              {milestones.map((m, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={`${m.year}-${m.title}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-start text-left pt-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground dark:focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    <span
                      className={`text-xs uppercase tracking-[0.16em] mb-3 transition-colors ${
                        isActive
                          ? "text-foreground dark:text-primary"
                          : "text-muted-foreground group-hover:text-foreground/70"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span
                      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-foreground dark:bg-primary scale-125"
                          : "bg-border group-hover:bg-foreground/40"
                      }`}
                      aria-hidden="true"
                    >
                      {isActive && (
                        <span className="absolute inset-0 -m-2 rounded-full border border-foreground/30 dark:border-primary/40 animate-pulse" />
                      )}
                    </span>
                    <span
                      className={`mt-4 max-w-[160px] text-sm font-medium tracking-tight transition-colors ${
                        isActive ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"
                      }`}
                    >
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-6 md:gap-10 border-t border-border pt-10 md:pt-14">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {milestones[active].venture}
            </p>
            <p className="mt-3 text-5xl md:text-6xl font-medium tracking-tight text-foreground dark:text-primary">
              {milestones[active].year}
            </p>
          </div>
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-xl md:text-3xl font-medium tracking-tight text-foreground">
                  {milestones[active].title}
                </h3>
                <p className="mt-4 text-base md:text-lg text-foreground/75 leading-relaxed">
                  {milestones[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
