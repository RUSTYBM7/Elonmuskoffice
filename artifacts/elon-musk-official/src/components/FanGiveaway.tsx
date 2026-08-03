import { motion } from "framer-motion";
import { Gift, Calendar, Users, Trophy, Sparkles } from "lucide-react";

const GIVEAWAYS = [
  {
    month: "July 2026",
    prize: "Signed SpaceX memorabilia package",
    value: "$2,500",
    entries: "12,847",
    days: 14,
    status: "Active",
  },
  {
    month: "August 2026",
    prize: "Tesla Model 3 1-day test drive + hotel stay in Austin",
    value: "$1,200",
    entries: "8,302",
    days: 30,
    status: "Upcoming",
  },
  {
    month: "September 2026",
    prize: "2x VIP passes to a Starbase launch viewing",
    value: "$5,000",
    entries: "—",
    days: 60,
    status: "Upcoming",
  },
  {
    month: "Q4 2026 — Grand",
    prize: "Limited-edition Boring Co. Not-a-Flamethrower 2.0 + dinner with community team",
    value: "$25,000",
    entries: "—",
    days: 120,
    status: "Upcoming",
  },
];

export default function FanGiveaway() {
  return (
    <section id="giveaways" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
            <Gift className="w-3.5 h-3.5" /> Fan Giveaways
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Giveaways &amp; sweepstakes</h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/65">Free entry for all registered supporters. Bigger prizes, every quarter. Winners picked on-chain and publicly announced.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {GIVEAWAYS.map((g, i) => (
            <motion.div
              key={g.month}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-background border border-border p-6 hover:border-foreground/30 transition-colors"
            >
              <div className="absolute top-4 right-4">
                <span className={`text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 border ${
                  g.status === "Active"
                    ? "border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400"
                    : "border-border text-muted-foreground"
                }`}>
                  {g.status}
                </span>
              </div>

              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> {g.month}
              </p>
              <h3 className="text-lg font-medium tracking-tight text-foreground leading-snug mb-4">
                {g.prize}
              </h3>

              <div className="grid grid-cols-3 gap-px bg-border border border-border">
                <div className="bg-background p-3 text-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Prize value</p>
                  <p className="text-sm font-medium text-foreground mt-1">{g.value}</p>
                </div>
                <div className="bg-background p-3 text-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Entries</p>
                  <p className="text-sm font-medium text-foreground mt-1">{g.entries}</p>
                </div>
                <div className="bg-background p-3 text-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Closes in</p>
                  <p className="text-sm font-medium text-foreground mt-1">{g.days}d</p>
                </div>
              </div>

              <a
                href="/pay"
                className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground dark:hover:text-primary group-hover:translate-x-1 transition-transform"
              >
                <Trophy className="w-3.5 h-3.5" />
                Enter giveaway
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[11px] text-muted-foreground max-w-2xl mx-auto">
            <Sparkles className="inline w-3 h-3 mr-1" /> Supporters at "Supporter" tier and above get 10× entries on every monthly giveaway. Diamond members get a guaranteed slot in the annual grand prize.
          </p>
        </div>
      </div>
    </section>
  );
}
