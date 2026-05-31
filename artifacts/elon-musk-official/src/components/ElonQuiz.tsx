import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Share2, ChevronRight, Brain } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  { id: 1, question: "What year was Elon Musk born?", options: ["1971", "1973", "1969", "1975"], correct: 0 },
  { id: 2, question: "Where was Elon Musk born?", options: ["Pretoria, South Africa", "Johannesburg", "Cape Town", "Toronto"], correct: 0 },
  { id: 3, question: "How many children does Elon Musk have?", options: ["11+", "7", "9", "5"], correct: 0 },
  { id: 4, question: "Which company did Elon Musk co-found first?", options: ["Zip2", "PayPal", "SpaceX", "Tesla"], correct: 0 },
  { id: 5, question: "What was the name of Elon's first company that was sold for $307 million?", options: ["Zip2", "X.com", "Tesla", "SolarCity"], correct: 0 },
  { id: 6, question: "Which company developed the first commercially successful electric car?", options: ["Tesla", "Fisker", "Rivian", "Lucid"], correct: 0 },
  { id: 7, question: "What is the name of Elon's AI company?", options: ["xAI", "OpenAI", "DeepMind", "Anthropic"], correct: 0 },
  { id: 8, question: "What brain-computer interface company did Elon co-found?", options: ["Neuralink", "Kernel", "Synchron", "Paradromics"], correct: 0 },
  { id: 9, question: "How much did Elon pay for Twitter/X in 2022?", options: ["$44 billion", "$54 billion", "$35 billion", "$20 billion"], correct: 0 },
  { id: 10, question: "What is the name of Elon's rocket company?", options: ["SpaceX", "Blue Origin", "Rocket Lab", "ULA"], correct: 0 },
];

type Phase = "intro" | "quiz" | "result";

function getResultMessage(score: number) {
  if (score >= 9) return { title: "🚀 Musk Master!", message: "You're a true Elon expert! The future is bright." };
  if (score >= 7) return { title: "⭐ Impressive!", message: "You really know your Elon Musk facts." };
  if (score >= 5) return { title: "💡 Not Bad!", message: "You know the basics. Keep learning about the future!" };
  return { title: "📚 Keep Exploring!", message: "Time to dive deeper into Elon's incredible journey." };
}

export default function ElonQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [shareText, setShareText] = useState("");

  const handleStart = () => { setPhase("quiz"); setCurrent(0); setScore(0); setSelected(null); setAnswered(false); };
  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[current].correct) setScore((s) => s + 1);
  };
  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalScore = selected === questions[current].correct ? score : score;
      setShareText(`I scored ${selected === questions[current].correct ? score : score}/${questions.length} on the Elon Musk Quiz! Can you beat me? 🚀`);
      setPhase("result");
    }
  };
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      // fallback
    }
  };

  const result = getResultMessage(answered && current === questions.length - 1 ? (selected === questions[current].correct ? score : score) : (current === questions.length - 1 ? score : score));

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-border">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-muted/50 border border-border/50 text-xs uppercase tracking-widest text-muted-foreground">
            <Brain className="w-3.5 h-3.5" />
            Test Your Knowledge
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            The Elon Musk Quiz
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">10 questions about the world's most ambitious entrepreneur.</p>
        </div>

        {/* INTRO */}
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-foreground/5 border border-border flex items-center justify-center">
                <Trophy className="w-10 h-10 text-foreground/60" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">10 questions &middot; multiple choice &middot; instant results</p>
              </div>
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-medium text-sm uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
              >
                Start Quiz
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* QUIZ */}
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground dark:bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((current) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {current + 1} / {questions.length}
                </span>
              </div>

              {/* Score */}
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Score</p>
                <p className="text-sm font-semibold">{score}</p>
              </div>

              {/* Question */}
              <div className="bg-card border border-border p-6 md:p-8 rounded-none">
                <p className="text-base md:text-lg font-medium text-foreground leading-snug mb-6">
                  {questions[current].question}
                </p>
                <div className="space-y-3">
                  {questions[current].options.map((opt, idx) => {
                    const isCorrect = idx === questions[current].correct;
                    const isSelected = selected === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(idx)}
                        disabled={answered}
                        className={`
                          w-full text-left px-5 py-4 text-sm font-medium rounded-none border transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground
                          ${!answered
                            ? "border-border hover:border-foreground/40 hover:bg-muted/50"
                            : isCorrect
                            ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
                            : isSelected
                            ? "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400"
                            : "border-border/50 opacity-50"
                          }
                        `}
                        aria-label={`Option ${idx + 1}: ${opt}${answered && isCorrect ? " (correct answer)" : ""}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`
                            w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0
                            ${!answered ? "border-border" : isCorrect ? "border-green-500 bg-green-500 text-white" : isSelected ? "border-red-500 bg-red-500 text-white" : "border-border/50"}
                          `}>
                            {answered && (isCorrect || isSelected) ? (
                              isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />
                            ) : (
                              String.fromCharCode(65 + idx)
                            )}
                          </span>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next / Result */}
              {answered && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                    aria-label={current < questions.length - 1 ? "Next question" : "See results"}
                  >
                    {current < questions.length - 1 ? "Next Question" : "See Results"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 mx-auto rounded-2xl bg-foreground/5 border border-border flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-primary" />
              </motion.div>
              <div>
                <p className="text-6xl font-bold tracking-tight text-foreground mb-2">{score}/{questions.length}</p>
                <h3 className="text-xl font-bold text-foreground">{result.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{result.message}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => { setPhase("intro"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium text-xs uppercase tracking-[0.14em] hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share Score
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}