import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto h-14 md:h-16 px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-sm md:text-base font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          Elon Musk Official
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme toggle — moon / sun emoji */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle color theme"
            className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm text-lg leading-none [filter:grayscale(1)]"
          >
            <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>

          {/* Management button */}
          <a
            href={`${import.meta.env.BASE_URL}management`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 text-xs uppercase tracking-[0.14em] font-medium border border-border text-foreground hover:bg-muted transition-colors"
          >
            Management
          </a>

          {/* Contact button */}
          <a
            href={`${import.meta.env.BASE_URL}contact`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 text-xs uppercase tracking-[0.14em] font-medium border border-border text-foreground hover:bg-muted transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
