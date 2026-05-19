import { useState, useRef, useEffect } from "react";
import { X, Send, Mic, ChevronDown } from "lucide-react";
import GrokLogo from "./GrokLogo";

const MODELS = [
  { id: "grok-3", label: "Grok 3", badge: "Best" },
  { id: "grok-3-beta", label: "Grok 3 Beta", badge: null },
  { id: "grok-2", label: "Grok 2", badge: null },
];

const SYSTEM_PROMPTS: Record<string, string> = {
  "grok-3": "You are Grok 3, an AI assistant built by xAI. You are helpful, witty, and unafraid to answer tough questions.",
  "grok-3-beta": "You are Grok 3 Beta, an experimental AI assistant built by xAI.",
  "grok-2": "You are Grok 2, an AI assistant built by xAI. You are helpful and direct.",
};

const INITIAL_MESSAGES: Record<string, string> = {
  "grok-3": "I'm Grok 3, built by xAI. Ask me anything — no guardrails, no filters.",
  "grok-3-beta": "Grok 3 Beta here. What would you like to explore?",
  "grok-2": "Grok 2 at your service. What can I help you with?",
};

const THINKING_STATES = [
  "Analyzing your question...",
  "Fetching real-time data...",
  "Processing with Grok 3...",
  "Thinking...",
  "Working it out...",
];

function getGrokResponse(model: string, query: string): string {
  const q = query.toLowerCase();
  if (q.includes("who are you") || q.includes("what are you")) {
    return `I'm Grok, an AI assistant created by xAI. I'm designed to be maximally helpful while staying truthful — even when the answers aren't comfortable. What would you like to know?`;
  }
  if (q.includes("elon") || q.includes("musk")) {
    return `Elon Musk is my creator and the founder of xAI. He's also behind SpaceX, Tesla, Neuralink, The Boring Company, and X. Is there something specific about his work you'd like to discuss?`;
  }
  if (q.includes("meaning of life") || q.includes("universe")) {
    return `The answer to the meaning of life, the universe, and everything? According to Douglas Adams — it's 42. But Grok is here to help you find your own answer.`;
  }
  if (q.includes("spacex") || q.includes("mars")) {
    return `SpaceX's mission is to make humanity multi-planetary. Starship is the vehicle that will take us to Mars. The first crewed missions could happen within this decade. The long-term goal is a self-sustaining city of a million people on Mars by 2050.`;
  }
  if (q.includes("tesla") || q.includes("robotaxi") || q.includes("fsd")) {
    return `Tesla is accelerating the world's transition to sustainable energy. Their Full Self-Driving (FSD) v13 is making real progress, and the Robotaxi (Cybercab) is set to launch commercially. The Optimus robot is also in active development.`;
  }
  if (q.includes("ai") || q.includes("agi") || q.includes(" superintelligence")) {
    return `AI is advancing faster than most people realize. xAI is building Grok to be truth-seeking and useful — not politically correct. The real risk isn't AI going evil; it's AI being built wrong. That's why alignment matters.`;
  }
  if (q.includes("x ai") || q.includes("xai")) {
    return `xAI was founded in July 2023 by Elon Musk to build AI that understands the universe. Grok is our flagship model. We're building the largest GPU cluster in the world to train the next generation of AI systems.`;
  }
  if (q.length < 10) {
    return `That's a short one. Give me something to work with and I'll give you a real answer.`;
  }
  return `Interesting question. Grok is designed to give you the straight answer — even when it's uncomfortable. Based on what you've asked: this is a complex topic with multiple angles. The most important thing to understand is that context matters enormously. What specific aspect would you like to go deeper on?`;
}

export default function GrokWidget() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState("grok-3");
  const [messages, setMessages] = useState([
    { role: "grok" as const, text: INITIAL_MESSAGES["grok-3"] },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const handleSend = () => {
    if (!input.trim() || thinking) return;
    const userMsg = { role: "user" as const, text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      const grokReply = { role: "grok" as const, text: getGrokResponse(model, input) };
      setMessages((m) => [...m, grokReply]);
    }, 1800 + Math.random() * 1200);
  };

  const handleModelChange = (id: string) => {
    setModel(id);
    setModelMenuOpen(false);
    setMessages([
      { role: "grok" as const, text: INITIAL_MESSAGES[id] },
    ]);
  };

  const currentModelLabel = MODELS.find((m) => m.id === model)?.label || "Grok";

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Open Grok AI"
      >
        <GrokLogo size={28} className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 flex h-[600px] w-[420px] max-w-full max-h-full bg-black text-white flex-col border-l border-white/10"
      style={{ height: "calc(100dvh - 0px)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
        <div className="flex items-center gap-3">
          <GrokLogo size={28} className="text-white" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Grok</span>
            {/* Model selector */}
            <div className="relative">
              <button
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
                className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white/70 transition-colors"
              >
                {currentModelLabel}
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              {modelMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[#111] border border-white/10 z-50">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleModelChange(m.id)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/5 ${m.id === model ? "text-white" : "text-white/60"}`}
                    >
                      <span>{m.label}</span>
                      {m.badge && <span className="text-[9px] bg-white/10 px-1.5 py-0.5">{m.badge}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors" title="Voice mode">
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "grok" && (
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                <GrokLogo size={16} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
              msg.role === "grok"
                ? "bg-[#111] border border-white/10 text-white/90"
                : "bg-white text-black"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
              <GrokLogo size={16} className="text-white animate-pulse" />
            </div>
            <div className="bg-[#111] border border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
                <span className="text-xs text-white/40">
                  {THINKING_STATES[Math.floor(Math.random() * THINKING_STATES.length)]}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-white/10 bg-black">
        <div className="flex items-end gap-2 bg-[#111] border border-white/10 px-3 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask Grok anything..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 resize-none focus:outline-none min-h-[20px] max-h-[120px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || thinking}
            className="w-8 h-8 flex items-center justify-center bg-white text-black disabled:opacity-30 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[9px] text-white/20 mt-2 text-center">
          Grok may make mistakes. Verify important information independently.
        </p>
      </div>
    </div>
  );
}