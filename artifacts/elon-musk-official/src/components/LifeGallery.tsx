import { motion } from "framer-motion";

const userPhotos = [
  { filename: "IMG_0566.JPG", caption: "Elon Musk — Public Appearance", category: "public" },
  { filename: "IMG_0569.JPG", caption: "Elon Musk — Speaking Engagement", category: "public" },
  { filename: "IMG_0606.JPG", caption: "Elon Musk — Tech Event", category: "public" },
  { filename: "IMG_0610.JPG", caption: "Elon Musk — Interview Session", category: "public" },
  { filename: "IMG_0621.JPG", caption: "Elon Musk — TED Talk", category: "public" },
  { filename: "IMG_0707.JPG", caption: "Elon Musk — SpaceX Visit", category: "spacex" },
  { filename: "IMG_0710.JPG", caption: "Elon Musk — Tesla Gigafactory", category: "tesla" },
  { filename: "IMG_0714.JPG", caption: "Elon Musk — Neuralink Demo", category: "neuralink" },
  { filename: "IMG_0843.JPG", caption: "Elon Musk — X Headquarters", category: "social" },
  { filename: "IMG_0964.JPG", caption: "Elon Musk — Kids & Family", category: "family" },
  { filename: "IMG_0965.JPG", caption: "Elon Musk — littleX", category: "family" },
  { filename: "IMG_0966.JPG", caption: "Elon Musk — Father & Son", category: "family" },
  { filename: "IMG_0967.JPG", caption: "Elon Musk — Private Moment", category: "family" },
  { filename: "IMG_0968.JPG", caption: "Elon Musk — Public Address", category: "public" },
  { filename: "IMG_0969.JPG", caption: "Elon Musk — Media Session", category: "public" },
  { filename: "IMG_0970.JPG", caption: "Elon Musk — Business Meeting", category: "public" },
  { filename: "IMG_0971.JPG", caption: "Elon Musk — Innovation Lab", category: "innovation" },
  { filename: "IMG_0972.JPG", caption: "Elon Musk — Engineering Review", category: "innovation" },
  { filename: "IMG_0973.JPG", caption: "Elon Musk — xAI Launch", category: "ai" },
  { filename: "IMG_0974.JPG", caption: "Elon Musk — Boring Company Site", category: "deals" },
  { filename: "IMG_0975.JPG", caption: "Elon Musk — Starlink Demo", category: "deals" },
  { filename: "IMG_0976.JPG", caption: "Elon Musk — Annual Meeting", category: "public" },
  { filename: "2025-03-16 23.14.25-1.JPG", caption: "Elon Musk — March 2025 Event", category: "public" },
  { filename: "IMG_0606 2.JPG", caption: "Elon Musk — Conference Stage", category: "public" },
  { filename: "IMG_1425.JPG", caption: "Elon Musk — Official Portrait", category: "portrait" },
  { filename: "IMG_1426.JPG", caption: "Elon Musk — Press Photo", category: "public" },
];

const wikimediaPhotos = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Elon Musk — Royal Society 2021", category: "public" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "Tesla Motor Fair — 2014", category: "tesla" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Elon Musk — 2017 Portrait", category: "portrait" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "Starship Update — 2019", category: "spacex" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Elon Musk — 2015", category: "portrait" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/SpaceX_Crew-1_Launch_%28 cropped %29.jpg", caption: "SpaceX Crew-1 Launch — 2020", category: "spacex" },
];

export default function LifeGallery() {
  const allPhotos = [
    ...userPhotos.map((p) => ({ url: `/attached_assets/${p.filename}`, caption: p.caption, category: p.category })),
    ...wikimediaPhotos,
  ];

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
          {allPhotos.map((photo, i) => (
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
                    target.parentElement!.style.background = `hsl(${(i * 37) % 360}, 20%, 15%)`;
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