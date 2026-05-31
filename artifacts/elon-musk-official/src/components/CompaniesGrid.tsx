const companies = [
  { name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", href: "https://www.tesla.com", description: "Electric vehicles, solar & energy" },
  { name: "SpaceX", url: "https://upload.wikimedia.org/wikipedia/commons/2/22/SpaceX_logo_2010.svg", href: "https://www.spacex.com", description: "Space exploration & rockets" },
  { name: "Neuralink", url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Neuralink_Logo.svg", href: "https://neuralink.com", description: "Brain-machine interfaces" },
  { name: "xAI", url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Xai_logo.svg", href: "https://x.ai", description: "Artificial intelligence" },
  { name: "Starlink", url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Star_Link_Logo.svg", href: "https://www.starlink.com", description: "Satellite internet constellation" },
  { name: "The Boring Company", url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Boring_Company_Logo.svg", href: "https://www.boringcompany.com", description: "Tunneling & infrastructure" },
];

export default function CompaniesGrid() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">The Musk Ecosystem</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">Companies & Initiatives</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {companies.map((company) => (
            <a key={company.name} href={company.href} target="_blank" rel="noopener noreferrer" className="group bg-muted/50 border border-border p-8 md:p-10 flex flex-col items-center text-center hover:border-foreground/30 transition-colors">
              <img src={company.url} alt={company.name} className="h-12 w-auto object-contain mb-4 opacity-80 group-hover:opacity-100 transition-opacity" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <h3 className="text-sm font-medium text-foreground">{company.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{company.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}