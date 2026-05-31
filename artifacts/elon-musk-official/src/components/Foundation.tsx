import { Globe, Bot, Pill } from "lucide-react";

export default function Foundation() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Philanthropy</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">The Musk Foundation</h2>
          <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
            Dedicated to advancing renewable energy, safe AI development, pediatric health,
            and educational opportunity for all.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="bg-muted/50 border border-border p-8">
            <div className="w-12 h-12 bg-foreground/10 rounded-sm flex items-center justify-center mb-5"><Globe className="w-6 h-6 text-foreground" /></div>
            <h3 className="text-lg font-medium text-foreground mb-3">Renewable Energy</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">Funding breakthrough research and deployment of solar, wind, and battery storage technologies to accelerate the global transition from fossil fuels.</p>
          </div>
          <div className="bg-muted/50 border border-border p-8">
            <div className="w-12 h-12 bg-foreground/10 rounded-sm flex items-center justify-center mb-5"><Bot className="w-6 h-6 text-foreground" /></div>
            <h3 className="text-lg font-medium text-foreground mb-3">Safe AI</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">Supporting research and governance frameworks that ensure artificial intelligence develops in ways that benefit humanity and minimize existential risk.</p>
          </div>
          <div className="bg-muted/50 border border-border p-8">
            <div className="w-12 h-12 bg-foreground/10 rounded-sm flex items-center justify-center mb-5"><Pill className="w-6 h-6 text-foreground" /></div>
            <h3 className="text-lg font-medium text-foreground mb-3">Pediatric Health</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">Supporting children's hospitals, medical research, and healthcare access programs serving vulnerable pediatric populations worldwide.</p>
          </div>
        </div>
        <div className="mt-12 bg-muted/50 border border-border p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">STEM Empowerment</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                The Musk Foundation invests heavily in science, technology, engineering, and mathematics
                education — particularly in underserved communities. From scholarships to school
                building programs to FIRST Robotics competitions, we believe the next generation
                of engineers and scientists will solve the problems we cannot.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center"><p className="text-2xl md:text-3xl font-medium text-foreground">$2B+</p><p className="text-xs text-muted-foreground mt-1">Total Donated</p></div>
              <div className="text-center"><p className="text-2xl md:text-3xl font-medium text-foreground">50+</p><p className="text-xs text-muted-foreground mt-1">Countries Served</p></div>
              <div className="text-center"><p className="text-2xl md:text-3xl font-medium text-foreground">1M+</p><p className="text-xs text-muted-foreground mt-1">Lives Impacted</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}