import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "4a64f30a-50b9-4468-a2a5-f3da60d67b2c";

type FormData = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "loading" | "success" | "error";

const SUBJECTS = ["General Inquiry", "Business", "Media", "Partnership", "Other"];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Elon Musk Office] New contact — ${form.subject || "General"}`,
          from_name: "Elon Musk Office",
          name: form.name,
          email: form.email,
          subject_line: form.subject || "General Inquiry",
          message: form.message,
          bot_detection: "true",
          web3forms_empty_field: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Get in Touch
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            Send a message
          </h2>
          <p className="mt-4 text-sm md:text-base text-foreground/65 leading-relaxed">
            Reach the Office of Elon Musk directly. We respond to every message within 2–3 business days.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12 flex flex-col items-center text-center py-10"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                Message received
              </h3>
              <p className="mt-3 text-sm text-foreground/65 max-w-sm leading-relaxed">
                Thank you for reaching out. Our team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="mt-12 space-y-5"
              noValidate
            >
              <input type="text" name="web3forms_empty_field" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="w-full h-12 px-4 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground dark:focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="w-full h-12 px-4 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground dark:focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full h-12 px-4 bg-background border border-border text-sm text-foreground focus:outline-none focus:border-foreground dark:focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select a topic…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground dark:focus:border-primary transition-colors resize-none min-h-[140px]"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-sm text-red-500" role="alert">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">* Required</p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2.5 h-11 px-7 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 text-xs uppercase tracking-[0.14em] font-medium transition-colors"
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="w-3.5 h-3.5" /> Send message</>
                  )}
                </button>
              </div>

              <p className="text-center text-[10px] text-muted-foreground/50 tracking-wide">
                Powered by Web3Forms
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Alternative contact methods — updated with real contact info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-border grid sm:grid-cols-3 gap-6"
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Email</p>
            <a
              href="mailto:private@elonmuskoffice.site"
              className="text-sm font-medium text-foreground/80 hover:text-foreground dark:hover:text-primary transition-colors"
            >
              private@elonmuskoffice.site
            </a>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Phone</p>
            <a
              href="tel:+13238927090"
              className="text-sm font-medium text-foreground/80 hover:text-foreground dark:hover:text-primary transition-colors"
            >
              (323) 892-7090
            </a>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Office Hours</p>
            <p className="text-sm font-medium text-foreground/80">Mon–Fri · 9am–6pm CT</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
