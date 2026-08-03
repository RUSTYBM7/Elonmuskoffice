'use client';
import { motion } from "framer-motion";
import { Clock, Rocket, Calendar, MapPin, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const upcomingLaunches = [
  {
    name: 'SpaceX Starship IFT-11',
    mission: 'Orbital refueling test & booster catch attempt',
    date: '2026-08-15T14:00:00',
    location: 'Starbase, Boca Chica, TX',
    vehicle: 'Starship',
    status: 'Confirmed'
  },
  {
    name: 'SpaceX Crew-10',
    mission: 'NASA Crew rotation to ISS',
    date: '2026-09-01T10:30:00',
    location: 'Kennedy Space Center, FL',
    vehicle: 'Falcon 9 + Dragon',
    status: 'Confirmed'
  },
  {
    name: 'Starlink Group 12-5',
    mission: '60 Starlink satellites to polar orbit',
    date: '2026-08-20T06:15:00',
    location: 'Vandenberg SFB, CA',
    vehicle: 'Falcon 9',
    status: 'Scheduled'
  }
];

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Sec' }
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-secondary border border-border rounded-xl flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-foreground font-mono">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-wider">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function LaunchCountdown() {
  const nextLaunch = new Date(upcomingLaunches[0].date);

  return (
    <section className="relative py-16 md:py-24 px-6 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-border bg-secondary/20 rounded-full">
            <Clock className="w-3.5 h-3.5 text-foreground" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              Next Launch
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
            Countdown to Launch
          </h2>
          <p className="text-sm text-foreground/65 max-w-xl mx-auto">
            Watch history in the making. Next SpaceX mission launching soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-secondary/30 border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {upcomingLaunches[0].status}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {upcomingLaunches[0].vehicle}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {upcomingLaunches[0].name}
            </h3>
            <p className="text-foreground/70 mb-6">{upcomingLaunches[0].mission}</p>

            <div className="mb-8">
              <CountdownTimer targetDate={nextLaunch} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Date</p>
                  <p className="text-sm text-foreground">
                    {new Date(upcomingLaunches[0].date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Time</p>
                  <p className="text-sm text-foreground">
                    {new Date(upcomingLaunches[0].date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Location</p>
                  <p className="text-sm text-foreground">{upcomingLaunches[0].location}</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.spacex.com/launches/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              Watch Live on SpaceX
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-lg font-medium text-foreground mb-4">Upcoming Launches</h4>
          <div className="space-y-3">
            {upcomingLaunches.slice(1).map((launch, i) => (
              <motion.div
                key={launch.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-secondary/20 border border-border rounded-xl hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary border border-border rounded-lg flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{launch.name}</p>
                    <p className="text-xs text-muted-foreground">{launch.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">
                    {new Date(launch.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(launch.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground/50">
          Launch dates subject to change. Check SpaceX.com for latest updates.
        </p>
      </div>
    </section>
  );
}
