import { motion } from "framer-motion";
import { useRef } from "react";
import { logoFor } from "@/lib/companyLogos";
import CompanyLogo from "./CompanyLogo";

const companies = [
  { name: "Tesla" },
  { name: "SpaceX" },
  { name: "Neuralink" },
  { name: "xAI" },
  { name: "X" },
  { name: "Starlink" },
  { name: "Boring Co." },
];

export default function CompanyLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Across All Ventures
        </p>
        <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
          A universe of innovation
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-foreground/65">
          Seven companies. One mission: advance humanity through sustainable energy, multiplanetary life, brain-computer interfaces, and beneficial AI.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-auto pb-6 px-6 [scrollbar-width:thin]"
      >
        {[...companies, ...companies].map((company, i) => {
          const logo = logoFor(company.name);
          return (
            <motion.div
              key={`${company.name}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % companies.length) * 0.05 }}
              className="flex-shrink-0 flex flex-col items-center gap-3"
            >
              <CompanyLogo src={logo} alt={company.name} height={56} className="border border-border" />
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{company.name}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
