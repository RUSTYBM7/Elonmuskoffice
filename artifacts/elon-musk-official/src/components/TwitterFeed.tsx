'use client';
import { motion } from 'framer-motion';
import { Twitter, Heart, Repeat2, MessageCircle, Share2, ExternalLink, Clock, TrendingUp, Verified, MoreHorizontal, Image, Smile } from 'lucide-react';
import { useState, useEffect } from 'react';

const sampleTweets = [
  {
    id: '1',
    username: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://pbs.twimg.com/profile_images/elonmusk.jpg',
    content: 'Exciting progress on Starship. The future of humanity depends on becoming a multiplanetary species. Mars is the next giant leap.',
    timestamp: '2h ago',
    likes: 245000,
    retweets: 32000,
    replies: 5400,
    verified: true,
    images: [],
    isPinned: true
  },
  {
    id: '2',
    username: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://pbs.twimg.com/profile_images/elonmusk.jpg',
    content: 'Grok 2 is coming soon. It will be the most based AI assistant ever created. Truth-seeking is not optional.',
    timestamp: '5h ago',
    likes: 189000,
    retweets: 24000,
    replies: 3200,
    verified: true,
    images: [],
    isPinned: false
  },
  {
    id: '3',
    username: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://pbs.twimg.com/profile_images/elonmusk.jpg',
    content: 'Optimus robot is making tremendous progress. The future of labor is robots working alongside humans, not replacing them.',
    timestamp: '8h ago',
    likes: 156000,
    retweets: 18000,
    replies: 2100,
    verified: true,
    images: [],
    isPinned: false
  },
  {
    id: '4',
    username: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://pbs.twimg.com/profile_images/elonmusk.jpg',
    content: 'Working on something big. When it\'s ready, the world will know. Some things are worth waiting for.',
    timestamp: '12h ago',
    likes: 312000,
    retweets: 45000,
    replies: 8900,
    verified: true,
    images: [],
    isPinned: false
  },
  {
    id: '5',
    username: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://pbs.twimg.com/profile_images/elonmusk.jpg',
    content: 'Tesla Full Self-Driving is approaching human-level control. The neural network is getting scarily good. Next level autonomous.',
    timestamp: '1d ago',
    likes: 134000,
    retweets: 15000,
    replies: 2800,
    verified: true,
    images: [],
    isPinned: false
  },
];

const trendingTopics = [
  { topic: 'SpaceX', posts: '45.2K' },
  { topic: 'Tesla', posts: '32.1K' },
  { topic: 'Mars Mission', posts: '28.9K' },
  { topic: 'xAI Grok', posts: '21.4K' },
  { topic: 'Optimus', posts: '18.7K' },
];

export default function TwitterFeed() {
  const [isConnected, setIsConnected] = useState(false);
  const [animatedLikes, setAnimatedLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-slate-900/30 to-black border-t border-slate-800/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-slate-500/30 bg-slate-500/5 rounded-full">
            <Twitter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
              Live Feed
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Live on X
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Real-time updates from Elon Musk. Breaking news, thoughts, and announcements directly from the source.
          </p>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-black rounded-full overflow-hidden">
                    <img
                      src="https://pbs.twimg.com/profile_images/elonmusk.jpg"
                      alt="Elon Musk"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isConnected && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-medium">Elon Musk</span>
                    <Verified className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-white/50 text-sm">@elonmusk</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 ${
                  isConnected
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'} ${isConnected ? 'animate-pulse' : ''}`} />
                  {isConnected ? 'Live' : 'Connecting...'}
                </span>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            {/* Trending */}
            <div className="p-4 border-b border-white/10">
              <p className="text-white/50 text-sm mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </p>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map(topic => (
                  <button
                    key={topic.topic}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                  >
                    <p className="text-white text-sm font-medium">{topic.topic}</p>
                    <p className="text-white/40 text-xs">{topic.posts} posts</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tweets */}
            <div className="divide-y divide-white/5">
              {sampleTweets.map((tweet, index) => (
                <motion.div
                  key={tweet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 hover:bg-white/5 transition-colors ${tweet.isPinned ? 'bg-blue-500/5 border-l-2 border-blue-500' : ''}`}
                >
                  {tweet.isPinned && (
                    <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Pinned by Elon Musk
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-black rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={tweet.avatar}
                        alt={tweet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-white font-medium">{tweet.name}</span>
                        <Verified className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-white/50">@{tweet.username}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-white/50 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tweet.timestamp}
                        </span>
                      </div>

                      <p className="text-white mt-1 whitespace-pre-wrap">{tweet.content}</p>

                      {/* Images */}
                      {tweet.images.length > 0 && (
                        <div className={`grid gap-2 mt-3 ${
                          tweet.images.length === 1 ? '' :
                          tweet.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'
                        }`}>
                          {tweet.images.map((img, i) => (
                            <div key={i} className="aspect-video bg-neutral-800 rounded-xl overflow-hidden">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3 max-w-md">
                        <button className="flex items-center gap-1.5 text-white/50 hover:text-blue-400 transition-colors group">
                          <div className="p-1.5 rounded-full group-hover:bg-blue-400/10">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <span className="text-xs">{formatNumber(tweet.replies)}</span>
                        </button>

                        <button className="flex items-center gap-1.5 text-white/50 hover:text-green-400 transition-colors group">
                          <div className="p-1.5 rounded-full group-hover:bg-green-400/10">
                            <Repeat2 className="w-4 h-4" />
                          </div>
                          <span className="text-xs">{formatNumber(tweet.retweets)}</span>
                        </button>

                        <button className="flex items-center gap-1.5 text-white/50 hover:text-red-400 transition-colors group">
                          <div className="p-1.5 rounded-full group-hover:bg-red-400/10">
                            <Heart className="w-4 h-4" />
                          </div>
                          <span className="text-xs">{formatNumber(tweet.likes)}</span>
                        </button>

                        <button className="flex items-center gap-1.5 text-white/50 hover:text-cyan-400 transition-colors group">
                          <div className="p-1.5 rounded-full group-hover:bg-cyan-400/10">
                            <Share2 className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="p-4 text-center border-t border-white/10">
              <button className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                Load More
              </button>
            </div>
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
            href="https://twitter.com/elonmusk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            <Twitter className="w-4 h-4" />
            Follow on X
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
