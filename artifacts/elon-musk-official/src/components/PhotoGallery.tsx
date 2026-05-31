import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Era = "All" | "Early Days" | "SpaceX Era" | "Tesla Era" | "X & AI Era";

interface PhotoItem {
  filename: string;
  caption: string;
  era: Era;
  orientation?: "portrait" | "landscape";
  credit?: string;
}

// Photo data with era categorization
const photos: PhotoItem[] = [
  { filename: "IMG_0566.JPG", caption: "Early public appearances and speaking engagements", era: "Early Days", orientation: "landscape" },
  { filename: "IMG_0569.JPG", caption: "At the frontier of technology and innovation", era: "Early Days", orientation: "portrait" },
  { filename: "IMG_0606.JPG", caption: "Keynote moments that shaped an industry", era: "Early Days", orientation: "landscape" },
  { filename: "IMG_0707.JPG", caption: "SpaceX: The journey to making humanity multiplanetary", era: "SpaceX Era", orientation: "portrait" },
  { filename: "IMG_0710.JPG", caption: "Tesla factory floor — where the future is built", era: "SpaceX Era", orientation: "landscape" },
  { filename: "IMG_0714.JPG", caption: "Neuralink demonstration — the brain-computer interface future", era: "SpaceX Era", orientation: "portrait" },
  { filename: "IMG_0843.JPG", caption: "X HQ — reinventing the platform of public discourse", era: "X & AI Era", orientation: "landscape" },
  { filename: "IMG_0964.JPG", caption: "Family moments — father, innovator, visionary", era: "X & AI Era", orientation: "portrait" },
  { filename: "IMG_0965.JPG", caption: "Father and son — teaching the next generation", era: "X & AI Era", orientation: "landscape" },
  { filename: "IMG_0966.JPG", caption: "Building bridges between generations", era: "X & AI Era", orientation: "portrait" },
  { filename: "IMG_9847_1777265766177.jpeg", caption: "Official portrait — the face of modern innovation", era: "X & AI Era", orientation: "portrait" },
  { filename: "elon-portrait-new.jpeg", caption: "In his own words — authentic, unfiltered", era: "X & AI Era", orientation: "portrait" },
];

const eraFilters: Era[] = ["All", "Early Days", "SpaceX Era", "Tesla Era", "X & AI Era"];

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

// Lightbox animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const lightboxVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.25 },
  },
};

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState<Era>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filteredPhotos = activeFilter === "All"
    ? photos
    : photos.filter((p) => p.era === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goToPrevious, goToNext]);

  // Focus trap and initial focus
  useEffect(() => {
    if (lightboxIndex !== null && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [lightboxIndex]);

  // Handle filter change with transition
  const handleFilterChange = (era: Era) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(era);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Visual Story</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-3">
            A Visual Story
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            From Silicon Valley beginnings to reshaping multiple industries — 
            a curated journey through pivotal moments.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-muted/30 rounded-xl backdrop-blur-sm border border-border/50">
            {eraFilters.map((era) => (
              <button
                key={era}
                onClick={() => handleFilterChange(era)}
                className={`
                  relative px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300
                  ${activeFilter === era
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/80"
                  }
                `}
              >
                {activeFilter === era && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-background border border-border rounded-lg shadow-sm"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10 tracking-wide">{era}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Photo Count */}
        <motion.p
          key={filteredPhotos.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-muted-foreground mb-8 tracking-wide"
        >
          {filteredPhotos.length} {filteredPhotos.length === 1 ? "photo" : "photos"}
        </motion.p>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate={isTransitioning ? "hidden" : "visible"}
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.filename}
                variants={itemVariants}
                className={`
                  group cursor-pointer
                  ${photo.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}
                `}
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted">
                  {/* Image */}
                  <img
                    src={`/attached_assets/${photo.filename}`}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Fallback gradient on error
                      target.style.opacity = "0";
                      target.parentElement!.style.background = `
                        linear-gradient(
                          135deg,
                          hsl(${(index * 47) % 360}, 20%, 15%) 0%,
                          hsl(${(index * 47 + 60) % 360}, 25%, 12%) 100%
                        )
                      `;
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-sm text-white/90 font-light leading-relaxed mb-1">
                        {photo.caption}
                      </p>
                      <span className="text-[10px] text-white/60 uppercase tracking-wider">
                        {photo.era}
                      </span>
                    </div>
                  </div>

                  {/* Era Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-[9px] uppercase tracking-widest bg-black/50 backdrop-blur-md text-white/80 rounded-full border border-white/10">
                      {photo.era}
                    </span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4 text-muted-foreground/40">
            <span className="w-16 h-px bg-current" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Gallery</span>
            <span className="w-16 h-px bg-current" />
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            {/* Lightbox Content */}
            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              ref={lightboxRef}
              className="relative w-full max-w-5xl mx-4 md:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors duration-200 z-10"
                aria-label="Close lightbox"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Container */}
              <div className={`
                relative overflow-hidden rounded-2xl bg-muted
                ${filteredPhotos[lightboxIndex]?.orientation === "portrait" ? "aspect-[3/4] max-h-[80vh] mx-auto" : "aspect-video"}
              `}>
                <img
                  src={`/attached_assets/${filteredPhotos[lightboxIndex]?.filename}`}
                  alt={filteredPhotos[lightboxIndex]?.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption Bar */}
              <div className="mt-6 px-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed mb-2">
                      {filteredPhotos[lightboxIndex]?.caption}
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">
                      {filteredPhotos[lightboxIndex]?.era}
                    </span>
                  </div>
                  {filteredPhotos[lightboxIndex]?.credit && (
                    <span className="text-[10px] text-white/40 italic">
                      Photo: {filteredPhotos[lightboxIndex]?.credit}
                    </span>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={goToPrevious}
                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200"
                    aria-label="Previous photo"
                  >
                    <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/40 group-hover:bg-white/10 flex items-center justify-center transition-all duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                    <span className="text-xs hidden sm:inline">Previous</span>
                  </button>

                  <span className="text-xs text-white/40 font-light tracking-wider">
                    {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>

                  <button
                    onClick={goToNext}
                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200"
                    aria-label="Next photo"
                  >
                    <span className="text-xs hidden sm:inline">Next</span>
                    <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/40 group-hover:bg-white/10 flex items-center justify-center transition-all duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Keyboard Hints */}
              <div className="flex justify-center mt-4 gap-4 text-[10px] text-white/30">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">←</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">→</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}