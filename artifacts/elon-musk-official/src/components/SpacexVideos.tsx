'use client';
import { motion } from "framer-motion";
import { Play, ExternalLink, Rocket, Star, Calendar, Clock, ChevronRight, Zap, Tesla, Brain, Wifi } from "lucide-react";
import { useState } from "react";

const companyVideos = {
  spacex: [
    {
      id: 'starship-flight13',
      title: 'Starship Flight 13',
      subtitle: 'Starship Landing - July 2026',
      description: 'Historic landing as Starship successfully executes landing flip and splashdown, coming to rest intact in the ocean.',
      youtubeId: 'nnR6iLlm4Hc',
      date: 'July 24, 2026',
      duration: '45:32',
      category: 'starship',
      featured: true
    },
    {
      id: 'starship-ift11',
      title: 'Starship IFT-11',
      subtitle: 'Orbital flight test with Starship catching',
      description: 'SpaceX\'s eleventh integrated flight test featuring another attempt to catch the Super Heavy booster.',
      youtubeId: 'wM6W8_sJt7I',
      date: 'November 2024',
      duration: '47:32',
      category: 'starship',
      featured: false
    },
    {
      id: 'polaris-dawn',
      title: 'Polaris Dawn',
      subtitle: 'First commercial spacewalk',
      description: 'World\'s first commercial spacewalk at 700km altitude, testing new spacesuit technology.',
      youtubeId: 'nAlyPKo20Ic',
      date: 'September 2024',
      duration: '52:48',
      category: 'dragon',
      featured: false
    },
    {
      id: 'europa-clipper',
      title: 'Europa Clipper Launch',
      subtitle: 'Journey to Jupiter\'s moon',
      description: 'NASA\'s Europa Clipper embarks on a 1.8-billion-mile journey to investigate Europa.',
      youtubeId: 'NzJ02_8jwY0',
      date: 'October 2024',
      duration: '38:15',
      category: 'falcon',
      featured: false
    }
  ],
  tesla: [
    {
      id: 'tesla-ai-day',
      title: 'Tesla AI Day 2024',
      subtitle: 'Full Self-Driving progress',
      description: 'Tesla showcases latest advances in autonomous driving technology and humanoid robot.',
      youtubeId: 'e5PnuIRB3S4',
      date: 'October 2024',
      duration: '2:15:00',
      category: 'ai',
      featured: false
    },
    {
      id: 'tesla-robotaxi',
      title: 'Robotaxi Unveil Event',
      subtitle: 'Future of autonomous ride-sharing',
      description: 'Tesla reveals its purpose-built robotaxi vehicle designed for fully autonomous operation.',
      youtubeId: 'VTKCPdXhbTU',
      date: 'October 2024',
      duration: '1:45:00',
      category: 'autonomous',
      featured: false
    }
  ],
  starlink: [
    {
      id: 'starlink-direct',
      title: 'Starlink Direct to Cell',
      subtitle: 'Global satellite connectivity',
      description: 'SpaceX demonstrates revolutionary direct-to-cell satellite internet service.',
      youtubeId: '5UjKz6eGd5Y',
      date: 'January 2025',
      duration: '18:45',
      category: 'satellite',
      featured: false
    }
  ],
  neuralink: [
    {
      id: 'neuralink-prime',
      title: 'Neuralink PRIME Study',
      subtitle: 'Brain-computer interface breakthrough',
      description: 'Updates on Neuralink\'s first human trial showcasing thought-controlled computing.',
      youtubeId: 'video-id-neuralink',
      date: '2024',
      duration: '12:30',
      category: 'neuralink',
      featured: false
    }
  ]
};

const companyBrands = {
  spacex: { name: 'SpaceX', icon: Rocket, color: '#005288', gradient: 'from-blue-600 to-blue-800' },
  tesla: { name: 'Tesla', icon: Zap, color: '#E31937', gradient: 'from-red-600 to-red-800' },
  starlink: { name: 'Starlink', icon: Wifi, color: '#3B82F6', gradient: 'from-blue-500 to-blue-700' },
  neuralink: { name: 'Neuralink', icon: Brain, color: '#8B5CF6', gradient: 'from-purple-600 to-purple-800' }
};

const categoryColors: Record<string, { bg: string; border: string }> = {
  starship: { bg: 'bg-orange-500', border: 'border-orange-500' },
  dragon: { bg: 'bg-blue-500', border: 'border-blue-500' },
  falcon: { bg: 'bg-green-500', border: 'border-green-500' },
  ai: { bg: 'bg-red-500', border: 'border-red-500' },
  autonomous: { bg: 'bg-red-500', border: 'border-red-500' },
  satellite: { bg: 'bg-blue-500', border: 'border-blue-500' },
  neuralink: { bg: 'bg-purple-500', border: 'border-purple-500' }
};

export default function SpacexVideos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeCompany, setActiveCompany] = useState<keyof typeof companyVideos>('spacex');
  const featuredLaunch = companyVideos.spacex.find(l => l.featured)!;
  const featuredColors = categoryColors[featuredLaunch.category];
  const currentVideos = companyVideos[activeCompany];
  const currentBrand = companyBrands[activeCompany];
  const CurrentBrandIcon = currentBrand.icon;

  return (
    <section className="relative bg-background border-t border-border">
      {/* FULL-WIDTH HERO VIDEO - STARSHIP FLIGHT 13 */}
      <div className="relative w-full">
        <div className="relative w-full aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7]">
          {/* Thumbnail or Embedded Video */}
          {activeVideo === featuredLaunch.id ? (
            <iframe
              src={`https://www.youtube.com/embed/${featuredLaunch.youtubeId}?autoplay=1&mute=0&controls=1&rel=0`}
              title={featuredLaunch.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={`https://img.youtube.com/vi/${featuredLaunch.youtubeId}/maxresdefault.jpg`}
                alt={featuredLaunch.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://img.youtube.com/vi/${featuredLaunch.youtubeId}/hqdefault.jpg`;
                }}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Play Button Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setActiveVideo(featuredLaunch.id)}
              >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-2xl border-2 border-white/30">
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-white ml-1" fill="white" />
                </div>
              </div>

              {/* LIVE Badge */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <div className="px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white text-xs font-medium rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="uppercase tracking-wider">Latest</span>
                </div>
              </div>
            </>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-6 md:p-10 lg:p-12">
              <div className="max-w-7xl mx-auto w-full">
                {/* Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                      Starship Flight 13
                    </span>
                  </div>
                  <span className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white font-medium rounded-full ${featuredColors.bg}`}>
                    {featuredLaunch.category}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-3xl"
                >
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-2">
                    {featuredLaunch.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 mb-3">
                    {featuredLaunch.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-white/60 max-w-2xl mb-5 hidden md:block">
                    {featuredLaunch.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-white/50">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredLaunch.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredLaunch.duration}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-end gap-2 md:gap-3">
              <a
                href={`https://www.youtube.com/watch?v=${featuredLaunch.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full text-white text-xs md:text-sm transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.spacex.com/launches/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors text-xs md:text-sm"
              >
                <span>SpaceX.com</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANY TABS */}
      <div className="border-b border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {Object.entries(companyBrands).map(([key, brand]) => {
              const Icon = brand.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCompany(key as keyof typeof companyVideos)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCompany === key
                      ? `bg-gradient-to-r ${brand.gradient} text-white shadow-lg`
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{brand.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VIDEO LIBRARY SECTION */}
      <div className="relative py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-border bg-secondary/20 rounded-full">
              <CurrentBrandIcon className="w-3.5 h-3.5 text-foreground" style={{ color: currentBrand.color }} />
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                {currentBrand.name} Media
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
              {currentBrand.name} Video Library
            </h2>
            <p className="text-sm text-foreground/65 max-w-2xl mx-auto">
              Watch the latest {currentBrand.name} content, launches, and breakthrough moments.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.filter(v => !v.featured).map((video, i) => {
              const colors = categoryColors[video.category];
              return (
                <motion.a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group block"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary border border-border group-hover:border-foreground/30 transition-all duration-300">
                    {video.youtubeId !== 'video-id-neuralink' ? (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                          }}
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
                        <Brain className="w-16 h-16 text-purple-400/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all shadow-lg">
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </div>
                    </div>

                    {/* Badges */}
                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded font-mono">
                      {video.duration}
                    </span>
                    <span className={`absolute top-2 left-2 px-2 py-1 text-[10px] uppercase tracking-wider text-white font-medium rounded ${colors.bg}`}>
                      {video.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                      <span>{video.date}</span>
                      <span>·</span>
                      <span>{video.category}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-foreground/65 line-clamp-2">
                      {video.subtitle}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href={activeCompany === 'spacex' ? 'https://www.spacex.com/launches/' :
                    activeCompany === 'tesla' ? 'https://www.tesla.com/' :
                    activeCompany === 'starlink' ? 'https://www.starlink.com/' :
                    'https://neuralink.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-full hover:opacity-90 transition-colors"
              style={{ backgroundColor: currentBrand.color }}
            >
              <CurrentBrandIcon className="w-4 h-4" />
              <span>View All on {currentBrand.name}.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          <p className="mt-8 text-center text-[11px] text-muted-foreground/50">
            Videos courtesy of {currentBrand.name}. All content subject to availability.
          </p>
        </div>
      </div>
    </section>
  );
}
