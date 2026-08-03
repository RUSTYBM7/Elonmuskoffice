import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const userPhotos = [
  { filename: "IMG_0566.JPG", caption: "Elon Musk — Public Appearance" },
  { filename: "IMG_0569.JPG", caption: "Elon Musk — Speaking Engagement" },
  { filename: "IMG_0606.JPG", caption: "Elon Musk — Tech Event" },
  { filename: "IMG_0610.JPG", caption: "Elon Musk — Interview Session" },
  { filename: "IMG_0621.JPG", caption: "Elon Musk — TED Talk" },
  { filename: "IMG_0707.JPG", caption: "Elon Musk — SpaceX Visit" },
  { filename: "IMG_0710.JPG", caption: "Elon Musk — Tesla Gigafactory" },
  { filename: "IMG_0714.JPG", caption: "Elon Musk — Neuralink Demo" },
  { filename: "IMG_0843.JPG", caption: "Elon Musk — X Headquarters" },
  { filename: "IMG_0964.JPG", caption: "Elon Musk — Kids & Family" },
  { filename: "IMG_0965.JPG", caption: "Elon Musk — littleX" },
  { filename: "IMG_0966.JPG", caption: "Elon Musk — Father & Son" },
  { filename: "IMG_0967.JPG", caption: "Elon Musk — Private Moment" },
  { filename: "IMG_0968.JPG", caption: "Elon Musk — Public Address" },
  { filename: "IMG_0969.JPG", caption: "Elon Musk — Media Session" },
  { filename: "IMG_0970.JPG", caption: "Elon Musk — Business Meeting" },
  { filename: "IMG_0971.JPG", caption: "Elon Musk — Innovation Lab" },
  { filename: "IMG_0972.JPG", caption: "Elon Musk — Engineering Review" },
  { filename: "IMG_0973.JPG", caption: "Elon Musk — xAI Launch" },
  { filename: "IMG_0974.JPG", caption: "Elon Musk — Boring Company" },
  { filename: "IMG_0975.JPG", caption: "Elon Musk — Starlink Demo" },
  { filename: "IMG_0976.JPG", caption: "Elon Musk — Annual Meeting" },
  { filename: "IMG_0606 2.JPG", caption: "Elon Musk — Conference Stage" },
  { filename: "IMG_1425.JPG", caption: "Elon Musk — Official Portrait" },
  { filename: "IMG_1426.JPG", caption: "Elon Musk — Press Photo" },
  { filename: "IMG_9845.JPG", caption: "Elon Musk — High Resolution" },
  { filename: "IMG_9848.JPG", caption: "Elon Musk — Official Portrait" },
];

const wikimediaPhotos = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society.jpg", caption: "Royal Society 2021" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Musk_at_Tesla_Motor_Fair_327 cropped.jpg", caption: "Tesla Motor Fair 2014" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elon_Musk_25_2017.jpg", caption: "Elon Musk 2017 Portrait" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Elon_Musk_starship.jpg", caption: "Starship Update 2019" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Elon_Musk_2015.jpg", caption: "Elon Musk 2015" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/SpaceX_Crew-1_Launch_%28 cropped %29.jpg", caption: "SpaceX Crew-1 Launch 2020" },
];

export default function Vision() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const speed = 0.8;
    let pos = 0;
    let rafId: number;
    const tick = () => {
      if (!pausedRef.current) {
        pos -= speed;
        const maxScroll = el.scrollWidth / 2;
        if (Math.abs(pos) >= maxScroll) pos = 0;
        el.style.transform = `translateX(${pos}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchend", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchend", onLeave);
    };
  }, []);

  const allPhotos = [
    ...userPhotos.map((p) => ({ url: `/attached_assets/${p.filename}`, caption: p.caption, source: "local" as const })),
    ...wikimediaPhotos.map((p) => ({ ...p, source: "remote" as const })),
  ];
  const doubled = [...allPhotos, ...allPhotos];

  return (
    <>
      <section className="py-16 md:py-20 overflow-hidden bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Photo Archive</p>
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
              The Life of Elon Musk
            </h2>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 cursor-grab active:cursor-grabbing select-none"
          style={{ width: "max-content" }}
        >
          {doubled.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-56 md:w-72 group cursor-pointer"
              onClick={() => setSelectedPhoto({ url: photo.url, caption: photo.caption })}
            >
              <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.style.background = `hsl(${(i * 53) % 360}, 15%, 12%)`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-[10px] text-white/80 p-3 leading-relaxed">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[80vh] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <p className="text-center text-white/60 text-xs mt-4">{selectedPhoto.caption}</p>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}