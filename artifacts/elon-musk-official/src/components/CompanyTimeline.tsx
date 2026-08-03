'use client';
import { motion } from 'framer-motion';
import { Calendar, Rocket, Zap, Brain, Globe, Bitcoin, Shovel, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const companies = [
  {
    name: 'Tesla',
    founded: '2003',
    icon: Zap,
    color: '#e82127',
    milestones: [
      { year: '2003', title: 'Founded', description: 'Tesla Motors was founded by Martin Eberhard and Marc Tarpenning' },
      { year: '2008', title: 'Roadster Launch', description: 'First production car - the Roadster - delivered to customers' },
      { year: '2012', title: 'Model S', description: 'Revolutionary Model S sedan launched to critical acclaim' },
      { year: '2015', title: 'Model X', description: 'Falcon Wing doors and cutting-edge SUV introduced' },
      { year: '2017', title: 'Model 3', description: 'Mass-market sedan begins production' },
      { year: '2019', title: 'Shanghai Giga', description: 'First Gigafactory outside US begins production' },
      { year: '2020', title: 'S&P 500', description: 'Tesla joins S&P 500, becoming one of most valuable companies' },
      { year: '2023', title: 'Cybertruck', description: 'Highly anticipated futuristic pickup truck delivered' },
      { year: '2024', title: 'Optimus', description: 'Humanoid robot demonstrated at multiple events' },
    ]
  },
  {
    name: 'SpaceX',
    founded: '2002',
    icon: Rocket,
    color: '#005288',
    milestones: [
      { year: '2002', title: 'Founded', description: 'SpaceX founded with goal of reducing space transportation costs' },
      { year: '2008', title: 'First Success', description: 'Falcon 1 becomes first privately developed liquid-fueled rocket to orbit' },
      { year: '2012', title: 'Dragon to ISS', description: 'First commercial company to send spacecraft to ISS' },
      { year: '2015', title: 'First Landing', description: 'First successful landing of an orbital rocket' },
      { year: '2017', title: 'Falcon Heavy', description: 'Most powerful operational rocket in the world' },
      { year: '2019', title: 'Starlink', description: 'First Starlink satellites launched' },
      { year: '2020', title: 'Crew Dragon', description: 'First crewed flight to ISS from US soil since 2011' },
      { year: '2023', title: 'Starship', description: 'Starship orbital test flights begin' },
      { year: '2024', title: 'IFT-10', description: 'Starship IFT-10 achieves booster catch milestone' },
    ]
  },
  {
    name: 'Neuralink',
    founded: '2016',
    icon: Brain,
    color: '#8b5cf6',
    milestones: [
      { year: '2016', title: 'Founded', description: 'Neuralink Corp founded to develop brain-computer interfaces' },
      { year: '2019', title: 'First Reveal', description: 'Initial reveal of brain implant technology' },
      { year: '2021', title: 'Monkey Demo', description: 'Neuralink demonstrates chip in macaque monkey playing Pong' },
      { year: '2023', title: 'FDA Approval', description: 'FDA approves human clinical trials' },
      { year: '2024', title: 'First Human', description: 'First human patient receives Neuralink implant' },
    ]
  },
  {
    name: 'xAI',
    founded: '2023',
    icon: Globe,
    color: '#f97316',
    milestones: [
      { year: '2023', title: 'Founded', description: 'xAI launched to build AI products for the advancement of humanity' },
      { year: '2024', title: 'Grok Launch', description: 'Grok AI assistant released to X Premium+ subscribers' },
      { year: '2024', title: 'Grok 2', description: 'Second generation with enhanced capabilities released' },
    ]
  },
  {
    name: 'Starlink',
    founded: '2018',
    icon: Globe,
    color: '#0066cc',
    milestones: [
      { year: '2018', title: 'First Satellites', description: 'First two Starlink test satellites launched' },
      { year: '2019', title: 'Beta Service', description: 'Initial Starlink beta service begins' },
      { year: '2020', title: 'Public Beta', description: 'Starlink service opens to public in beta' },
      { year: '2022', title: 'Ukraine', description: 'Starlink aids Ukraine during conflict' },
      { year: '2023', title: 'Aircraft', description: 'Partnerships with airlines for in-flight WiFi' },
      { year: '2024', title: 'Global', description: 'Services available in 100+ countries' },
    ]
  },
  {
    name: 'Boring Co.',
    founded: '2017',
    icon: Shovel,
    color: '#f59e0b',
    milestones: [
      { year: '2017', title: 'Founded', description: 'The Boring Company created to build tunnels' },
      { year: '2018', title: 'Hawthorne Tunnel', description: 'First test tunnel in Hawthorne, CA opens' },
      { year: '2021', title: 'Vegas Loop', description: 'Las Vegas Convention Center Loop opens' },
      { year: '2022', title: 'Prufrock', description: 'Next-gen tunnel boring machine announced' },
      { year: '2024', title: 'Vegas Expansion', description: 'Las Vegas Strip Loop construction underway' },
    ]
  },
];

export default function CompanyTimeline() {
  const [selectedCompany, setSelectedCompany] = useState(0);
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  const company = companies[selectedCompany];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-slate-900/20 to-black border-t border-slate-800/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-slate-500/30 bg-slate-500/5 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
              History
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Company Timeline
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Explore the remarkable journey of Elon Musk's companies from inception to industry leaders.
          </p>
        </motion.div>

        {/* Company Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {companies.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedCompany(i);
                    setExpandedMilestone(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                    selectedCompany === i
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" style={{ color: selectedCompany === i ? '#000' : c.color }} />
                  <span className="font-medium">{c.name}</span>
                  <span className={`text-xs ${selectedCompany === i ? 'text-black/50' : 'text-white/40'}`}>
                    {c.founded}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          key={selectedCompany}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Company Header */}
          <div className="text-center mb-12">
            <div
              className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: company.color + '20' }}
            >
              <company.icon className="w-10 h-10" style={{ color: company.color }} />
            </div>
            <h3 className="text-3xl font-medium text-white">{company.name}</h3>
            <p className="text-white/60 mt-1">Est. {company.founded}</p>
          </div>

          {/* Milestones */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b"
              style={{
                background: `linear-gradient(to bottom, ${company.color}, ${company.color}40)`
              }}
            />

            <div className="space-y-6">
              {company.milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 pl-8 md:pl-0 ${
                    i % 2 === 0 ? 'md:pl-12 md:text-right' : 'md:pr-12'
                  }`}>
                    <button
                      onClick={() => setExpandedMilestone(expandedMilestone === i ? null : i)}
                      className={`w-full text-left group ${
                        i % 2 === 0 ? 'md:text-right' : ''
                      }`}
                    >
                      <span
                        className="text-2xl font-bold"
                        style={{ color: company.color }}
                      >
                        {milestone.year}
                      </span>
                      <h4 className="text-lg font-medium text-white mt-1 group-hover:text-blue-400 transition-colors">
                        {milestone.title}
                      </h4>
                      {expandedMilestone === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-white/60 mt-2"
                        >
                          {milestone.description}
                        </motion.p>
                      )}
                    </button>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black"
                    style={{ backgroundColor: company.color }}
                  />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* View More */}
          <div className="text-center mt-12">
            <a
              href={
                selectedCompany === 0 ? 'https://www.tesla.com/' :
                selectedCompany === 1 ? 'https://www.spacex.com/' :
                selectedCompany === 2 ? 'https://neuralink.com/' :
                selectedCompany === 3 ? 'https://x.ai/' :
                selectedCompany === 4 ? 'https://www.starlink.com/' :
                'https://www.boringcompany.com/'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors"
              style={{ backgroundColor: company.color }}
            >
              Visit {company.name}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
