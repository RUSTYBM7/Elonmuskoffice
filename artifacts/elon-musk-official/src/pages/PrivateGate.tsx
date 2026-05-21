import { useState } from "react";

export default function PrivateGate() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "Elon2026") {
      window.location.href = "/admin-crypto";
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Red radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #cc0000 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Bold Tesla logo */}
        <div className="flex justify-center mb-10">
          <svg viewBox="0 0 120 22" className="h-12 fill-[#ff0000]" xmlns="http://www.w3.org/2000/svg">
            <path d="M58.1 6.4c-.5-1.6-2.1-2.7-3.8-2.7-1.5 0-2.8.8-3.5 2l-1.9-.9c1-2 3.2-3.3 5.5-3.3 3.2 0 5.8 2.4 5.8 5.5 0 3.3-2.6 5.5-5.6 5.5-1.2 0-2.3-.4-3.1-1l-1.9 2.1c.7.7 1.6 1.2 2.7 1.5l-.6 1.8h3.5l1.4-4.4c1.9-.8 3.1-2.7 3.1-4.9 0-1.6-.7-3-1.6-4.2zm-38.1 1.6c.6-1.7 2.1-2.9 3.9-2.9 1.8 0 3.3 1.1 3.9 2.8l.5 1.5h-8.8l.5-1.4zm4.6 8.6l.3.9h-9.8l.3-.9c.4-1.1 1.5-1.9 2.7-1.9 1 0 1.8.5 2.3 1.2l1.1.7zm-8.2-2.5c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm-7.7-6.1c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1c-.6 0-1.1-.5-1.1-1.1zm2.7 8.6c-.5 0-1-.2-1.4-.5-.4-.4-.6-1-.6-1.6 0-.7.3-1.3.8-1.7l1.2-.9 1.2.9c.5.4.8 1 .8 1.7 0 .6-.2 1.2-.6 1.6-.4.3-.9.5-1.4.5zm6-8.6c.3-1.1 1.4-2 2.6-2s2.2.9 2.6 2l.6 1.9h-6.4l.6-1.9zm6.3 0l.6-1.9c.3-1.1 1.4-2 2.6-2s2.2.9 2.6 2l.6 1.9h-6.4zm5.4 7.4c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm5.2 0c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zM4.4 8.1C2.2 8.1.5 9.8.5 12s1.7 3.9 3.9 3.9c2.2 0 3.9-1.7 3.9-3.9S6.6 8.1 4.4 8.1zm0 6.2C3 14.3 2 13.3 2 12s1-2.3 2.4-2.3 2.4 1 2.4 2.3-1 2.3-2.4 2.3zM10.3 8c-1.4 0-2.5 1.1-2.5 2.5S8.9 13 10.3 13s2.5-1.1 2.5-2.5S11.7 8 10.3 8zm0 3.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm-3-3.4c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4zm3 3.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
          </svg>
        </div>

        {/* Portrait SVG */}
        <div className="flex justify-center mb-8">
          <img
            src="/elon-portrait.svg"
            alt="Elon Musk"
            className="w-48 h-60 object-cover"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
            }}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-red-600" />
            <h1 className="text-2xl font-bold tracking-[0.15em] text-[#ff0000] uppercase">
              RESTRICTED
            </h1>
            <div className="w-1.5 h-8 bg-red-600" />
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-3" />
          <p className="text-xs text-white/25 tracking-[0.25em] uppercase">
            Authorization required
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            {/* Red left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600/50 rounded-l-sm" />
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="ENTER ACCESS CODE"
              autoComplete="current-password"
              className={`w-full bg-[#111] border border-[#2a2a2a] rounded-sm pl-5 pr-5 py-4 text-sm text-[#ff0000] placeholder-white/20 tracking-[0.3em] font-bold focus:outline-none focus:border-red-600/60 transition-colors text-center uppercase`}
            />
            {/* Red right accent */}
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-red-600/50 rounded-r-sm" />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <p className="text-xs text-red-600 tracking-[0.25em] uppercase">Invalid Access Code</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#ff0000] text-black font-bold py-4 text-sm tracking-[0.25em] uppercase hover:bg-[#cc0000] transition-colors rounded-sm mt-1"
          >
            Authenticate
          </button>
        </form>

        {/* Footer */}
        <div className="mt-14 text-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent mx-auto mb-4" />
          <p className="text-[10px] text-white/12 tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} Tesla, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}