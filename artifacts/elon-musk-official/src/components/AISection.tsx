export default function AISection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Artificial Intelligence</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">xAI — Understanding the Universe</h2>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            xAI was founded in July 2023 to build artificial intelligence that accelerates 
            human scientific discovery. Grok, xAI's flagship AI assistant, is designed 
            to assist humanity in its quest for knowledge and understanding.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted/50 border border-border p-8">
            <h3 className="text-lg font-medium text-foreground mb-4">Grok AI</h3>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              Grok is xAI's conversational AI trained on real-world data, designed to answer 
              questions with wit and a rebellious streak — unlike typical AI assistants that are 
              overly cautious or politically correct.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Grok has access to real-time information via the X platform and is designed to 
              answer questions that most other AI systems would refuse. It aims to be a genuine 
              assistant while maintaining scientific accuracy.
            </p>
          </div>
          <div className="bg-muted/50 border border-border p-8">
            <h3 className="text-lg font-medium text-foreground mb-4">xAI Research</h3>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              xAI's research focuses on developing reliable and interpretable AI systems. 
              Unlike many AI labs, xAI prioritizes understanding how AI systems make decisions — 
              essential for building AI that can be trusted with critical decisions.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              The xAI team brings together researchers from DeepMind, Google, Microsoft, and 
              Tesla — all working toward the goal of creating AI that genuinely understands and 
              benefits humanity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}