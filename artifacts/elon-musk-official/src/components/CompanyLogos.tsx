import { motion } from "framer-motion";
import { useRef } from "react";
import teslaLogo from "@/assets/tesla-logo.svg";
import spacexLogo from "@/assets/spacex-logo.png";
import neuralinkLogo from "@/assets/neuralink-brand-logo.svg";
import boringLogo from "@/assets/boring-company-logo-new.png";
import xaiLogo from "@/assets/xai-logo-new.png";
import xLogo from "@/assets/x-logo-new.png";
import starlinkLogo from "@/assets/starlink-logo-new.png";

const companies = [
  { name: "Tesla", logo: teslaLogo, color: "#E31937" },
  { name: "SpaceX", logo: spacexLogo, color: "#000000" },
  { name: "Neuralink", logo: neuralinkLogo, color: "#00D1FF" },
  { name: "xAI", logo: xaiLogo, color: "#FFFFFF" },
  { name: "X", logo: xLogo, color: "#FFFFFF" },
  { name: "Starlink", logo: starlinkLogo, color: "#FFFFFF" },
  { name: "Boring Co.", logo: boringLogo, color: "#FFFFFF" },
];

export default function CompanyLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground text-center">
          Across All Ventures
        </p>
        <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground text-center mt-2">
          A Universe of Innovation
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-12 md:gap-16 overflow-x-auto pb-6 px-6 [scrollbar-width:thin] [scrollbar-color:hsl(var(--border))transparent]"
        style={{ scrollbarColor: "hsl(var(--border)) transparent" }}
      >
        {[...companies, ...companies].map((company, i) => (
          <motion.div
            key={`${company.name}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % companies.length) * 0.05 }}
            className="flex-shrink-0 flex flex-col items-center gap-4 group"
          >
            <div className="w-28 h-20 md:w-36 md:h-24 bg-white flex items-center justify-center p-4 border border-border group-hover:border-foreground/30 transition-colors">
              <img
                src={company.logo}
                alt={company.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: company.name === "Neuralink" ? "brightness(0) invert(1)" : "none" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{company.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}