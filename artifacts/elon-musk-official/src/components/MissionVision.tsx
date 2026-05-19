export default function MissionVision() {
  return (
    <section className="py-20 md:py-28 px-6 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Mission</p>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-6">
              Accelerating the Advent of Sustainable Energy & Interplanetary Life
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              The Office of Elon Musk exists to advance Mr. Musk's core mission: transforming humanity 
              into a multi-planetary species while accelerating the transition to sustainable energy. 
              We facilitate strategic communications, partnership development, and coordination across 
              all Musk ventures and initiatives.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Through coordinated efforts across Tesla, SpaceX, Neuralink, and xAI, we work to solve 
              the most pressing challenges facing humanity — climate change, energy scarcity, and 
              the long-term survival of human consciousness.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Vision</p>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-6">
              A Future Worth Fighting For
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              We envision a world where clean energy is abundant and affordable, where humanity has 
              established a permanent presence on Mars, and where artificial intelligence serves 
              to enhance human capability rather than replace it.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Our vision is rooted in technological optimism — the belief that the greatest challenges 
              of our time can be solved through innovation, engineering excellence, and relentless 
              pursuit of ambitious goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}