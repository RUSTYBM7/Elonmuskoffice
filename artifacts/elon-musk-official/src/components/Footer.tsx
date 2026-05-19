import { Mail } from "lucide-react";
import { FaXTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa6";

const ventures = [
  { name: "Tesla", href: "https://www.tesla.com" },
  { name: "SpaceX", href: "https://www.spacex.com" },
  { name: "Neuralink", href: "https://neuralink.com" },
  { name: "The Boring Company", href: "https://www.boringcompany.com" },
  { name: "xAI", href: "https://x.ai" },
  { name: "𝕏", href: "https://x.com" },
  { name: "Starlink", href: "https://www.starlink.com" },
];

const explore = [
  { name: "About Elon", href: "/about" },
  { name: "Biography", href: "/#biography" },
  { name: "Forbes Profile", href: "https://www.forbes.com/profile/elon-musk/" },
  { name: "Career Timeline", href: "/#timeline" },
  { name: "In His Words", href: "/#vision" },
  { name: "Press & Headlines", href: "/#press" },
];

const socials = [
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/+18032587511" },
  { icon: FaXTwitter, label: "𝕏", href: "https://x.com/elonmusk" },
  { icon: Mail, label: "Email", href: "mailto:Muskfoundation@currently.com" },
  { icon: FaTelegram, label: "Telegram", href: "https://t.me/Elonmuskx00x1" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <p className="text-base md:text-lg font-medium tracking-tight text-foreground">
              Elon Musk Official
            </p>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed max-w-xs">
              Engineer, entrepreneur, and operator at the frontier of space,
              energy, and intelligence.
            </p>

            <div className="mt-6 flex items-center gap-5">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="text-foreground/60 hover:text-foreground dark:hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Ventures */}
          <div className="col-span-1 md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
              Ventures
            </p>
            <ul className="space-y-3">
              {ventures.map((v) => (
                <li key={v.name}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/75 hover:text-foreground dark:hover:text-primary transition-colors"
                  >
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {explore.map((e) => (
                <li key={e.name}>
                  <a
                    href={e.href}
                    target={e.href.startsWith("http") ? "_blank" : undefined}
                    rel={e.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground/75 hover:text-foreground dark:hover:text-primary transition-colors"
                  >
                    {e.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-foreground/75">
              <li>
                <a
                  href="mailto:Muskfoundation@currently.com"
                  className="hover:text-foreground dark:hover:text-primary transition-colors"
                >
                  Muskfoundation@currently.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+18032587511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground dark:hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/Elonmuskx00x1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground dark:hover:text-primary transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/elonmusk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground dark:hover:text-primary transition-colors"
                >
                  𝕏 / @elonmusk
                </a>
              </li>
              <li className="pt-2 text-xs text-muted-foreground">
                Austin, Texas &middot; United States
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 md:mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wide text-muted-foreground">
            &copy; {new Date().getFullYear()} Elon Musk Official. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              Legal
            </a>
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              Cookie Preferences
            </a>
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              Press
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
