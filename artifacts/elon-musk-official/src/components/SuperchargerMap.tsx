'use client';
import { motion } from 'framer-motion';
import { Zap, MapPin, Navigation, Car, Battery, Clock, ChevronRight, Search, Filter, Map, List } from 'lucide-react';
import { useState } from 'react';

const superchargerStats = [
  { value: '50,000+', label: 'Stall Globally', icon: Zap },
  { value: '5,000+', label: 'Locations', icon: MapPin },
  { value: '50+', label: 'Countries', icon: Navigation },
  { value: '250kW', label: 'Max Power', icon: Battery },
];

const popularStations = [
  { name: 'Tesla Supercharger Hawthorne', location: 'Hawthorne, CA', stalls: 24, power: '250kW', wait: '5 min', distance: '0.8 mi' },
  { name: 'Tesla Supercharger Las Vegas', location: 'Las Vegas, NV', stalls: 40, power: '250kW', wait: '12 min', distance: '2.1 mi' },
  { name: 'Tesla Supercharger Austin', location: 'Austin, TX', stalls: 32, power: '250kW', wait: '8 min', distance: '3.4 mi' },
  { name: 'Tesla Supercharger Miami', location: 'Miami, FL', stalls: 28, power: '250kW', wait: '15 min', distance: '4.2 mi' },
  { name: 'Tesla Supercharger Seattle', location: 'Seattle, WA', stalls: 20, power: '250kW', wait: '3 min', distance: '1.5 mi' },
  { name: 'Tesla Supercharger Denver', location: 'Denver, CO', stalls: 36, power: '250kW', wait: '10 min', distance: '2.8 mi' },
];

const chargingSpeeds = [
  { range: '0-50%', time: '~15 min', icon: Battery, color: 'text-red-400' },
  { range: '50-80%', time: '~15 min', icon: Battery, color: 'text-yellow-400' },
  { range: '80-100%', time: '~20 min', icon: Battery, color: 'text-green-400' },
];

export default function SuperchargerMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedStation, setSelectedStation] = useState(0);

  const filteredStations = superchargerStats.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-950 via-green-950/20 to-black border-t border-green-900/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-green-500/30 bg-green-500/5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-green-600 dark:text-green-400 font-medium">
              Supercharger Network
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
            Supercharger Map
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            The largest global EV charging network. Charge anywhere, anytime with up to 250kW of power.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {superchargerStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-center"
              >
                <Icon className="w-6 h-6 text-green-500 mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-medium text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Map / List View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-green-500/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'map' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <Map className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-3 min-h-[400px]">
              {/* Map Placeholder */}
              <div className="md:col-span-2 relative bg-gradient-to-br from-green-900/20 to-blue-900/20 min-h-[300px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="w-24 h-24 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40">Interactive Map</p>
                    <p className="text-white/20 text-sm">Powered by Tesla API</p>
                  </div>
                </div>

                {/* Map Points */}
                <div className="absolute inset-0">
                  {[
                    { x: '20%', y: '30%', active: true },
                    { x: '45%', y: '25%', active: false },
                    { x: '70%', y: '45%', active: true },
                    { x: '30%', y: '65%', active: false },
                    { x: '55%', y: '70%', active: true },
                    { x: '80%', y: '30%', active: false },
                  ].map((point, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStation(i)}
                      className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 ${
                        point.active ? 'animate-pulse' : ''
                      }`}
                      style={{ left: point.x, top: point.y }}
                    >
                      <div className={`w-full h-full rounded-full ${
                        selectedStation === i ? 'bg-green-500' : 'bg-green-500/60'
                      } flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Station List */}
              <div className="border-l border-white/10 p-4 max-h-[400px] overflow-y-auto">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-3">Nearby Stations</p>
                <div className="space-y-2">
                  {popularStations.slice(0, 4).map((station, i) => (
                    <button
                      key={station.name}
                      onClick={() => setSelectedStation(i)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedStation === i
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-white/5 border border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{station.name}</p>
                          <p className="text-xs text-white/50">{station.location}</p>
                        </div>
                        <span className="text-xs text-green-400 whitespace-nowrap">{station.distance}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {station.stalls} stalls
                        </span>
                        <span>{station.power}</span>
                        <span className="text-yellow-400">{station.wait} wait</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charging Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-medium text-white text-center mb-8">Charging Speed</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {chargingSpeeds.map((speed, i) => {
              const Icon = speed.icon;
              return (
                <div key={speed.range} className="text-center p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Icon className={`w-8 h-8 ${speed.color} mx-auto mb-3`} />
                  <p className="text-xl font-medium text-white mb-1">{speed.range}</p>
                  <p className="text-sm text-white/60">{speed.time}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Station Detail */}
        <motion.div
          key={selectedStation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-medium text-white">{popularStations[selectedStation].name}</h4>
                <p className="text-white/60 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {popularStations[selectedStation].location}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                Available
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Zap className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-lg font-medium text-white">{popularStations[selectedStation].stalls}</p>
                <p className="text-xs text-white/60">Stalls</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Battery className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                <p className="text-lg font-medium text-white">{popularStations[selectedStation].power}</p>
                <p className="text-xs text-white/60">Max Power</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-lg font-medium text-white">{popularStations[selectedStation].wait}</p>
                <p className="text-xs text-white/60">Wait Time</p>
              </div>
            </div>
            <a
              href="https://www.tesla.com/findus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Navigate
              <ChevronRight className="w-4 h-4" />
            </a>
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
            href="https://www.tesla.com/supercharger"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-full hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25"
          >
            <Zap className="w-4 h-4" />
            Find Superchargers Near You
          </a>
        </motion.div>
      </div>
    </section>
  );
}
