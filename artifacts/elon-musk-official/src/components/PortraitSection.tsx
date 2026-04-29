import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaXTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import portrait from "@assets/IMG_9847_1777265766177.jpeg";

const socialLinks = [
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/message/673TLPEML5VVP1" },
  { icon: FaXTwitter, label: "𝕏", href: "https://x.com/Mayemuskliving4" },
  { icon: Mail, label: "Email", href: "mailto:elon0147@att.net" },
  { icon: FaTelegram, label: "Telegram", href: "https://t.me/realelonrmusk7" },
];

export default function PortraitSection() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Portrait — square with corner brackets */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 lg:col-span-5"
        >
          <div className="relative w-full max-w-[460px] mx-auto md:mx-0 aspect-square">
            {/* Corner brackets */}
            <span className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-foreground dark:border-primary" aria-hidden="true" />
            <span className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-foreground dark:border-primary" aria-hidden="true" />
            <span className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-foreground dark:border-primary" aria-hidden="true" />
            <span className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-foreground dark:border-primary" aria-hidden="true" />

            {/* Soft glow */}
            <div className="absolute inset-0 -m-4 bg-foreground/[0.04] dark:bg-primary/15 blur-2xl pointer-events-none" />

            <div className="relative w-full h-full overflow-hidden bg-muted shadow-xl">
              <img
                src={portrait}
                alt="Elon Reeves Musk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name + tagline + contacts */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 lg:col-span-7"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Profile
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Elon Reeves Musk
          </h2>
          <p className="mt-5 text-lg md:text-xl text-foreground/75 italic font-light tracking-tight">
            Space, Energy, and Everything In Between.
          </p>

          <div className="mt-8 h-px w-16 bg-foreground/30 dark:bg-primary/60" />

          <p className="mt-8 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
            Engineer, entrepreneur, and operator at the frontier — building the
            companies that redefine how humanity moves, communicates, and dreams.
          </p>

          {/* Contact icons row */}
          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
              Get in touch
            </p>
            <nav aria-label="Contact" className="flex flex-row items-center gap-7 md:gap-8">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Tooltip key={link.label}>
                    <TooltipTrigger asChild>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={link.label}
                        className="text-foreground/70 hover:text-foreground dark:hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground dark:focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                      >
                        <Icon className="w-[22px] h-[22px] md:w-6 md:h-6" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs tracking-wide">
                      {link.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
