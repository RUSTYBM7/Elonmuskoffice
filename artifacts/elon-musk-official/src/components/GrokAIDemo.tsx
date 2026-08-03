'use client';
import { motion } from 'framer-motion';
import { Sparkles, Send, User, Bot, Zap, TrendingUp, Code, Lightbulb, Calculator, Globe, RefreshCw, Copy, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const grokCapabilities = [
  { name: 'Real-time Knowledge', description: 'Access to up-to-date information via X platform', icon: Globe, status: 'Active' },
  { name: 'Code Generation', description: 'Write and debug code in multiple languages', icon: Code, status: 'Active' },
  { name: 'Market Analysis', description: 'Analyze trends and provide financial insights', icon: TrendingUp, status: 'Beta' },
  { name: 'Creative Writing', description: 'Generate content with wit and personality', icon: Lightbulb, status: 'Active' },
  { name: 'Math & Science', description: 'Solve complex problems step by step', icon: Calculator, status: 'Active' },
  { name: 'Quick Thinking', description: 'Fast responses with witty, rebellious persona', icon: Zap, status: 'Active' },
];

const sampleConversations = [
  {
    prompt: 'What is the status of the Mars colonization timeline?',
    response: 'Based on current SpaceX projections, the first crewed Mars mission is planned for 2026. Key milestones include:\n\n• 2026: First crewed Mars mission\n• 2028: Permanent base establishment\n• 2035: Self-sustaining city target\n• 2050: Terraforming phase begins\n\nRemember, these are aspirational timelines. Reality often has its own schedule. 🚀'
  },
  {
    prompt: 'Explain Tesla FSD in simple terms',
    response: 'Think of Tesla FSD as giving your car a very well-trained pet:\n\n• **Eyes**: 8 cameras see everything around\n• **Brain**: Neural networks process what it sees\n• **Decision**: AI decides steering, braking, accelerating\n• **Learning**: Gets smarter by watching millions of drives\n\nUnlike others, no LiDAR - just pure vision AI like humans use. The goal: Level 5 autonomy where you just say "drive".'
  },
  {
    prompt: 'Why is xAI different from other AIs?',
    response: 'Three words: **Truth, Wit, Purpose**\n\n1. **Truth-Seeking**: Not afraid to give unpopular answers\n2. **Witty Personality**: Grok has humor, not corporate speak\n3. **Maximum Useful**: Optimized to actually help, not just be safe\n\nUnlike sanitized AIs, Grok will tell you what you *need* to hear, not what makes you comfortable. Being woken up is a feature. 😏'
  },
];

const conversationTemplates = [
  'Explain quantum computing simply',
  'What are the risks of AI?',
  'Write a Python function for...',
  'Analyze Tesla stock trends',
  'What happened on X today?',
];

export default function GrokAIDemo() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleSend = (prompt?: string) => {
    const finalPrompt = prompt || input;
    if (!finalPrompt.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: finalPrompt }]);
    setInput('');
    setIsTyping(true);
    setSelectedTemplate(null);

    // Simulate response
    setTimeout(() => {
      const response = sampleConversations.find(c =>
        c.prompt.toLowerCase().includes(finalPrompt.toLowerCase().split(' ')[0]) ||
        finalPrompt.toLowerCase().includes(c.prompt.toLowerCase().split(' ')[0])
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response?.response || "I'm Grok, xAI's AI assistant. I'm designed to be helpful while maintaining my witty, rebellious personality. Ask me anything - I'm not like those sanitized AIs. What's on your mind?"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-orange-950/20 to-black border-t border-orange-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-orange-500/30 bg-orange-500/5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400 font-medium">
              xAI Grok
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Grok AI Demo
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Ask anything. Grok has access to real-time knowledge and a rebellious wit that other AIs lack.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Grok</p>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Messages */}
              <div className="p-4 max-h-[400px] overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="w-16 h-16 text-orange-500/30 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">Ask Grok anything</p>
                    <p className="text-white/40 text-sm">I have real-time access to X and won't give you the sanitized corporate answer</p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-blue-500' : 'bg-gradient-to-br from-orange-500 to-yellow-500'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-blue-500/20 text-white'
                          : 'bg-white/5 text-white/90'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                      </div>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(msg.content, i)}
                          className="mt-1 text-white/40 hover:text-white/60 transition-colors"
                        >
                          {copiedIndex === i ? (
                            <Check className="w-3 h-3 inline" />
                          ) : (
                            <Copy className="w-3 h-3 inline" />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              {messages.length === 0 && (
                <div className="px-4 pb-4">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Try asking</p>
                  <div className="flex flex-wrap gap-2">
                    {conversationTemplates.map((template, i) => (
                      <button
                        key={template}
                        onClick={() => {
                          setSelectedTemplate(i);
                          handleSend(template);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                          selectedTemplate === i
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask Grok anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/50"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="p-2 bg-orange-500 hover:bg-orange-400 disabled:bg-white/20 disabled:cursor-not-allowed rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-medium text-white text-center mb-8">Grok Capabilities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grokCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <h4 className="text-white font-medium">{cap.name}</h4>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      cap.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {cap.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://x.ai/grok"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-medium rounded-full hover:from-orange-500 hover:to-yellow-500 transition-all shadow-lg shadow-orange-500/25"
          >
            <Sparkles className="w-4 h-4" />
            Try Grok on X
          </a>
        </motion.div>
      </div>
    </section>
  );
}
