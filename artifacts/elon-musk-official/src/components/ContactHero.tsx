export default function ContactHero() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Elon Musk Office</p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
          Contact the Office of<br />Elon Musk
        </h1>
        <p className="mt-6 text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          The Office of Elon Musk serves as the official communication channel for Musk Ventures, 
          the Musk Foundation, and associated initiatives including SpaceX, Tesla, Neuralink, 
          xAI, and X. We facilitate connections with Mr. Musk's executive team and philanthropic partners.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/+18032587511" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">WhatsApp</a>
          <a href="mailto:Muskfoundation@currently.com" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Email</a>
          <a href="https://t.me/Elonmuskx00x1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Telegram</a>
        </div>
      </div>
    </section>
  );
}