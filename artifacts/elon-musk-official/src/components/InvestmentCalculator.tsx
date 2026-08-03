'use client';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Percent, Calendar, ArrowUpRight, ArrowDownRight, PieChart, Target, Rocket, ChevronRight, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

const muskCompanies = [
  { name: 'Tesla', ticker: 'TSLA', sector: 'EV / Energy', color: '#e82127' },
  { name: 'SpaceX', ticker: 'Private', sector: 'Aerospace', color: '#005288' },
  { name: 'xAI', ticker: 'Private', sector: 'AI', color: '#f97316' },
  { name: 'Starlink', ticker: 'Private', sector: 'Satellite', color: '#0066cc' },
  { name: 'Neuralink', ticker: 'Private', sector: 'BCI', color: '#8b5cf6' },
  { name: 'Boring Co.', ticker: 'Private', sector: 'Infrastructure', color: '#f59e0b' },
];

const allocationPresets = [
  { name: 'Aggressive', description: 'High risk, high reward', stocks: 70, crypto: 20, cash: 10 },
  { name: 'Balanced', description: 'Mix of growth and stability', stocks: 50, crypto: 10, cash: 40 },
  { name: 'Conservative', description: 'Focus on preservation', stocks: 30, crypto: 5, cash: 65 },
];

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(15);
  const [allocation, setAllocation] = useState({ stocks: 70, crypto: 20, cash: 10 });
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);
  const [showResults, setShowResults] = useState(false);

  const presetChange = (index: number) => {
    setSelectedPreset(index);
    setAllocation(allocationPresets[index]);
  };

  const calculateReturns = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = years * 12;

    // Future value of initial investment
    const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, totalMonths);

    // Future value of monthly contributions
    const fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    const totalValue = fvInitial + fvContributions;
    const totalContributed = initialInvestment + (monthlyContribution * totalMonths);
    const totalGains = totalValue - totalContributed;

    return {
      totalValue,
      totalContributed,
      totalGains,
      totalGainsPercent: ((totalValue - totalContributed) / totalContributed) * 100
    };
  };

  const results = calculateReturns();

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 300);
    return () => clearTimeout(timer);
  }, [initialInvestment, monthlyContribution, years, expectedReturn]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-emerald-950/20 to-black border-t border-emerald-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-emerald-500/30 bg-emerald-500/5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-medium">
              Investment Tools
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Investment Calculator
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Model your wealth building journey with compound growth. See what consistent investing can achieve.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Inputs */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-medium text-white mb-6">Investment Parameters</h3>

              {/* Initial Investment */}
              <div className="mb-6">
                <label className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Initial Investment</span>
                  <span className="text-emerald-400 font-medium">{formatCurrency(initialInvestment)}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>$1K</span>
                  <span>$500K</span>
                </div>
              </div>

              {/* Monthly Contribution */}
              <div className="mb-6">
                <label className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Monthly Contribution</span>
                  <span className="text-emerald-400 font-medium">{formatCurrency(monthlyContribution)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>$0</span>
                  <span>$10K</span>
                </div>
              </div>

              {/* Years */}
              <div className="mb-6">
                <label className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Time Horizon</span>
                  <span className="text-emerald-400 font-medium">{years} years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>1yr</span>
                  <span>40yr</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="mb-6">
                <label className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Expected Annual Return</span>
                  <span className="text-emerald-400 font-medium">{expectedReturn}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className="text-white/70 mb-3">Quick Presets</p>
                <div className="grid grid-cols-3 gap-2">
                  {allocationPresets.map((preset, i) => (
                    <button
                      key={preset.name}
                      onClick={() => presetChange(i)}
                      className={`p-3 rounded-xl border transition-colors text-left ${
                        selectedPreset === i
                          ? 'bg-emerald-500/20 border-emerald-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-white text-sm font-medium">{preset.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{preset.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Main Result */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: showResults ? 1 : 0, scale: showResults ? 1 : 0.95 }}
                className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl p-6 text-center"
              >
                <p className="text-white/60 mb-2">Future Value</p>
                <p className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {formatCurrency(results.totalValue)}
                </p>
                <p className="text-emerald-400 flex items-center justify-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  {results.totalGainsPercent.toFixed(0)}% total gain
                </p>
              </motion.div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <DollarSign className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Total Contributed</p>
                  <p className="text-xl font-medium text-white">{formatCurrency(results.totalContributed)}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Total Gains</p>
                  <p className="text-xl font-medium text-emerald-400">{formatCurrency(results.totalGains)}</p>
                </div>
              </div>

              {/* Allocation */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white font-medium">Allocation</p>
                  <button
                    onClick={() => {
                      setAllocation({ stocks: 70, crypto: 20, cash: 10 });
                      setSelectedPreset(0);
                    }}
                    className="text-white/40 hover:text-white/60 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Stocks (Musk Cos)', value: allocation.stocks, color: 'bg-emerald-500' },
                    { label: 'Crypto', value: allocation.crypto, color: 'bg-yellow-500' },
                    { label: 'Cash', value: allocation.cash, color: 'bg-blue-500' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-white">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Musk Companies */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white font-medium mb-4">Musk Ecosystem</p>
                <div className="grid grid-cols-2 gap-3">
                  {muskCompanies.map(company => (
                    <div key={company.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: company.color }}
                      />
                      <span className="text-white/70 text-sm">{company.name}</span>
                      <span className="text-white/40 text-xs ml-auto">{company.ticker}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-white/30 mb-8">
          This calculator is for educational purposes only. Past performance does not guarantee future results.
          Always consult a financial advisor before making investment decisions.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.tesla.com/investors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium rounded-full hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-lg shadow-emerald-500/25"
          >
            <Target className="w-4 h-4" />
            Explore Investment Opportunities
          </a>
        </motion.div>
      </div>
    </section>
  );
}
