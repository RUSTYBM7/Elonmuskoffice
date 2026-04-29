const quotes = [
  "When something is important enough, you do it even if the odds are not in your favor.",
  "I think it is possible for ordinary people to choose to be extraordinary.",
  "The first step is to establish that something is possible; then probability will occur.",
  "Failure is an option here. If things are not failing, you are not innovating enough.",
  "Persistence is very important. You should not give up unless you are forced to give up.",
  "If you get up in the morning and think the future is going to be better, it is a bright day.",
  "Some people don't like change, but you need to embrace change if the alternative is disaster.",
  "I would like to die on Mars. Just not on impact.",
  "Great companies are built on great products.",
  "If you're trying to create a company, it's like baking a cake. You have to have all the ingredients in the right proportion.",
];

export default function QuotesMarquee() {
  // Duplicate the list to create a seamless infinite loop
  const loop = [...quotes, ...quotes];

  return (
    <section className="relative py-20 md:py-28 bg-background border-t border-border overflow-hidden">
      <div className="text-center mb-10 md:mb-14 px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          In His Words
        </p>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {loop.map((quote, i) => (
            <div
              key={i}
              className="shrink-0 px-8 md:px-14 flex items-center"
            >
              <p className="text-lg md:text-2xl font-medium tracking-tight text-foreground whitespace-nowrap">
                &ldquo;{quote}&rdquo;
                <span className="ml-4 text-xs uppercase tracking-[0.18em] text-muted-foreground align-middle">
                  &mdash; Elon Musk
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
