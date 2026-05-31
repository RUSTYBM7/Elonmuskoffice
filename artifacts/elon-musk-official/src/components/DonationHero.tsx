import { Heart } from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.svg";

export default function DonationHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.3) 80px, rgba(255,255,255,0.3) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.3) 80px, rgba(255,255,255,0.3) 81px)`
        }} />
      </div>

      {/* Tesla logo watermark */}
      <div className="absolute right-12 bottom-12 opacity-[0.06]">
        <img src={teslaLogo} alt="" className="w-64 h-auto" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-24">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8">
          <Heart className="w-7 h-7 text-white" />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">
          The Musk Foundation
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] mb-8">
          Support the Mission
        </h1>

        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-12">
          Your contribution funds renewable energy research, STEM education,
          AI safety initiatives, and the future of humanity among the stars.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-semibold text-white">$7B+</p>
            <p className="text-xs text-white/40 mt-1">Total Donated</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-semibold text-white">2026</p>
            <p className="text-xs text-white/40 mt-1">Active Programs</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-semibold text-white">100%</p>
            <p className="text-xs text-white/40 mt-1">Tax Deductible</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}