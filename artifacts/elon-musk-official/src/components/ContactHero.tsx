import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquare, Mail, Send } from "lucide-react";

const INQUIRY_TYPES = [
  "General Inquiry",
  "Musk Foundation / Philanthropy",
  "SpaceX",
  "Tesla",
  "Neuralink",
  "xAI",
  "X (Twitter)",
  "Press & Media",
  "Investment Relations",
];

export default function ContactHero() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.inquiry) errs.inquiry = "Please select an inquiry type.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-b border-border">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Contact</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            Get in Touch
          </h1>
          <p className="mt-6 text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            The Office of Elon Musk serves as the official communication channel for Musk Ventures,
            the Musk Foundation, and associated initiatives — including SpaceX, Tesla, Neuralink,
            xAI, and X. Use the form below to reach the appropriate team.
          </p>
        </motion.div>

        {/* Quick action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <a
            href="https://wa.me/+18032587511"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="mailto:Muskfoundation@currently.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email Us
          </a>
          <a
            href="https://t.me/Elonmuskx00x1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
        </motion.div>

        {/* Contact form */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-5 py-16 text-center border border-border bg-muted/20"
          >
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-background" />
            </div>
            <div>
              <p className="text-xl font-medium tracking-tight text-foreground">Message sent</p>
              <p className="mt-2 text-sm text-foreground/60 max-w-sm">
                Thank you for reaching out. Our team will review your inquiry and respond within 3–5 business days.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium">
                  Full Name
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  placeholder="Your full name"
                  className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                  placeholder="you@example.com"
                  className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Inquiry type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium">
                Inquiry Type
              </label>
              <select
                value={form.inquiry}
                onChange={(e) => { setForm({ ...form, inquiry: e.target.value }); setErrors({ ...errors, inquiry: "" }); }}
                className="h-12 bg-background border border-input px-4 text-sm focus:outline-none focus:border-foreground text-foreground"
              >
                <option value="">Select an inquiry type...</option>
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.inquiry && <p className="text-xs text-red-500 mt-1">{errors.inquiry}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium">
                Message
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                placeholder="Describe your inquiry in detail..."
                rows={6}
                className="bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30 resize-none"
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-foreground/40">
                All fields are required.
              </p>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-10 bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.14em] text-xs font-medium disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}