import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  RefreshCw,
  Newspaper,
  Radio,
  BookOpen,
  Search,
  X,
  Bookmark,
  BookmarkCheck,
  Clock,
  TrendingUp,
  Filter,
  ChevronDown,
  Maximize2,
  Link2,
  ThumbsUp,
  Eye,
  Share2,
  Calendar,
  Tag,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

type SourceType = "news" | "social" | "blog";
type Sentiment = "positive" | "neutral" | "negative";

interface Headline {
  id: string;
  source: string;
  sourceType: SourceType;
  title: string;
  summary: string;
  content?: string;           // full text for modal / read-more
  date: string;
  url: string;
  sentiment: Sentiment;
  image?: string;             // optional thumbnail
  tags: string[];             // topic tags
  readTime: number;           // minutes
  featured?: boolean;
  likes?: number;
  views?: number;
}

interface BookmarkStore {
  ids: string[];
}

/* ═══════════════════════════════════════════════════════════════
   DATA — 30 headlines (3× original count)
   ═══════════════════════════════════════════════════════════════ */

const STATIC_HEADLINES: Headline[] = [
  // ── Featured / Hero ──
  {
    id: "h-001",
    source: "Reuters",
    sourceType: "news",
    title: "SpaceX Starship passes critical Mars mission readiness review",
    summary: "The Federal Aviation Administration has cleared SpaceX's Starship for its first Mars cargo mission, targeting a 2026 launch window.",
    content: "The Federal Aviation Administration has cleared SpaceX's Starship for its first Mars cargo mission, targeting a 2026 launch window. This milestone represents years of engineering and regulatory work. The review covered launch safety, environmental impact, and mission architecture. Starship will carry scientific instruments and habitat modules as a precursor to crewed missions. NASA and international partners are closely monitoring the progress. The 2026 window aligns with optimal Earth-Mars orbital mechanics.",
    date: "2026-05-28",
    url: "https://www.reuters.com/technology/space",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&auto=format&fit=crop",
    tags: ["SpaceX", "Starship", "Mars", "NASA"],
    readTime: 4,
    featured: true,
    likes: 12400,
    views: 890000,
  },
  {
    id: "h-002",
    source: "Bloomberg",
    sourceType: "news",
    title: "Tesla surpasses 10 million cumulative EV deliveries worldwide",
    summary: "Tesla reached a historic milestone, becoming the first automaker to deliver 10 million electric vehicles globally since its founding.",
    content: "Tesla reached a historic milestone, becoming the first automaker to deliver 10 million electric vehicles globally since its founding. The achievement underscores Tesla's manufacturing scale and the accelerating global shift to sustainable transport. Model Y and Model 3 accounted for the majority of deliveries. Tesla's Gigafactories in Shanghai, Berlin, and Texas have been pivotal in scaling production. The company now aims for 20 million annual deliveries by 2030.",
    date: "2026-05-25",
    url: "https://www.bloomberg.com/technology",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop",
    tags: ["Tesla", "EV", "Manufacturing", "Gigafactory"],
    readTime: 3,
    likes: 8900,
    views: 650000,
  },
  {
    id: "h-003",
    source: "The Wall Street Journal",
    sourceType: "news",
    title: "Neuralink patient uses brain implant to control Tesla vehicle remotely",
    summary: "In a first, a Neuralink trial participant demonstrated controlling a Tesla Model S using only their thoughts, marking a breakthrough in human-AI integration.",
    content: "In a first, a Neuralink trial participant demonstrated controlling a Tesla Model S using only their thoughts, marking a breakthrough in human-AI integration. The patient, who has quadriplegia, was able to start the vehicle, adjust climate controls, and navigate to a preset destination. The signal latency was under 50 milliseconds. Neuralink's N1 implant uses 1,024 electrodes to read neural signals. FDA approval for broader trials is expected later this year.",
    date: "2026-05-22",
    url: "https://www.wsj.com/tech",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1555255707-c079660c74d2?w=800&auto=format&fit=crop",
    tags: ["Neuralink", "Tesla", "BCI", "Healthcare"],
    readTime: 5,
    likes: 15200,
    views: 1200000,
  },
  {
    id: "h-004",
    source: "Financial Times",
    sourceType: "news",
    title: "xAI Grok 4 becomes the fastest-growing AI platform in history",
    summary: "Grok 4 surpassed 500 million users in 60 days, outpacing every previous technology product launch in measured growth rate.",
    content: "Grok 4 surpassed 500 million users in 60 days, outpacing every previous technology product launch in measured growth rate. The model's real-time knowledge integration and humor-driven personality have driven viral adoption. Enterprise API usage has grown 400% quarter-over-quarter. xAI is reportedly raising a new funding round at a $150 billion valuation. Competitors are scrambling to match Grok's reasoning capabilities and X platform integration.",
    date: "2026-05-20",
    url: "https://www.ft.com/technology",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    tags: ["xAI", "Grok", "Artificial Intelligence", "Big Tech"],
    readTime: 4,
    likes: 6700,
    views: 430000,
  },
  {
    id: "h-005",
    source: "CNN",
    sourceType: "news",
    title: "Musk Foundation commits $5B to AI safety and alignment research",
    summary: "The Musk Foundation announced its largest single philanthropic commitment, targeting AGI safety research at universities worldwide.",
    content: "The Musk Foundation announced its largest single philanthropic commitment, targeting AGI safety research at universities worldwide. The $5 billion will be distributed over 10 years to MIT, Stanford, Oxford, and emerging research institutes. Focus areas include interpretability, robustness, and value alignment. Critics note the timing coincides with xAI's commercial expansion. Supporters argue it addresses a critical underinvestment in safety relative to capability research.",
    date: "2026-05-18",
    url: "https://www.cnn.com/technology",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    tags: ["Philanthropy", "AI Safety", "Musk Foundation", "Research"],
    readTime: 3,
    likes: 5400,
    views: 310000,
  },
  {
    id: "h-006",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Starship to Mars. This is what we trained for.'",
    summary: "Musk posted a 37-second video of the Starship Super Heavy stack being stacked at Starbase, with the caption: 'Making life multiplanetary.'",
    content: "Musk posted a 37-second video of the Starship Super Heavy stack being stacked at Starbase, with the caption: 'Making life multiplanetary.' The video garnered 45 million views in 12 hours. Follow-up posts detailed the orbital refueling schedule and crew selection criteria. Musk hinted at a personal trip 'before 2030 if physics allows.' The post reignited debate about Mars colonization timelines among space policy experts.",
    date: "2026-05-30",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["SpaceX", "Starship", "Mars", "Social"],
    readTime: 1,
    likes: 89000,
    views: 45000000,
  },
  {
    id: "h-007",
    source: "The Verge",
    sourceType: "news",
    title: "Starlink surpasses 10 million active subscribers in 120 countries",
    summary: "SpaceX's Starlink satellite internet service hit a major subscriber milestone, providing broadband to remote and underserved regions globally.",
    content: "SpaceX's Starlink satellite internet service hit a major subscriber milestone, providing broadband to remote and underserved regions globally. The constellation now exceeds 7,000 satellites. Recent additions include direct-to-cell partnerships with T-Mobile and international carriers. Starlink's mini terminal has driven adoption in RV, maritime, and emergency response markets. Revenue is projected to exceed $15 billion annually.",
    date: "2026-05-15",
    url: "https://www.theverge.com/space",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop",
    tags: ["Starlink", "SpaceX", "Internet", "Global"],
    readTime: 3,
    likes: 3200,
    views: 180000,
  },
  {
    id: "h-008",
    source: "Ars Technica",
    sourceType: "blog",
    title: "Inside SpaceX's plan to refuel Starship in orbit before Mars",
    summary: "An exclusive technical deep-dive into SpaceX's orbital propellant transfer technology, which is essential for the Mars mission architecture.",
    content: "An exclusive technical deep-dive into SpaceX's orbital propellant transfer technology, which is essential for the Mars mission architecture. The process involves launching multiple tanker Starships that dock with the main vehicle and transfer liquid methane and oxygen in microgravity. NASA has contributed $180 million toward demonstrating this capability. Engineers face challenges with cryogenic fluid management, including boil-off and slosh dynamics. Successful orbital refueling is considered the single most critical unsolved problem for Mars transit.",
    date: "2026-05-12",
    url: "https://arstechnica.com/spacex",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?w=800&auto=format&fit=crop",
    tags: ["SpaceX", "Starship", "Engineering", "Mars"],
    readTime: 8,
    likes: 2100,
    views: 95000,
  },
  {
    id: "h-009",
    source: "Wired",
    sourceType: "news",
    title: "The Boring Company's Vegas Loop hits 1 million passengers",
    summary: "The Vegas Loop tunnel system in Las Vegas reached a million passenger rides, validating Musk's vision of urban underground transportation.",
    content: "The Vegas Loop tunnel system in Las Vegas reached a million passenger rides, validating Musk's vision of urban underground transportation. The 65-mile tunnel network connects casinos, the airport, and Allegiant Stadium. Tesla Model Y and Model X vehicles operate autonomously at 35 mph within the tunnels. Expansion to 100 miles is planned by 2028. Cities including Miami, San Antonio, and Fort Lauderdale are evaluating similar systems.",
    date: "2026-05-10",
    url: "https://www.wired.com/transportation",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1494587416117-f102a2ac0f8d?w=800&auto=format&fit=crop",
    tags: ["Boring Company", "Transportation", "Vegas", "Infrastructure"],
    readTime: 3,
    likes: 1800,
    views: 76000,
  },
  {
    id: "h-010",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Grok 4 just passed the bar exam, the MCAT, and the CFA. Barely getting started.'",
    summary: "Musk shared Grok 4 benchmark results showing top-percentile performance across professional licensing exams, calling it 'a genuine reasoning machine.'",
    content: "Musk shared Grok 4 benchmark results showing top-percentile performance across professional licensing exams, calling it 'a genuine reasoning machine.' The model scored in the 99th percentile on the multistate bar examination, 98th on the MCAT, and 97th on the CFA Level III. Independent verification by the Machine Intelligence Research Institute confirmed the results. The achievement raises questions about professional licensing in an AI-augmented economy.",
    date: "2026-05-29",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["xAI", "Grok", "Education", "Social"],
    readTime: 2,
    likes: 67000,
    views: 28000000,
  },
  // ── Additional 20 headlines ──
  {
    id: "h-011",
    source: "TechCrunch",
    sourceType: "news",
    title: "Tesla Robotaxi fleet expands to 15 cities in pilot program",
    summary: "Tesla's autonomous ride-hailing service is now operational in 15 major metropolitan areas with over 5,000 vehicles.",
    content: "Tesla's autonomous ride-hailing service is now operational in 15 major metropolitan areas with over 5,000 vehicles. The pilot program launched in Austin and San Francisco has expanded to include Dallas, Miami, Atlanta, and others. Safety data shows a 40% reduction in accident rates compared to human drivers. Regulatory approval remains pending in New York and Chicago. Tesla plans to open the platform to private vehicle owners by Q4 2026.",
    date: "2026-05-27",
    url: "https://techcrunch.com/transportation",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    tags: ["Tesla", "Robotaxi", "Autonomy", "Cities"],
    readTime: 4,
    likes: 4500,
    views: 220000,
  },
  {
    id: "h-012",
    source: "The Guardian",
    sourceType: "news",
    title: "Environmental groups praise Tesla's closed-loop battery recycling",
    summary: "Tesla's Nevada facility achieved 95% material recovery from end-of-life battery packs, setting a new industry standard.",
    content: "Tesla's Nevada facility achieved 95% material recovery from end-of-life battery packs, setting a new industry standard. The closed-loop process recovers lithium, cobalt, nickel, and manganese with minimal waste. Environmental groups praised the initiative as a model for circular economy manufacturing. The recovered materials are reused in new 4680 cells. Tesla aims to eliminate battery waste to landfill entirely by 2028.",
    date: "2026-05-24",
    url: "https://www.theguardian.com/technology",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7d51?w=800&auto=format&fit=crop",
    tags: ["Tesla", "Environment", "Batteries", "Recycling"],
    readTime: 3,
    likes: 2800,
    views: 140000,
  },
  {
    id: "h-013",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Cybertruck production now at 250k/year. Demand is insane.'",
    summary: "Musk announced that Cybertruck annual production capacity has reached 250,000 units at Gigafactory Texas.",
    content: "Musk announced that Cybertruck annual production capacity has reached 250,000 units at Gigafactory Texas. The stainless-steel electric pickup has a backlog of over 2 million reservations. New variants including a tri-motor performance edition and a fleet-oriented work truck are in development. Consumer Reports rated the Cybertruck as the most innovative vehicle of 2026.",
    date: "2026-05-26",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["Tesla", "Cybertruck", "Manufacturing", "Social"],
    readTime: 1,
    likes: 78000,
    views: 32000000,
  },
  {
    id: "h-014",
    source: "SpaceNews",
    sourceType: "news",
    title: "SpaceX wins $4B NASA contract for lunar Gateway logistics",
    summary: "NASA selected SpaceX to deliver cargo and crew to the lunar Gateway station using a modified Dragon XL spacecraft.",
    content: "NASA selected SpaceX to deliver cargo and crew to the lunar Gateway station using a modified Dragon XL spacecraft. The $4 billion contract covers 12 missions through 2032. Dragon XL will launch on Falcon Heavy and remain docked for up to 12 months. The vehicle can deliver 5,000 kg of pressurized cargo and support crew rotations. This contract solidifies SpaceX's role as the primary logistics provider for Artemis program operations.",
    date: "2026-05-21",
    url: "https://spacenews.com",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1614728853913-1e22ba0e982c?w=800&auto=format&fit=crop",
    tags: ["SpaceX", "NASA", "Moon", "Artemis"],
    readTime: 4,
    likes: 5600,
    views: 310000,
  },
  {
    id: "h-015",
    source: "Business Insider",
    sourceType: "news",
    title: "Elon Musk's net worth crosses $500B for the first time",
    summary: "Musk became the first person in history to reach a half-trillion dollar net worth, driven by Tesla and xAI valuations.",
    content: "Musk became the first person in history to reach a half-trillion dollar net worth, driven by Tesla and xAI valuations. The milestone was reached after xAI's latest funding round valued the company at $150 billion. Tesla stock has risen 85% year-to-date. SpaceX's private valuation now exceeds $250 billion. Musk has pledged to dedicate 90% of his wealth to Mars colonization and AI safety.",
    date: "2026-05-19",
    url: "https://www.businessinsider.com",
    sentiment: "positive",
    tags: ["Finance", "Tesla", "xAI", "SpaceX"],
    readTime: 2,
    likes: 12000,
    views: 890000,
  },
  {
    id: "h-016",
    source: "Electrek",
    sourceType: "blog",
    title: "Tesla Semi completes first cross-country freight run on single charge",
    summary: "A Tesla Semi prototype traveled 2,500 miles from Fremont to Boston with only one 30-minute megacharging stop.",
    content: "A Tesla Semi prototype traveled 2,500 miles from Fremont to Boston with only one 30-minute megacharging stop. The journey demonstrated the truck's 1,000-mile real-world range and the viability of the Megacharger network for long-haul logistics. PepsiCo, Walmart, and DHL have placed combined orders for 15,000 units. The Semi is expected to enter volume production in early 2027 at a new Nevada facility.",
    date: "2026-05-17",
    url: "https://electrek.co",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop",
    tags: ["Tesla", "Semi", "Logistics", "EV"],
    readTime: 3,
    likes: 3400,
    views: 170000,
  },
  {
    id: "h-017",
    source: "Nature",
    sourceType: "news",
    title: "Neuralink publishes peer-reviewed study on motor cortex decoding",
    summary: "The landmark paper in Nature Medicine demonstrates sustained neural signal quality over 18 months in human patients.",
    content: "The landmark paper in Nature Medicine demonstrates sustained neural signal quality over 18 months in human patients. The study details decoding algorithms that achieve 99.2% accuracy in cursor control. Three patients with ALS and spinal cord injuries participated. The research establishes a new benchmark for brain-computer interface longevity. Independent neuroscientists called the work 'a watershed moment for clinical neuroscience.'",
    date: "2026-05-14",
    url: "https://www.nature.com",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop",
    tags: ["Neuralink", "Science", "BCI", "Healthcare"],
    readTime: 6,
    likes: 4100,
    views: 210000,
  },
  {
    id: "h-018",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Optimus Gen 2 now folds laundry. Slowly, but surely.'",
    summary: "Musk shared a video of Tesla's humanoid robot folding towels and sorting socks in a domestic setting.",
    content: "Musk shared a video of Tesla's humanoid robot folding towels and sorting socks in a domestic setting. The 2-minute clip shows Optimus Gen 2 navigating a cluttered laundry room, identifying fabric types, and folding with human-like dexterity. Tesla engineers noted the task required 47 degrees of freedom. The robot is expected to cost under $20,000 at consumer launch. Musk predicted 'most households will have one by 2035.'",
    date: "2026-05-23",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["Tesla", "Optimus", "Robotics", "Social"],
    readTime: 1,
    likes: 92000,
    views: 38000000,
  },
  {
    id: "h-019",
    source: "CNBC",
    sourceType: "news",
    title: "SpaceX valuation hits $250B after secondary share sale",
    summary: "A secondary share sale to institutional investors valued SpaceX at $250 billion, making it the world's most valuable private company.",
    content: "A secondary share sale to institutional investors valued SpaceX at $250 billion, making it the world's most valuable private company. Fidelity, T. Rowe Price, and Sequoia participated in the $1.5 billion transaction. The valuation reflects confidence in Starlink's revenue trajectory and Starship's Mars potential. An IPO for Starlink as a separate entity is rumored for 2027. SpaceX has raised over $15 billion in total funding since 2002.",
    date: "2026-05-16",
    url: "https://www.cnbc.com",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop",
    tags: ["SpaceX", "Finance", "Starlink", "Valuation"],
    readTime: 3,
    likes: 6700,
    views: 340000,
  },
  {
    id: "h-020",
    source: "Mashable",
    sourceType: "blog",
    title: "The Boring Company proposes Chicago-O'Hare tunnel at half the cost",
    summary: "A revised proposal for the Chicago high-speed tunnel comes in at $2.5 billion, 50% below original estimates.",
    content: "A revised proposal for the Chicago high-speed tunnel comes in at $2.5 billion, 50% below original estimates. The Boring Company has refined its tunneling machine design, increasing speed to 2 miles per week. The Chicago project would connect downtown to O'Hare Airport in 12 minutes. Environmental impact assessments are underway. If approved, construction could begin in Q1 2027.",
    date: "2026-05-13",
    url: "https://mashable.com",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop",
    tags: ["Boring Company", "Chicago", "Infrastructure", "Transportation"],
    readTime: 3,
    likes: 1500,
    views: 67000,
  },
  {
    id: "h-021",
    source: "Forbes",
    sourceType: "news",
    title: "Tesla Energy storage deployments exceed 100 GWh in single quarter",
    summary: "Tesla's energy division reported record quarterly deployments of Megapack and Powerwall systems globally.",
    content: "Tesla's energy division reported record quarterly deployments of Megapack and Powerwall systems globally. The 100 GWh milestone represents a 300% year-over-year increase. Major projects include a 40 GWh installation in California and a 25 GWh grid stabilization project in Australia. Tesla Energy is now profitable and growing faster than the automotive segment. The division is projected to match automotive revenue by 2029.",
    date: "2026-05-11",
    url: "https://www.forbes.com",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
    tags: ["Tesla", "Energy", "Megapack", "Grid"],
    readTime: 3,
    likes: 2900,
    views: 150000,
  },
  {
    id: "h-022",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'Hyperloop pod hit 760 mph in vacuum tube. Full-scale next.'",
    summary: "Musk announced a new Hyperloop speed record at the SpaceX test track in Hawthorne, California.",
    content: "Musk announced a new Hyperloop speed record at the SpaceX test track in Hawthorne, California. The unmanned pod achieved 760 mph in a 1.2-mile vacuum tube. Engineering teams are now designing a 10-mile full-scale test track in Texas. The concept promises Los Angeles to San Francisco in 35 minutes. Regulatory frameworks for vacuum tube transport remain undeveloped.",
    date: "2026-05-08",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["Hyperloop", "Transportation", "Engineering", "Social"],
    readTime: 1,
    likes: 54000,
    views: 21000000,
  },
  {
    id: "h-023",
    source: "Reuters",
    sourceType: "news",
    title: "EU regulators approve Tesla Full Self-Driving for highway use",
    summary: "The European Union became the first major market outside North America to approve Tesla's FSD system for highway driving.",
    content: "The European Union became the first major market outside North America to approve Tesla's FSD system for highway driving. The approval covers Navigate on Autopilot, Auto Lane Change, and Summon. Urban street driving approval is expected in 2027 after additional safety data collection. German and French automotive clubs praised the decision as a step toward harmonized autonomous vehicle standards. Tesla must maintain a driver-monitoring camera requirement.",
    date: "2026-05-07",
    url: "https://www.reuters.com/technology",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1492144534655-ae429f989b2c?w=800&auto=format&fit=crop",
    tags: ["Tesla", "FSD", "Europe", "Regulation"],
    readTime: 4,
    likes: 3800,
    views: 190000,
  },
  {
    id: "h-024",
    source: "The Atlantic",
    sourceType: "news",
    title: "The ethics of Mars colonization: Who gets to go?",
    summary: "A deep examination of the social and ethical implications of Musk's plan to establish a permanent human settlement on Mars.",
    content: "A deep examination of the social and ethical implications of Musk's plan to establish a permanent human settlement on Mars. Critics argue early colonies could replicate colonial power structures. Supporters contend Mars offers a chance to design more equitable social systems. Legal scholars debate property rights under the Outer Space Treaty. Musk has stated Mars governance should be based on direct democracy.",
    date: "2026-05-06",
    url: "https://www.theatlantic.com",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop",
    tags: ["Mars", "Ethics", "Society", "SpaceX"],
    readTime: 7,
    likes: 2200,
    views: 130000,
  },
  {
    id: "h-025",
    source: "Gizmodo",
    sourceType: "blog",
    title: "Tesla's Dojo supercomputer breaks exaflop barrier",
    summary: "Tesla's custom AI training cluster achieved 1.2 exaflops, accelerating FSD neural network training by 400%.",
    content: "Tesla's custom AI training cluster achieved 1.2 exaflops, accelerating FSD neural network training by 400%. Dojo uses Tesla-designed D1 chips rather than NVIDIA GPUs. The system trains on video data from millions of Tesla vehicles. Energy efficiency is 3× better than comparable supercomputers. Tesla may offer Dojo as a cloud service to other AI companies.",
    date: "2026-05-05",
    url: "https://gizmodo.com",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    tags: ["Tesla", "Dojo", "AI", "Supercomputer"],
    readTime: 4,
    likes: 3100,
    views: 160000,
  },
  {
    id: "h-026",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'SpaceX factory now produces one Raptor engine every 48 hours.'",
    summary: "Musk highlighted the production ramp of SpaceX's Raptor engines, critical for Starship's Mars ambitions.",
    content: "Musk highlighted the production ramp of SpaceX's Raptor engines, critical for Starship's Mars ambitions. The full-flow staged combustion engines produce 230 tons of thrust each. A single Starship stack requires 39 Raptors. The production rate supports a launch cadence of one Starship every 72 hours by 2027. SpaceX is developing a Raptor 3 variant with 20% more thrust and simplified manufacturing.",
    date: "2026-05-04",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["SpaceX", "Raptor", "Manufacturing", "Engineering"],
    readTime: 1,
    likes: 48000,
    views: 19000000,
  },
  {
    id: "h-027",
    source: "The New York Times",
    sourceType: "news",
    title: "Musk's xAI opens supercomputer facility in Memphis",
    summary: "The $6 billion facility houses 300,000 GPUs and will train next-generation Grok models.",
    content: "The $6 billion facility houses 300,000 GPUs and will train next-generation Grok models. The Memphis supercomputer is the largest AI training cluster in the world. Local officials estimate 5,000 permanent jobs and $10 billion in regional economic impact over 10 years. Environmental groups have raised concerns about water usage for cooling. xAI has committed to 100% renewable energy sourcing by 2028.",
    date: "2026-05-03",
    url: "https://www.nytimes.com",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    tags: ["xAI", "Infrastructure", "Memphis", "Data Center"],
    readTime: 4,
    likes: 3500,
    views: 200000,
  },
  {
    id: "h-028",
    source: "Engadget",
    sourceType: "blog",
    title: "Tesla phone 'Model P' rumors gain traction after FCC filing",
    summary: "An FCC filing for a device manufactured by Tesla has fueled speculation about a satellite-connected smartphone.",
    content: "An FCC filing for a device manufactured by Tesla has fueled speculation about a satellite-connected smartphone. The 'Model P' is rumored to feature direct Starlink connectivity, eliminating the need for cellular carriers. Leaked specs suggest a titanium body, solar charging, and neural interface compatibility with Neuralink. Analysts are skeptical about Tesla's ability to compete with Apple and Samsung in the mature smartphone market.",
    date: "2026-05-02",
    url: "https://www.engadget.com",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
    tags: ["Tesla", "Phone", "Starlink", "Rumors"],
    readTime: 3,
    likes: 2600,
    views: 180000,
  },
  {
    id: "h-029",
    source: "Politico",
    sourceType: "news",
    title: "Musk meets with EU commissioners to discuss AI regulation",
    summary: "The closed-door meeting focused on harmonizing AI safety standards between the US and European markets.",
    content: "The closed-door meeting focused on harmonizing AI safety standards between the US and European markets. Musk advocated for a 'light-touch' regulatory approach that prioritizes innovation while ensuring safety. EU commissioners pressed for transparency in training data and model evaluation. Both sides agreed to establish a joint AI safety working group. The meeting comes as the EU AI Act enters full enforcement.",
    date: "2026-05-01",
    url: "https://www.politico.eu",
    sentiment: "neutral",
    tags: ["Policy", "AI", "Europe", "Regulation"],
    readTime: 4,
    likes: 1900,
    views: 110000,
  },
  {
    id: "h-030",
    source: "𝕏 / Twitter",
    sourceType: "social",
    title: "@elonmusk — 'First orbital Starship flight with crew targeted for Q1 2027. Six people. One week in orbit.'",
    summary: "Musk announced the timeline for the first crewed Starship orbital mission, a precursor to lunar and Mars flights.",
    content: "Musk announced the timeline for the first crewed Starship orbital mission, a precursor to lunar and Mars flights. The six-person crew will include two SpaceX employees and four commercial astronauts. The one-week mission will test life support systems, radiation shielding, and crew comfort. If successful, a lunar flyby is planned for late 2027. NASA has reserved two seats for astronaut training purposes.",
    date: "2026-04-30",
    url: "https://x.com/elonmusk",
    sentiment: "positive",
    tags: ["SpaceX", "Starship", "Crew", "Space"],
    readTime: 1,
    likes: 72000,
    views: 29000000,
  },
];

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════ */

const SOURCE_ICONS: Record<SourceType, React.ReactNode> = {
  news: <Newspaper className="w-3.5 h-3.5" />,
  social: <Radio className="w-3.5 h-3.5" />,
  blog: <BookOpen className="w-3.5 h-3.5" />,
};

const SENTIMENT_COLORS: Record<Sentiment, string> = {
  positive: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
  neutral: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
  negative: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
};

const SENTIMENT_DOT: Record<Sentiment, string> = {
  positive: "bg-green-500",
  neutral: "bg-amber-500",
  negative: "bg-red-500",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{part}</mark>
    ) : (
      part
    )
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function PressWall() {
  /* ── State ── */
  const [activeFilter, setActiveFilter] = useState<"all" | SourceType>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [visible, setVisible] = useState<number>(6);
  const [shuffled, setShuffled] = useState<Headline[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "popular" | "readTime">("date");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Headline | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  /* ── Load bookmarks from localStorage ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("presswall-bookmarks");
      if (raw) {
        const parsed: BookmarkStore = JSON.parse(raw);
        setBookmarks(new Set(parsed.ids));
      }
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    localStorage.setItem("presswall-bookmarks", JSON.stringify({ ids: Array.from(bookmarks) }));
  }, [bookmarks]);

  /* ── Shuffle on mount ── */
  useEffect(() => {
    const s = [...STATIC_HEADLINES].sort(() => Math.random() - 0.5);
    setShuffled(s);
  }, []);

  /* ── Ticker auto-scroll ── */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (el.scrollLeft >= max - 1) {
        el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        el.scrollBy({ left: 1.5, behavior: "auto" });
      }
    }, 30);
    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Click outside sort menu ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Handlers ── */
  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const copyLink = useCallback(async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* silent */ }
  }, []);

  const shareArticle = useCallback(async (h: Headline) => {
    const text = `${h.title} — via ${h.source}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: h.title, text, url: h.url });
      } else {
        await navigator.clipboard.writeText(`${text} ${h.url}`);
      }
    } catch { /* silent */ }
  }, []);

  /* ── Derived: filtered + sorted ── */
  const allTags = useMemo(() => {
    const set = new Set<string>();
    STATIC_HEADLINES.forEach((h) => h.tags.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    let list = shuffled;

    if (activeFilter !== "all") {
      list = list.filter((h) => h.sourceType === activeFilter);
    }
    if (activeTag !== "all") {
      list = list.filter((h) => h.tags.includes(activeTag));
    }
    if (showBookmarksOnly) {
      list = list.filter((h) => bookmarks.has(h.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.summary.toLowerCase().includes(q) ||
          h.source.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "date":
        list = [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "popular":
        list = [...list].sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "readTime":
        list = [...list].sort((a, b) => a.readTime - b.readTime);
        break;
    }

    return list;
  }, [shuffled, activeFilter, activeTag, showBookmarksOnly, searchQuery, sortBy, bookmarks]);

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const featured = useMemo(() => STATIC_HEADLINES.find((h) => h.featured), []);

  const stats = useMemo(() => {
    const total = filtered.length;
    const pos = filtered.filter((h) => h.sentiment === "positive").length;
    const neu = filtered.filter((h) => h.sentiment === "neutral").length;
    const neg = filtered.filter((h) => h.sentiment === "negative").length;
    return { total, pos, neu, neg };
  }, [filtered]);

  /* ── Reset visible when filters change ── */
  useEffect(() => {
    setVisible(6);
  }, [activeFilter, activeTag, searchQuery, showBookmarksOnly, sortBy]);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <section className="relative py-20 md:py-28 px-6 bg-secondary/50 border-t border-border">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Media &amp; Press
              </p>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
                In the news
              </h2>
              <p className="mt-3 text-sm text-foreground/65 max-w-xl">
                The latest from the world of Elon Musk — verified news, official posts, and in-depth analysis. Search, filter, bookmark, and read the full story.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <RefreshCw className="w-3 h-3" />
              Updated May 2026
            </div>
          </div>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {[
            { label: "Articles", value: stats.total, icon: <Newspaper className="w-4 h-4" /> },
            { label: "Positive", value: stats.pos, icon: <ThumbsUp className="w-4 h-4" />, color: "text-green-600 dark:text-green-400" },
            { label: "Neutral", value: stats.neu, icon: <Globe className="w-4 h-4" />, color: "text-amber-600 dark:text-amber-400" },
            { label: "Bookmarked", value: bookmarks.size, icon: <BookmarkCheck className="w-4 h-4" />, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-3 border border-border bg-background">
              <div className={`text-muted-foreground ${s.color || ""}`}>{s.icon}</div>
              <div>
                <div className="text-lg font-bold text-foreground tabular-nums">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Ticker tape ── */}
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto pb-4 mb-10 cursor-grab active:cursor-grabbing [scrollbar-width:thin]"
          style={{ scrollbarColor: "hsl(var(--border)) transparent" }}
        >
          {shuffled.slice(0, 10).map((h, i) => (
            <div
              key={`ticker-${h.id}-${i}`}
              className="snap-start shrink-0 w-[280px] md:w-[340px] p-4 border border-border bg-background group hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/50 flex items-center gap-1">
                  {SOURCE_ICONS[h.sourceType]}
                  {h.source}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {formatDate(h.date)}
                </span>
              </div>
              <p className="text-sm font-medium tracking-tight text-foreground leading-snug line-clamp-2 group-hover:text-foreground/80 transition-colors">
                {h.title}
              </p>
              {h.image && (
                <div className="mt-3 h-24 overflow-hidden">
                  <img
                    src={h.image}
                    alt=""
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Controls: Search + Sort + Bookmarks ── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search headlines, sources, tags..."
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setShowSortMenu((s) => !s)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border bg-background text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              {sortBy === "date" ? "Latest" : sortBy === "popular" ? "Most Popular" : "Shortest Read"}
              <ChevronDown className={`w-3 h-3 transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-background border border-border shadow-lg z-20"
                >
                  {(["date", "popular", "readTime"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                        sortBy === opt ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {opt === "date" ? "Latest First" : opt === "popular" ? "Most Popular" : "Shortest Read"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setShowBookmarksOnly((s) => !s)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 border text-xs uppercase tracking-[0.12em] transition-colors ${
              showBookmarksOnly
                ? "bg-foreground text-background border-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {showBookmarksOnly ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            Saved
          </button>
        </div>

        {/* ── Tag cloud ── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto [scrollbar-width:none] pb-1">
          <Tag className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`shrink-0 px-3 py-1 text-[10px] uppercase tracking-[0.12em] border transition-colors ${
                activeTag === t
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {t === "all" ? "All Topics" : t}
            </button>
          ))}
        </div>

        {/* ── Source filter tabs ── */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto [scrollbar-width:none]">
          {(["all", "news", "social", "blog"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.14em] border transition-colors ${
                activeFilter === filter
                  ? "bg-foreground text-background border-foreground dark:bg-primary dark:text-background dark:border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {filter === "all" ? "All" : filter === "news" ? "News" : filter === "social" ? "Social" : "Analysis"}
            </button>
          ))}
        </div>

        {/* ── Featured hero (if no search/filter active) ── */}
        <AnimatePresence>
          {featured && !searchQuery && activeFilter === "all" && activeTag === "all" && !showBookmarksOnly && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-8 border border-border bg-background overflow-hidden group cursor-pointer"
              onClick={() => setSelectedArticle(featured)}
            >
              <div className="grid md:grid-cols-2">
                {featured.image && (
                  <div className="h-64 md:h-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/50 flex items-center gap-1">
                      {SOURCE_ICONS[featured.sourceType]}
                      {featured.source}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground leading-snug mb-3 group-hover:text-foreground/80 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3">
                    {featured.summary}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} min</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(featured.views || 0)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Headlines grid ── */}
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {displayed.map((h, i) => {
              const isExpanded = expandedId === h.id;
              const isBookmarked = bookmarks.has(h.id);
              return (
                <motion.div
                  key={h.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="group flex flex-col border border-border bg-background hover:border-foreground/30 dark:hover:border-primary/40 transition-colors"
                >
                  {/* Image */}
                  {h.image && (
                    <div className="h-40 overflow-hidden cursor-pointer" onClick={() => setSelectedArticle(h)}>
                      <img
                        src={h.image}
                        alt={h.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    {/* Meta row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/50 flex items-center gap-1">
                          {SOURCE_ICONS[h.sourceType]}
                          {h.source}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          {formatDate(h.date)}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {h.readTime}m
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleBookmark(h.id); }}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedArticle(h); }}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Read full story"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm md:text-base font-medium tracking-tight text-foreground leading-snug mb-2 group-hover:text-foreground/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedArticle(h)}
                    >
                      {searchQuery ? highlightText(h.title, searchQuery) : h.title}
                    </h3>

                    {/* Summary with Read more */}
                    <div className="flex-1">
                      <p className={`text-xs text-foreground/55 leading-relaxed transition-all ${isExpanded ? "" : "line-clamp-2"}`}>
                        {searchQuery ? highlightText(h.summary, searchQuery) : h.summary}
                      </p>
                      {h.content && (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-foreground/60 leading-relaxed mt-3 pt-3 border-t border-border/50">
                                {h.content}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>

                    {/* Read more / See more button */}
                    {h.content && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : h.id)}
                        className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {isExpanded ? (
                          <>Show less <ChevronRight className="w-3 h-3 rotate-90" /></>
                        ) : (
                          <>Read more <ChevronRight className="w-3 h-3" /></>
                        )}
                      </button>
                    )}

                    {/* Bottom row: tags + sentiment + actions */}
                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 border ${SENTIMENT_COLORS[h.sentiment]}`}>
                          <span className={`inline-block w-1 h-1 rounded-full mr-1 ${SENTIMENT_DOT[h.sentiment]}`} />
                          {h.sentiment}
                        </span>
                        {h.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground bg-muted/50 px-1.5 py-0.5 border border-border/50">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => copyLink(h.url, h.id)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Copy link"
                        >
                          {copiedId === h.id ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Link2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => shareArticle(h)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Share"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Open external link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 border border-border bg-background"
          >
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No articles match your filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveFilter("all"); setActiveTag("all"); setShowBookmarksOnly(false); }}
              className="mt-3 text-xs uppercase tracking-[0.14em] text-foreground underline underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 4)}
              className="text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
         ARTICLE MODAL
         ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background border border-border shadow-2xl"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/90 border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              {selectedArticle.image && (
                <div className="h-56 md:h-72 overflow-hidden">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/50 flex items-center gap-1">
                    {SOURCE_ICONS[selectedArticle.sourceType]}
                    {selectedArticle.source}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {formatDate(selectedArticle.date)}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {selectedArticle.readTime} min read
                  </span>
                  <span className={`text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 border ${SENTIMENT_COLORS[selectedArticle.sentiment]}`}>
                    {selectedArticle.sentiment}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug mb-4">
                  {selectedArticle.title}
                </h2>

                {/* Summary */}
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  {selectedArticle.summary}
                </p>

                {/* Full content */}
                {selectedArticle.content && (
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                    {selectedArticle.content}
                  </p>
                )}

                {/* Tags */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  {selectedArticle.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground bg-muted/50 px-2 py-1 border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-[10px] uppercase tracking-wider text-muted-foreground border-y border-border/50 py-3">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatNumber(selectedArticle.views || 0)} views</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{formatNumber(selectedArticle.likes || 0)} likes</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
                  >
                    Read full article
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => toggleBookmark(selectedArticle.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 border text-xs uppercase tracking-[0.14em] transition-colors ${
                      bookmarks.has(selectedArticle.id)
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {bookmarks.has(selectedArticle.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    {bookmarks.has(selectedArticle.id) ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={() => copyLink(selectedArticle.url, selectedArticle.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-muted-foreground text-xs uppercase tracking-[0.14em] hover:text-foreground transition-colors"
                  >
                    {copiedId === selectedArticle.id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
                    {copiedId === selectedArticle.id ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
