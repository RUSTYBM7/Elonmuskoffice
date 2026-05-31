import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight, Home, User, Building, Lightbulb, Hash } from "lucide-react";

interface SearchResult {
  id: string;
  type: "page" | "topic" | "fact";
  title: string;
  description: string;
  url?: string;
  icon: "home" | "user" | "building" | "lightbulb";
}

interface SearchIndex {
  pages: SearchResult[];
  topics: SearchResult[];
  facts: SearchResult[];
}

const searchIndex: SearchIndex = {
  pages: [
    {
      id: "page-home",
      type: "page",
      title: "Home",
      description: "Hero, portrait, ventures, newsletter, timeline",
      url: "/",
      icon: "home",
    },
    {
      id: "page-about",
      type: "page",
      title: "Vision & Biography",
      description: "Full biography, timeline, ventures, Grok AI chat",
      url: "/about",
      icon: "home",
    },
    {
      id: "page-contact",
      type: "page",
      title: "Get In Touch",
      description: "Contact form, email, WhatsApp, Telegram",
      url: "/contact",
      icon: "home",
    },
    {
      id: "page-donate",
      type: "page",
      title: "Donate to the Foundation",
      description: "Make a donation, crypto, card, wire transfer",
      url: "/donate",
      icon: "home",
    },
    {
      id: "page-crypto",
      type: "page",
      title: "Crypto Payment Gate",
      description: "Private crypto payment options",
      url: "/crypto-endowment",
      icon: "home",
    },
  ],
  topics: [
    {
      id: "topic-tesla",
      type: "topic",
      title: "Tesla",
      description: "Electric vehicles, solar, energy storage — Technoking & CEO",
      icon: "building",
    },
    {
      id: "topic-spacex",
      type: "topic",
      title: "SpaceX",
      description: "Aerospace, Mars, Starship — Founder, CEO & Chief Engineer",
      icon: "building",
    },
    {
      id: "topic-neuralink",
      type: "topic",
      title: "Neuralink",
      description: "Brain-computer interface — Co-founder",
      icon: "building",
    },
    {
      id: "topic-xai",
      type: "topic",
      title: "xAI",
      description: "Artificial intelligence, Grok AI — Founder",
      icon: "building",
    },
    {
      id: "topic-x",
      type: "topic",
      title: "X Corp",
      description: "Social media, everything app — Executive Chairman & CTO",
      icon: "building",
    },
    {
      id: "topic-starlink",
      type: "topic",
      title: "Starlink",
      description: "Satellite internet constellation — SpaceX project",
      icon: "building",
    },
    {
      id: "topic-boring",
      type: "topic",
      title: "The Boring Company",
      description: "Tunnel infrastructure — Founder",
      icon: "building",
    },
    {
      id: "topic-biography",
      type: "topic",
      title: "Elon Musk Biography",
      description: "Born 1971 Pretoria, South Africa, $800B net worth",
      icon: "user",
    },
    {
      id: "topic-foundation",
      type: "topic",
      title: "Musk Foundation",
      description: "Philanthropy, science, technology advancement",
      icon: "building",
    },
  ],
  facts: [
    {
      id: "fact-1",
      type: "fact",
      title: "Born June 28 1971",
      description: "Born June 28 1971 in Pretoria South Africa",
      icon: "lightbulb",
    },
    {
      id: "fact-2",
      type: "fact",
      title: "World's Wealthiest Person",
      description: "World's wealthiest person with $800 billion net worth",
      icon: "lightbulb",
    },
    {
      id: "fact-3",
      type: "fact",
      title: "Father of 11+ Children",
      description: "Has 11+ children across multiple relationships",
      icon: "lightbulb",
    },
    {
      id: "fact-4",
      type: "fact",
      title: "Early Entrepreneurship",
      description: "Founded Zip2 sold for $307M, PayPal sold to eBay for $1.5B",
      icon: "lightbulb",
    },
    {
      id: "fact-5",
      type: "fact",
      title: "Six Companies",
      description: "Tesla, SpaceX, Neuralink, xAI, Boring Company, X — six companies",
      icon: "lightbulb",
    },
    {
      id: "fact-6",
      type: "fact",
      title: "Mars Colonization",
      description: "SpaceX Starship designed to colonize Mars by 2050",
      icon: "lightbulb",
    },
    {
      id: "fact-7",
      type: "fact",
      title: "Neuralink Implant",
      description: "First human Neuralink implant January 2024",
      icon: "lightbulb",
    },
    {
      id: "fact-8",
      type: "fact",
      title: "Twitter Acquisition",
      description: "Acquired Twitter for $44B in 2022 renamed to X",
      icon: "lightbulb",
    },
  ],
};

const RECENT_SEARCHES_KEY = "elon-musk-recent-searches";
const MAX_RECENT_SEARCHES = 5;

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  try {
    const recent = getRecentSearches().filter((s) => s !== query);
    const updated = [query, ...recent].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}

function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Ignore storage errors
  }
}

function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase().trim();
  
  const allResults: SearchResult[] = [
    ...searchIndex.pages,
    ...searchIndex.topics,
    ...searchIndex.facts,
  ];

  return allResults.filter((result) => {
    const titleMatch = result.title.toLowerCase().includes(lowerQuery);
    const descMatch = result.description.toLowerCase().includes(lowerQuery);
    return titleMatch || descMatch;
  });
}

function getIconComponent(icon: SearchResult["icon"], className?: string) {
  switch (icon) {
    case "home":
      return <Home className={className} aria-hidden="true" />;
    case "user":
      return <User className={className} aria-hidden="true" />;
    case "building":
      return <Building className={className} aria-hidden="true" />;
    case "lightbulb":
      return <Lightbulb className={className} aria-hidden="true" />;
    default:
      return <Hash className={className} aria-hidden="true" />;
  }
}

function getCategoryBadge(type: SearchResult["type"]) {
  const styles = {
    page: "bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400",
    topic: "bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400",
    fact: "bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400",
  };
  
  const labels = {
    page: "Page",
    topic: "Topic",
    fact: "Fact",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentResults, setRecentResults] = useState<SearchResult[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load recent searches on mount
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches());
    }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setSelectedIndex(0);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Update recent results display
  useEffect(() => {
    if (recentSearches.length > 0) {
      const recentMatched = recentSearches
        .map((s) => searchContent(s))
        .flat()
        .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
        .slice(0, 5);
      setRecentResults(recentMatched);
    } else {
      setRecentResults([]);
    }
  }, [recentSearches]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const itemCount = query ? results.length : recentResults.length;
      
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % itemCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case "Enter":
          e.preventDefault();
          if (query && results[selectedIndex]) {
            saveRecentSearch(query);
            const result = results[selectedIndex];
            if (result.url) {
              window.location.href = result.url;
            }
            onClose();
          } else if (!query && recentSearches[selectedIndex]) {
            setQuery(recentSearches[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [query, results, selectedIndex, recentSearches, recentResults, onClose]
  );

  const handleResultClick = (result: SearchResult) => {
    if (query) {
      saveRecentSearch(query);
    }
    if (result.url) {
      window.location.href = result.url;
    }
    onClose();
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
    setRecentResults([]);
  };

  const displayResults = query ? results : recentResults;
  const showRecentSection = !query && recentSearches.length > 0;
  const showEmptyState = query && results.length === 0;
  const showResults = query && results.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search
                className="w-5 h-5 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, topics, facts..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                aria-label="Search"
                aria-autocomplete="list"
                aria-controls="search-results"
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-medium text-muted-foreground bg-muted/50 rounded border border-border/50">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-[60vh] overflow-y-auto"
            >
              {/* Recent searches */}
              {showRecentSection && (
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      Recent Searches
                    </div>
                    <button
                      type="button"
                      onClick={handleClearRecent}
                      className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={search}
                        type="button"
                        onClick={() => handleRecentClick(search)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                          selectedIndex === index
                            ? "bg-muted text-foreground"
                            : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                        }`}
                        role="option"
                        aria-selected={selectedIndex === index}
                      >
                        <Clock className="w-4 h-4 text-muted-foreground/50 shrink-0" aria-hidden="true" />
                        <span className="flex-1 truncate">{search}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search results */}
              {showResults && (
                <div className="p-3">
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    {results.length} result{results.length !== 1 ? "s" : ""} found
                  </div>
                  <div className="space-y-1">
                    {results.map((result, index) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => handleResultClick(result)}
                        className={`w-full flex items-start gap-3 px-3 py-3 text-left rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                          selectedIndex === index
                            ? "bg-muted"
                            : "hover:bg-muted/50"
                        }`}
                        role="option"
                        aria-selected={selectedIndex === index}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          result.type === "page"
                            ? "bg-blue-500/10 text-blue-500"
                            : result.type === "topic"
                            ? "bg-purple-500/10 text-purple-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {getIconComponent(result.icon, "w-4 h-4")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-medium text-foreground truncate">
                              {result.title}
                            </span>
                            {getCategoryBadge(result.type)}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {showEmptyState && (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    No results found
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try searching for pages, topics like Tesla or SpaceX, or Elon facts
                  </p>
                </div>
              )}

              {/* Initial state */}
              {!query && !showRecentSection && (
                <div className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Quick access
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {searchIndex.pages.slice(0, 4).map((page) => (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => handleResultClick(page)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground text-left"
                      >
                        {getIconComponent(page.icon, "w-4 h-4 shrink-0 text-muted-foreground")}
                        <span className="truncate">{page.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/50 bg-muted/20">
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted/50 rounded border border-border/50 font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-muted/50 rounded border border-border/50 font-mono">↓</kbd>
                  <span className="ml-1">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted/50 rounded border border-border/50 font-mono">↵</kbd>
                  <span className="ml-1">Select</span>
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                Press <kbd className="px-1 py-0.5 bg-muted/50 rounded border border-border/50 font-mono">/</kbd> anywhere to search
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
