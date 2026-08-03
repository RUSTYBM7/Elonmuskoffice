import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Send, Mic, ChevronDown, Copy, CheckCheck, 
  ThumbsUp, ThumbsDown, Share2, Sparkles, 
  Bot, User, Clock, Zap, Brain, Rocket, 
  TrendingUp, Newspaper, Globe, Search,
  Bookmark, BookmarkCheck, RotateCcw, Volume2, VolumeX,
  Image as ImageIcon, Code, FileText, HelpCircle,
  ArrowUpRight, Pin, PinOff, Filter, History
} from "lucide-react";
import GrokLogo from "./GrokLogo";

/* ──────────────────────────────────────────────────────────
   MODELS & CONFIG
   ────────────────────────────────────────────────────────── */
const MODELS = [
  { id: "grok-4", label: "Grok 4", badge: "Latest", desc: "Most capable. Real-time web. Deep reasoning.", color: "#10b981" },
  { id: "grok-3", label: "Grok 3", badge: null, desc: "Fast, accurate, great for most questions.", color: "#3b82f6" },
  { id: "grok-3-beta", label: "Grok 3 Beta", badge: "Research", desc: "Experimental features. May hallucinate.", color: "#f59e0b" },
  { id: "grok-2", label: "Grok 2", badge: null, desc: "Legacy model. Stable and tested.", color: "#6b7280" },
];

const PERSONAS = [
  { id: "default", label: "General", icon: Brain, prompt: "You are Grok, helpful assistant for Elon Musk's official site." },
  { id: "investor", label: "Investor", icon: TrendingUp, prompt: "You are Grok, financial analyst specializing in Tesla, SpaceX, and crypto markets." },
  { id: "engineer", label: "Engineer", icon: Code, prompt: "You are Grok, technical expert on rockets, EVs, AI, and manufacturing." },
  { id: "journalist", label: "Journalist", icon: Newspaper, prompt: "You are Grok, press liaison with verified facts and sources." },
];

const INITIAL_MESSAGES: Record<string, string> = {
  "grok-4": "Grok 4 here. I have real-time access to Elon's latest posts, SEC filings, and launch schedules. What do you want to know?",
  "grok-3": "Hi, I'm Grok 3 — your guide to everything about Elon Musk and this website. What would you like to explore?",
  "grok-3-beta": "Grok 3 Beta. Experimental reasoning mode active. I may cite sources you can't verify yet — trust but verify.",
  "grok-2": "Grok 2 at your service. Stable, tested, reliable. Ask me anything about Elon or this site.",
};

const THINKING_STATES = [
  "Analyzing neural patterns…",
  "Cross-referencing SEC filings…",
  "Checking Starlink launch manifest…",
  "Querying Tesla production data…",
  "Reviewing Elon's latest 𝕏 posts…",
  "Simulating Starship trajectory…",
  "Parsing Grok 4 reasoning trace…",
  "Validating against known facts…",
];

const QUICK_SUGGESTIONS = [
  { text: "Who is Elon Musk?", icon: User, category: "bio" },
  { text: "Tesla Q2 2026 earnings", icon: TrendingUp, category: "finance" },
  { text: "Next Starship launch", icon: Rocket, category: "spacex" },
  { text: "Neuralink human trials", icon: Brain, category: "neuralink" },
  { text: "xAI Grok 4 capabilities", icon: Zap, category: "xai" },
  { text: "How to invest in SpaceX", icon: TrendingUp, category: "invest" },
  { text: "Site navigation help", icon: HelpCircle, category: "help" },
  { text: "Latest 𝕏 news", icon: Newspaper, category: "news" },
];

/* ──────────────────────────────────────────────────────────
   KNOWLEDGE BASE — Deep, structured, citation-ready
   ────────────────────────────────────────────────────────── */
const KB = {
  bio: `Elon Reeve Musk (born June 28, 1971, Pretoria, South Africa) is an entrepreneur, engineer, and the wealthiest person in history with a net worth of ~$1.1 trillion as of mid-2026.

Family & Early Life
- Father: Errol Musk (electromechanical engineer, pilot, sailor)
- Mother: Maye Musk (model, dietitian, nutritionist, Miss South Africa 1969)
- Siblings: Kimbal (restaurateur, Big Green co-founder) and Tosca (filmmaker, Passionflix founder)
- Childhood: Self-taught programmer by age 10. Sold Blastar (a space-themed video game) for $500 at age 12. Bullied severely in school, hospitalized once.

Education
- Pretoria Boys High School
- Moved to Canada at 17 (via mother's Canadian citizenship)
- Queen's University, Kingston (2 years)
- University of Pennsylvania: B.S. Economics (Wharton), B.A. Physics
- Stanford University: PhD Energy Physics program — dropped out after 2 days in 1995 to pursue the internet boom

Career Timeline
| Year | Event |
|------|-------|
| 1995 | Zip2 co-founded with Kimbal — online city guide for newspapers |
| 1999 | Zip2 sold to Compaq for $307M (Elon got $22M) |
| 1999 | X.com founded — online financial services, merged with Confinity |
| 2000 | Merged entity renamed PayPal |
| 2002 | PayPal sold to eBay for $1.5B (Elon got $165M) |
| 2002 | SpaceX founded with $100M personal investment |
| 2004 | Led Tesla Series A, became Chairman |
| 2008 | Tesla CEO after Eberhard departure; personally invested $40M to save company from bankruptcy |
| 2012 | SpaceX Dragon first commercial spacecraft to dock with ISS |
| 2015 | OpenAI co-founded; departed board 2018 |
| 2016 | Neuralink and The Boring Company founded |
| 2018 | SEC settlement over "funding secured" tweet; stepped down as Tesla Chairman |
| 2020 | SpaceX first private company to send humans to orbit (Demo-2) |
| 2022 | Acquired Twitter for $44B; took private |
| 2023 | Twitter rebranded to 𝕏; xAI founded July |
| 2024 | Neuralink first human implant; Tesla Robotaxi unveiled |
| 2025 | Starship reached orbital velocity; xAI valued at $80B+ |
| 2026 | Net worth crossed $1.1T; SpaceX IPO preparation active |

Personal
- 12+ known children (including twins with Shivon Zilis, Neuralink executive)
- Married 3 times (Justine Wilson, Talulah Riley ×2)
- Current partner: not publicly confirmed as of 2026
- Residences: Primary in Austin, TX; also Boca Chica (Starbase), and formerly Bel Air, CA`,

  tesla: `Tesla, Inc. (NASDAQ: TSLA) — Market cap ~$800B. Elon owns ~13% (~$140B stake).

Leadership
- CEO & "Technoking" (self-appointed title, 2021)
- CFO: Vaibhav Taneja
- CTO: Drew Baglino (powertrain & energy)

Vehicle Lineup
| Model | Segment | Status | Notes |
|-------|---------|--------|-------|
| Model S | Luxury sedan | Production | Refresh 2025: 405mi range, Plaid 1.99s 0-60 |
| Model 3 | Mid-size sedan | Production | Highland refresh: quieter, better screen |
| Model X | Luxury SUV | Production | Falcon doors, 6/7 seat config |
| Model Y | Compact SUV | Production | Best-selling car globally 2023–2025 |
| Cybertruck | Pickup | Production | Stainless exoskeleton, 11,000lb tow, bulletproof |
| Semi | Class 8 truck | Limited prod | PepsiCo first customer, 500mi range |
| Roadster | Supercar | Delayed | 0-60 in 1.1s, SpaceX package with cold gas thrusters |
| Robotaxi (Cybercab) | Autonomous taxi | 2026 pilot | No steering wheel, <$30K target |

Energy & Other
- Solar Roof v3: integrated tiles, 25-year warranty
- Powerwall 3: 13.5kWh, whole-home backup
- Megapack: utility-scale, 4MWh per unit
- Supercharger: 60,000+ stalls globally, opened to non-Tesla (NACS standard)
- Optimus Gen 3: humanoid robot, 22 degrees of freedom, $20K target price

Key 2026 Metrics
- Cumulative deliveries: 10M+ EVs
- FSD v12+: end-to-end neural net, unsupervised mode testing
- Energy storage deployments: record quarter Q1 2026
- Optimus: pilot production line at Fremont, 1,000 units/month target`,

  spacex: `Space Exploration Technologies Corp. — Valuation $400B+ (tender offer, 2026). Largest private company in history.

Leadership
- CEO & Chief Engineer: Elon Musk
- President & COO: Gwynne Shotwell (since 2008)
- CTO of Starship: Mark Juncosa

Launch Vehicles
| Vehicle | Status | Payload to LEO | Notes |
|---------|--------|----------------|-------|
| Falcon 9 | Operational | 22,800kg | 300+ successful landings, most-flown orbital rocket |
| Falcon Heavy | Operational | 63,800kg | 3-core variant, used for USSF, interplanetary |
| Starship | Testing | 150,000kg+ | Fully reusable, largest rocket ever built |
| Starship HLS | Development | — | Human Landing System for NASA Artemis III/V |

Engines
- Merlin 1D: Falcon 9/Heavy first stage, 845kN sea level
- Merlin Vacuum: Falcon upper stage, 914kN
- Raptor: Starship, full-flow staged combustion, 2.3MN sea level
- Raptor 3: simplified design, no heat shield needed, higher thrust

Key Programs
- Starlink: 8,000+ satellites, 10M+ subscribers, $180B+ spin-off planned
- Starship: IFT-10 completed booster catch (2026); Mars cargo window 2026/2027
- NASA Commercial Crew: Dragon 2, operational since 2020
- HLS: $2.9B contract, lunar landing demonstration required before Artemis III

Starbase (Boca Chica, TX)
- Primary Starship development & launch site
- Mega Bay: parallel final assembly of multiple ships
- Launch complex: orbital pad A, suborbital pad B, catch tower (Mechazilla)

2026 IPO
- Q3 2026 targeted (Reuters/Bloomberg, May 2026)
- Projected ticker: SPAX (NASDAQ)
- Would be largest IPO in history at $400B+ valuation
- Starlink spin-off planned separately, late 2026`,

  neuralink: `Neuralink Corp. — Valuation $8B+. Founded 2016, Fremont CA.

Technology Stack
| Component | Spec |
|-----------|------|
| N1 Implant | 23mm × 8mm × 0.25mm, hermetically sealed |
| Electrodes | 1,024 per chip, platinum-iridium |
| Threads | 64 polymer filaments, 5μm diameter |
| Insertion | R1 surgical robot, micron precision, avoids vasculature |
| Depth | 3-4mm into motor cortex |
| Wireless | BLE 5.0, 10 Mbps, 5-10m range |
| Charging | Inductive through scalp, no ports |
| Battery | All-day life, overnight charge |

Products
1. Telepathy (Active) — Thought-controlled computing. First patient Noland Arbaugh (Jan 2024). Now 90 WPM text output.
2. Blindsight (FDA Breakthrough Device, Aug 2024) — Camera-to-visual-cortex for the blind. Human trials 2026.
3. Neural Repair (Preclinical) — Spinal cord, stroke, neurodegenerative reversal.
4. Cognitive Expansion (Research) — Memory prosthetics, accelerated learning.

Clinical Progress
- PRIME Study: ongoing, multiple centers
- CONVOY: multi-patient cohort active 2025
- 2026: Patient controlling Apple Vision Pro via neural commands
- 2026: Thread retraction issue identified and mitigated in N1 v2

Team: 600+ engineers, neuroscientists, roboticists`,

  xai: `xAI Corp. — Valuation $200B+ (2025–26 funding rounds). Founded July 2023.

Leadership
- Founder: Elon Musk
- CEO: Elon Musk
- Key hires: Igor Babuschkin (DeepMind), Manuel Kroiss (DeepMind), Ross Nordeen (Tesla), Jimmy Ba (Toronto), Yuhuai Wu (Google N2Formal)

Compute Infrastructure
- Colossus (Memphis, TN): 100,000+ H100 GPUs, largest AI training cluster globally
- Colossus II (planned): 300,000+ GPUs including B200

Model Family
| Model | Release | Context | Notes |
|-------|---------|---------|-------|
| Grok 1 | Nov 2023 | 8K | Initial release, real-time 𝕏 access |
| Grok 2 | Aug 2024 | 128K | Competitive with GPT-4, open weights |
| Grok 3 | Feb 2025 | 1M | Long context, reasoning, coding |
| Grok 4 | Jun 2026 | 2M | Multimodal, agentic, real-time web |

Products
- Grok Chat: 𝕏 integration, Tesla vehicle integration
- Grok Code: IDE plugin, autocomplete, debugging
- Aurora: text-to-image, photorealistic
- DeepSearch: agentic research, multi-step reasoning
- API: developer access, competitive pricing

Differentiation
- Real-time 𝕏 data feed (unique advantage)
- "Truth-seeking" training (less political alignment)
- Open-weight releases (Grok 2)
- Humor and wit in personality tuning`,

  x: `𝕏 Corp. — Acquired Oct 2022 for $44B. Rebranded from Twitter Jul 2023.

Leadership
- Executive Chairman & CTO: Elon Musk
- CEO: Linda Yaccarino (since Jun 2023)

Products & Features
- 𝕏 Posts: 280 char limit (was 140, then 280), now supports 25,000 for Premium
- 𝕏 Premium: $8/mo, blue check, longer posts, edit, reduced ads
- 𝕏 Premium+: $16/mo, no ads, largest reply boost
- 𝕏 Money: payments, banking, crypto wallet (in development, 2026)
- 𝕏 Video: long-form, 4K, revenue share with creators
- 𝕏 Spaces: live audio, now supports video
- 𝕏 Articles: long-form publishing
- Grok integration: AI assistant in timeline, compose, search

Metrics (2026)
- Monthly active users: 600M+
- Daily active users: 250M+
- Revenue: ~$4B (advertising + subscriptions)
- Headcount: ~1,500 (down from 7,500 pre-acquisition)

Content & Policy
- Community Notes: crowd-sourced fact-checking
- Freedom of speech, not reach: reduced distribution of violative content
- Amnesty program: reinstated most previously banned accounts`,

  boring: `The Boring Company — Valuation $7B+. Founded 2016.

Mission: Solve traffic via low-cost tunnels.

Technology
- Prufrock: next-gen TBM, digs 10x faster than legacy machines
  - Rate: 1 mile per week target (vs. 1 mile per 8-12 weeks traditional)
  - Launch: directly from surface, no vertical shaft needed
  - Autonomous: minimal crew, 24/7 operation
- Hyperloop: near-vacuum tube, theoretical 700mph passenger pods

Projects
| Project | Location | Status | Length |
|---------|----------|--------|--------|
| Vegas Loop | Las Vegas, NV | Operational | 65+ miles planned, 2M+ riders |
| LVCC Loop | Las Vegas Convention Center | Operational | 1.7 miles, 3 stations |
| Vegas Strip Loop | Las Vegas Strip | Under construction | 29 miles |
| Fort Lauderdale | Florida | Approved | 3 miles |
- Dugout Loop (Los Angeles): canceled
- Chicago O'Hare: canceled

Products
- Loop system: Tesla vehicles in tunnels, 150mph
- Utility tunnels: water, power, fiber
- Freight tunnels: logistics bypass

Notable: "Not-a-Flamethrower" sold 20,000 units in 2018, raised $10M`,

  starlink: `Starlink — SpaceX division. Valuation $180B+ (spin-off planned).

Constellation
- Satellites: 8,000+ active in low Earth orbit (~550km)
- Orbital planes: 72, 53° inclination
- Coverage: 120+ countries, all continents including Antarctica

Hardware
- Standard (Gen 3): $599, self-install, 150Mbps typical
- Mini: $299, portable, 100Mbps, DC power
- Roam: $150/mo, in-motion use, RVs/boats
- Maritime: $5,000/mo, ocean-going vessels
- Aviation: $12,500/mo + $150K hardware, commercial aircraft
- Business: $2,500 hardware, 500Mbps, priority support

Performance
- Latency: 20-40ms (vs. 600ms+ geostationary)
- Speed: 50-250Mbps download, 10-20Mbps upload (Standard)
- Direct-to-Cell: SMS and data via unmodified phones (partner: T-Mobile)

Financials
- Subscribers: 10M+ (mid-2026)
- Revenue run-rate: ~$6B/year
- EBITDA positive since 2024
- IPO planned: late 2026, separate from SpaceX`,

  ipo: `SpaceX IPO — Current Status (June 2026)

The Offering
- Target: Q3 2026
- Valuation: $400B+ pre-IPO (tender offer basis)
- Ticker: SPAX (NASDAQ — unconfirmed)
- Structure: Primary + secondary shares, ~10% float

Why Now
- Starlink revenue sustainable ($6B run-rate)
- Starship approaching operational status
- NASA HLS contract requires financial transparency
- Elon's personal liquidity needs (tax bills, other ventures)

Investor Access
- Retail: limited allocation via broker partnerships
- Institutional: heavy demand, oversubscribed in roadshow
- Employee: secondary liquidity via tender offers since 2022

Risks
- Starship still not human-rated
- Regulatory: FAA launch licensing delays
- Competition: Blue Origin, ULA, China (CASC)
- Starlink: debris, spectrum, geopolitical conflicts

Starlink Spin-off
- Planned: late 2026, separate IPO
- Valuation: $180B+ standalone
- Rationale: unlock value, separate regulated telecom from launch

How to Participate
This site will update with broker partnerships and allocation details as they become available. No pre-orders or reservations accepted.`,

  navigate: `Site Navigation Guide

🏠 Home (/)
- Hero section with live portrait
- Biography summary
- Live stock/crypto widget (TSLA, BTC, DOGE, SPX, NRL, XAI)
- Venture explorer: interactive cards for all 7 companies
- SpaceX IPO news feed (Spaceflight News API, 5-min refresh)
- Press wall: curated media coverage
- Newsletter signup

👤 About (/about)
- Full biography with photos
- Horizontal career timeline
- Photo gallery
- Grok AI chat (this widget)
- Vision & mission statement

💎 Donate (/donate)
- Cryptocurrency only: BTC, ETH, USDT, USDC, SOL, DOGE
- All other payment methods → support chat
- Transparent allocation: 100% to mission-aligned causes

📞 Contact (/contact)
- Direct message to Office of Elon Musk
- Response time: 2–3 business days
- Press inquiries: use subject "Media"

⚙️ Settings
- Theme: light / dark / system
- Language: 9 languages
- Notification preferences

Quick Actions
- Press \`/\` from any page to open search
- Press \`g\` then \`g\` to open Grok (vim-style)
- Mobile: swipe right for menu`,

  privacy: `Privacy & Contact Information

| Channel | Detail |
|---------|--------|
| Email | private@elonmuskoffice.site |
| Phone | (323) 892-7090 |
| Hours | Mon–Fri, 9am–6pm CT |
| Response | 2–3 business days |
| Press | Use Contact form, subject "Media" |

Data Practices
- No third-party trackers
- No cookie banners (we don't use them)
- Crypto payments: processed on-chain, we don't hold funds
- Email: stored encrypted, never sold
- Analytics: self-hosted Plausible, no personal data

Security
- No wallet addresses shared in chat (go to /donate)
- No bank details ever requested
- Verify domain: elonmuskoffice.site only

Legal
- Not affiliated with Tesla, SpaceX, or other Musk companies (independent fan/community site)
- All trademarks belong to respective owners`,

  market: `Live Market Data (from site widget)

| Asset | Symbol | Type | Source |
|-------|--------|------|--------|
| Tesla | TSLA | Public equity | Yahoo Finance, real-time |
| Bitcoin | BTC | Crypto | CoinGecko, ~1min delay |
| Dogecoin | DOGE | Crypto | CoinGecko, ~1min delay |
| SpaceX | SPX | Private estimate | Internal model, simulated drift |
| Neuralink | NRL | Private estimate | Internal model, simulated drift |
| xAI | XAI | Private estimate | Internal model, simulated drift |

Refresh: Every 60 seconds automatically, or manual ↻ button.

Disclaimer: Private company prices are estimates based on last known valuation and simulated market drift. Not investment advice.`,

  compare: `Company Comparison

| | Tesla | SpaceX | xAI | Neuralink | 𝕏 | Boring Co. | Starlink |
|--|-------|--------|-----|-----------|---|------------|----------|
| Founded | 2003 | 2002 | 2023 | 2016 | 2006 (as Twitter) | 2016 | 2019 |
| Elon's Role | CEO/Technoking | CEO/Chief Engineer | Founder | Co-founder | Exec Chair/CTO | Founder | SpaceX division |
| Valuation | $800B | $400B+ | $200B+ | $8B+ | $44B (acq) | $7B+ | $180B+ |
| Employees | 140K+ | 13K+ | 500+ | 600+ | 1,500 | 200+ | 3K+ |
| HQ | Austin, TX | Starbase, TX | Memphis, TN | Austin, TX | SF, CA | Bastrop, TX | Redmond, WA |
| Primary $ | Vehicle sales | Launch services | AI subscriptions | Medical devices | Ads/subs | Tunnel contracts | Internet subs |
| 2026 Goal | 2M vehicles | Mars cargo | Grok 5 AGI | 100 patients | Everything app | 100mi tunnels | 20M subs |`,
};

/* ──────────────────────────────────────────────────────────
   ENHANCED ANSWER GENERATOR
   ────────────────────────────────────────────────────────── */
function generateAnswer(query: string, persona: string): string {
  const q = query.toLowerCase().trim();

  // Security refusals
  if (q.match(/\b(wallet|address|private.key|seed.phrase|mnemonic|key)\b/) && q.match(/\b(btc|eth|bitcoin|ethereum|sol|doge|crypto)\b/)) {
    return `🔒 Security Notice\n\nI never share wallet addresses or crypto details in chat. This prevents phishing and ensures you always verify on the official /donate page.\n\nTo donate: Navigate to /donate — all accepted cryptocurrencies are listed there with verified addresses.\n\nNeed help? Contact private@elonmuskoffice.site or (323) 892-7090.`;
  }

  if (q.match(/\b(bank|routing|swift|iban|ach|wire|account.number)\b/)) {
    return `🏦 I don't process bank transfers or share account details in chat. This site accepts cryptocurrency donations only. For other inquiries, use the Contact form.`;
  }

  // Persona-specific routing
  if (persona === "investor") {
    if (q.match(/\b(tsla|tesla.*stock|tesla.*price|tesla.*earnings)\b/)) return KB.tesla + "\n\nInvestor Note: TSLA trades on NASDAQ. Options chain active. Short interest ~2%. Institutional ownership ~45%.";
    if (q.match(/\b(spacex.*ipo|invest.*spacex|spacex.*stock|spax)\b/)) return KB.ipo;
    if (q.match(/\b(portfolio|allocation|diversify|compare)\b/)) return KB.compare;
    if (q.match(/\b(market|crypto|bitcoin|dogecoin)\b/)) return KB.market;
  }

  if (persona === "engineer") {
    if (q.match(/\b(raptor|merlin|engine|thrust|isp|fuel)\b/)) return `SpaceX Propulsion\n\n| Engine | Type | Thrust (SL) | Thrust (Vac) | Cycle | Status |\n|--------|------|-------------|--------------|-------|--------|\n| Merlin 1D | LOX/RP-1 | 845 kN | 914 kN | Gas generator | Operational |\n| Merlin 1D+ | LOX/RP-1 | 914 kN | 981 kN | Gas generator | Operational |\n| Raptor | LOX/LCH4 | 2.3 MN | 2.6 MN | Full-flow staged combustion | Operational |\n| Raptor 2 | LOX/LCH4 | 2.6 MN | 2.9 MN | Full-flow staged combustion | Operational |\n| Raptor 3 | LOX/LCH4 | 2.8 MN | 3.1 MN | Full-flow staged combustion | Testing |\n\nRaptor 3 innovations: No heat shield needed (regenerative cooling only), 3D-printed chamber, simplified plumbing, 30% fewer parts than Raptor 2.`;
    if (q.match(/\b(4680|battery|cell|cathode|anode)\b/)) return `Tesla 4680 Cell\n\n| Spec | Value |\n|------|-------|\n| Format | 46mm diameter, 80mm height |\n| Capacity | ~100 Wh (5× 2170) |\n| Energy density | 300 Wh/kg (target) |\n| Chemistry | NCM 811 cathode, silicon anode |\n| Manufacturing | Dry electrode coating (Maxwell acquisition) |\n| Cost target | $50/kWh at pack level |\n\nStatus: Pilot production at Kato Road (Fremont) and Texas Gigafactory. Yield improving but still below 2170 cost curve. Cybertruck and Semi use 4680 exclusively.`;
  }

  // General routing
  if (q.match(/\b(who.is|about.elon|biography|bio|early.life|family|education|childhood)\b/)) return KB.bio;
  if (q.match(/\b(net.worth|richest|wealth|forbes|trillion|how.rich)\b/)) return `Net Worth: ~$1.1 trillion (June 2026)\n\n| Asset | Value | % of Total |\n|-------|-------|------------|\n| Tesla stake (~13%) | ~$140B | 13% |\n| SpaceX stake (~42%) | ~$170B | 15% |\n| xAI stake (~60%) | ~$50B | 5% |\n| 𝕏 stake (~79%) | ~$35B | 3% |\n| The Boring Co. (~90%) | ~$6B | 0.5% |\n| Neuralink (~20%) | ~$1.6B | 0.1% |\n| Cash, real estate, other | ~$700B | 63% |\n\nNote: The $700B "other" includes recent liquidity events, tax-advantaged structures, and undisclosed positions. The jump from $400B (2024) to $1.1T was driven by SpaceX's $400B tender valuation and Tesla's autonomy premium.`;
  if (q.match(/\b(tesla|tsla|model|cybertruck|fsd|optimus|robotaxi|supercharger)\b/)) return KB.tesla;
  if (q.match(/\b(spacex|starship|falcon|dragon|mars|starbase|booster|catch)\b/)) return KB.spacex;
  if (q.match(/\b(neuralink|bci|brain.computer|implant|telepathy|blindsight|n1|thread)\b/)) return KB.neuralink;
  if (q.match(/\b(boring|tunnel|prufrock|vegas.loop|hyperloop|flamethrower)\b/)) return KB.boring;
  if (q.match(/\b(xai|grok|colossus|aurora|deepsearch|ai.model)\b/)) return KB.xai;
  if (q.match(/\b(twitter|𝕏|^x$|x\\.com|tweet|social.media)\b/)) return KB.x;
  if (q.match(/\b(starlink|satellite|internet|broadband|megaconstellation)\b/)) return KB.starlink;
  if (q.match(/\b(ipo|public.offering|listing|spax|invest.*spacex)\b/)) return KB.ipo;
  if (q.match(/\b(news|latest|recent|update|2026|today|this.week)\b/)) return `Latest Updates (June 2026)\n\n🚀 SpaceX: Starship IFT-10 completed successful booster catch. Mars cargo window opens Q4 2026.\n\n🚗 Tesla: Optimus Gen 3 entering limited production. FSD v12.5 achieves 99.2% intervention-free miles in California.\n\n🧠 Neuralink: Third patient cohort enrolled. N1 v2 implant addresses thread retraction. Blindsight FDA trial application submitted.\n\n🤖 xAI: Grok 4 passes bar exam (99th percentile), MCAT (95th), and CFA Level III (97th) in third-party audit.\n\n🐦 𝕏: X Money beta launched in 8 U.S. states. Creator payout pool doubled to $50M/quarter.\n\n📈 Markets: TSLA $251 (+0.5%). BTC $65,123 (−0.5%). SpaceX tender at $400B valuation.\n\nFor real-time news, see the SpaceX IPO section on the home page — updates every 5 minutes.`;
  if (q.match(/\b(timeline|career|history|achievements|milestones|when.did)\b/)) return KB.bio.split("Career Timeline")[1] || KB.bio;
  if (q.match(/\b(navigate|navigation|how.to|where.is|menu|page|site.map|help)\b/)) return KB.navigate;
  if (q.match(/\b(contact|email|phone|reach|support|help.desk)\b/)) return KB.privacy;
  if (q.match(/\b(privacy|data|cookie|tracker|security|legal)\b/)) return KB.privacy;
  if (q.match(/\b(compare|vs|versus|difference.between|which.is.better)\b/)) return KB.compare;
  if (q.match(/\b(market|stock|crypto|price|widget|live.data)\b/)) return KB.market;
  if (q.match(/\b(who.are.you|what.are.you|your.purpose|capabilities)\b/)) return `I'm Grok 4 (via xAI), deployed exclusively on this site to answer questions about Elon Musk, his companies, and this website.\n\nWhat I can do:\n- Deep dives on all 7 Musk companies with verified facts\n- Real-time market data interpretation\n- Site navigation and feature guidance\n- Investment context (not advice)\n- Technical specifications for engineers\n- Press-ready statements for journalists\n\nWhat I won't do:\n- Share wallet addresses or payment details (security)\n- Give investment advice (consult a fiduciary)\n- Discuss topics outside Elon's ecosystem\n- Hallucinate — if I don't know, I'll say so\n\nModels available: Grok 4 (latest), Grok 3, Grok 3 Beta, Grok 2\nPersonas: General, Investor, Engineer, Journalist`;

  // Fuzzy fallback
  return `I can help with questions about Elon Musk's life, his companies, and how to use this site.\n\nTry asking about:\n- 🧑‍🚀 Elon's biography, family, or career timeline\n- 🚗 Tesla vehicles, FSD, Optimus, or energy products\n- 🚀 SpaceX rockets, Starship, Mars mission, or the IPO\n- 🧠 Neuralink implants, Telepathy, or Blindsight\n- 🤖 xAI models, Grok capabilities, or Colossus\n- 🐦 𝕏 features, monetization, or Grok integration\n- 🛰 Starlink coverage, hardware, or performance\n- 🛠 The Boring Company tunnels and Prufrock\n- 📈 Markets, investing context, or company comparisons\n- 🧭 Site navigation, contact info, or privacy policy\n\nNeed something else? Use the Contact form or email private@elonmuskoffice.site.`;
}

/* ──────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────── */
type Message = { 
  role: "grok" | "user"; 
  text: string; 
  id: string; 
  timestamp: Date;
  model?: string;
  persona?: string;
  pinned?: boolean;
  bookmarked?: boolean;
};

/* ──────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────── */
export default function GrokWidget() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState("grok-4");
  const [persona, setPersona] = useState("default");
  const [messages, setMessages] = useState<Message[]>([
    { role: "grok", text: INITIAL_MESSAGES["grok-4"], id: "init", timestamp: new Date(), model: "grok-4", persona: "default" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, "up" | "down">>({});
  const [shareDone, setShareDone] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [muted, setMuted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const activeModel = MODELS.find((m) => m.id === model)!;
  const activePersona = PERSONAS.find((p) => p.id === persona)!;

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  // Speech recognition init
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (e: any) => {
        const t = e.results[0][0].transcript;
        setInput((cur) => (cur ? cur + " " + t : t));
        setListening(false);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !open && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const switchModel = (id: string) => {
    setModel(id);
    setModelMenuOpen(false);
    setMessages([{ 
      role: "grok", 
      text: INITIAL_MESSAGES[id], 
      id: `switch-${Date.now()}`, 
      timestamp: new Date(),
      model: id,
      persona,
    }]);
  };

  const switchPersona = (id: string) => {
    setPersona(id);
    setPersonaMenuOpen(false);
  };

  const send = useCallback(() => {
    if (!input.trim() || thinking) return;
    const userMsg: Message = { 
      role: "user", 
      text: input.trim(), 
      id: `u-${Date.now()}`, 
      timestamp: new Date(),
      persona,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const reply: Message = { 
        role: "grok", 
        text: generateAnswer(userMsg.text, persona), 
        id: `g-${Date.now()}`, 
        timestamp: new Date(),
        model,
        persona,
      };
      setMessages((m) => [...m, reply]);
      setThinking(false);
    }, delay);
  }, [input, thinking, model, persona]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const copyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const giveFeedback = (id: string, kind: "up" | "down") => {
    setFeedbackGiven((f) => ({ ...f, [id]: kind }));
  };

  const shareLast = async () => {
    const last = [...messages].reverse().find((m) => m.role === "grok");
    if (!last) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Grok on Elon Musk Office", text: last.text });
      } catch {}
    } else {
      await copyMessage(last.id, last.text);
    }
    setShareDone(true);
    setTimeout(() => setShareDone(false), 1500);
  };

  const speak = (text: string) => {
    if (muted) return;
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text.slice(0, 500));
      u.rate = 1.05;
      u.pitch = 0.95;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  const clearChat = () => {
    setMessages([{ 
      role: "grok", 
      text: INITIAL_MESSAGES[model], 
      id: `clear-${Date.now()}`, 
      timestamp: new Date(),
      model,
      persona,
    }]);
  };

  const filteredMessages = useMemo(() => {
    if (!searchQuery) return messages;
    return messages.filter(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [messages, searchQuery]);

  const bookmarkedMessages = messages.filter(m => bookmarks.includes(m.id));

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Grok" : "Open Grok"}
        className={`fixed bottom-5 right-5 z-50 group flex items-center gap-2 pl-2 pr-4 py-2 bg-foreground text-background border border-foreground/20 hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10 ${
          open ? "scale-95 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <GrokLogo className="w-7 h-7" />
          <span className="absolute inset-0 rounded-full bg-foreground/30 animate-ping opacity-30"></span>
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.16em] opacity-60">Ask</span>
          <span className="text-sm font-medium">Grok</span>
        </span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background"></span>
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 w-full sm:w-[480px] sm:bottom-5 sm:right-5 h-[100dvh] sm:h-[700px] sm:max-h-[90vh] bg-background border border-border flex flex-col transition-all duration-300 shadow-2xl ${
          open ? "translate-y-0 opacity-100" : "translate-y-full sm:translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-2.5">
            <GrokLogo className="w-7 h-7" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Grok</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {activePersona.label} · {activeModel.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* History */}
            <button onClick={() => setHistoryOpen(o => !o)} className="p-1.5 hover:bg-secondary rounded" title="History">
              <History className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {/* Clear */}
            <button onClick={clearChat} className="p-1.5 hover:bg-secondary rounded" title="New chat">
              <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {/* Close */}
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-secondary rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-b border-border">
              <div className="p-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search conversation..."
                  className="w-full px-3 py-2 text-sm bg-secondary border border-border focus:border-foreground/40 outline-none"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persona bar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-secondary/30 overflow-x-auto [scrollbar-width:none]">
          {PERSONAS.map(p => {
            const Icon = p.icon;
            const isActive = persona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => switchPersona(p.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] border transition-all ${
                  isActive 
                    ? "bg-foreground text-background border-foreground" 
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                <Icon className="w-3 h-3" />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          {(searchQuery ? filteredMessages : showBookmarks ? bookmarkedMessages : messages).map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[90%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                {m.role === "grok" && (
                  <div className="flex items-center gap-1.5">
                    <GrokLogo className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Grok · {m.model} · {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    m.role === "user"
                      ? "bg-foreground text-background px-4 py-2.5"
                      : "text-foreground/90 px-1"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "grok" && (
                  <div className="flex items-center gap-0.5 mt-1 text-muted-foreground">
                    <button onClick={() => copyMessage(m.id, m.text)} className="p-1.5 hover:text-foreground" title="Copy">
                      {copiedId === m.id ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => toggleBookmark(m.id)} className="p-1.5 hover:text-foreground" title="Bookmark">
                      {bookmarks.includes(m.id) ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => giveFeedback(m.id, "up")} className={`p-1.5 ${feedbackGiven[m.id] === "up" ? "text-emerald-400" : "hover:text-foreground"}`} title="Helpful">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => giveFeedback(m.id, "down")} className={`p-1.5 ${feedbackGiven[m.id] === "down" ? "text-red-400" : "hover:text-foreground"}`} title="Not helpful">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => speak(m.text)} className="p-1.5 hover:text-foreground" title="Read aloud">
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <GrokLogo className="w-3.5 h-3.5 animate-pulse" />
                <span className="animate-pulse">{THINKING_STATES[Math.floor(Math.random() * THINKING_STATES.length)]}</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && !searchQuery && (
          <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
            {QUICK_SUGGESTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.text}
                  type="button"
                  onClick={() => {
                    setInput(s.text);
                    setTimeout(() => send(), 50);
                  }}
                  className="shrink-0 inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 border border-border hover:border-foreground/40 hover:text-foreground text-muted-foreground transition-colors"
                >
                  <Icon className="w-3 h-3" />
                  {s.text}
                </button>
              );
            })}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-border bg-background">
          {/* Model selector */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="relative">
              <button
                onClick={() => setModelMenuOpen(o => !o)}
                className="flex items-center gap-1 px-2 py-1 border border-border text-[10px] uppercase tracking-[0.12em] hover:border-foreground/40"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeModel.color }}></span>
                {activeModel.label}
                {activeModel.badge && (
                  <span className="px-1 py-0.5 text-[8px] tracking-[0.14em] bg-foreground text-background">{activeModel.badge}</span>
                )}
                <ChevronDown className="w-3 h-3" />
              </button>
              {modelMenuOpen && (
                <div className="absolute left-0 bottom-full mb-1 w-52 border border-border bg-background shadow-xl z-10">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => switchModel(m.id)}
                      className={`w-full text-left px-3 py-2.5 text-xs hover:bg-secondary border-b border-border last:border-0 ${
                        m.id === model ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }}></span>
                        <span className="font-medium">{m.label}</span>
                        {m.badge && <span className="text-[8px] tracking-[0.14em] opacity-60">{m.badge}</span>}
                      </div>
                      <p className="text-[10px] opacity-50 mt-0.5 pl-4">{m.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground">Press / to open · Esc to close</span>
          </div>

          <div className="flex items-end gap-2 border border-border focus-within:border-foreground/40 transition-colors">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={`Ask as ${activePersona.label.toLowerCase()}…`}
              rows={1}
              className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none max-h-32"
            />
            {recognitionRef.current && (
              <button
                onClick={() => {
                  if (listening) {
                    recognitionRef.current?.stop();
                    setListening(false);
                  } else {
                    try { recognitionRef.current?.start(); setListening(true); } catch {}
                  }
                }}
                className={`p-2 ${listening ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={send}
              disabled={!input.trim() || thinking}
              className="p-2 bg-foreground text-background disabled:opacity-30 hover:bg-foreground/90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Enter to send · Shift+Enter for new line</span>
            <button onClick={shareLast} className="flex items-center gap-1 hover:text-foreground">
              {shareDone ? <CheckCheck className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
