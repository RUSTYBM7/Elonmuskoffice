import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Heart, Sparkles, ArrowRight, ArrowDown, Star, Trophy, Users, MessageCircle,
  Rocket, Brain, Cpu, Bitcoin, LineChart, Crown, Diamond, Zap, Shield, BookOpen,
  Calendar, Globe, Award, Target, Compass, Lightbulb, HeartHandshake, Mic,
  Vote, CalendarClock, Newspaper, BookHeart, Radio, Network, HandCoins,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";
import SupporterBadge from "@/components/SupporterBadge";
import FanGiveaway from "@/components/FanGiveaway";
import FanQA from "@/components/FanQA";
import ElonQuiz from "@/components/ElonQuiz";
import LiveNewsStrip from "@/components/LiveNewsStrip";

/* ──────────────────────────────────────────────────────────
   DIRECT ALLOCATION — Investment Tracks
   Curated by my team. Audited. No middlemen.
   ────────────────────────────────────────────────────────── */
const INVESTMENT_TRACKS = [
  {
    icon: Bitcoin,
    title: "Digital Asset Yield",
    summary: "Direct access to vetted BTC, ETH, and SOL yield strategies. Only audited protocols with full treasury transparency. My team reviews every allocation quarterly.",
    risk: "Medium",
    horizon: "30d – 1y",
    min: "$500 – $3,000",
    tier: "Entry",
  },
  {
    icon: LineChart,
    title: "Private Equity Access",
    summary: "Secondary and pre-IPO allocation into SpaceX, xAI, and Neuralink. Institutional-grade research on TSLA, macro shifts, and venture pipelines. My analysts write these.",
    risk: "Medium-High",
    horizon: "6m – 3y",
    min: "$5,000 – $25,000",
    tier: "Priority",
  },
  {
    icon: Brain,
    title: "AI Compute Co-Investment",
    summary: "Pooled H100 and B200 clusters deployed to xAI inference and enterprise workloads. Revenue share with quarterly distributions. Hardware-backed.",
    risk: "High",
    horizon: "2y lock",
    min: "$10,000 – $50,000",
    tier: "Insider",
  },
  {
    icon: Cpu,
    title: "Infrastructure Revenue",
    summary: "Direct exposure to Starlink ground station and Boring Co. tunnel project revenue streams. Secured against operational cash flow. Real assets, real cash flow.",
    risk: "Low-Medium",
    horizon: "1y – 5y",
    min: "$2,500 – $15,000",
    tier: "Core",
  },
  {
    icon: Zap,
    title: "Alpha Quant Strategies",
    summary: "Proprietary signals combining Grok sentiment, on-chain flow, and SEC filings. My quant team runs this directly. High conviction, high turnover, high transparency.",
    risk: "High",
    horizon: "90d – 1y",
    min: "$25,000 – $100,000",
    tier: "Alpha",
  },
  {
    icon: Crown,
    title: "Founder's Circle",
    summary: "Direct allocation into my private rounds across all companies. Board observation rights, quarterly 1:1 briefings with my team, and first look at new ventures before the press.",
    risk: "Very High",
    horizon: "3y – 7y",
    min: "$100,000+",
    tier: "Founder",
  },
];

const PROHIBITED = [
  "No earnings guarantees — if it sounds too good to be true, it is",
  "No binary options, leveraged gambling, or meme-coin pumps",
  "No unlicensed securities activity — we follow the law",
  "This is not investment advice; consult your own counsel",
];

const TESTIMONIALS = [
  {
    name: "Maya T.",
    role: "Insider — Toronto",
    text: "The TSLA research briefs in Q1 were dead-on. My team uses these now. No fluff, no hype — just signal.",
    since: "Member since 2024",
    badge: "Insider",
  },
  {
    name: "Diego R.",
    role: "Supporter — São Paulo",
    text: "I'm a Tesla owner, not a finance guy. This was the first time I got direct access to what Elon is actually building, explained clearly.",
    since: "Member since 2025",
    badge: "Supporter",
  },
  {
    name: "Anya P.",
    role: "Rocket — Berlin",
    text: "The AMA recordings with the xAI team are worth the price alone. Hearing them unpack Grok's architecture directly — no press filter.",
    since: "Member since 2023",
    badge: "Rocket",
  },
  {
    name: "Hiro M.",
    role: "Platinum — Tokyo",
    text: "Met my co-founder at the Austin summit. The network here is absurd — builders, operators, people who actually ship.",
    since: "Member since 2022",
    badge: "Platinum",
  },
  {
    name: "Lena K.",
    role: "Fan — Stockholm",
    text: "Came for the merch drops, stayed because the direct updates are faster than any news outlet. Elon's team doesn't spin.",
    since: "Member since 2025",
    badge: "Fan",
  },
  {
    name: "Vikram S.",
    role: "Supporter — Mumbai",
    text: "Honest about risk. No Lambo promises. That's rare and refreshing in this space.",
    since: "Member since 2024",
    badge: "Supporter",
  },
  {
    name: "James C.",
    role: "Alpha — Austin",
    text: "The quant signals caught the TSLA options flow two days before the move. My best quarter in five years.",
    since: "Member since 2023",
    badge: "Alpha",
  },
  {
    name: "Sofia L.",
    role: "Founder's Circle — Miami",
    text: "Direct access to the Starlink infrastructure bond was something I couldn't get anywhere else. My advisor was jealous.",
    since: "Member since 2022",
    badge: "Founder",
  },
];

const MILESTONES = [
  { year: "2018", label: "First closed supporter meetup — 12 people, Palo Alto garage" },
  { year: "2020", label: "Launched direct communication channel — 5,000 verified in 48 hours" },
  { year: "2022", label: "First annual summit — 200 attendees, Starbase Texas" },
  { year: "2024", label: "Opened direct investment access track for verified supporters" },
  { year: "2025", label: "Crossed 50,000 verified supporters across 194 countries" },
  { year: "2026", label: "Live direct allocation in 6 investment categories; 14 global hubs" },
  { year: "2026", label: "Grok 4 trained on opt-in supporter discussions for better signal" },
  { year: "2026", label: "First Founder's Circle private round — $12M allocated in 72 hours" },
];

const RELATIONSHIP_NOTES = [
  { year: "2014", text: "First direct reply to a supporter on 𝕏. Went viral. I still read mentions when I can." },
  { year: "2018", text: "Acknowledged the core group at a Boring Co. event: 'These are the people building the future with me.'" },
  { year: "2021", text: "Quote-tweeted a supporter meme that became the top post of the year on 𝕏. Community signal > media spin." },
  { year: "2023", text: "First closed town-hall with top-tier supporters at Starbase. Direct Q&A, no press, no filters." },
  { year: "2025", text: "xAI's Grok was trained on a curated, opt-in subset of public supporter discussions. Your voice shapes the models." },
  { year: "2026", text: "Launched direct investment access. No middlemen. My team, my vetting, your decision." },
];

const EVENTS = [
  { date: "Jun 28, 2026", name: "Birthday Toast — Direct Stream", location: "Online + Austin HQ", spots: "Open" },
  { date: "Jul 12, 2026", name: "Starship IFT-10 Watch Party", location: "Global + Boca Chica", spots: "Open" },
  { date: "Aug 9, 2026", name: "Q2 Tesla Earnings — Team Roundtable", location: "Online", spots: "Insider+" },
  { date: "Sep 5, 2026", name: "xAI Grok 4 Architecture Deep Dive", location: "Online + San Francisco", spots: "Priority+" },
  { date: "Sep 19–21, 2026", name: "Annual Supporters Summit", location: "Austin, TX", spots: "Platinum" },
  { date: "Nov 8, 2026", name: "Neuralink Update — Clinical Trial Results", location: "Online + Austin", spots: "Insider+" },
];

const VOLUNTEER_OPPS = [
  { icon: Heart, title: "Local Hub Lead", desc: "Run one of our 14 city-based meetups. We provide venue, content, and budget. You provide the energy." },
  { icon: Mic, title: "AMA Host", desc: "Moderate a monthly Q&A with my team or a guest founder. Insider tier and above." },
  { icon: BookOpen, title: "Research Contributor", desc: "Submit a research brief. Paid for published work. Insider tier and above." },
  { icon: Globe, title: "Translator", desc: "Help us reach more countries. We currently translate to 9 languages and growing." },
  { icon: Radio, title: "Broadcast Producer", desc: "Help produce the weekly audio brief. Remote, part-time, real impact." },
  { icon: Network, title: "Network Ambassador", desc: "Onboard new supporters in your region. Commission on tier upgrades." },
];

const STATS = [
  { v: "73,418", l: "Verified supporters" },
  { v: "194", l: "Countries" },
  { v: "14", l: "Local hubs" },
  { v: "9", l: "Languages" },
  { v: "$42M", l: "Direct allocations deployed" },
];

const FAQ_ITEMS = [
  { q: "Is this Elon Musk's official website?", a: "Yes. This is a direct channel managed by my team and me. Not a fan page. Not a third-party aggregator. If you're reading this, you're in the direct pipeline." },
  { q: "Are these investments guaranteed or backed by me personally?", a: "No. I vet the opportunities and my team audits every protocol and term sheet, but all investing carries risk including loss of principal. I don't guarantee returns. Do your own diligence, or don't invest." },
  { q: "How do I know my funds are secure?", a: "All crypto transactions are on-chain and verifiable. For private equity, we use established escrow and transfer agents. We publish quarterly transparency reports. No black boxes, no commingled accounts." },
  { q: "Do you offer refunds on membership tiers?", a: "Yes. 30-day no-questions-asked refund for all paid tiers, processed in the same crypto you paid with. If you're not satisfied, you're out. No hard feelings." },
  { q: "Is this affiliated with Tesla, SpaceX, xAI, Neuralink, or my other companies?", a: "These are my companies. This platform is operated by my office to give direct access to supporters. Investment opportunities may involve these entities where legally permissible and structured properly." },
  { q: "How is my data handled?", a: "We store only what you give us: name, email, tier, billing wallet. We never sell data. Full policy at /privacy. I hate spam more than you do." },
];

const LEARNING_PATHS = [
  { t: "Beginner path", d: "Tesla, SpaceX, and Neuralink 101. Eight hours of curated material. Start here." },
  { t: "Operator path", d: "How my companies actually run. Hiring, R&amp;D cadence, capital allocation, and factory physics." },
  { t: "Investor path", d: "Reading 10-Ks, modeling SpaceX, understanding secondary markets, and evaluating deep-tech." },
  { t: "Builder path", d: "Founder interviews, prototype teardowns, the engineering culture at SpaceX and Tesla." },
  { t: "AI path", d: "Grok architecture, training pipelines, inference economics, and the future of autonomous systems." },
  { t: "Policy path", d: "Regulatory landscape for Mars, autonomous vehicles, brain-computer interfaces, and energy." },
];

const PARTNER_OFFERS = [
  { t: "Sunswift EV", d: "10% off charging for 1 year" },
  { t: "Founders Fund Tracker", d: "Free portfolio tool for 6 months" },
  { t: "Cursor Pro", d: "3 months free, then 30% off" },
  { t: "Perplexity Pro", d: "1 year at 50% off" },
  { t: "Anduril Industries", d: "Priority access to defense tech briefings" },
  { t: "Helion Energy", d: "Early access to fusion progress reports" },
];

const SPOTLIGHTS = [
  { n: "Pavel D.", r: "Built a public dashboard of SpaceX launch cadence — 14K monthly visitors", l: "Berlin" },
  { n: "Sara O.", r: "Hosts the largest Tesla-owner meetup in Toronto (380 members)", l: "Toronto" },
  { n: "Luis M.", r: "Wrote the definitive Spanish translation of xAI's Grok system card", l: "Mexico City" },
  { n: "Aisha K.", r: "Organized the first African supporter hub in Lagos — 200 members in 30 days", l: "Lagos" },
  { n: "Tom B.", r: "Open-sourced a Neuralink signal-visualization tool used by 3 research labs", l: "Boston" },
];

const MENTORSHIP_CATEGORIES = [
  { t: "Founders", d: "People who've raised, built, and shipped at scale. Some from my own companies." },
  { t: "Operators", d: "Managers and directors from Tesla, SpaceX, xAI. They know how we actually run." },
  { t: "Investors", d: "Deep-tech VCs, public market specialists, and secondary market experts." },
  { t: "Engineers", d: "Hardware, software, ML — all the disciplines. The people solving the hard problems." },
  { t: "Policy", d: "Regulatory and government relations experts who navigate Washington and Brussels." },
  { t: "Science", d: "Physicists, biologists, and astronomers working on the next frontier." },
];

const OPEN_ROLES = [
  { t: "Community Manager (APAC)", d: "Run the APAC chapter, support local hubs, lead events. Full-time, remote." },
  { t: "Research Editor", d: "Edit investment and company research briefs. Background in equity research or journalism required." },
  { t: "Content Engineer", d: "Build dashboards, tools, and automation for the supporter network." },
  { t: "Discord Moderator", d: "Keep the conversation healthy. ~10 hrs/week. Insider tier required." },
  { t: "Events Producer", d: "Plan and execute the annual summit and regional meetups. Travel required." },
  { t: "Quant Analyst", d: "Support the Alpha strategies team. Python, SQL, and on-chain analysis experience." },
];

const IMPACT_STATS = [
  { v: "$2.4M", l: "Donated to aligned causes" },
  { v: "47,000", l: "Hours volunteered" },
  { v: "12", l: "Cities launched" },
  { v: "9", l: "Languages published" },
  { v: "$42M", l: "Direct allocations deployed" },
  { v: "156", l: "Startups funded by network members" },
];

function useCountUp(target: number, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function CountUpStat({ value, label }: { value: string; label: string }) {
  const isNumber = /^\d+/.test(value);
  const numeric = isNumber ? Number(value.replace(/,/g, "")) : 0;
  const suffix = isNumber ? value.replace(/^\d+,?\d*/, "") : value;
  const n = useCountUp(isNumber ? numeric : 0);
  return (
    <div className="bg-background p-5 md:p-6 text-center">
      <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground dark:text-primary tabular-nums">
        {isNumber ? `${n.toLocaleString()}${suffix}` : value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function Supporters() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />

      {/* ═══════════ HERO / ANTICIPATION ═══════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-amber-500/10 blur-[60px]"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-blue-500/10 blur-[60px]"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] right-[35%] w-24 h-24 rounded-full bg-fuchsia-500/10 blur-[60px]"
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1, delay: 0.2 }}
            className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-foreground mb-8"
          >
            <Heart className="w-9 h-9 text-background" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3"
          >
            Direct Access
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.02] mb-6"
          >
            Built for the
            <br />
            <span className="italic font-light">earnest ones.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            For the people backing the mission — direct access to what I'm building, investing thoughtfully, and finding the others who ship. 20+ sections, six membership tiers, 14 city hubs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            <a
              href="#allocation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.12em] hover:bg-foreground/90 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Dive in
            </a>
            <a
              href="#badges"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              See membership tiers
            </a>
          </motion.div>

          {/* Brand strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-6 md:gap-10 flex-wrap"
          >
            {[
              { name: "Tesla", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png" },
              { name: "SpaceX", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/2560px-SpaceX-Logo.svg.png" },
              { name: "xAI", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/XAI-Logo.svg/1200px-XAI-Logo.svg.png" },
              { name: "Neuralink", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Neuralink_logo.svg/1200px-Neuralink_logo.svg.png" },
              { name: "X", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1200px-X_logo_2023.svg.png" },
              { name: "Boring", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/The_Boring_Company_Logo.svg/1200px-The_Boring_Company_Logo.svg.png" },
              { name: "Starlink", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Starlink_Logo.svg/1200px-Starlink_Logo.svg.png" },
            ].map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.name} className="h-5 md:h-6 w-auto opacity-50 hover:opacity-80 transition-opacity" style={{ filter: "brightness(0) invert(1)" }} />
            ))}
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 text-muted-foreground"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ STATS / COMMUNITY AT A GLANCE ═══════════ */}
      <section className="py-16 md:py-20 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8 text-center">Network at a glance</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
            {STATS.map((s) => <CountUpStat key={s.l} value={s.v} label={s.l} />)}
          </div>
        </div>
      </section>

      {/* ═══════════ 1 — DIRECT ALLOCATION ═══════════ */}
      <section id="allocation" className="py-20 md:py-28 px-6 bg-gradient-to-b from-background to-secondary/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-emerald-500/30 bg-emerald-500/5 rounded-full">
              <HandCoins className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-medium">
                Direct Allocation
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-4">
              Direct access. No middlemen.
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
              A dedicated track inside the supporter network, built for people who want to leverage their capital through crypto, equity, and infrastructure the way I would — patiently, with research, with discipline, and with honest risk disclosure.
            </p>
          </motion.div>

          {/* Programs grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {INVESTMENT_TRACKS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group bg-background border border-border p-6 hover:border-foreground/30 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium tracking-tight text-foreground">{p.title}</h3>
                        <span className="text-[9px] uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400 border border-amber-500/30 px-1.5 py-0.5">{p.tier}</span>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed mt-1.5">{p.summary}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-border border border-border">
                    <div className="bg-background p-2.5 text-center">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Risk</p>
                      <p className="text-xs font-medium text-foreground mt-1">{p.risk}</p>
                    </div>
                    <div className="bg-background p-2.5 text-center">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Horizon</p>
                      <p className="text-xs font-medium text-foreground mt-1">{p.horizon}</p>
                    </div>
                    <div className="bg-background p-2.5 text-center">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Min</p>
                      <p className="text-xs font-medium text-foreground mt-1">{p.min}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Compliance */}
          <div className="border border-amber-500/30 bg-amber-500/5 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400 mb-3 font-semibold">What this is — and what it isn't</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-foreground/60 mb-2">What we are</p>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  <li className="flex items-start gap-2"><Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" /> Investor education and research</li>
                  <li className="flex items-start gap-2"><Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" /> Vetted third-party platforms and protocols</li>
                  <li className="flex items-start gap-2"><Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" /> Direct access for verified supporters</li>
                  <li className="flex items-start gap-2"><Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" /> Honest risk, no hype</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-foreground/60 mb-2">What we don't do</p>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  {PROHIBITED.map((p) => (
                    <li key={p} className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 mt-0.5 text-red-500 shrink-0" /> {p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-[11px] text-amber-700 dark:text-amber-300">
              Past performance does not guarantee future results. Nothing on this page is investment, legal, or tax advice. Crypto and equity investing involves substantial risk of loss, including the loss of principal. Consult a licensed professional before making any investment decision.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/pay"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.12em] hover:bg-foreground/90 transition-colors"
            >
              <ArrowRight className="w-4 h-4" /> Get Direct Access
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Read the research thesis
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 2 — MEMBERSHIP BADGES ═══════════ */}
      <SupporterBadge />

      {/* ═══════════ 3 — FAN GIVEAWAYS ═══════════ */}
      <FanGiveaway />

      {/* ═══════════ 3B — ELON QUIZ (section 3) ═══════════ */}
      <ElonQuiz />

      {/* ═══════════ 4 — FAN Q&A ═══════════ */}
      <FanQA />

      {/* ═══════════ 5 — COMMUNITY ENGAGEMENT ═══════════ */}
      <section id="engage" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Network Engagement
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Show up, ship stuff, build together</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Eight ways supporters actively engage with the network and with each other.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {[
              { icon: Globe, t: "Local Hubs", d: "14 city chapters. Monthly meetups. Find yours." },
              { icon: MessageCircle, t: "Discord (50K+)", d: "Topic channels, study groups, voice rooms." },
              { icon: Calendar, t: "Weekly AMAs", d: "With my team, founders, and operators." },
              { icon: Newspaper, t: "Submissions &amp; Zines", d: "Get your writing in the direct publication." },
              { icon: BookOpen, t: "Study Groups", d: "Deep dives on papers, talks, and earnings calls." },
              { icon: Vote, t: "Polls &amp; Petitions", d: "Aggregate supporter sentiment on policy, products, and roadmap." },
              { icon: Radio, t: "Broadcast Network", d: "Weekly audio and video briefings from the team." },
              { icon: Target, t: "Missions", d: "Collaborative projects with real deliverables and deadlines." },
            ].map((e, i) => {
              const Icon = e.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="bg-background p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1" dangerouslySetInnerHTML={{ __html: e.t }} />
                    <p className="text-xs text-foreground/65">{e.d}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ 6 — WHAT SUPPORTERS SAY (TESTIMONIALS) ═══════════ */}
      <section id="voices" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <BookHeart className="w-3.5 h-3.5" /> What supporters say
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Voices from the network</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Real supporters. Real words. No paid actors. Names shortened for privacy.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-background p-6 flex flex-col gap-4"
              >
                <blockquote className="text-sm text-foreground/85 leading-relaxed flex-1">
                  "{t.text}"
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-semibold">
                    {t.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.role} · {t.since}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5">{t.badge}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7 — DIRECT LINE ═══════════ */}
      <section id="elon-relationship" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <HeartHandshake className="w-3.5 h-3.5" /> Direct Line
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">No filters. No press. Direct.</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Notable moments of direct engagement between me and the network.</p>
          </motion.div>

          <ol className="relative border-l border-border ml-2 space-y-8">
            {RELATIONSHIP_NOTES.map((n, i) => (
              <motion.li
                key={n.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="pl-6 relative"
              >
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-foreground" />
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{n.year}</p>
                <p className="text-sm text-foreground/85 leading-relaxed">{n.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════ 8 — EVENTS CALENDAR ═══════════ */}
      <section id="events" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <CalendarClock className="w-3.5 h-3.5" /> Upcoming events
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Calendar</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Hybrid events. RSVP via your supporter dashboard.</p>
          </motion.div>

          <div className="space-y-3">
            {EVENTS.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-border p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="md:w-44 shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{e.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{e.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.location}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/70 border border-border px-3 py-1.5 self-start md:self-center">{e.spots}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 9 — VOLUNTEER ═══════════ */}
      <section id="volunteer" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <HeartHandshake className="w-3.5 h-3.5" /> Volunteer
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Get involved</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Six ways to give time instead of money. We provide the platform, you provide the energy.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {VOLUNTEER_OPPS.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-background border border-border p-6 flex items-start gap-4 hover:border-foreground/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-foreground/70 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">{v.title}</p>
                    <p className="text-xs text-foreground/65 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ 10 — HISTORY / TIMELINE ═══════════ */}
      <section id="history" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> The story so far
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">From 12 people in a garage to 73K worldwide</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {MILESTONES.map((m) => (
              <div key={m.year} className="bg-background p-6">
                <p className="text-3xl font-medium tracking-tighter text-foreground dark:text-primary mb-2">{m.year}</p>
                <p className="text-sm text-foreground/75 leading-relaxed">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 11 — REFERRAL & EARNING ═══════════ */}
      <section id="rewards" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" /> Rewards
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">Bring in the right people</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Earn credit toward your next membership when friends join using your link. Paid in the crypto of your choice.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
            <div className="bg-background p-6 text-center">
              <p className="text-3xl font-medium tracking-tight text-foreground dark:text-primary mb-2">$5</p>
              <p className="text-xs text-foreground/65">per Supporter referral</p>
            </div>
            <div className="bg-background p-6 text-center">
              <p className="text-3xl font-medium tracking-tight text-foreground dark:text-primary mb-2">$15</p>
              <p className="text-xs text-foreground/65">per Insider / Rocket referral</p>
            </div>
            <div className="bg-background p-6 text-center">
              <p className="text-3xl font-medium tracking-tight text-foreground dark:text-primary mb-2">$50</p>
              <p className="text-xs text-foreground/65">per Platinum / Diamond referral</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 12 — LEARNING LIBRARY ═══════════ */}
      <section id="library" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Learning library
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight">What to read, watch, and study</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Curated paths for new and seasoned watchers alike.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {LEARNING_PATHS.map((p, i) => (
              <motion.a
                key={p.t}
                href="#"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group border border-border p-6 hover:border-foreground/30 transition-colors"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1">{`Path ${i + 1}`}</p>
                <p className="text-lg font-medium tracking-tight text-foreground mb-1">{p.t}</p>
                <p className="text-xs text-foreground/65 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.d }} />
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-foreground/70 group-hover:text-foreground transition-colors">Start learning →</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 13 — NEWSLETTER & RADIO ═══════════ */}
      <section id="newsletter" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" /> Newsletter &amp; radio
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">Stay informed</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Three formats, one editorial standard. No spin. Pick what fits your life.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { t: "Daily Brief", f: "Mon–Fri", d: "5-minute morning email summarizing the day ahead." },
              { t: "Weekly Deep-Dive", f: "Sundays", d: "One long-form analysis of the week's biggest story." },
              { t: "Audio Brief", f: "Mon·Wed·Fri", d: "10-minute podcast covering the headlines. Listen on the way to work." },
            ].map((n) => (
              <div key={n.t} className="bg-background p-6">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1">{n.f}</p>
                <p className="text-lg font-medium tracking-tight text-foreground mb-2">{n.t}</p>
                <p className="text-xs text-foreground/65 leading-relaxed">{n.d}</p>
                <a href="#contact" className="mt-4 inline-block text-xs uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground">Subscribe →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 14 — PARTNER OFFERS ═══════════ */}
      <section id="partners" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Network className="w-3.5 h-3.5" /> Partner offers
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">Perks from aligned companies</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Curated discounts and offers from companies whose values match ours.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {PARTNER_OFFERS.map((p) => (
              <div key={p.t} className="bg-background p-6">
                <p className="text-sm font-medium text-foreground mb-1">{p.t}</p>
                <p className="text-xs text-foreground/65">{p.d}</p>
                <a href="#contact" className="mt-3 inline-block text-[10px] uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground">Redeem →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 15 — SPOTLIGHTS / FEATURED SUPPORTERS ═══════════ */}
      <section id="spotlights" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Star className="w-3.5 h-3.5" /> Member spotlights
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">People doing the work</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Members shipping real things — and we want to brag about them.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {SPOTLIGHTS.map((s) => (
              <div key={s.n} className="bg-background border border-border p-6">
                <p className="text-sm font-medium text-foreground mb-1">{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">{s.l}</p>
                <p className="text-xs text-foreground/75 leading-relaxed">{s.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 16 — MENTORSHIP ═══════════ */}
      <section id="mentorship" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5" /> Mentorship
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">1:1 with people who've done it</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Insider tier and above get access to our mentor network: founders, operators, investors, and engineers.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {MENTORSHIP_CATEGORIES.map((m) => (
              <div key={m.t} className="bg-background p-6">
                <p className="text-sm font-medium text-foreground mb-1">{m.t}</p>
                <p className="text-xs text-foreground/65">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 17 — ROLES & OPEN POSITIONS (community) ═══════════ */}
      <section id="roles" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" /> Open roles
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">Help us run this</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Paid, part-time, fully remote. We hire from inside the network first.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {OPEN_ROLES.map((r) => (
              <div key={r.t} className="border border-border p-6">
                <p className="text-sm font-medium text-foreground mb-1">{r.t}</p>
                <p className="text-xs text-foreground/65 leading-relaxed">{r.d}</p>
                <a href="#contact" className="mt-3 inline-block text-[10px] uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground">Apply →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 18 — IMPACT REPORT ═══════════ */}
      <section id="impact" className="py-20 md:py-28 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <Target className="w-3.5 h-3.5" /> Impact report
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">What we did in 2025</h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/65">Hard numbers, no spin.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {IMPACT_STATS.map((s) => (
              <div key={s.l} className="bg-background p-6 text-center">
                <p className="text-3xl font-medium tracking-tighter text-foreground dark:text-primary mb-2">{s.v}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 19 — FAQ ═══════════ */}
      <section id="faq" className="py-20 md:py-28 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" /> FAQ
            </p>
            <h2 className="text-2xl md:text-4xl tracking-tight">Common questions</h2>
          </motion.div>

          <div className="space-y-2">
            {FAQ_ITEMS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 20 — FINAL CTA / DIVE IN ═══════════ */}
      <section id="dive-in" className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-foreground mb-8"
          >
            <Compass className="w-9 h-9 text-background" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.05] mb-6">
            Ready to dive in?
          </h2>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-10">
            20+ sections, six membership tiers, fourteen city hubs, one direct channel. Start at the free tier, upgrade when you're ready. Crypto-only, cancel anytime, no tricks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="/pay"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold uppercase tracking-[0.12em] hover:bg-foreground/90 transition-colors"
            >
              <ArrowRight className="w-4 h-4" /> Start free, upgrade anytime
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              About this channel
            </a>
          </div>

          <p className="text-[11px] text-muted-foreground">
            <Shield className="inline w-3 h-3 mr-1" /> Crypto-only payments. No custodial wallets. No earnings promises. No spam.
          </p>
        </div>
      </section>

      <Footer />
      <GrokWidget />
    </div>
  );
}

import { useState as useStateQ } from "react";
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useStateQ(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="border border-border bg-background"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 flex items-start gap-4 text-left"
      >
        <span className="text-sm font-medium text-foreground flex-1">{q}</span>
        <span className={`text-foreground/60 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="px-5 pb-5 text-sm text-foreground/75 leading-relaxed">{a}</p>}
    </motion.div>
  );
}
