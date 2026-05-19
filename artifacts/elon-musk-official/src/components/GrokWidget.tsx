import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";

const grokMessages = [
  { role: "grok", text: "I'm Grok, a AI assistant from xAI. How can I help you today?" },
];

export default function GrokWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(grokMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const grokReply = { role: "grok", text: "That's an interesting question. Grok is designed to help with a wide range of topics — from science and technology to current events. What specific aspect would you like to explore?" };
      setMessages((m) => [...m, grokReply]);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Open Grok AI"
      >
        {open ? <X className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] bg-background border border-border shadow-2xl flex flex-col" style={{ height: 520 }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-foreground">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Grok</p>
                <p className="text-[10px] text-white/60">xAI Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "grok" && (
                  <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-foreground" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${msg.role === "grok" ? "bg-muted border border-border" : "bg-foreground text-background"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="px-5 py-4 border-t border-border flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask Grok anything..."
              className="flex-1 bg-muted border border-border px-4 py-2 text-sm focus:outline-none focus:border-foreground"
            />
            <button onClick={send} className="w-10 h-10 bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}