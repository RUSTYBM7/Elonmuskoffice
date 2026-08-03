'use client';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Zap, Rocket, Bitcoin, Brain, Globe, Cpu, Shield, Target, Crown, Flame, Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const achievementCategories = [
  { name: 'All', icon: Sparkles },
  { name: 'Space', icon: Rocket },
  { name: 'Tech', icon: Cpu },
  { name: 'Finance', icon: Bitcoin },
  { name: 'Social', icon: Globe },
];

const achievements = [
  {
    id: 1,
    name: 'Mars Pioneer',
    description: 'First visitor to witness a Mars mission announcement',
    category: 'Space',
    rarity: 'Legendary',
    icon: Rocket,
    color: '#ef4444',
    unlocked: true,
    date: 'March 2024',
    progress: 100
  },
  {
    id: 2,
    name: 'Early Adopter',
    description: 'Purchased Tesla stock before the 2020 surge',
    category: 'Finance',
    rarity: 'Rare',
    icon: Bitcoin,
    color: '#f97316',
    unlocked: true,
    date: 'January 2020',
    progress: 100
  },
  {
    id: 3,
    name: 'SpaceX Loyalty',
    description: 'Watched 10+ SpaceX launches live',
    category: 'Space',
    rarity: 'Epic',
    icon: Rocket,
    color: '#3b82f6',
    unlocked: true,
    date: 'June 2024',
    progress: 100
  },
  {
    id: 4,
    name: 'Neuralink Believer',
    description: 'Followed Neuralink from inception to first human implant',
    category: 'Tech',
    rarity: 'Legendary',
    icon: Brain,
    color: '#8b5cf6',
    unlocked: false,
    progress: 75
  },
  {
    id: 5,
    name: 'X Superuser',
    description: 'Engaged with 1000+ Elon Musk posts',
    category: 'Social',
    rarity: 'Common',
    icon: Globe,
    color: '#22d3ee',
    unlocked: true,
    date: 'February 2024',
    progress: 100
  },
  {
    id: 6,
    name: 'Doge Army',
    description: 'Held DOGE through 3 major market cycles',
    category: 'Finance',
    rarity: 'Rare',
    icon: Bitcoin,
    color: '#f97316',
    unlocked: true,
    date: 'August 2023',
    progress: 100
  },
  {
    id: 7,
    name: 'FSD Pioneer',
    description: 'Used Full Self-Driving beta for 1+ year',
    category: 'Tech',
    rarity: 'Epic',
    icon: Cpu,
    color: '#22c55e',
    unlocked: true,
    date: 'December 2023',
    progress: 100
  },
  {
    id: 8,
    name: 'Mars Colonist 2030',
    description: 'Reserved a spot for Mars colonization',
    category: 'Space',
    rarity: 'Legendary',
    icon: Rocket,
    color: '#ef4444',
    unlocked: false,
    progress: 30
  },
  {
    id: 9,
    name: 'Optimus Supporter',
    description: 'Witnessed Optimus robot go from concept to factory',
    category: 'Tech',
    rarity: 'Epic',
    icon: Brain,
    color: '#8b5cf6',
    unlocked: false,
    progress: 60
  },
  {
    id: 10,
    name: 'Grok Insider',
    description: 'First to try xAI Grok when it launched',
    category: 'Tech',
    rarity: 'Rare',
    icon: Cpu,
    color: '#22c55e',
    unlocked: true,
    date: 'November 2024',
    progress: 100
  },
  {
    id: 11,
    name: 'Starlink Global',
    description: 'Connected from 10+ countries via Starlink',
    category: 'Tech',
    rarity: 'Epic',
    icon: Globe,
    color: '#3b82f6',
    unlocked: false,
    progress: 40
  },
  {
    id: 12,
    name: 'Tesla Believer',
    description: 'Owned Tesla stock for 5+ years',
    category: 'Finance',
    rarity: 'Legendary',
    icon: Trophy,
    color: '#eab308',
    unlocked: true,
    date: 'January 2019',
    progress: 100
  },
];

const rarityColors: Record<string, string> = {
  Legendary: 'from-amber-500 to-orange-500',
  Epic: 'from-purple-500 to-pink-500',
  Rare: 'from-blue-500 to-cyan-500',
  Common: 'from-gray-500 to-gray-600',
};

export default function AchievementBadges() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-yellow-950/20 to-black border-t border-yellow-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-yellow-500/30 bg-yellow-500/5 rounded-full">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-yellow-600 dark:text-yellow-400 font-medium">
              Achievements
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Achievement Badges
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Collect badges as you journey through the Muskverse. Unlock achievements and showcase your dedication.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="text-white font-medium">Collection Progress</span>
              </div>
              <span className="text-yellow-400 font-bold">{unlockedCount} / {totalCount}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
              />
            </div>
            <p className="text-white/50 text-sm mt-2 text-center">
              {totalCount - unlockedCount} more achievements to unlock
            </p>
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
            {achievementCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === cat.name
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredAchievements.map((achievement, i) => {
            const Icon = achievement.icon;
            const isLocked = !achievement.unlocked;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedAchievement(achievement)}
                className={`relative p-4 rounded-xl border transition-all cursor-pointer hover:scale-105 ${
                  isLocked
                    ? 'bg-white/5 border-white/10 opacity-60 hover:opacity-80'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Rarity Glow */}
                {!isLocked && (
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${rarityColors[achievement.rarity]} opacity-10 blur-sm`} />
                )}

                {/* Badge */}
                <div className="relative">
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                    isLocked
                      ? 'bg-gray-500/20'
                      : ''
                  }`}
                  style={{ backgroundColor: isLocked ? undefined : achievement.color + '30' }}
                  >
                    <Icon
                      className={`w-7 h-7 ${isLocked ? 'text-gray-500' : ''}`}
                      style={{ color: isLocked ? undefined : achievement.color }}
                    />
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="text-white text-sm font-medium text-center mb-1">{achievement.name}</h4>

                  {/* Rarity */}
                  <div className="flex justify-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white font-medium`}>
                      {achievement.rarity}
                    </span>
                  </div>

                  {/* Progress */}
                  {isLocked && (
                    <div className="mt-2">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full transition-all"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Achievement Modal */}
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: selectedAchievement.color + '30' }}
                >
                  <selectedAchievement.icon
                    className="w-10 h-10"
                    style={{ color: selectedAchievement.color }}
                  />
                </div>

                <h3 className="text-2xl font-medium text-white mb-2">{selectedAchievement.name}</h3>

                <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${rarityColors[selectedAchievement.rarity]} text-white text-sm font-medium mb-4`}>
                  {selectedAchievement.rarity}
                </span>

                <p className="text-white/60 mb-4">{selectedAchievement.description}</p>

                {selectedAchievement.unlocked ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-400 text-sm">
                      Unlocked on {selectedAchievement.date}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Progress</span>
                      <span className="text-yellow-400">{selectedAchievement.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                        style={{ width: `${selectedAchievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://x.com/elonmusk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-full hover:from-yellow-500 hover:to-amber-500 transition-all shadow-lg shadow-yellow-500/25"
          >
            <Trophy className="w-4 h-4" />
            Earn More Badges
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
