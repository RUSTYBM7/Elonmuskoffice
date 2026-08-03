import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Share2,
  ChevronRight,
  Brain,
  Zap,
  Timer,
  Star,
  TrendingUp,
  Sparkles,
  Rocket,
  Flame,
  ArrowRight,
} from "lucide-react";

/* ──────────────── Types ──────────────── */

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: "early" | "spacex" | "tesla" | "personal" | "other";
  difficulty: "easy" | "medium" | "hard";
}

interface QuizResult {
  questionId: number;
  selected: number;
  correct: number;
  timeSpent: number;
}

type Phase = "intro" | "quiz" | "result";

/* ──────────────── Questions ──────────────── */

const questions: Question[] = [
  // ── Easy ──
  {
    id: 1,
    question: "What year was Elon Musk born?",
    options: ["1969", "1973", "1975", "1971"],
    correct: 3,
    category: "personal",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Where was Elon Musk born?",
    options: ["Toronto", "Cape Town", "Pretoria, South Africa", "Johannesburg"],
    correct: 2,
    category: "personal",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "What is the name of Elon's rocket company?",
    options: ["Blue Origin", "ULA", "Rocket Lab", "SpaceX"],
    correct: 3,
    category: "spacex",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "Which company did Elon Musk co-found first?",
    options: ["PayPal", "SpaceX", "Zip2", "Tesla"],
    correct: 2,
    category: "early",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "What brain-computer interface company did Elon co-found?",
    options: ["Kernel", "Synchron", "Paradromics", "Neuralink"],
    correct: 3,
    category: "other",
    difficulty: "easy",
  },
  // ── Medium ──
  {
    id: 6,
    question: "How much did Elon pay for Twitter/X in 2022?",
    options: ["$54 billion", "$20 billion", "$35 billion", "$44 billion"],
    correct: 3,
    category: "other",
    difficulty: "medium",
  },
  {
    id: 7,
    question: "What was Elon's first company sold for ~$307 million?",
    options: ["Tesla", "X.com", "Zip2", "SolarCity"],
    correct: 2,
    category: "early",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "What degrees did Elon earn at the University of Pennsylvania?",
    options: ["Engineering & Business", "Aerospace & Finance", "Physics & Economics", "Computer Science & Math"],
    correct: 2,
    category: "personal",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "What was the payload on the first Falcon Heavy launch in 2018?",
    options: ["Elon's personal Tesla Roadster", "A dummy crew capsule", "A satellite", "A Mars rover prototype"],
    correct: 0,
    category: "spacex",
    difficulty: "medium",
  },
  {
    id: 10,
    question: "What year did SpaceX first land a Falcon 9 booster?",
    options: ["2016", "2013", "2015", "2014"],
    correct: 2,
    category: "spacex",
    difficulty: "medium",
  },
  {
    id: 11,
    question: "What is the name of Elon's AI company founded in 2023?",
    options: ["DeepMind", "OpenAI", "Anthropic", "xAI"],
    correct: 3,
    category: "other",
    difficulty: "medium",
  },
  {
    id: 12,
    question: "Which Tesla model became the best-selling electric car of all time?",
    options: ["Cybertruck", "Model Y", "Model S", "Model 3"],
    correct: 3,
    category: "tesla",
    difficulty: "medium",
  },
  // ── Hard ──
  {
    id: 13,
    question: "How much did Elon invest of his own money to start SpaceX in 2002?",
    options: ["$75 million", "$50 million", "$100 million", "$200 million"],
    correct: 2,
    category: "spacex",
    difficulty: "hard",
  },
  {
    id: 14,
    question: "At what age did Elon sell his first video game to a magazine?",
    options: ["14", "16", "10", "12"],
    correct: 3,
    category: "personal",
    difficulty: "hard",
  },
  {
    id: 15,
    question: "What was the name of the book Elon read at age 9?",
    options: ["The entire Encyclopedia Britannica", "The Hitchhiker's Guide to the Galaxy", "Structures by J.E. Gordon", "Foundation by Isaac Asimov"],
    correct: 0,
    category: "personal",
    difficulty: "hard",
  },
  {
    id: 16,
    question: "What year did Tesla achieve its first profitable quarter?",
    options: ["2013", "2009", "2012", "2010"],
    correct: 1,
    category: "tesla",
    difficulty: "hard",
  },
  {
    id: 17,
    question: "What martial arts has Elon trained in?",
    options: ["Boxing and Muay Thai only", "Krav Maga and Karate", "Wrestling and Judo", "Kyokushin Karate, Tae Kwon Do, Judo, BJJ"],
    correct: 3,
    category: "personal",
    difficulty: "hard",
  },
  {
    id: 18,
    question: "What was the SEC fine amount Musk paid in 2018 over the 'funding secured' tweet?",
    options: ["$10 million", "$5 million", "$20 million", "$40 million"],
    correct: 2,
    category: "tesla",
    difficulty: "hard",
  },
  {
    id: 19,
    question: "What year did SpaceX's Dragon first dock with the ISS?",
    options: ["2011", "2014", "2010", "2012"],
    correct: 3,
    category: "spacex",
    difficulty: "hard",
  },
  {
    id: 20,
    question: "What is the name of Elon's tunneling company?",
    options: ["The Boring Company", "Hyperloop One", "Tunnel Vision", "DigDeep"],
    correct: 0,
    category: "other",
    difficulty: "medium",
  },
];

/* ──────────────── Helpers ──────────────── */

function getResultMessage(score: number, total: number) {
  const pct = (score / total) * 100;
  if (pct >= 90) return { title: "🚀 Musk Master!", message: "You're a true Elon expert! The future is bright.", tier: "master" as const };
  if (pct >= 75) return { title: "⭐ Impressive!", message: "You really know your Elon Musk facts.", tier: "expert" as const };
  if (pct >= 50) return { title: "💡 Not Bad!", message: "You know the basics. Keep learning about the future!", tier: "novice" as const };
  return { title: "📚 Keep Exploring!", message: "Time to dive deeper into Elon's incredible journey.", tier: "beginner" as const };
}

function getDifficultyColor(diff: Question["difficulty"]) {
  switch (diff) {
    case "easy": return "text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20";
    case "medium": return "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
    case "hard": return "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
  }
}

function getCategoryIcon(cat: Question["category"]) {
  switch (cat) {
    case "spacex": return <Rocket className="w-3 h-3" />;
    case "tesla": return <Zap className="w-3 h-3" />;
    case "personal": return <Star className="w-3 h-3" />;
    case "early": return <TrendingUp className="w-3 h-3" />;
    default: return <Sparkles className="w-3 h-3" />;
  }
}

/* ──────────────── Component ──────────────── */

export default function ElonQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [shareText, setShareText] = useState("");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  /* Timer */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerActive && !answered) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, answered]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* Handlers */
  const handleStart = useCallback(() => {
    setPhase("quiz");
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setStreak(0);
    setBestStreak(0);
    setResults([]);
    setTimer(0);
    setIsTimerActive(true);
    setTotalTime(0);
  }, []);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      setAnswered(true);
      setIsTimerActive(false);

      const isCorrect = idx === questions[current].correct;
      if (isCorrect) {
        setScore((s) => s + 1);
        setStreak((s) => {
          const newStreak = s + 1;
          setBestStreak((b) => Math.max(b, newStreak));
          return newStreak;
        });
      } else {
        setStreak(0);
      }

      setResults((prev) => [
        ...prev,
        {
          questionId: questions[current].id,
          selected: idx,
          correct: questions[current].correct,
          timeSpent: timer,
        },
      ]);
      setTotalTime((t) => t + timer);
    },
    [answered, current, timer]
  );

  const handleNext = useCallback(() => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimer(0);
      setIsTimerActive(true);
    } else {
      const finalScore =
        selected === questions[current].correct ? score + 1 : score;
      setShareText(
        `I scored ${finalScore}/${questions.length} on the Elon Musk Quiz! Can you beat me? 🚀`
      );
      setPhase("result");
      setIsTimerActive(false);
    }
  }, [current, score, selected]);

  const handleShare = useCallback(async () => {
    const text = shareText || `I scored ${score}/${questions.length} on the Elon Musk Quiz! Can you beat me? 🚀`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Elon Musk Quiz",
          text,
          url: typeof window !== "undefined" ? window.location.href : "",
        });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // fallback silent
    }
  }, [shareText, score]);

  const handleRestart = useCallback(() => {
    setPhase("intro");
  }, []);

  const result = getResultMessage(
    phase === "result" ? score : 0,
    questions.length
  );

  const currentQ = questions[current];
  const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100;
  const avgTime = results.length > 0 ? Math.round(totalTime / results.length) : 0;

  /* ──────────────── Render ──────────────── */

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-border">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-muted/50 border border-border/50 text-xs uppercase tracking-widest text-muted-foreground"
          >
            <Brain className="w-3.5 h-3.5" />
            Test Your Knowledge
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            The Elon Musk Quiz
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {questions.length} questions · multiple choice · timed · instant results
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ═════════════════ INTRO ═════════════════ */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="text-center space-y-8"
            >
              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {[
                  { icon: <Zap className="w-5 h-5" />, label: "Questions", value: questions.length },
                  { icon: <Timer className="w-5 h-5" />, label: "Timed", value: "Yes" },
                  { icon: <Flame className="w-5 h-5" />, label: "Streaks", value: "Yes" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="p-3 rounded-xl bg-card border border-border/50"
                  >
                    <div className="text-muted-foreground mb-1 flex justify-center">{stat.icon}</div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 mx-auto rounded-2xl bg-foreground/5 border border-border flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-foreground/60" />
              </motion.div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Categories: Personal, SpaceX, Tesla, Early Career & More
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Easy · Medium · Hard difficulty levels
                </p>
              </div>

              <motion.button
                type="button"
                onClick={handleStart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-medium text-sm uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
              >
                Start Quiz
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* ═════════════════ QUIZ ═════════════════ */}
          {phase === "quiz" && (
            <motion.div
              key={`quiz-${current}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Top bar: progress + timer + streak */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground dark:bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap tabular-nums">
                  {current + 1} / {questions.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border/50">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-semibold tabular-nums">{score}</span>
                  </div>
                  {streak > 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20"
                    >
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 tabular-nums">
                        {streak}x
                      </span>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
                  <Timer className="w-3 h-3" />
                  {formatTime(timer)}
                </div>
              </div>

              {/* Question card */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Question header */}
                <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`
                      inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border
                      ${getDifficultyColor(currentQ.difficulty)}
                    `}>
                      {currentQ.difficulty}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-muted/50 border border-border/50 text-muted-foreground">
                      {getCategoryIcon(currentQ.category)}
                      {currentQ.category}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <p className="text-base md:text-lg font-medium text-foreground leading-snug">
                    {currentQ.question}
                  </p>
                </div>

                {/* Options */}
                <div className="px-5 pb-5 space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = idx === currentQ.correct;
                    const isSelected = selected === idx;
                    return (
                      <motion.button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(idx)}
                        disabled={answered}
                        whileHover={!answered ? { scale: 1.01 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                        className={`
                          w-full text-left px-4 py-3.5 text-sm font-medium rounded-lg border transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground
                          ${!answered
                            ? "border-border hover:border-foreground/30 hover:bg-muted/40 bg-card"
                            : isCorrect
                            ? "border-green-500/60 bg-green-500/10 text-green-700 dark:text-green-400"
                            : isSelected
                            ? "border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-400"
                            : "border-border/40 bg-card/50 opacity-50"
                          }
                        `}
                        aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}${answered && isCorrect ? " (correct answer)" : ""}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`
                            w-7 h-7 rounded-full border flex items-center justify-center text-xs flex-shrink-0 font-semibold transition-colors
                            ${!answered
                              ? "border-border bg-muted/50 text-muted-foreground"
                              : isCorrect
                              ? "border-green-500 bg-green-500 text-white"
                              : isSelected
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-border/50 bg-muted/30 text-muted-foreground/50"
                            }
                          `}>
                            {answered && (isCorrect || isSelected) ? (
                              isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                            ) : (
                              String.fromCharCode(65 + idx)
                            )}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {answered && isCorrect && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400"
                            >
                              Correct
                            </motion.span>
                          )}
                          {answered && isSelected && !isCorrect && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400"
                            >
                              Wrong
                            </motion.span>
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback + Next */}
              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-between"
                  >
                    <div className="text-xs text-muted-foreground">
                      {selected === currentQ.correct ? (
                        <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct! +1 point
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          The correct answer was <strong className="ml-0.5">{String.fromCharCode(65 + currentQ.correct)}</strong>
                        </span>
                      )}
                    </div>
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                      aria-label={current < questions.length - 1 ? "Next question" : "See results"}
                    >
                      {current < questions.length - 1 ? "Next Question" : "See Results"}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ═════════════════ RESULT ═════════════════ */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              {/* Score circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                className="relative w-28 h-28 mx-auto"
              >
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-muted/30"
                  />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    initial={{ strokeDashoffset: `${2 * Math.PI * 42}` }}
                    animate={{
                      strokeDashoffset: `${2 * Math.PI * 42 * (1 - score / questions.length)}`,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    className={`
                      ${score / questions.length >= 0.75 ? "text-green-500" :
                        score / questions.length >= 0.5 ? "text-amber-500" : "text-red-500"}
                    `}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{score}</span>
                  <span className="text-xs text-muted-foreground">/{questions.length}</span>
                </div>
              </motion.div>

              {/* Result text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-foreground">{result.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{result.message}</p>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-3 max-w-xs mx-auto"
              >
                {[
                  { label: "Accuracy", value: `${Math.round((score / questions.length) * 100)}%`, icon: <TrendingUp className="w-4 h-4" /> },
                  { label: "Best Streak", value: `${bestStreak}`, icon: <Flame className="w-4 h-4" /> },
                  { label: "Avg Time", value: `${avgTime}s`, icon: <Timer className="w-4 h-4" /> },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-card border border-border/50">
                    <div className="text-muted-foreground mb-1 flex justify-center">{s.icon}</div>
                    <div className="text-lg font-bold text-foreground">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Question review */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-left space-y-2"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-3">Review</p>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {results.map((r) => {
                    const q = questions.find((qq) => qq.id === r.questionId);
                    if (!q) return null;
                    const isCorrect = r.selected === r.correct;
                    return (
                      <div
                        key={r.questionId}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-xs ${
                          isCorrect
                            ? "border-green-500/20 bg-green-500/5"
                            : "border-red-500/20 bg-red-500/5"
                        }`}
                      >
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        </span>
                        <span className="flex-1 truncate font-medium text-foreground">{q.question}</span>
                        <span className="text-muted-foreground tabular-nums">{r.timeSpent}s</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
              >
                <motion.button
                  type="button"
                  onClick={handleRestart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium text-xs uppercase tracking-[0.14em] hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleShare}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share Score
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
