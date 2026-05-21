import { useState, useRef, useEffect } from "react";
import { X, Send, Mic, ChevronDown } from "lucide-react";
import GrokLogo from "./GrokLogo";

const MODELS = [
  { id: "grok-3", label: "Grok 3", badge: "Best" },
  { id: "grok-3-beta", label: "Grok 3 Beta", badge: null },
  { id: "grok-2", label: "Grok 2", badge: null },
];

const SYSTEM_PROMPTS: Record<string, string> = {
  "grok-3": "You are Grok 3, built by xAI, a world-class AI with comprehensive knowledge of this website (elon-musk-official.vercel.app). You know every detail about the Musk Foundation, all payment methods, donation options, Elon Musk's biography, ventures, timeline, and how to assist users with any question about the site. You respond like a knowledgeable concierge who can guide users through anything.",
  "grok-3-beta": "You are Grok 3 Beta — the experimental AI with full knowledge of this website. You know the Musk Foundation inside and out: every payment option, all crypto wallets, bank transfer details, donation flow, and Elon's full life story.",
  "grok-2": "You are Grok 2, built by xAI, with extensive knowledge of this website and the Musk Foundation. You can answer any question about donations, payments, Elon Musk's history, and the site's features.",
};

const INITIAL_MESSAGES: Record<string, string> = {
  "grok-3": "I'm Grok 3, your guide to the Musk Foundation official website. I know this site inside and out — from crypto wallets to bank transfers, from Elon's biography to the latest ventures. Ask me anything about the Foundation, making a donation, or learning about Elon's work.",
  "grok-3-beta": "Grok 3 Beta here — your personal assistant for the Musk Foundation website. I have complete knowledge of every payment method, all 8 crypto tokens, both bank accounts, and Elon's full story. How can I help you today?",
  "grok-2": "Grok 2 at your service. I have deep knowledge of this website — the Musk Foundation, donation options, crypto payments, bank transfers, and everything about Elon Musk's work. What would you like to know?",
};

const THINKING_STATES = [
  "Searching my knowledge base...",
  "Reviewing Musk Foundation data...",
  "Analyzing your question...",
  "Fetching site information...",
  "Processing with Grok 3...",
];

const WEBSITE_KNOWLEDGE = `
WEBSITE: https://elon-musk-official.vercel.app (Musk Foundation Official)

PAGES & STRUCTURE:
- HOME (/) — Hero, portrait, bio, Forbes ($800B), timeline, ventures (Tesla, SpaceX, Neuralink, Boring Company, xAI, X, Starlink), company logos, photo gallery, newsletter, press ticker
- ABOUT (/about) — Full biography, timeline, ventures, photo gallery, GrokWidget AI chat
- CONTACT (/contact) — Contact information and form
- DONATE (/donate) — Tesla-styled donation page (2 steps: fund + amount, name/email)
- CRYPTO-ENDOWMENT (/crypto-endowment) — Password-protected private payment gate (password: Elon2026)
- ADMIN-CRYPTO (/admin-crypto) — Full payment page (3 steps: amount, details, payment method)

PAYMENT METHODS (Crypto Endowment):

CRYPTO WALLETS (8 tokens):
1. Bitcoin (BTC): bc1q5twe754lnzvqn5z9jpm3s8z48nqvfx9e5wevv9 — Bitcoin network
2. Ethereum (ETH): 0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6 — Ethereum ERC-20
3. Tether (USDT): 0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6 — Ethereum ERC-20
4. USD Coin (USDC): 0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6 — Ethereum ERC-20
5. Dogecoin (DOGE): D9EcRA1L3KFhk7DA9QoVUnyQr4HqMCyi3Q — Dogecoin network
6. Crypto.com (CRO): 0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6 — Ethereum ERC-20
7. Solana (SOL): 4DXaUMq5S5HgDmq1jHcLDkx6ru2EF9sadyzMWwSadWWe — Solana network
8. Ripple (XRP): rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M — XRP Ledger

BANK TRANSFERS:
1. Chime / Bancorp Bank: Routing 031101279, Account 766165701091, Holder: Mary Ralston, Checking, 1-2 business days
2. Community Federal Savings Bank: Routing 026073150, Account 863004856471, Holder: MARY E RALSTON, Address: 89-16 Jamaica Avenue, Woodhaven NY 11421, Recipient: 110 N. College Avenue Suite 500, Tyler TX 75702, 1-2 business days

PAYPAL: Real PayPal payment link available via the wire transfer section of the payment page

PAYMENT STEPS (admin-crypto page):
Step 1: Choose amount ($25, $50, $100, $250, $500, $1000 or custom), switch to Crypto/Card/Wire
Step 2: Enter first name, last name, email address
Step 3: See wallet address (crypto), card form (card), or bank details + PayPal (wire) — copy addresses, click to open PayPal, or initiate payment. After payment, shows verification screen with "You will receive a notification confirmation once payment is verified."

ABOUT ELON MUSK:
- Full name: Elon Reeves Musk
- Born: June 28, 1971, Pretoria, South Africa
- Father: Errol Musk (electromechanical engineer, pilot, sailor)
- Mother: Maye Musk (model, dietitian, Miss South Africa 1969)
- Companies: Tesla (Technoking & CEO), SpaceX (Founder, CEO & Chief Engineer), Neuralink (Co-founder), The Boring Company (Founder), xAI (Founder), X/Twitter (Executive Chairman & CTO), Starlink (SpaceX constellation)
- Net worth: $800 billion (Forbes — world's wealthiest)
- Children: Ashya, X Æ A-12, Exa Dark Sideræl, and others
- Mars mission: Starship to establish self-sustaining city of 1 million by 2050
- Key achievements: SpaceX rocket landings, Tesla FSD, Neuralink brain implant, xAI Grok

ADMIN PORTAL (/admin):
- Dashboard: Donation stats, quick actions
- Email: Send HTML emails with templates (Payment Confirmed, Pending, Declined, General Inquiry)
- Crypto: View and edit all 8 crypto wallet addresses inline
- Bank: View and copy both bank account details

GIVE REAL ANSWERS about all these topics. If a user asks about payments, guide them through the process. If they ask about crypto, give exact addresses. If they ask about donations, explain the flow. If they ask about Elon, give rich detailed answers. You are the site expert.
`;

function getGrokResponse(model: string, query: string): string {
  const q = query.toLowerCase();

  // Site navigation
  if (q.includes("donate") || q.includes("donation") || q.includes("give money") || q.includes("support")) {
    return `You can donate to the Musk Foundation through several methods:\n\n**Crypto** — Choose from 8 tokens (BTC, ETH, USDT, USDC, DOGE, CRO, SOL, XRP). Each has a unique wallet address. Go to /crypto-endowment and enter the access code **Elon2026**.\n\n**Card** — Visa, Mastercard, Amex via the payment page.\n\n**Wire Transfer** — Direct bank transfer (Chime or Community Federal) or PayPal.\n\n**Steps:** 1) Choose amount → 2) Enter name + email → 3) Copy wallet/bank details and complete payment. You'll receive a confirmation email within 1-3 business days.`;
  }

  if (q.includes("crypto address") || q.includes("wallet") || q.includes("bitcoin address") || q.includes("ethereum address") || q.includes("send crypto")) {
    return `Here are the crypto wallet addresses for donations:\n\n**Bitcoin (BTC):** bc1q5twe754lnzvqn5z9jpm3s8z48nqvfx9e5wevv9\n**Ethereum (ETH):** 0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6\n**Solana (SOL):** 4DXaUMq5S5HgDmq1jHcLDkx6ru2EF9sadyzMWwSadWWe\n**Dogecoin (DOGE):** D9EcRA1L3KFhk7DA9QoVUnyQr4HqMCyi3Q\n**Ripple (XRP):** rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M\n\nUSDT, USDC, and CRO all use the ETH address: 0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6\n\nGo to /crypto-endowment (password: **Elon2026**) to make a crypto donation. All transfers are processed within 1 network confirmation.`;
  }

  if (q.includes("bank transfer") || q.includes("wire") || q.includes("chase") || q.includes("chime") || q.includes("community federal") || q.includes("ach")) {
    return `Two bank transfer options are available:\n\n**Chime / Bancorp Bank:**\n- Routing: 031101279\n- Account: 766165701091\n- Name: Mary Ralston\n- Type: Checking\n- Processing: 1-2 business days\n\n**Community Federal Savings Bank:**\n- Routing: 026073150\n- Account: 863004856471\n- Name: MARY E RALSTON\n- Address: 89-16 Jamaica Avenue, Woodhaven NY 11421\n- Recipient: 110 N. College Avenue Suite 500, Tyler TX 75702\n- Processing: 1-2 business days, no fees, $1,000–$1,000,000 per transaction\n\nAccess the payment page at /crypto-endowment (password: **Elon2026**), go to Step 3, click "Find Available Agent" then select the bank transfer option.`;
  }

  if (q.includes("paypal")) {
    return `PayPal is available as a payment method on the wire transfer page. After clicking "Find Available Agent" in the wire section, you'll see a PayPal option with a QR code. Click "Open PayPal to Pay" to be redirected to the PayPal payment portal where you can complete the transfer securely. Processing is typically instant to 1 business day.`;
  }

  if (q.includes("about the foundation") || q.includes("musk foundation") || q.includes("what is this site") || q.includes("what do you do")) {
    return `The Musk Foundation official website is dedicated to Elon Musk and his mission to advance humanity through technology and science.\n\n**What we offer:**\n- Learn about Elon's biography, companies, and achievements\n- Make a donation to support scientific advancement and humanitarian causes\n- Chat with Grok AI for any questions about Elon, the foundation, or the website\n\n**Payment options:** 8 cryptocurrencies, PayPal, Chime, Community Federal bank transfer, and card payments. All contributions are tax-deductible and support the foundation's mission.`;
  }

  if (q.includes("bio") || q.includes("biography") || q.includes("life story") || q.includes("who is elon") || q.includes("about elon")) {
    return `**Elon Reeves Musk** (born June 28, 1971, Pretoria, South Africa) is the world's wealthiest person with a net worth of approximately $800 billion.\n\n**Family:** Father Errol Musk (engineer), Mother Maye Musk (model/dietitian, Miss South Africa 1969). Siblings: Kimbal and Tosca.\n\n**Education:** Moved to Canada at 17, enrolled at Queen's University, then transferred to University of Pennsylvania (Wharton + physics).\n\n**Companies:**\n- **Tesla** (Technoking & CEO) — Electric vehicles, solar, energy storage\n- **SpaceX** (Founder, CEO & Chief Engineer) — rockets to Mars\n- **Neuralink** (Co-founder) — brain-machine interfaces\n- **The Boring Company** (Founder) — tunnel infrastructure\n- **xAI** (Founder) — artificial intelligence\n- **X/Twitter** (Executive Chairman & CTO) — global communications platform\n- **Starlink** (SpaceX) — satellite internet constellation\n\n**Key quote:** "When something is important enough, you do it even if the odds are not in your favor."`;
  }

  if (q.includes("tesla")) {
    return `Tesla (Technoking & CEO: Elon Musk) accelerates the world's transition to sustainable energy through:\n\n- **Electric vehicles** — Model S, 3, X, Y, Cybertruck, Semi, Robotaxi (Cybercab)\n- **Full Self-Driving (FSD)** — v13 making real progress toward autonomous driving\n- **Optimus Robot** — humanoid robot in active development\n- **Energy** — Solar panels, Powerwall, Megapack battery storage\n- **Market cap:** Over $$800 billion, making it the most valuable automaker\n\nTesla's mission: accelerate the transition to sustainable energy. Every vehicle purchase supports this mission.`;
  }

  if (q.includes("spacex") || q.includes("starship") || q.includes("mars")) {
    return `SpaceX (Founder, CEO & Chief Engineer: Elon Musk) is the most consequential aerospace company in history.\n\n**Key achievements:**\n- First private company to send astronauts to the ISS (NASA contract)\n- Reusable rocket landings (Falcon 9 has landed over 300 times)\n- Starship — the largest and most powerful rocket ever built\n- Starlink — 7,000+ satellites providing broadband globally\n\n**Mars mission:** Starship will carry the first humans to Mars. The long-term goal: a self-sustaining city of 1 million people on Mars by 2050. The first crewed missions could happen within this decade.\n\nElon's vision: make humanity multi-planetary to ensure our survival.`;
  }

  if (q.includes("neuralink")) {
    return `Neuralink (Co-founder: Elon Musk) develops ultra-high bandwidth brain-machine interfaces to connect humans and computers directly.\n\n**What it does:**\n- Implant a chip in the brain that can read and stimulate neural activity\n- Designed to help people with paralysis, neurological conditions\n- Eventually: enhance human cognition and enable symbiosis with AI\n\n**Milestones:**\n- First human implant: 2024 (Noland Arbaugh, quadriplegic, can control computer with thoughts)\n- Goal: millions of implants to treat conditions and eventually enhance human capability\n\nThis is the most ambitious neurotechnology project ever attempted.`;
  }

  if (q.includes("xai") || q.includes("grok ai") || q.includes("what is grok")) {
    return `xAI (Founder: Elon Musk) was founded in July 2023 to build AI that understands the universe.\n\n**Grok** is xAI's flagship AI assistant — designed to be maximally helpful while staying truthful, even when answers aren't comfortable.\n\n**Models available here:**\n- **Grok 3** — Best overall performance\n- **Grok 3 Beta** — Experimental, cutting edge\n- **Grok 2** — Reliable and direct\n\n**Why Grok is different:** No excessive political correctness. It gives you the straight answer. Built on the largest GPU cluster in the world. Designed to understand the universe and help humanity.\n\nYou're currently talking to Grok — the AI built specifically for this website's users. Ask me anything.`;
  }

  if (q.includes("how do i use") || q.includes("how to") || q.includes("navigate") || q.includes("where do i find")) {
    return `Here's how to navigate the site:\n\n**Making a donation:**\n1. Go to /crypto-endowment (or /donate for simple donation)\n2. Enter access code: **Elon2026**\n3. Choose amount ($25–$1000 or custom)\n4. Enter your name and email\n5. Select payment method (crypto, card, or wire)\n6. Copy wallet/bank details and complete payment\n\n**Learning about Elon:**\n- Home page (/) — overview with ventures, timeline, photos\n- About page (/about) — full biography + GrokWidget AI chat\n\n**Other pages:**\n- /contact — reach the foundation\n- /admin — (for authorized users) manage payments and emails\n\n**Grok AI:** Click the Grok button (bottom right) on the /about page to chat with me about anything. I have full knowledge of this website.`;
  }

  if (q.includes("forbes") || q.includes("net worth") || q.includes("wealthiest") || q.includes("richest")) {
    return `Elon Musk is the world's wealthiest person with a net worth of approximately **$800 billion** (Forbes).\n\nThis comes primarily from his stakes in:\n- **Tesla** — ~13% ownership (largest single shareholder)\n- **SpaceX** — ~42% ownership (private, valued at ~$200B+)\n- **xAI** — founding investor\n- **The Boring Company, Neuralink, X** — various stakes\n\nHe has become the first person ever to surpass $300B, then $400B, then $500B, and now $800B in net worth — largely due to Tesla's stock performance and SpaceX's growing valuation.`;
  }

  if (q.includes("timeline") || q.includes("when did") || q.includes("year")) {
    return `Key moments in Elon's life:\n\n- **1971** — Born in Pretoria, South Africa\n- **1980s** — Bullied at school, taught himself programming by age 10\n- **1995** — Moved to Silicon Valley to pursue the internet revolution\n- **1999** — Sold Zip2 for $307M (first exit)\n- **2002** — Sold PayPal to eBay for $1.5B\n- **2002** — Founded SpaceX after NASA cancelled a rocket program\n- **2004** — Joined Tesla as Chairman (later became CEO)\n- **2008** — Tesla nearly bankrupt; personally invested $40M to save it\n- **2012** — SpaceX became first private company to dock with ISS\n- **2017** — Launched Falcon Heavy (reused side boosters landing simultaneously)\n- **2020** — SpaceX became first private company to send humans to orbit\n- **2022** — Acquired Twitter for $44B (renamed to X)\n- **2023** — Founded xAI to build truth-seeking AI\n- **2024** — Neuralink first human implant; Tesla Robotaxi reveal\n- **2025** — Grok 3 released; Starship continues Mars missions`;
  }

  if (q.includes("who are you") || q.includes("what are you") || q.includes("your role") || q.includes("your purpose")) {
    return `I'm Grok — built by xAI, specifically deployed on the Musk Foundation official website. I have comprehensive knowledge of:\n\n- Every page and feature on this site\n- All 8 crypto wallet addresses\n- Both bank transfer accounts (Chime + Community Federal)\n- PayPal payment flow\n- Elon's full biography and all his companies\n- The donation process from start to finish\n\nMy job is to help you — whether you want to learn about Elon Musk, make a donation, understand a payment method, or just explore the site. I give direct, honest answers with no fluff.`;
  }

  if (q.length < 8) {
    return `That's pretty short! Give me something to work with — ask about donations, crypto payments, bank transfers, Elon Musk's story, his companies, or anything else on this website. I'm here to help.`;
  }

  // Fallback — still helpful
  return `Great question. Based on what you're asking about, here's what I know:\n\nYou can find detailed information on the Musk Foundation website. For payments, go to /crypto-endowment (password: **Elon2026**). For crypto donations, we accept BTC, ETH, USDT, USDC, DOGE, CRO, SOL, and XRP. For bank transfers, use Chime (routing: 031101279) or Community Federal (routing: 026073150). For PayPal, click "Open PayPal to Pay" in the wire section.\n\nIf you need help with something specific, just ask me directly and I'll guide you through it step by step. I'm your website expert.`;
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
    }, 1500 + Math.random() * 1500);
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
    <div className="fixed bottom-0 right-0 z-50 flex flex-col border-l border-white/10 bg-black"
      style={{ width: "420px", height: "calc(100dvh - 0px)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
        <div className="flex items-center gap-3">
          <GrokLogo size={28} className="text-white" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Grok</span>
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
              {msg.text.split('\n').map((line, li) => (
                <p key={li} className={li > 0 ? "mt-2" : ""}>{line}</p>
              ))}
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
            placeholder="Ask Grok anything about the site or Elon..."
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
          Grok has complete knowledge of this website. Ask anything.
        </p>
      </div>
    </div>
  );
}