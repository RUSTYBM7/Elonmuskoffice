'use client';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Send, Check, Calendar, Clock, FileText, ChevronRight, Zap, Brain, TrendingUp, Rocket } from 'lucide-react';
import { useState } from 'react';

const newsletterCategories = [
  { id: 'all', label: 'All Topics', icon: Sparkles },
  { id: 'space', label: 'Space & Mars', icon: Rocket },
  { id: 'tech', label: 'Tech & AI', icon: Brain },
  { id: 'finance', label: 'Markets', icon: TrendingUp },
];

const sampleArticles = [
  {
    id: 1,
    title: 'Starship Update: IFT-11 Prepares for Launch',
    excerpt: 'SpaceX teams are working around the clock at Starbase as the next integrated flight test approaches. New details emerge about the mission profile and objectives.',
    category: 'space',
    readTime: '5 min',
    date: 'Today',
    trending: true,
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&q=80'
  },
  {
    id: 2,
    title: 'Tesla Q4 2024 Earnings: Record Revenue',
    excerpt: 'Breaking down the numbers from Tesla\'s latest earnings report. Record revenue, expanding margins, and what it means for 2025.',
    category: 'finance',
    readTime: '8 min',
    date: 'Yesterday',
    trending: true,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80'
  },
  {
    id: 3,
    title: 'xAI Grok 2.0: The New Frontier in AI',
    excerpt: 'xAI\'s latest model promises unprecedented reasoning capabilities and real-time knowledge. How it compares to competitors.',
    category: 'tech',
    readTime: '6 min',
    date: '2 days ago',
    trending: false,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80'
  },
  {
    id: 4,
    title: 'Mars Colony 2030: The Countdown Begins',
    excerpt: 'Inside SpaceX\'s plans for the first permanent Mars base. Timeline, architecture, and the selection process for colonists.',
    category: 'space',
    readTime: '10 min',
    date: '3 days ago',
    trending: false,
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&q=80'
  },
  {
    id: 5,
    title: 'Optimus Robot: From Lab to Factory',
    excerpt: 'Exclusive updates on Tesla\'s humanoid robot program. New footage reveals advanced dexterity and factory deployment plans.',
    category: 'tech',
    readTime: '7 min',
    date: '4 days ago',
    trending: true,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80'
  },
  {
    id: 6,
    title: 'Starlink Global Expansion Update',
    excerpt: '100+ countries now covered. Direct-to-cell service approaching launch and the next generation satellite constellation.',
    category: 'space',
    readTime: '4 min',
    date: '5 days ago',
    trending: false,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80'
  },
];

const subscriptionPlans = [
  { name: 'Free', price: '$0', features: ['Daily digest', 'Basic articles', 'Weekly roundup'], popular: false },
  { name: 'Premium', price: '$9/mo', features: ['All articles', 'Real-time alerts', 'Exclusive analysis', 'Early access'], popular: true },
  { name: 'Pro', price: '$29/mo', features: ['Everything in Premium', '1-on-1 AI assistant', 'Deep dive reports', 'Community access'], popular: false },
];

export default function NewsletterAI() {
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
    }
  };

  const filteredArticles = selectedCategory === 'all'
    ? sampleArticles
    : sampleArticles.filter(a => a.category === selectedCategory);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-violet-950/20 to-black border-t border-violet-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-violet-500/30 bg-violet-500/5 rounded-full">
            <Mail className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400 font-medium">
              Newsletter
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            AI Newsletter
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Curated insights delivered by AI. Stay ahead of the curve with the most comprehensive Musk universe coverage.
          </p>
        </motion.div>

        {/* Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl p-8">
            {!isSubscribed ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-violet-500" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">Get AI-Powered Updates</h3>
                  <p className="text-white/60">Join thousands of enthusiasts getting daily insights</p>
                </div>

                <div className="flex gap-3 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={!email}
                    className="px-6 py-3 bg-violet-500 hover:bg-violet-400 disabled:bg-white/20 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Subscribe
                  </button>
                </div>

                <p className="text-center text-white/40 text-xs">
                  No spam, unsubscribe anytime. By subscribing you agree to receive emails from us.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">You're In!</h3>
                <p className="text-white/60">Check your inbox to confirm your subscription</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {newsletterCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="aspect-video bg-neutral-800 relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {article.trending && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-red-500/80 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Trending
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-white/50 mb-2">
                  <span className="capitalize">{article.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="text-white font-medium mb-2 group-hover:text-violet-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-white/60 text-sm line-clamp-2">
                  {article.excerpt}
                </p>

                <button className="mt-4 text-violet-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-medium text-white text-center mb-8">Choose Your Plan</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {subscriptionPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setSelectedPlan(i)}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border-violet-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                } ${selectedPlan === i ? 'ring-2 ring-violet-500' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}

                <h4 className="text-xl font-medium text-white mb-1">{plan.name}</h4>
                <p className="text-3xl font-bold text-white mb-4">
                  {plan.price}
                  <span className="text-white/40 text-sm font-normal">/month</span>
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-violet-500 hover:bg-violet-400 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {selectedPlan === i ? 'Selected' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
