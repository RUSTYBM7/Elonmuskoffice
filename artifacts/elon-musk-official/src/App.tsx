import { useState, useEffect, useRef } from "react";

const ventures = [
  {
    name: "Tesla",
    role: "Technoking & CEO",
    desc: "Accelerating the world's transition to sustainable energy with electric vehicles, solar generation and integrated energy storage.",
    img: "/assets/tesla-car-DOdNAW0n.png",
    url: "https://www.tesla.com/",
  },
  {
    name: "SpaceX",
    role: "Founder, CEO & Chief Engineer",
    desc: "Designing, manufacturing and launching advanced rockets and spacecraft. The ultimate goal: enabling humanity to live on other planets.",
    img: "/assets/spacex-rocket-D24206jW.png",
    url: "https://www.spacex.com/",
  },
  {
    name: "Neuralink",
    role: "Co-founder",
    desc: "Developing ultra-high bandwidth brain-machine interfaces to connect humans and computers.",
    img: "/assets/neuralink-DOlip05u.png",
    url: "https://neuralink.com/",
  },
  {
    name: "The Boring Company",
    role: "Founder",
    desc: "Solving traffic, transforming cities and enabling rapid point-to-point transportation through next-generation tunnels.",
    img: "/assets/boring-company-CZdQZJF9.png",
    url: "https://www.boringcompany.com/",
  },
  {
    name: "xAI",
    role: "Founder",
    desc: "Building artificial intelligence to accelerate human scientific discovery and understand the true nature of the universe.",
    img: "/assets/xai-Da3wHyBg.png",
    url: "https://x.ai/",
  },
  {
    name: "𝕏",
    role: "Executive Chairman & CTO",
    desc: "The everything app — a global digital town square for conversation, news, finance and creators.",
    img: "/assets/x-com-BOSciRp1.png",
    url: "https://x.com/",
  },
  {
    name: "Starlink",
    role: "SpaceX Constellation",
    desc: "Delivering high-speed broadband internet to locations where access has been unreliable, expensive, or completely unavailable.",
    img: "/assets/starlink-vT6iW56C.png",
    url: "https://www.starlink.com/",
  },
];

const timeline = [
  { year: "1995", label: "Founded Zip2", company: "Zip2 Corporation", detail: "Co-founded Zip2 with brother Kimbal — a web software company that provided online city guides to newspapers. Sold to Compaq in 1999 for ~$307M." },
  { year: "1999", label: "Co-founded X.com → PayPal", company: "X.com / PayPal", detail: "Founded X.com, an online payment company. After merging with Confinity, it became PayPal — later sold to eBay for $1.5B in 2002." },
  { year: "2002", label: "Founded SpaceX", company: "SpaceX", detail: "Founded Space Exploration Technologies Corp. with the goal of reducing space transportation costs and enabling the colonization of Mars." },
  { year: "2008", label: "Tesla Roadster ships", company: "Tesla", detail: "The Tesla Roadster, the first fully electric sports car capable of exceeding 200 miles per charge, began deliveries to customers." },
  { year: "2015", label: "Falcon 9 first booster landing", company: "SpaceX", detail: "SpaceX achieved the first successful vertical landing of an orbital class rocket booster, revolutionizing reusable rocketry." },
  { year: "2016", label: "Founded Neuralink & The Boring Company", company: "Neuralink / Boring", detail: "Co-founded Neuralink to develop brain-machine interface technology, and founded The Boring Company to build next-generation tunneling infrastructure." },
  { year: "2020", label: "Crew Dragon Demo-2", company: "SpaceX / NASA", detail: "SpaceX's Crew Dragon carried NASA astronauts to the ISS — the first crewed orbital launch from U.S. soil since the Space Shuttle retired in 2011." },
  { year: "2022", label: "Acquired Twitter (now 𝕏)", company: "𝕏", detail: "Completed $44 billion acquisition of Twitter Inc., rebranding the platform to 𝕏 with a vision to build the everything app." },
  { year: "2023", label: "Launched xAI", company: "xAI", detail: "Founded xAI to advance the understanding of the universe through artificial intelligence, releasing the Grok AI assistant integrated with 𝕏." },
  { year: "2023", label: "Starship integrated test flight", company: "SpaceX", detail: "Starship — the largest and most powerful rocket ever built — completed its first integrated flight test from Starbase in Texas." },
];

const pressItems = [
  { source: "SpaceX", date: "Oct 2024", title: "Starship Super Heavy booster caught by launch tower on first attempt", url: "https://www.spacex.com/launches/" },
  { source: "Neuralink", date: "Jan 2024", title: "First human receives a Neuralink brain implant", url: "https://neuralink.com/" },
  { source: "xAI", date: "Nov 2023", title: "xAI launches Grok, an AI assistant integrated with 𝕏", url: "https://x.ai/" },
  { source: "Reuters", date: "Jul 2023", title: "Musk founds new AI company xAI to 'understand the universe'", url: "https://www.reuters.com/technology/musks-new-ai-company-xai-launches-website-2023-07-12/" },
  { source: "The New York Times", date: "Oct 2022", title: "Elon Musk completes $44 billion deal to own Twitter", url: "https://www.nytimes.com/2022/10/27/technology/elon-musk-twitter-deal-complete.html" },
  { source: "TIME", date: "Dec 2021", title: "Elon Musk named Person of the Year", url: "https://time.com/person-of-the-year-2021-elon-musk/" },
  { source: "Forbes", date: "Forbes", title: "#1 on the Real-Time Billionaires list", url: "https://www.forbes.com/profile/elon-musk/" },
  { source: "NASA", date: "May 2020", title: "Crew Dragon Demo-2: first crewed orbital launch from U.S. soil since 2011", url: "https://www.nasa.gov/mission/nasas-spacex-demo-2/" },
];

const roadmap2026 = [
  { quarter: "Q1 2026", company: "Tesla", item: "Tesla Cybertruck production milestone" },
  { quarter: "Q1 2026", company: "SpaceX", item: "Starship orbital refueling demonstration" },
  { quarter: "Q2 2026", company: "Neuralink", item: "Neuralink expanded human trial cohort" },
  { quarter: "Q2 2026", company: "𝕏", item: "𝕏 Payments rollout" },
  { quarter: "Q3 2026", company: "Tesla", item: "Tesla Robotaxi network expansion" },
  { quarter: "Q3 2026", company: "xAI", item: "Grok 4 multimodal release" },
  { quarter: "Q4 2026", company: "SpaceX", item: "Mars cargo mission readiness review" },
  { quarter: "Q4 2026", company: "Tesla", item: "Optimus production scale-up" },
  { quarter: "2026", company: "Starlink", item: "Starlink direct-to-cell global coverage" },
];

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
          Elon Musk Official
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <a
            href="#contact"
            className="text-xs font-semibold tracking-widest uppercase bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
          <div className="w-full h-full" style={{
            backgroundImage: "url('/assets/IMG_9847_1777265766177-Bg6b--l0.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55) grayscale(0.2)",
          }} />
        </div>
      </div>
      <div className="relative z-20 text-center px-6">
        <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-6">Elon Musk — Official</p>
        <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
          Redefining Humanity<br />Beyond Limits<br />
          <span className="text-white/70">Through Innovations</span>
        </h1>
      </div>
      <div className="absolute bottom-10 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-white/30" />
        <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="shrink-0">
          <img
            src="/assets/IMG_9847_1777265766177-Bg6b--l0.jpeg"
            alt="Elon Reeves Musk"
            className="w-64 h-64 object-cover object-top grayscale"
          />
        </div>
        <div>
          <p className="text-muted-foreground text-xs tracking-widest uppercase mb-3">Profile</p>
          <h2 className="text-3xl font-bold mb-2">Elon Reeves Musk</h2>
          <p className="text-muted-foreground mb-6 text-sm italic">Space, Energy, and Everything In Between.</p>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Engineer, entrepreneur, and operator at the frontier — building the companies that redefine
            how humanity moves, communicates, and dreams.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

function Biography() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Biography</p>
        <h2 className="text-3xl font-bold mb-8">About Elon Musk</h2>
        <div className="space-y-5 text-foreground/80 leading-relaxed">
          <p>
            Elon Musk is the Technoking of Tesla and has served as our Chief Executive Officer since October 2008
            and as a member of the Board since April 2004.
          </p>
          <p>
            Mr. Musk also currently serves as Chief Executive Officer, Chief Technology Officer, Chief Engineer
            and Chairman of Space Exploration Technologies Corp. ("SpaceX"), a company that designs, manufactures
            and launches advanced rockets and spacecraft, since May 2002, and Chief Executive Officer of 𝕏 Corp.,
            a privately-held social media company, since October 2022.
          </p>
          <p>
            Mr. Musk also co-founded and serves as Chief Executive Officer of Neuralink Corp., a company developing
            ultra-high bandwidth brain-machine interfaces to connect humans and computers. Additionally, Mr. Musk
            is the Founder of The Boring Company, a tunnel and infrastructure company.
          </p>
          <p>
            Previously, Mr. Musk co-founded and served as Chairman of OpenAI, a non-profit company focused on
            developing artificial intelligence to benefit humanity. Prior to Tesla and SpaceX, Mr. Musk co-founded
            PayPal, the world's leading internet payment system, and was the founder of Zip2 Corporation, a provider
            of enterprise software and services to the new media industry.
          </p>
          <p>
            Mr. Musk holds a Bachelor of Arts degree in physics and a Bachelor of Science degree in economics from
            the University of Pennsylvania.
          </p>
        </div>
      </div>
    </section>
  );
}

function ForbesProfile() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Forbes Profile</p>
        <h2 className="text-3xl font-bold mb-8">The world's wealthiest entrepreneur</h2>
        <p className="text-foreground/70 mb-10 max-w-2xl">
          Per Forbes' Real-Time Billionaires list, Elon Musk holds the position of the wealthiest person in the
          world. His fortune is anchored by Tesla, where he is the largest shareholder, and by SpaceX, the most
          valuable private aerospace company on the planet.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            { label: "Forbes Real-Time Rank", value: "#1" },
            { label: "Estimated Net Worth", value: "$400B+" },
            { label: "Source of Wealth", value: "Tesla, SpaceX" },
            { label: "Residence", value: "Austin, Texas" },
          ].map(({ label, value }) => (
            <div key={label} className="border-t border-border pt-4">
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase mb-1">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          ))}
        </div>
        <a
          href="https://www.forbes.com/profile/elon-musk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          View on Forbes
        </a>
        <p className="text-muted-foreground text-xs mt-4">
          Figures are approximate and fluctuate with market conditions. Source: Forbes Real-Time Billionaires.
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Career Timeline</p>
        <h2 className="text-3xl font-bold mb-10">Three decades of building the future</h2>
        <p className="text-muted-foreground text-sm mb-8">Tap a milestone to read the story behind it.</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {timeline.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 border transition-all duration-150 ${
                active === i
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
        <div className="border-l-2 border-foreground pl-8">
          <p className="text-muted-foreground text-xs tracking-widest uppercase mb-1">{timeline[active].company}</p>
          <p className="text-foreground/50 text-4xl font-bold mb-2">{timeline[active].year}</p>
          <h3 className="text-xl font-bold mb-3">{timeline[active].label}</h3>
          <p className="text-foreground/70 leading-relaxed max-w-2xl">{timeline[active].detail}</p>
        </div>
      </div>
    </section>
  );
}

function Ventures() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Ventures</p>
        <h2 className="text-3xl font-bold mb-12">Companies Led by Elon Musk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
          {ventures.map((v) => (
            <a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-r border-b border-border p-6 flex flex-col gap-4 hover:bg-accent/50 transition-colors duration-200 group"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={v.img}
                  alt={v.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div>
                <p className="font-bold text-lg mb-0.5">{v.name}</p>
                <p className="text-muted-foreground text-xs tracking-wider uppercase mb-3">{v.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">{v.desc}</p>
              </div>
              <span className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
                Visit site →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="py-24 px-6 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-background/40 text-[80px] leading-none font-serif mb-4">"</p>
        <blockquote className="text-2xl md:text-3xl font-semibold leading-snug mb-8">
          When something is important enough, you do it even if the odds are not in your favor.
        </blockquote>
        <cite className="text-background/60 text-sm tracking-widest uppercase not-italic">Elon Musk</cite>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-3">Newsletter · 2026</p>
        <h2 className="text-3xl font-bold mb-3">Updates from Elon Musk in 2026</h2>
        <p className="text-foreground/70 mb-8 max-w-lg">
          Get briefings on Tesla, SpaceX, Neuralink, xAI, and 𝕏 — straight to your inbox throughout 2026.
        </p>
        {submitted ? (
          <div className="border border-border px-6 py-4 text-sm text-muted-foreground max-w-md">
            You're subscribed. Updates will arrive throughout 2026.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mb-14">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <button
              type="submit"
              className="bg-foreground text-background px-5 py-2.5 text-xs font-semibold tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-6">Coming in 2026</p>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {roadmap2026.map((item, i) => (
            <div
              key={i}
              className="min-w-56 border border-border p-5 snap-start shrink-0"
            >
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase mb-1">{item.quarter}</p>
              <p className="text-xs font-semibold tracking-wider uppercase mb-3 text-foreground/60">{item.company}</p>
              <p className="text-sm font-medium leading-snug">{item.item}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground/50 text-xs mt-2">Swipe →</p>
      </div>
    </section>
  );
}

function Press() {
  const doubled = [...pressItems, ...pressItems];
  return (
    <section className="py-20 overflow-hidden bg-muted/20">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Press & Headlines</p>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest from the newsroom</h2>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Live feed</span>
        </div>
      </div>
      <div className="flex animate-marquee">
        {doubled.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-72 shrink-0 border-r border-border px-6 hover:bg-accent/30 transition-colors py-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase bg-foreground text-background px-1.5 py-0.5">{item.source}</span>
              <span className="text-muted-foreground text-xs">{item.date}</span>
            </div>
            <p className="text-sm font-medium leading-snug">{item.title}</p>
            <p className="text-muted-foreground text-xs mt-2 tracking-widest uppercase">Read article →</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Contact</p>
        <h2 className="text-3xl font-bold mb-3">Get in touch</h2>
        <p className="text-foreground/70 mb-10">Send a message directly. Serious inquiries only.</p>
        {sent ? (
          <div className="border border-border px-6 py-6 text-sm text-muted-foreground">
            Your message has been received. Thank you.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-foreground text-background px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-widest uppercase">Elon Musk Official</p>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} — Informational site. Not affiliated with any official entity.
        </p>
        <div className="flex items-center gap-6">
          {["Tesla", "SpaceX", "𝕏", "xAI"].map((item) => (
            <span key={item} className="text-muted-foreground text-xs hover:text-foreground cursor-pointer transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <div>
      <Nav dark={dark} toggle={toggle} />
      <Hero />
      <Profile />
      <Biography />
      <ForbesProfile />
      <Timeline />
      <Ventures />
      <Quote />
      <Newsletter />
      <Press />
      <Contact />
      <Footer />
    </div>
  );
}
