import { motion } from "framer-motion";
import { Award, Crown, Rocket, Star, Zap, Diamond, Shield, Heart } from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.png";
import spacexLogo from "@/assets/spacex-brand-logo.png";

type Tier = {
  id: string;
  name: string;
  icon: any;
  price: string;
  color: string;
  badge: string;
  features: string[];
  bestFor: string;
};

const TIERS: Tier[] = [
  {
    id: "fan",
    name: "Fan",
    icon: Heart,
    price: "Free",
    color: "from-zinc-500/20 to-zinc-500/5",
    badge: "Welcome",
    features: [
      "Newsletter access",
      "Public Q&A digest",
      "Giveaway entry (monthly)",
      "Community Discord (read-only)",
    ],
    bestFor: "Just getting started with the community",
  },
  {
    id: "supporter",
    name: "Supporter",
    icon: Star,
    price: "$5 / mo",
    color: "from-amber-500/20 to-amber-500/5",
    badge: "Most Popular",
    features: [
      "All Fan perks",
      "Supporter-only Discord channels",
      "Monthly AMAs recording library",
      "Early access to merch drops",
      "10% off Tesla/SpaceX merch partners",
    ],
    bestFor: "Active followers who want deeper access",
  },
  {
    id: "insider",
    name: "Insider",
    icon: Zap,
    price: "$25 / mo",
    color: "from-blue-500/20 to-blue-500/5",
    badge: "Insider",
    features: [
      "All Supporter perks",
      "Live monthly AMA with analysts",
      "Investment research briefs",
      "1:1 community meetups (virtual)",
      "Quarterly supporter livestream",
    ],
    bestFor: "Investors and analysts tracking the Musk ecosystem",
  },
  {
    id: "rocket",
    name: "Rocket",
    icon: Rocket,
    price: "$100 / mo",
    color: "from-orange-500/25 to-orange-500/5",
    badge: "High Tier",
    features: [
      "All Insider perks",
      "Grok 4 Pro credits (monthly)",
      "Priority support response",
      "Annual meet-and-greet lottery",
      "Limited edition rocket metal coin",
    ],
    bestFor: "Die-hard supporters who want a real connection",
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: Crown,
    price: "$500 / mo",
    badge: "Platinum",
    color: "from-cyan-500/20 to-cyan-500/5",
    features: [
      "All Rocket perks",
      "Reserved seat at annual summit",
      "Signed annual memorabilia",
      "Direct line to community team",
      "Founders' circle recognition",
    ],
    bestFor: "Patrons, partners and founding supporters",
  },
  {
    id: "diamond",
    name: "Diamond",
    icon: Diamond,
    price: "By invitation",
    color: "from-fuchsia-500/20 to-fuchsia-500/5",
    badge: "Diamond",
    features: [
      "All Platinum perks",
      "Office of Elon Musk direct line",
      "Annual private dinner invite",
      "Co-branded content opportunities",
      "Custom onboarding experience",
    ],
    bestFor: "Strategic partners, investors and lifetime supporters",
  },
];

export default function SupporterBadge() {
  return (
    <section id="badges" className="py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" /> Premium Membership
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Membership badges</h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/65">Six tiers, each unlocking more access. Pick the level that matches how deep you want to go.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {TIERS.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative bg-gradient-to-b ${t.color} bg-background p-6 md:p-7 flex flex-col gap-5 group hover:bg-secondary/40 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                      <Icon className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-foreground">{t.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.badge}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{t.price}</span>
                </div>

                <p className="text-xs text-muted-foreground italic">{t.bestFor}</p>

                <ul className="space-y-2 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                      <Star className="w-3 h-3 mt-0.5 shrink-0 text-amber-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/pay"
                  className="text-center text-xs uppercase tracking-[0.14em] py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  Join {t.name}
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground text-center">
          All memberships billed monthly in cryptocurrency. Cancel anytime. No auto-renewal.
        </p>
      </div>
    </section>
  );
}
