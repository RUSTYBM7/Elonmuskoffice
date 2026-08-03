import { Heart, Shield, Lock, Sparkles, Bitcoin } from "lucide-react";

export default function DonationHero() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-background to-secondary/30 border-b border-border overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-500 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-500 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-amber-500/30 bg-amber-500/5 rounded-full">
          <Bitcoin className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400 font-medium">
            Cryptocurrency only
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
          Support the Mission
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05] mb-6">
          Fund the future
        </h1>

        <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-12">
          100% of your contribution funds renewable energy research, STEM education, AI safety initiatives, and the future of humanity among the stars. We accept cryptocurrency only.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border max-w-3xl mx-auto">
          {[
            { label: "Total Donated", value: "$7B+" },
            { label: "Active Programs", value: "12" },
            { label: "Crypto Tokens", value: "7" },
            { label: "Tax Deductible", value: "100%" },
          ].map((s) => (
            <div key={s.label} className="bg-background p-5 md:p-6 flex flex-col items-center justify-center text-center">
              <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground dark:text-primary">{s.value}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Verified on-chain</div>
          <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Non-custodial</div>
          <div className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> 1 confirmation</div>
          <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Tax-deductible</div>
        </div>
      </div>
    </section>
  );
}
