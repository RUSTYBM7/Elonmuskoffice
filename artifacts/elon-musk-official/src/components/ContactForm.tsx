import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const WEB3FORMS_KEY = "7b9c0e7f-5c4a-4d2f-8e3b-1a6c9d4e7f2b";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const SUBJECTS = [
  "General inquiry",
  "Press & media",
  "Partnership opportunity",
  "Donation question",
  "Technical feedback",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: form.subject ? `[ElonMuskOffice] ${form.subject}` : "[ElonMuskOffice] New Contact",
          name: form.name,
          email: form.email,
          message: form.message,
          from_page: window.location.href,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
  };

  const inputClass =
    "w-full h-12 px-4 bg-background border border-border rounded-none text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground dark:focus:border-primary focus:ring-0 transition-colors";

  const textareaClass =
    "w-full px-4 py-3 bg-background border border-border rounded-none text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground dark:focus:border-primary focus:ring-0 transition-colors resize-none min-h-[140px]";

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
            Whether you have a question, a media inquiry, or just want to reach out —
            fill in the form below and we will respond as soon as possible.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="mt-12 flex flex-col items-center text-center py-10"
            >
              <CheckCircle className="w-12 h-12 text-foreground dark:text-primary mb-5" />
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                Message sent
              </h3>
              <p className="mt-3 text-sm text-foreground/65 max-w-sm leading-relaxed">
                Thank you for reaching out. We read every message and will get back to you
                at <strong className="font-medium text-foreground/80">{form.email}</strong> within
                2–3 business days.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-8 text-xs uppercase tracking-[0.14em] border border-border px-6 py-3 text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="mt-12 space-y-5"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  disabled={status === "loading"}
                >
                  <option value="">Select a topic…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={handleChange}
                  className={textareaClass}
                  required
                  disabled={status === "loading"}
                />
              </div>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-500"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  * Required fields
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2.5 h-11 px-7 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.14em] font-medium transition-colors"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Send message
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Alternative contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-border grid sm:grid-cols-3 gap-6"
        >
          {[
            {
              label: "Email",
              value: "contact@elonmuskoffice.site",
              href: "mailto:contact@elonmuskoffice.site",
            },
            {
              label: "WhatsApp",
              value: "+1 (555) 000-0000",
              href: "https://wa.me/15550000000",
            },
            {
              label: "Telegram",
              value: "@elonmuskoffice",
              href: "https://t.me/elonmuskoffice",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </p>
              <a
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground dark:hover:text-primary transition-colors"
              >
                {item.value}
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
