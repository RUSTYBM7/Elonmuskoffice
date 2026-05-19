import { Mail } from "lucide-react";

export default function DirectorSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-foreground/[0.02] border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Leadership</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">Office Leadership</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-background border border-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden bg-muted rounded-full">
              <img src="/attached_assets/jared-birchall.jpg" alt="Jared Birchall" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">Jared Birchall</h3>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">Director of Information Technology</p>
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
                Jared Birchall serves as the Director of Information Technology for the Office of Elon Musk, 
                where he oversees technology strategy, infrastructure, and digital operations across all 
                Musk ventures and initiatives. With a background in systems engineering and enterprise 
                architecture, Birchall brings a unique blend of technical expertise and operational leadership 
                to one of the world's most complex technology portfolios.
              </p>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                In his role, Birchall coordinates technology initiatives spanning SpaceX's mission-critical 
                launch systems, Tesla's global manufacturing infrastructure, Neuralink's medical device 
                platforms, and xAI's research computing environment.
              </p>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                Prior to joining the Musk organization, Birchall held senior technology positions at several 
                leading technology companies, developing deep expertise in distributed systems, 
                security architecture, and large-scale infrastructure management.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <a href="mailto:jbirchall@elonmuskoffice.site" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" /> jbirchall@elonmuskoffice.site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}