import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const quotes = [
  "When something is important enough, you do it even if the odds are not in your favor.",
  "I think it is possible for ordinary people to choose to be extraordinary.",
  "The first step is to establish that something is possible; then probability will occur.",
  "Failure is an option here. If things are not failing, you are not innovating enough.",
  "Persistence is very important. You should not give up unless you are forced to give up.",
  "If you get up in the morning and think the future is going to be better, it is a bright day.",
  "Some people don't like change, but you need to embrace change if the alternative is disaster.",
  "I would like to die on Mars. Just not on impact.",
  "Great companies are built on great products.",
  "If you're trying to create a company, it's like baking a cake. You have to have all the ingredients in the right proportion.",
];

export default function Vision() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        let next = Math.floor(Math.random() * quotes.length);
        // avoid repeating the same quote twice in a row
        if (next === prev) next = (prev + 1) % quotes.length;
        return next;
      });
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8">
          In His Words
        </p>

        <div className="relative min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl font-medium leading-snug tracking-tight text-foreground"
            >
              &ldquo;{quotes[index]}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Elon Musk
        </div>

        {/* Quote indicator dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {quotes.map((_, i) => (
            <span
              key={i}
              className={`h-1 transition-all duration-500 ${
                i === index ? "w-6 bg-foreground" : "w-1 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
