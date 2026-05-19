import { motion } from "framer-motion";

const photos = [
  // EARLY LIFE (1971-1995) — Pretoria, South Africa
  { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", caption: "Pretoria, South Africa — Birthplace (1971)", category: "early" },
  { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", caption: "Waterkloof House Preparatory School", category: "early" },
  { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", caption: "Bulawayo, Zimbabwe — Family Relocation (1980s)", category: "early" },
  // INTERNET ERA (1995-2002)
  { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", caption: "Zip2 Corporation — First Startup (1995)", category: "internet" },
  { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80", caption: "Web Development Era — University of Pennsylvania", category: "internet" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", caption: "Silicon Valley — PayPal Pioneers (1999)", category: "internet" },
  // SPACEX (2002-Present)
  { url: "https://images.unsplash.com/photo-1516849841032-87cbac52d7b6?w=600&q=80", caption: "SpaceX Hawthorne HQ — Founded 2002", category: "spacex" },
  { url: "https://images.unsplash.com/photo-1457364559-f6f3ce7b9d1e?w=600&q=80", caption: "Falcon 1 — First Private Liquid-Fuel Rocket (2008)", category: "spacex" },
  { url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&q=80", caption: "Falcon 9 First Stage Landing — Cape Canaveral", category: "spacex" },
  { url: "https://images.unsplash.com/photo-1541873676-a18131494184?w=600&q=80", caption: "Dragon Spacecraft — ISS Resupply Mission", category: "spacex" },
  { url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&q=80", caption: "Starship — Next Generation Launch", category: "spacex" },
  { url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c3?w=600&q=80", caption: "Mars Colony Vision — Interplanetary Future", category: "spacex" },
  // TESLA (2004-Present)
  { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", caption: "Tesla Roadster — First Production EV", category: "tesla" },
  { url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80", caption: "Tesla Model S — Luxury Electric Sedan", category: "tesla" },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", caption: "Tesla Model 3 — Mass Market Electric Vehicle", category: "tesla" },
  { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", caption: "Tesla Gigafactory Nevada — Battery Production", category: "tesla" },
  { url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80", caption: "Tesla Model X — Falcon Wing Doors", category: "tesla" },
  { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", caption: "Tesla Cybertruck — Revolutionary Design", category: "tesla" },
  // SOLAR & ENERGY
  { url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80", caption: "SolarCity — Solar Panel Installation", category: "solar" },
  { url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", caption: "Solar Power — Sustainable Energy Future", category: "solar" },
  // NEURALINK
  { url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80", caption: "Neuralink — Brain-Computer Interface Technology", category: "neuralink" },
  { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", caption: "Neuralink N1 Chip — Human Trial 2024", category: "neuralink" },
  // xAI & AI
  { url: "https://images.unsplash.com/photo-1677442136019-21780ecad979?w=600&q=80", caption: "xAI — Grok AI Assistant Launch 2023", category: "ai" },
  { url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80", caption: "AI Research — xAI Supercomputing Cluster", category: "ai" },
  // LIFESTYLE & FAMILY
  { url: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd0b9?w=600&q=80", caption: "Zoe Town — Musk Family Compound, Austin TX", category: "family" },
  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80", caption: "X Æ A-12 Musk — With Mother Maye", category: "family" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", caption: "Exa Musk (littleX) — Growing Up in the Public Eye", category: "family" },
  { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80", caption: "Family Time — Private Moments", category: "family" },
  // SOCIAL MEDIA & 𝕏
  { url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80", caption: "𝕏 Headquarters — San Francisco Acquisition 2022", category: "social" },
  { url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80", caption: "X Live — Social Media & Global Communication", category: "social" },
  // PUBLIC APPEARANCES
  { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80", caption: "World Government Summit — Dubai Keynote", category: "public" },
  { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", caption: "TED Conference — Vancouver 2017", category: "public" },
  { url: "https://images.unsplash.com/photo-1556761175-5973dc0f7247?w=600&q=80", caption: "Saturday Night Live — First Guest Host 2021", category: "public" },
  { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80", caption: "Congressional Testimony — Washington D.C.", category: "public" },
  // BUSINESS DEALS
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", caption: "Twitter Acquisition — $44B Deal Announcement", category: "deals" },
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", caption: "Boring Company — Las Vegas Tunnel Loop", category: "deals" },
  { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", caption: "Starlink Satellites — LEO Constellation", category: "deals" },
  // INNOVATION
  { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", caption: "Engineering Excellence — Innovation Lab", category: "innovation" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", caption: "Full Self-Driving — Autonomous Technology", category: "innovation" },
  { url: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80", caption: "Optimus Robot — Tesla AI Day 2022", category: "innovation" },
  // WEALTH & RECOGNITION
  { url: "https://images.unsplash.com/photo-1556761175-5973dc0f7247?w=600&q=80", caption: "Bloomberg Billionaires Index — World Richest Man", category: "wealth" },
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", caption: "Forbes Cover — Multiple Appearances", category: "wealth" },
  { url: "https://images.unsplash.com/photo-1454165804605-c3d57bc86b40?w=600&q=80", caption: "Time Person of the Year — 2022", category: "wealth" },
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