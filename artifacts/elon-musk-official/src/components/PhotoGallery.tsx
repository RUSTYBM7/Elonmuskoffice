'use client';

import { useState, useEffect, useCallback } from 'react';
// Using img tags (no next/image in this project)
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Era = 'All' | 'Early Days' | 'SpaceX Era' | 'Tesla Era' | 'X & AI Era';

interface Photo {
  id: string;
  src: string;
  era: Exclude<Era, 'All'>;
  caption: string;
  width: number;
  height: number;
}

const photos: Photo[] = [
  {
    id: '1',
    src: '/attached_assets/IMG_0566.JPG',
    era: 'Early Days',
    caption: 'A glimpse into the early years — before rockets and electric cars.',
    width: 800,
    height: 600,
  },
  {
    id: '2',
    src: '/attached_assets/IMG_0569.JPG',
    era: 'Early Days',
    caption: 'The foundation of vision — built one step at a time.',
    width: 800,
    height: 1067,
  },
  {
    id: '3',
    src: '/attached_assets/IMG_0606.JPG',
    era: 'Early Days',
    caption: 'From humble beginnings to extraordinary ambition.',
    width: 800,
    height: 600,
  },
  {
    id: '4',
    src: '/attached_assets/IMG_9847_1777265766177.jpeg',
    era: 'Early Days',
    caption: 'Portrait of a future that hadn\'t arrived yet.',
    width: 800,
    height: 1000,
  },
  {
    id: '5',
    src: '/attached_assets/IMG_0707.JPG',
    era: 'SpaceX Era',
    caption: 'Falcon rockets rising — making humanity multiplanetary.',
    width: 800,
    height: 600,
  },
  {
    id: '6',
    src: '/attached_assets/IMG_0710.JPG',
    era: 'SpaceX Era',
    caption: 'The SpaceX facility — where the impossible becomes routine.',
    width: 800,
    height: 534,
  },
  {
    id: '7',
    src: '/attached_assets/IMG_0714.JPG',
    era: 'SpaceX Era',
    caption: 'Starship — the next chapter of human spaceflight.',
    width: 800,
    height: 600,
  },
  {
    id: '8',
    src: '/attached_assets/IMG_0964.JPG',
    era: 'Tesla Era',
    caption: 'The electric revolution — accelerating the world\'s transition to sustainable energy.',
    width: 800,
    height: 600,
  },
  {
    id: '9',
    src: '/attached_assets/IMG_0843.JPG',
    era: 'X & AI Era',
    caption: 'X — reshaping the future of communication and information.',
    width: 800,
    height: 600,
  },
  {
    id: '10',
    src: '/attached_assets/IMG_0965.JPG',
    era: 'X & AI Era',
    caption: 'At the intersection of technology and ambition.',
    width: 800,
    height: 1067,
  },
  {
    id: '11',
    src: '/attached_assets/IMG_0966.JPG',
    era: 'X & AI Era',
    caption: 'Pushing boundaries in AI and beyond.',
    width: 800,
    height: 534,
  },
];

const eraFilters: Era[] = ['All', 'Early Days', 'SpaceX Era', 'Tesla Era', 'X & AI Era'];

const eraColors: Record<Exclude<Era, 'All'>, { bg: string; text: string; border: string }> = {
  'Early Days': {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  'SpaceX Era': {
    bg: 'bg-indigo-500/20',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
  },
  'Tesla Era': {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  'X & AI Era': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
};

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState<Era>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos = activeFilter === 'All'
    ? photos
    : photos.filter((photo) => photo.era === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  }, [filteredPhotos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  }, [filteredPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext, closeLightbox]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const currentPhoto = filteredPhotos[currentIndex];

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            In His Own Words
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            A visual journey through Elon's life and work
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-foreground/20 via-foreground/40 to-foreground/20 mx-auto" />
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {eraFilters.map((era) => (
            <button
              key={era}
              onClick={() => setActiveFilter(era)}
              className={`
                px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium
                transition-all duration-300 ease-out
                ${
                  activeFilter === era
                    ? 'bg-foreground text-background scale-105 shadow-lg'
                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                }
              `}
            >
              {era}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => openLightbox(index)}
              >
                <div
                  className={`
                    relative overflow-hidden rounded-xl
                    ${index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
                    bg-foreground/5
                  `}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Era Badge */}
                  <div
                    className={`
                      absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium
                      backdrop-blur-md border ${eraColors[photo.era].bg} ${eraColors[photo.era].text} ${eraColors[photo.era].border}
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    `}
                  >
                    {photo.era}
                  </div>

                  {/* Caption Preview */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm text-foreground/90 line-clamp-2">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-all duration-200 hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-all duration-200 hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Caption & Info */}
            <motion.div
              key={`caption-${currentPhoto.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-center max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    backdrop-blur-md border ${eraColors[currentPhoto.era].bg} ${eraColors[currentPhoto.era].text} ${eraColors[currentPhoto.era].border}
                  `}
                >
                  {currentPhoto.era}
                </span>
                <span className="text-foreground/50 text-sm">
                  {currentIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                {currentPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}