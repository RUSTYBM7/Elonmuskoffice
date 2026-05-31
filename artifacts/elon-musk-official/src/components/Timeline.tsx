import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  venture: string;
  description: string;
  highlight?: boolean;
};

const milestones: Milestone[] = [
  {
    year: "1971",
    title: "Born in Pretoria",
    venture: "Early Life",
    description:
      "Elon Reeve Musk born June 28, 1971, in Pretoria, South Africa. From an early age he showed an exceptional aptitude for computing and entrepreneurship.",
    highlight: false,
  },
  {
    year: "1983",
    title: "First video game at 12",
    venture: "Early Life",
    description:
      "At age 12, Musk created and sold his first video game — Blastar — for approximately $500. The code was published in a South African magazine.",
    highlight: false,
  },
  {
    year: "1995",
    title: "Founded Zip2",
    venture: "Zip2 Corporation",
    description:
      "Co-founded Zip2 with brother Kimbal — a web software company providing online city guides to newspapers. Sold to Compaq in 1999 for $307 million.",
    highlight: true,
  },
  {
    year: "1999",
    title: "X.com → PayPal",
    venture: "X.com / PayPal",
    description:
      "Founded online payments company X.com, which merged with Confinity to become PayPal. Acquired by eBay in 2002 for $1.5 billion in stock.",
    highlight: true,
  },
  {
    year: "2002",
    title: "Founded SpaceX",
    venture: "Space Exploration Technologies",
    description:
      "Founded SpaceX with the goal of reducing space transportation costs and ultimately enabling the colonization of Mars. First rocket: Falcon 1, launched 2008.",
    highlight: true,
  },
  {
    year: "2004",
    title: "Led first Series A at Tesla",
    venture: "Tesla, Inc.",
    description:
      "Joined Tesla Motors as Chairman of the board with a $6.5M Series A investment, later becoming CEO. Led the company through its most difficult period.",
    highlight: true,
  },
  {
    year: "2008",
    title: "Tesla Roadster ships",
    venture: "Tesla, Inc.",
    description:
      "Tesla delivered its first Roadster — the first highway-legal serial production all-electric car using lithium-ion battery cells. The space shuttle era begins.",
    highlight: false,
  },
  {
    year: "2010",
    title: "Tesla IPO on NASDAQ",
    venture: "Tesla, Inc.",
    description:
      "Tesla Motors IPO raised $226 million on NASDAQ, making it the first American car company to go public since Ford in 1956.",
    highlight: false,
  },
  {
    year: "2012",
    title: "Model S launched",
    venture: "Tesla, Inc.",
    description:
      "Tesla Model S launched to widespread acclaim — Motor Trend's Car of the Year. First supercharger network opened. SpaceX successfully docked Dragon to ISS.",
    highlight: false,
  },
  {
    year: "2015",
    title: "Falcon 9 first booster landing",
    venture: "SpaceX",
    description:
      "SpaceX successfully landed the Falcon 9 first stage on land for the first time, ushering in the era of reusable orbital-class rockets.",
    highlight: true,
  },
  {
    year: "2016",
    title: "Founded Neuralink & Boring Co.",
    venture: "Neuralink / The Boring Company",
    description:
      "Launched Neuralink to develop brain–machine interfaces, and The Boring Company to build underground transportation tunnels. SolarCity acquired by Tesla.",
    highlight: true,
  },
  {
    year: "2017",
    title: "Model 3 production begins",
    venture: "Tesla, Inc.",
    description:
      "Tesla Model 3 began production — the first mass-market electric vehicle at ~$35,000. Over 500,000 reservations. Gigafactory Shanghai announced.",
    highlight: true,
  },
  {
    year: "2019",
    title: "Starship Mk1 unveiled",
    venture: "SpaceX",
    description:
      "Starship Mk1 unveiled in Boca Chica, Texas. SpaceX's fully reusable, next-generation vehicle designed for Mars colonization and intercontinental travel.",
    highlight: false,
  },
  {
    year: "2020",
    title: "Crew Dragon Demo-2",
    venture: "SpaceX",
    description:
      "First crewed orbital launch from U.S. soil since 2011. SpaceX became the first private company to send humans to the ISS. Net worth: $100B+.",
    highlight: true,
  },
  {
    year: "2021",
    title: "Tesla hits $1T market cap",
    venture: "Tesla, Inc.",
    description:
      "Tesla became the first car company to reach $1 trillion market cap. Model Y became world's best-selling EV. SpaceX reached 100 orbital launches.",
    highlight: true,
  },
  {
    year: "2022",
    title: "Acquired Twitter → 𝕏",
    venture: "𝕏 Corp.",
    description:
      "Completed acquisition of Twitter for $44 billion and rebranded to 𝕏 with a vision of an 'everything app'. SpaceX Starship passes environmental review.",
    highlight: true,
  },
  {
    year: "2023",
    title: "Launched xAI & Grok",
    venture: "xAI",
    description:
      "Founded xAI to build artificial intelligence focused on understanding the true nature of the universe. Released Grok chatbot — with wit and real-time knowledge.",
    highlight: true,
  },
  {
    year: "2023",
    title: "Starship first integrated flight",
    venture: "SpaceX",
    description:
      "First fully-integrated launch of Starship and Super Heavy — the largest and most powerful rocket ever built. Historic test from Starbase, Boca Chica.",
    highlight: true,
  },
  {
    year: "2024",
    title: "First human Neuralink implant",
    venture: "Neuralink",
    description:
      "Neuralink successfully implanted its first human patient — Noland Arbaugh, a quadriplegic who can control a computer with his thoughts. Telepathy demo complete.",
    highlight: true,
  },
  {
    year: "2026",
    title: "Starship to Mars cargo",
    venture: "SpaceX",
    description:
      "SpaceX targets first uncrewed Starship cargo missions to Mars in 2026, ahead of crewed landings. Starship has completed 50+ successful flights.",
    highlight: true,
  },
];

export default function Timeline() {
  const [active, setActive] = useState(0);
  const [viewMode, setViewMode] = useState<"rail" | "list">("rail");

  const featuredMilestones = milestones.filter((m) => m.highlight);

  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Life &amp; Career
              </p>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
                Four decades building tomorrow
              </h2>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground">
                Tap a milestone to explore.{" "}
                <button
                  type="button"
                  onClick={() =>
                    setViewMode((v) => (v === "rail" ? "list" : "rail"))
                  }
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  {viewMode === "rail" ? "Switch to list view" : "Switch to timeline view"}
                </button>
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-foreground dark:bg-primary animate-pulse" />
              Live — 2026
            </div>
          </div>
        </motion.div>

        {/* View mode: Rail */}
        <AnimatePresence>
          {viewMode === "rail" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Horizontal scrollable rail */}
              <div className="relative -mx-6 px-6 overflow-x-auto pb-4 scrollbar-thin">
                <div className="relative min-w-max">
                  <div
                    className="absolute left-0 right-0 top-[34px] h-px bg-border"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute left-0 top-[34px] h-px bg-foreground dark:bg-primary transition-all duration-500"
                    style={{
                      width: `${((active + 1) / milestones.length) * 100}%`,
                    }}
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
                                : m.highlight
                                ? "bg-foreground/30 group-hover:bg-foreground/50"
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
                              isActive
                                ? "text-foreground"
                                : "text-foreground/60 group-hover:text-foreground"
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* View mode: List */}
        <AnimatePresence>
          {viewMode === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {milestones.map((m, i) => {
                const isActive = i === active;
                return (
                  <motion.div
                    key={`${m.year}-${m.title}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b border-border py-5 cursor-pointer transition-colors ${
                      isActive ? "bg-secondary/50 pl-4 -ml-4 pr-4" : ""
                    }`}
                    onClick={() => setActive(i)}
                  >
                    <div className="flex items-center gap-4 md:gap-8">
                      <span
                        className={`text-sm md:text-base font-medium tabular-nums shrink-0 w-14 ${
                          isActive ? "text-foreground dark:text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {m.year}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                            {m.venture}
                          </span>
                          {m.highlight && (
                            <span className="text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 border border-foreground/20 dark:border-primary/30 text-foreground/60 dark:text-primary/70">
                              key
                            </span>
                          )}
                        </div>
                        <p className={`text-sm font-medium mt-0.5 ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                          {m.title}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="list-indicator"
                          className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-primary shrink-0"
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm text-foreground/65 leading-relaxed max-w-2xl">
                            {m.description}
                          </p>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured milestones counter */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">
              Career milestones
            </p>
            <p className="text-2xl font-medium tracking-tight text-foreground">
              {milestones.length} key events &middot; {featuredMilestones.length} defining moments
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-primary" />
            Key milestones
          </div>
        </div>
      </div>
    </section>
  );
}
