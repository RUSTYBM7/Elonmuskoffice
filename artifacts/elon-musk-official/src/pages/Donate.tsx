import Header from "@/components/Header";
import DonationHero from "@/components/DonationHero";
import DonationForm from "@/components/DonationForm";
import LiveNewsStrip from "@/components/LiveNewsStrip";
import { motion } from "framer-motion";
import { Heart, Shield, Lock, Sparkles, Target, Users, Globe, BookOpen, Award, Mail, ChevronRight, HandHeart, Lightbulb, TreePine, Brain, Rocket, Cpu, Radio } from "lucide-react";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import AchievementBadges from "@/components/AchievementBadges";

const CAUSES = [
  { id: "stem", label: "STEM Education", icon: BookOpen, color: "from-amber-500/20 to-amber-500/5", blurb: "Robotics kits, scholarships, teacher training." },
  { id: "energy", label: "Renewable Energy", icon: TreePine, color: "from-emerald-500/20 to-emerald-500/5", blurb: "Solar research, battery innovation, grid resilience." },
  { id: "ai", label: "AI Safety", icon: Brain, color: "from-rose-500/20 to-rose-500/5", blurb: "Alignment research, safe development, policy." },
  { id: "mars", label: "Mars Colony", icon: Rocket, color: "from-orange-500/20 to-orange-500/5", blurb: "Interplanetary life support, Starship research." },
  { id: "open-source", label: "Open Source", icon: Cpu, color: "from-sky-500/20 to-sky-500/5", blurb: "Open-source tooling, public infrastructure." },
  { id: "media", label: "Independent Media", icon: Radio, color: "from-violet-500/20 to-violet-500/5", blurb: "Press freedom, fact-checking, journalism." },
];

const PRINCIPLES = [
  { icon: Shield, t: "Transparent", d: "Every contribution is logged. Use the form to opt in to a public ledger." },
  { icon: Lock, t: "Private", d: "No KYC. No surveillance. Direct on-chain transfers only." },
  { icon: Heart, t: "Donor-First", d: "We never sell, rent, or trade your data. Period." },
  { icon: Target, t: "Goal-Oriented", d: "Funds map to clearly named causes with progress trackers." },
];

const IMPACT = [
  { v: "10,000+", l: "STEM kits funded" },
  { v: "42", l: "Schools reached" },
  { v: "$1.2M", l: "Direct grants issued" },
  { v: "9", l: "Active programs" },
];

const FAQS = [
  { q: "Where does my money go?", a: "100% of contributions route directly to the cause you select. Operational costs are covered separately." },
  { q: "Is my donation tax-deductible?", a: "Donations are not tax-deductible. We are not a registered 501(c)(3)." },
  { q: "Why crypto only?", a: "Crypto avoids middlemen, chargebacks, and surveillance. The addresses in the form are the only place the funds land." },
  { q: "Can I donate from a company?", a: "Yes. Use a treasury wallet and email us at private@elonmuskoffice.site for a written acknowledgement." },
  { q: "How do I get a receipt?", a: "After sending, the form will email you a confirmation. The on-chain transaction hash is your receipt." },
  { q: "Are there fees?", a: "Only the network fee. We never take a cut." },
];

function CauseCard({ c, idx }: { c: typeof CAUSES[number]; idx: number }) {
  const Icon = c.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className={`relative p-6 border border-border bg-gradient-to-br ${c.color} hover:border-foreground/30 transition-colors`}
    >
      <Icon className="w-7 h-7 text-foreground/80 mb-4" />
      <h3 className="text-lg font-medium tracking-tight mb-2">{c.label}</h3>
      <p className="text-sm text-foreground/70 leading-relaxed">{c.blurb}</p>
    </motion.div>
  );
}

export default function Donate() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />

      {/* ════════ 1 — HERO ════════ */}
      <DonationHero />

      {/* ════════ 2 — CAUSES GRID ════════ */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Choose Your Cause</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Where the money goes</h2>
            <p className="mt-3 text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
              Six live programs. Every cause is funded separately, tracked publicly, and verified on-chain.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAUSES.map((c, i) => <CauseCard key={c.id} c={c} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ════════ 3 — DONATION FORM ════════ */}
      <DonationForm />

      {/* ════════ 4 — LIVE NEWS ════════ */}
      <LiveNewsStrip title="Initiative Updates" limit={4} />

      {/* ════════ 4.5 — INVESTMENT CALCULATOR ════════ */}
      <InvestmentCalculator />

      {/* ════════ 4.6 — ACHIEVEMENT BADGES ════════ */}
      <AchievementBadges />

      {/* ════════ 5 — PRINCIPLES ════════ */}
      <section className="py-16 md:py-24 px-6 bg-secondary/20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Our Principles</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">How we operate</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="p-6 border border-border bg-background"
                >
                  <Icon className="w-6 h-6 text-foreground/80 mb-3" />
                  <h3 className="text-base font-medium mb-2">{p.t}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{p.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ 6 — IMPACT METRICS ════════ */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Impact</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Numbers from the field</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMPACT.map((m, i) => (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-6 border border-border text-center"
              >
                <div className="text-3xl md:text-4xl font-medium tracking-tight mb-1">{m.v}</div>
                <div className="text-xs uppercase tracking-widest text-foreground/60">{m.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 7 — TRANSPARENCY ════════ */}
      <section className="py-16 md:py-24 px-6 bg-secondary/20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Transparency</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Every wallet is public</h2>
          <p className="text-base text-foreground/70 leading-relaxed mb-8">
            All donation addresses are listed in the form above. We publish a monthly summary of inflows
            and outflows by cause. There are no reserves, no investments, no payroll — what comes in,
            goes out to the named cause.
          </p>
          <div className="grid gap-3 md:grid-cols-3 text-left">
            <div className="p-4 border border-border bg-background">
              <p className="text-xs uppercase tracking-widest text-foreground/60 mb-1">Reporting</p>
              <p className="text-sm">Monthly on-chain report by cause</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <p className="text-xs uppercase tracking-widest text-foreground/60 mb-1">Audits</p>
              <p className="text-sm">Annual third-party wallet review</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <p className="text-xs uppercase tracking-widest text-foreground/60 mb-1">Updates</p>
              <p className="text-sm">Newsletter with progress + stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 8 — FAQ ════════ */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group border border-border bg-background"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-foreground/5">
                  <span className="text-sm md:text-base font-medium pr-4">{f.q}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-sm text-foreground/70 leading-relaxed">{f.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 9 — MATCHING PROGRAM ════════ */}
      <section className="py-16 md:py-24 px-6 bg-secondary/20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-foreground/20 bg-background/50 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-[0.18em]">Limited Time</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Match my donation</h2>
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
                Verified supporters can opt into the matching pool — your donation, doubled by
                matched contributions, up to a per-cause cap each quarter.
              </p>
              <a
                href="/supporters"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 text-sm font-medium transition-colors"
              >
                <HandHeart className="w-4 h-4" /> Apply to match
              </a>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-3">
              {[
                { c: "STEM", goal: 250000, raised: 168400 },
                { c: "Energy", goal: 500000, raised: 312800 },
                { c: "AI Safety", goal: 200000, raised: 142300 },
                { c: "Mars", goal: 100000, raised: 71400 },
              ].map((p) => (
                <div key={p.c} className="p-4 border border-border bg-background">
                  <p className="text-xs uppercase tracking-widest text-foreground/60 mb-1">{p.c}</p>
                  <p className="text-base font-medium mb-2">${(p.raised / 1000).toFixed(1)}K / ${(p.goal / 1000).toFixed(0)}K</p>
                  <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                    <div className="h-full bg-foreground/70" style={{ width: `${(p.raised / p.goal) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 10 — VOLUNTEER ════════ */}
      <section className="py-16 md:py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-8 h-8 mx-auto mb-4 text-foreground/70" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-3">Volunteer your time</h2>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Can't donate? Help with translation, outreach, mentorship, or program ops. Most of our
            program delivery is run by volunteers.
          </p>
          <a
            href="/supporters"
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors"
          >
            <Lightbulb className="w-4 h-4" /> See open roles
          </a>
        </div>
      </section>

      {/* ════════ 11 — DIRECT CONTACT ════════ */}
      <section className="py-16 md:py-24 px-6 bg-secondary/20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-7 h-7 mx-auto mb-4 text-foreground/70" />
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-3">Donation question?</h2>
          <p className="text-sm md:text-base text-foreground/70 mb-6">
            Reach out — we usually reply within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <a href="mailto:private@elonmuskoffice.site" className="px-5 py-2.5 border border-border hover:border-foreground/40 transition-colors">
              private@elonmuskoffice.site
            </a>
            <a href="tel:+13238927090" className="px-5 py-2.5 border border-border hover:border-foreground/40 transition-colors">
              (323) 892-7090
            </a>
          </div>
        </div>
      </section>

      {/* ════════ 12 — FINAL CTA ════════ */}
      <section className="py-20 md:py-32 px-6 border-t border-border text-center">
        <div className="max-w-3xl mx-auto">
          <Award className="w-9 h-9 mx-auto mb-4 text-foreground/70" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Make a difference today</h2>
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-8">
            Scroll back up to the form, pick a cause, and send. We do not take a cut, we do not sell
            your data, and we publish the on-chain report every month.
          </p>
          <a
            href="#donate"
            className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.12em] hover:opacity-90 transition-opacity"
          >
            <HandHeart className="w-4 h-4" /> Give now
          </a>
        </div>
      </section>

      <Footer />
      <GrokWidget />
    </div>
  );
}
