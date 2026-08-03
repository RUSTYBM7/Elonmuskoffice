'use client';
import { motion } from 'framer-motion';
import { Quote, Copy, Twitter, RefreshCw, Heart, Share2, Zap, Rocket, Lightbulb, Target, Coffee } from 'lucide-react';
import { useState } from 'react';

const muskQuotes = [
  {
    text: "When something is important enough, you do it even if the odds are not in your favor.",
    category: "Vision",
    icon: Rocket,
    likes: 45200
  },
  {
    text: "I think it's very important to have a feedback loop, where you're constantly thinking about what you've done and how you could be doing it better.",
    category: "Growth",
    icon: Target,
    likes: 38100
  },
  {
    text: "Persistence is very important. You should not give up unless you are forced to give up.",
    category: "Persistence",
    icon: Zap,
    likes: 52600
  },
  {
    text: "The first step is to establish that something is possible; then probability will occur.",
    category: "Vision",
    icon: Lightbulb,
    likes: 44700
  },
  {
    text: "If you're trying to create a company, it's like baking a cake. You have to have all the ingredients in the right proportion.",
    category: "Business",
    icon: Coffee,
    likes: 39200
  },
  {
    text: "I don't create companies for the sake of creating companies. I create companies to make a difference in the world.",
    category: "Purpose",
    icon: Rocket,
    likes: 58900
  },
  {
    text: "The path to the CEO's office was not through a conventional career path, and I had to figure out a lot of things on my own.",
    category: "Journey",
    icon: Target,
    likes: 41500
  },
  {
    text: "You have to be pretty driven to make it happen. So if you're not serious about it, don't even bother.",
    category: "Drive",
    icon: Zap,
    likes: 47300
  },
  {
    text: "I'm interested in things that change the world or that affect the future. Vastly, vastly ambitious ideas.",
    category: "Vision",
    icon: Lightbulb,
    likes: 61200
  },
  {
    text: "Failure is an option here. If things are not failing, you are not innovating enough.",
    category: "Innovation",
    icon: Rocket,
    likes: 73500
  },
  {
    text: "Life is too short for long-term grudges. I don't waste my energy on that.",
    category: "Mindset",
    icon: Coffee,
    likes: 35800
  },
  {
    text: "I think we have a duty to the future. Making life multiplanetary is one of the most important things we can do.",
    category: "Purpose",
    icon: Rocket,
    likes: 82100
  },
];

const quoteCategories = ['All', 'Vision', 'Growth', 'Persistence', 'Innovation', 'Purpose', 'Business'];

export default function MuskQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [category, setCategory] = useState('All');
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredQuotes = category === 'All'
    ? muskQuotes
    : muskQuotes.filter(q => q.category === category);

  const getNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * filteredQuotes.length);
      } while (newIndex === currentQuote && filteredQuotes.length > 1);
      setCurrentQuote(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${filteredQuotes[currentQuote].text}" - Elon Musk`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`"${filteredQuotes[currentQuote].text}" - @elonmusk`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const Icon = filteredQuotes[currentQuote].icon;

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-amber-950/20 to-black border-t border-amber-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-amber-500/30 bg-amber-500/5 rounded-full">
            <Quote className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400 font-medium">
              Words of Wisdom
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Elon Musk Quotes
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Timeless wisdom from one of the greatest innovators of our generation.
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className={`relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-8 md:p-12 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Icon className="w-4 h-4 text-amber-500" />
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                {filteredQuotes[currentQuote].category}
              </span>
            </div>

            {/* Quote Text */}
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mt-6 mb-8"
            >
              "{filteredQuotes[currentQuote].text}"
            </motion.p>

            {/* Attribution */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <p className="text-white font-medium">Elon Musk</p>
                  <p className="text-white/50 text-sm">CEO of Tesla, SpaceX, xAI</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/50">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{filteredQuotes[currentQuote].likes.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-white/10">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                {copied ? (
                  <>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <Twitter className="w-4 h-4" />
                Share
              </button>

              <button
                onClick={getNewQuote}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors text-white font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                New Quote
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {quoteCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  category === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quote Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/40"
        >
          <p>{filteredQuotes.length} quotes in this category</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://twitter.com/elonmusk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-full hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25"
          >
            <Twitter className="w-4 h-4" />
            Follow Elon on X
          </a>
        </motion.div>
      </div>
    </section>
  );
}
