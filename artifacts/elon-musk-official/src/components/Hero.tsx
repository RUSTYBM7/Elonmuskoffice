import { motion } from "framer-motion";
import heroVideo from "@assets/PinLoad_spacex_1777265709781_1777265766177.mp4";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[92vh] flex items-center justify-center px-6">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" aria-hidden="true" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,rgba(0,0,0,0.55)_100%)]" aria-hidden="true" />

      <div className="relative w-full max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/70 mb-6"
        >
          Elon Musk &mdash; Official
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        >
          Redefining Humanity
          <br />
          Beyond Limits
          <br />
          <span className="text-white/85 dark:text-primary">Through Innovations</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/60"
        >
          <span className="block w-8 h-px bg-white/40" />
          Scroll
          <span className="block w-8 h-px bg-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
