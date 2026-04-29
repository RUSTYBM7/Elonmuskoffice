import { motion } from "framer-motion";
import spacexRocket from "@/assets/spacex-rocket.png";
import teslaCar from "@/assets/tesla-car.png";
import neuralink from "@/assets/neuralink.png";
import boringCompany from "@/assets/boring-company.png";
import xai from "@/assets/xai.png";
import xCom from "@/assets/x-com.png";
import starlink from "@/assets/starlink.png";

const ventures = [
  {
    name: "Tesla",
    role: "Technoking & CEO",
    description:
      "Accelerating the world's transition to sustainable energy with electric vehicles, solar generation and integrated energy storage.",
    image: teslaCar,
    href: "https://www.tesla.com",
  },
  {
    name: "SpaceX",
    role: "Founder, CEO & Chief Engineer",
    description:
      "Designing, manufacturing and launching advanced rockets and spacecraft. The ultimate goal: enabling humanity to live on other planets.",
    image: spacexRocket,
    href: "https://www.spacex.com",
  },
  {
    name: "Neuralink",
    role: "Co-founder",
    description:
      "Developing ultra-high bandwidth brain-machine interfaces to connect humans and computers.",
    image: neuralink,
    href: "https://neuralink.com",
  },
  {
    name: "The Boring Company",
    role: "Founder",
    description:
      "Solving traffic, transforming cities and enabling rapid point-to-point transportation through next-generation tunnels.",
    image: boringCompany,
    href: "https://www.boringcompany.com",
  },
  {
    name: "xAI",
    role: "Founder",
    description:
      "Building artificial intelligence to accelerate human scientific discovery and understand the true nature of the universe.",
    image: xai,
    href: "https://x.ai",
  },
  {
    name: "𝕏",
    role: "Executive Chairman & CTO",
    description:
      "The everything app — a global digital town square for conversation, news, finance and creators.",
    image: xCom,
    href: "https://x.com",
  },
  {
    name: "Starlink",
    role: "SpaceX Constellation",
    description:
      "Delivering high-speed broadband internet to locations where access has been unreliable, expensive, or completely unavailable.",
    image: starlink,
    href: "https://www.starlink.com",
  },
];

export default function Ventures() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Ventures
          </p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
            Companies Led by Elon Musk
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 md:gap-y-14">
          {ventures.map((venture, i) => (
            <motion.a
              key={venture.name}
              href={venture.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={venture.image}
                  alt={venture.name}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="pt-6">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {venture.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {venture.role}
                </p>
                <p className="mt-4 text-sm md:text-base text-foreground/75 leading-relaxed">
                  {venture.description}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-foreground/60 group-hover:text-foreground dark:group-hover:text-primary transition-colors">
                  Visit site
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
