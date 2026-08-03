import { motion } from "framer-motion";
import { logoFor } from "@/lib/companyLogos";
import CompanyLogo from "./CompanyLogo";

const companies = [
  { name: "Tesla", href: "https://www.tesla.com", description: "Electric vehicles, solar & energy" },
  { name: "SpaceX", href: "https://www.spacex.com", description: "Space exploration & rockets" },
  { name: "Neuralink", href: "https://neuralink.com", description: "Brain-machine interfaces" },
  { name: "xAI", href: "https://x.ai", description: "Artificial intelligence" },
  { name: "X", href: "https://x.com", description: "The everything app" },
  { name: "Starlink", href: "https://www.starlink.com", description: "Satellite internet constellation" },
  { name: "The Boring Company", href: "https://www.boringcompany.com", description: "Tunneling & infrastructure" },
];

export default function CompaniesGrid() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">The Musk Ecosystem</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">Companies & Initiatives</h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-foreground/65">Seven companies tackling the world's hardest problems — from sustainable energy to multiplanetary life.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {companies.map((company, i) => {
            const logo = logoFor(company.name);
            return (
              <motion.a
                key={company.name}
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-background border border-border p-8 md:p-10 flex flex-col items-center text-center hover:border-foreground/30 transition-colors"
              >
                <img
                  src={logo}
                  alt={company.name}
                  className="max-h-14 w-auto object-contain mb-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <h3 className="text-sm font-medium text-white">{company.name}</h3>
                <p className="text-xs text-white/70 mt-1">{company.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
