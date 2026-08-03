type PressItem = {
  date: string;
  outlet: string;
  headline: string;
  href: string;
};

const items: PressItem[] = [
  {
    date: "Oct 2024",
    outlet: "SpaceX",
    headline: "Starship Super Heavy booster caught by launch tower on first attempt",
    href: "https://www.spacex.com/launches/",
  },
  {
    date: "Jan 2024",
    outlet: "Neuralink",
    headline: "First human receives a Neuralink brain implant",
    href: "https://neuralink.com/",
  },
  {
    date: "Nov 2023",
    outlet: "xAI",
    headline: "xAI launches Grok, an AI assistant integrated with 𝕏",
    href: "https://x.ai/",
  },
  {
    date: "Jul 2023",
    outlet: "Reuters",
    headline: "Musk founds new AI company xAI to 'understand the universe'",
    href: "https://www.reuters.com/technology/musks-new-ai-company-xai-launches-website-2023-07-12/",
  },
  {
    date: "Oct 2022",
    outlet: "The New York Times",
    headline: "Elon Musk completes $44 billion deal to own Twitter",
    href: "https://www.nytimes.com/2022/10/27/technology/elon-musk-twitter-deal-complete.html",
  },
  {
    date: "Dec 2021",
    outlet: "TIME",
    headline: "Elon Musk named Person of the Year",
    href: "https://time.com/person-of-the-year-2021-elon-musk/",
  },
  {
    date: "Forbes",
    outlet: "Forbes",
    headline: "#1 on the Real-Time Billionaires list",
    href: "https://www.forbes.com/profile/elon-musk/",
  },
  {
    date: "May 2020",
    outlet: "NASA",
    headline: "Crew Dragon Demo-2: first crewed orbital launch from U.S. soil since 2011",
    href: "https://www.nasa.gov/mission/nasas-spacex-demo-2/",
  },
];

export default function PressTicker() {
  const loop = [...items, ...items];

  return (
    <section className="relative py-16 md:py-20 bg-background border-t border-border overflow-hidden">
      <div className="px-6 mb-8 md:mb-10 flex items-end justify-between max-w-6xl mx-auto">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Press &amp; Headlines
          </p>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
            Latest from the newsroom
          </h2>
        </div>
        <span className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-foreground dark:bg-primary opacity-50 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground dark:bg-primary" />
          </span>
          Live feed
        </span>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 md:gap-6">
          {loop.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-[280px] md:w-[360px] p-5 md:p-6 border border-border bg-card hover:border-foreground dark:hover:border-primary transition-colors group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.outlet}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <p className="text-sm md:text-base font-medium tracking-tight text-foreground leading-snug">
                {item.headline}
              </p>
              <div className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground group-hover:text-foreground dark:group-hover:text-primary transition-colors">
                Read article
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
