import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, MessageSquare, Mail, Send, Phone, 
  MapPin, Clock, Shield, Globe, AlertTriangle,
  ChevronDown, Copy, Check, ExternalLink, Lock,
  Radio, Zap, FileText, User, Building2
} from "lucide-react";

const INQUIRY_TYPES = [
  { id: "general", label: "General Inquiry", desc: "Questions about the office or Elon's public work", response: "3-5 days" },
  { id: "foundation", label: "Musk Foundation / Philanthropy", desc: "Grant applications, donation inquiries, cause partnerships", response: "14-21 days" },
  { id: "spacex", label: "SpaceX", desc: "Launch services, supplier vetting, careers, media", response: "Routed to Hawthorne" },
  { id: "tesla", label: "Tesla", desc: "Vehicle support, investor relations, Gigafactory tours", response: "Routed to Austin" },
  { id: "neuralink", label: "Neuralink", desc: "Patient registry, clinical trials, research partnerships", response: "HIPAA review required" },
  { id: "xai", label: "xAI", desc: "API access, compute partnerships, research collaborations", response: "5-7 days" },
  { id: "x", label: "𝕏 (Twitter)", desc: "Account support, creator programs, API enterprise", response: "Routed to SF" },
  { id: "press", label: "Press & Media", desc: "Interview requests, fact-checking, press kit access", response: "24-48 hours" },
  { id: "investment", label: "Investment Relations", desc: "Direct allocation inquiries, LP access, secondary markets", response: "Accredited only" },
  { id: "security", label: "Security / Threat Report", desc: "Vulnerability disclosure, physical security, impersonation", response: "Immediate" },
];

const CONTACT_CHANNELS = [
  { 
    icon: Mail, 
    label: "Secure Email", 
    value: "private@elonmuskoffice.site", 
    note: "PGP key available on request", 
    action: "mailto:private@elonmuskoffice.site",
    external: false 
  },
  { 
    icon: Phone, 
    label: "Office Line", 
    value: "+1 (323) 892-7090", 
    note: "Mon–Fri, 9am–6pm CT. Voicemail monitored.", 
    action: "tel:+13238927090",
    external: false 
  },
  { 
    icon: MessageSquare, 
    label: "WhatsApp Business", 
    value: "+1 (323) 892-7090", 
    note: "Verified account. Response within 24h.", 
    action: "https://wa.me/+13238927090",
    external: true 
  },
  { 
    icon: Send, 
    label: "Telegram", 
    value: "@Elonmuskx00x1", 
    note: "Official channel. No DMs accepted.", 
    action: "https://t.me/Elonmuskx00x1",
    external: true 
  },
  { 
    icon: Radio, 
    label: "Signal", 
    value: "Request via email", 
    note: "End-to-end encrypted. By invitation only.", 
    action: "mailto:private@elonmuskoffice.site?subject=Signal%20Access%20Request",
    external: false 
  },
  { 
    icon: MapPin, 
    label: "Physical Mail", 
    value: "Office of Elon Musk", 
    note: "P.O. Box 492, Austin, TX 78767. Screened facility.", 
    action: null,
    external: false 
  },
];

const OFFICE_LOCATIONS = [
  { city: "Austin, TX", role: "Primary Office", address: "P.O. Box 492, Austin, TX 78767", status: "Active" },
  { city: "Starbase, TX", role: "SpaceX Operations", address: "Boca Chica Village, TX 78521", status: "Launch Days" },
  { city: "Hawthorne, CA", role: "SpaceX HQ", address: "1 Rocket Road, Hawthorne, CA 90250", status: "By appointment" },
  { city: "Fremont, CA", role: "Tesla / Neuralink", address: "45500 Fremont Blvd, Fremont, CA 94538", status: "By appointment" },
  { city: "San Francisco, CA", role: "𝕏 / xAI", address: "1355 Market St, San Francisco, CA 94103", status: "Limited access" },
  { city: "Memphis, TN", role: "Colossus Compute", address: "Memphis Regional Megasite", status: "No public access" },
];

const IMPERSONATION_WARNING = [
  "Elon Musk does not operate personal WhatsApp, Telegram, or Instagram accounts for public contact.",
  "No member of the Office will request cryptocurrency, wire transfers, or personal financial information via unsolicited message.",
  "Verified channels display a green checkmark on WhatsApp and @Elonmuskx00x1 on Telegram.",
  "Report suspected impersonation to security@elonmuskoffice.site immediately.",
];

export default function ContactHero() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
    company: "",
    title: "",
    priority: "normal",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [showLocations, setShowLocations] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.inquiry) errs.inquiry = "Please select an inquiry type.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters.";
    if (form.inquiry === "investment" && !form.company.trim()) errs.company = "Company name required for investment inquiries.";
    if (form.inquiry === "press" && !form.title.trim()) errs.title = "Publication/outlet required for press inquiries.";
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
    }, 2000);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const selectedInquiryData = INQUIRY_TYPES.find(i => i.id === form.inquiry);

  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-b border-border overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="1" fill="currentColor" className="text-foreground/10" />
              <path d="M60 60 L120 60 M60 60 L60 120" stroke="currentColor" strokeWidth="0.4" className="text-foreground/5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Office of Elon Musk</p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1] mb-4">
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl leading-relaxed">
            Direct channels to the Office. All inquiries are routed through verified infrastructure 
            with end-to-end audit trails. Response times vary by category and security clearance.
          </p>
        </motion.div>

        {/* Contact channels grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border mb-16"
        >
          {CONTACT_CHANNELS.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-background p-5 group hover:bg-foreground/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded bg-foreground/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {ch.action && (
                    <a 
                      href={ch.action}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener noreferrer" : undefined}
                      className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      {ch.external ? "Open" : "Launch"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{ch.label}</p>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-foreground/70 tabular-nums">{ch.value}</p>
                  <button
                    onClick={() => copyToClipboard(ch.value, ch.label)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy"
                  >
                    {copiedField === ch.label ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                  </button>
                </div>
                <p className="text-[11px] text-foreground/40 leading-relaxed">{ch.note}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security notice */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 border border-amber-500/20 bg-amber-500/5 p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">Impersonation Alert</p>
              <ul className="space-y-1.5">
                {IMPERSONATION_WARNING.map((w, i) => (
                  <li key={i} className="text-xs text-foreground/60 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-500/50 mt-1.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Two-column layout: Form + Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-5 py-16 text-center border border-border bg-foreground/[0.02]"
                >
                  <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-background" />
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight text-foreground">Message encrypted and transmitted</p>
                    <p className="mt-2 text-sm text-foreground/60 max-w-sm mx-auto">
                      Your inquiry has been routed to the appropriate division. Reference ID: 
                      <span className="font-mono text-foreground/80"> EM-{Date.now().toString(36).toUpperCase().slice(-8)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    TLS 1.3 · AES-256-GCM · Forward secrecy
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", inquiry: "", message: "", company: "", title: "", priority: "normal" }); }}
                    className="mt-2 text-xs uppercase tracking-[0.12em] text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Secure Inquiry Form</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        Full Name
                      </label>
                      <Input
                        value={form.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                        placeholder="Legal name"
                        className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                        placeholder="you@verified-domain.com"
                        className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium">
                      Inquiry Category
                    </label>
                    <div className="relative">
                      <select
                        value={form.inquiry}
                        onChange={(e) => { 
                          setForm({ ...form, inquiry: e.target.value, company: "", title: "" }); 
                          setErrors({ ...errors, inquiry: "", company: "", title: "" }); 
                          setSelectedInquiry(e.target.value);
                        }}
                        className="h-12 w-full bg-background border border-input px-4 text-sm focus:outline-none focus:border-foreground text-foreground appearance-none cursor-pointer"
                      >
                        <option value="">Select routing category...</option>
                        {INQUIRY_TYPES.map((t) => (
                          <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.inquiry && <p className="text-xs text-red-500 mt-1">{errors.inquiry}</p>}
                    
                    {selectedInquiryData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 p-3 bg-foreground/[0.03] border border-border"
                      >
                        <p className="text-xs text-foreground/60">{selectedInquiryData.desc}</p>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1.5 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          Expected response: {selectedInquiryData.response}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Conditional fields */}
                  <AnimatePresence>
                    {form.inquiry === "investment" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium flex items-center gap-1.5">
                          <Building2 className="w-3 h-3" />
                          Company / Fund
                        </label>
                        <Input
                          value={form.company}
                          onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({ ...errors, company: "" }); }}
                          placeholder="Registered entity name"
                          className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30"
                        />
                        {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {form.inquiry === "press" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          Publication / Outlet
                        </label>
                        <Input
                          value={form.title}
                          onChange={(e) => { setForm({ ...form, title: e.target.value }); setErrors({ ...errors, title: "" }); }}
                          placeholder="The New York Times, Bloomberg, etc."
                          className="h-12 bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium">
                      Message
                    </label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                      placeholder="Be specific. Include relevant context, deadlines, and verification credentials where applicable..."
                      rows={6}
                      className="bg-background border-input rounded-none focus-visible:ring-foreground text-foreground placeholder:text-foreground/30 resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-foreground/30">
                        {form.message.length} characters · Minimum 20
                      </p>
                      {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 font-medium flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      Priority
                    </label>
                    <div className="flex gap-2">
                      {["normal", "urgent", "time-critical"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setForm({ ...form, priority: p })}
                          className={`px-4 py-2 text-xs uppercase tracking-[0.12em] border transition-colors ${
                            form.priority === p 
                              ? "bg-foreground text-background border-foreground" 
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-foreground/30 mt-1">
                      Time-critical routes to on-call duty officer. False flags result in blacklisting.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Shield className="w-3 h-3" />
                      <span>TLS 1.3 encrypted · No third-party trackers</span>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.14em] text-xs font-medium disabled:opacity-60"
                    >
                      {loading ? "Encrypting..." : "Transmit Securely"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: Locations + Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Office locations */}
            <div>
              <button
                onClick={() => setShowLocations(!showLocations)}
                className="flex items-center justify-between w-full mb-4"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  Office Locations
                </p>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showLocations ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {showLocations && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2">
                      {OFFICE_LOCATIONS.map((loc, i) => (
                        <motion.div
                          key={loc.city}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="p-3 border border-border hover:border-foreground/20 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-foreground">{loc.city}</p>
                            <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 ${
                              loc.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-foreground/5 text-muted-foreground"
                            }`}>
                              {loc.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-foreground/50">{loc.role}</p>
                          <p className="text-[10px] text-foreground/30 mt-0.5">{loc.address}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Response SLA */}
            <div className="p-5 border border-border bg-foreground/[0.02]">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-4 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Response Commitments
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">Security / Threat</span>
                  <span className="text-emerald-500 font-medium text-xs uppercase tracking-wider">&lt; 4 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">Press & Media</span>
                  <span className="text-foreground/60 text-xs uppercase tracking-wider">24-48 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">General Inquiry</span>
                  <span className="text-foreground/60 text-xs uppercase tracking-wider">3-5 days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">Philanthropy</span>
                  <span className="text-foreground/60 text-xs uppercase tracking-wider">14-21 days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">Investment (Accredited)</span>
                  <span className="text-foreground/60 text-xs uppercase tracking-wider">5-7 days</span>
                </div>
              </div>
            </div>

            {/* Technical specs */}
            <div className="p-5 border border-border">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Infrastructure
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-foreground/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  TLS 1.3 (X25519)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  AES-256-GCM
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  Forward Secrecy
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  No third-party JS
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  Self-hosted analytics
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  EU GDPR compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
