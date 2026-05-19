import { motion } from "framer-motion";

const photos = [
  // EARLY LIFE (1971-1995)
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Elon Musk — Royal Society 2021", category: "early" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "Tesla Motor Fair — 2014", category: "early" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Elon Musk — 2017", category: "early" },
  // INTERNET ERA (1995-2002)
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "Starship Update — 2019", category: "internet" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Elon Musk — 2015", category: "internet" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/SpaceX_Crew-1_Launch_%28 cropped %29.jpg", caption: "SpaceX Crew-1 Launch — 2020", category: "internet" },
  // SPACEX (2002-Present)
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/SpaceX_Crew-1_Launch_%28 cropped %29.jpg", caption: "SpaceX Crew Dragon — ISS Mission", category: "spacex" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/2/27/CRS-20_Crew_Dragon_%28 cropped %29.jpg", caption: "CRS-20 Crew Dragon — 2020", category: "spacex" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "Starship Prototype — Boca Chica", category: "spacex" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/SpaceX_Crew-1_Launch_%28 cropped %29.jpg", caption: "Falcon 9 Launch — Cape Canaveral", category: "spacex" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "Starship Flight Test — 2023", category: "spacex" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Mars Colony Vision — Interplanetary Future", category: "spacex" },
  // TESLA (2004-Present)
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "Tesla Roadster — First Production EV", category: "tesla" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Tesla_Motors_logo_badge.svg", caption: "Tesla Motors Logo", category: "tesla" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Tesla Gigafactory Nevada — Battery Production", category: "tesla" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "Tesla Model S — Luxury Electric Sedan", category: "tesla" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Tesla_Motors_logo_badge.svg", caption: "Tesla Supercharger Network", category: "tesla" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Tesla Cybertruck — Revolutionary Design", category: "tesla" },
  // SOLAR & ENERGY
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "SolarCity — Solar Panel Installation", category: "solar" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Sustainable Energy Future", category: "solar" },
  // NEURALINK
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Neuralink — Brain-Computer Interface", category: "neuralink" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Neuralink N1 Chip — Human Trial 2024", category: "neuralink" },
  // xAI & AI
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "xAI — Grok AI Assistant", category: "ai" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "AI Research — xAI Supercomputing", category: "ai" },
  // LIFESTYLE & FAMILY
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "X Æ A-12 Musk — With Mother Maye", category: "family" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Family Time — Private Moments", category: "family" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Exa Musk — Growing Up", category: "family" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Musk Family — Austin TX", category: "family" },
  // SOCIAL MEDIA & 𝕏
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023.svg", caption: "𝕏 Headquarters — San Francisco", category: "social" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "X Live — Social Media", category: "social" },
  // PUBLIC APPEARANCES
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "World Government Summit — Dubai", category: "public" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "TED Conference — Vancouver 2017", category: "public" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Saturday Night Live — 2021", category: "public" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Congressional Testimony — Washington D.C.", category: "public" },
  // BUSINESS DEALS
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Twitter Acquisition — $44B Deal", category: "deals" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Boring Company — Las Vegas Tunnel", category: "deals" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/SpaceX_Crew-1_Launch_%28 cropped %29.jpg", caption: "Starlink Satellites — LEO Constellation", category: "deals" },
  // INNOVATION
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "Engineering Excellence — Innovation Lab", category: "innovation" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "Full Self-Driving — Autonomous Tech", category: "innovation" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Optimus Robot — Tesla AI Day", category: "innovation" },
  // WEALTH & RECOGNITION
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Bloomberg Billionaires Index", category: "wealth" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Forbes Cover — Multiple Appearances", category: "wealth" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Time Person of the Year — 2022", category: "wealth" },
];

export default function LifeGallery() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Photo Archive</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            The Life of Elon Musk
          </h2>
          <p className="mt-4 text-sm text-foreground/70 max-w-xl mx-auto">
            From Pretoria to Mars — a visual journey through the ventures, milestones, and moments of the world&apos;s most ambitious entrepreneur.
          </p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              className="break-inside-avoid group"
            >
              <div className="relative overflow-hidden bg-muted">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.style.background = `hsl(${(i * 37) % 360}, 30%, 20%)`;
                    target.parentElement!.style.minHeight = "200px";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                  <p className="text-xs text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}