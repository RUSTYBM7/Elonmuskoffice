export default function NeuralinkSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-foreground/[0.02] border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Brain-Computer Interface</p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-6">Neuralink</h2>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              Neuralink is developing implantable brain-machine interfaces (BMIs) that will enable 
              humans to communicate directly with computers and machines. Founded in 2016, the company 
              aims to treat neurological conditions and eventually merge human consciousness with AI.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              In January 2024, Neuralink successfully implanted its first human patient with its 
              N1 chip — marking the beginning of a new era in human-machine symbiosis. The technology 
              holds promise for treating paralysis, depression, PTSD, and eventually enabling 
              seamless brain-computer interaction.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Beyond medical applications, Neuralink represents the first step toward a future where 
              human cognition can be augmented and extended beyond its biological limits. The long-term 
              vision: achieving a "symbiosis" with artificial general intelligence.
            </p>
          </div>
          <div className="bg-muted/50 border border-border p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Applications</p>
              <ul className="space-y-3">
                {['Restoring movement to paralyzed patients', 'Treating neurological disorders', 'Enabling direct brain-computer communication', 'Advancing understanding of brain function', 'Future: cognitive augmentation'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-0.5 w-1.5 h-1.5 bg-foreground rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-border">
              <a href="https://neuralink.com" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors">Learn more at neuralink.com →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}