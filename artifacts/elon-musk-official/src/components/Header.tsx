import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Vision", href: "/about" },
  { label: "Supporters", href: "/supporters" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

// Scroll to top on navigation
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Header() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto h-14 md:h-16 px-4 md:px-6 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="text-sm md:text-base font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
            onClick={() => setMobileOpen(false)}
          >
            Elon Musk Official
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollToTop}
                className="px-3 py-2 text-xs uppercase tracking-[0.14em] font-medium text-foreground/70 hover:text-foreground transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-pressed={theme === "dark"}
              className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
            >
              <span className="sr-only">
                {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              </span>
              {theme === "dark" ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="md:hidden w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`md:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-background border-l border-border shadow-2xl transition-transform duration-300 flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <span className="text-sm font-medium tracking-tight text-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-4">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => { setMobileOpen(false); scrollToTop(); }}
                className="flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors border-b border-border/50 focus:outline-none focus-visible:bg-muted/50"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-foreground/40" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* Drawer footer — theme toggle */}
          <div className="px-6 py-5 border-t border-border">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Appearance
            </p>
            <button
              type="button"
              onClick={() => { toggle(); setMobileOpen(false); }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}