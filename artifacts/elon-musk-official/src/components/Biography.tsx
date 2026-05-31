import { motion } from "framer-motion";
import { BookOpen, Rocket, Zap, Brain, Globe, Heart, Star } from "lucide-react";

export default function Biography() {
  return (
    <section id="biography" className="py-20 md:py-28 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Biography</p>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">His Full Life</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-16">
          
          {/* Early Years */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Globe className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">Early Life & Origins (1971–1988)</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>Elon Reeves Musk was born on June 28, 1971, in Pretoria, South Africa — the eldest of three children born to Errol Musk, a South African electromechanical engineer, pilot, and sailor, and Maye Musk, a model and dietitian who was crowned Miss South Africa in 1969. Growing up in Pretoria and later Bulawayo, Zimbabwe, young Elon was always different — reading voraciously, teaching himself programming by age 10, and showing an extraordinary aptitude for science and technology that set him apart from his peers.</p>
              <p>Raised in a household that valued intellectual curiosity and entrepreneurial spirit, Elon absorbed the lessons of ambition and self-reliance from his parents. His mother Maye, who would later become an internationally recognized model and dietitian, and his father Errol, a renowned engineer who built some of South Africa's most significant infrastructure projects, both encouraged his curiosity while challenging him to think big. By age 10, Elon had taught himself to program using a Commodore VIC-20, and by age 12, he had already created and sold his own video game, Blastar, for $500 — demonstrating the entrepreneurial instincts that would define his future.</p>
              <p>However, childhood in South Africa was not without its challenges. Elon faced relentless bullying at Waterkloof House Preparatory School and later at Pretoria Boys High School, experiences that would shape his thick skin and drive for independence. Perhaps more significantly, his formative years coincided with South Africa's apartheid era, an experience that would later influence his strong positions on individual freedom and his eventual decision to leave the country at age 17, determined to escape the mandatory military service that would have forced him to serve the apartheid regime.</p>
              <p>The move to Canada in 1988, at age 17, marked the beginning of Elon's international journey. He arrived with little more than a suitcase and a fierce determination to reach the United States, where the world's greatest opportunities awaited. After spending a year at Queen's University in Ontario, Canada — where he quickly established himself as a standout student in physics and economics — Elon transferred to the University of Pennsylvania in 1992, where he earned dual degrees in Physics (B.S.) and Economics (B.S.) from the prestigious Wharton School.</p>
              <p>Those university years were formative in more ways than academics. It was at Penn that Elon forged a deep friendship with Adeo Ressi, who would become his lifelong business partner. Together, they developed a habit of ambitious thinking and calculated risk-taking that would later produce some of the world's most transformative companies. While his classmates pursued careers on Wall Street or in established corporations, Elon's mind was already focused on what he would later call "the five categories of technology that I think are going to be fundamental to the future of humanity": internet, sustainable energy, space exploration, artificial intelligence, and the reprogramming of human genetics.</p>
            </div>
          </div>

          {/* Internet Era */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Zap className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">The Internet Revolution (1995–2002)</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>Elon Musk arrived in Silicon Valley in 1995, fresh from the University of Pennsylvania, with $2,800 in his pocket and an insatiable appetite for building the future. The internet was still in its infancy — Mosaic had just launched, Amazon was a tiny online bookstore, and Google wouldn't exist for another three years. But Elon saw the transformative potential of this new medium and immediately set to work building companies that would define the digital age.</p>
              <p>His first venture was Zip2 Corporation, founded with his brother Kimbal in 1995. The company provided business directories and maps for newspapers — essentially creating the digital infrastructure for the emerging online publishing world. For two years, Elon worked literally around the clock, sleeping on the office floor, coding, selling, and building the company from nothing. In 1999, Compaq acquired Zip2 for $307 million — a staggering return that made Elon an instant multi-millionaire at age 27. His share of the sale was approximately $22 million after taxes, and his fierce negotiation for the deal terms earned him a reputation as a relentless and formidable dealmaker.</p>
              <p>Immediately after the Zip2 sale, Elon founded X.com in March 1999, investing $12 million of his own money. X.com was an online bank — radical for its time, offering free money transfers and no-fee checking when traditional banks charged hefty fees. Within months, X.com had grown to over 200,000 customers, becoming one of the first successful online banks. Elon was learning at breakneck speed: building software companies, managing engineering teams, dealing with financial regulators, and competing against established institutions with centuries of experience.</p>
              <p>Despite X.com's early success, the company faced a crisis in 2000 when a software bug allowed fraudulent transfers and a planned merger with Confinity — maker of the competing PayPal product — was nearly botched by an internal coup. Elon, who had been vacationing in Australia when the coup occurred, rushed back and personally intervened, ultimately merging X.com and Confinity under the PayPal brand. The combined company became the world's leading online payment platform, and when eBay acquired PayPal in 2002 for $1.5 billion, Elon received approximately $180 million after taxes — transforming him into one of the most significant internet entrepreneurs of his generation.</p>
              <p>But the PayPal sale also marked a turning point. At just 31 years old, Elon had achieved financial independence far beyond what most entrepreneurs dream of. He could have retired in luxury. Instead, he did something that few people in history have ever done: he doubled down, risking everything on two projects so ambitious that most people considered them science fiction.</p>
            </div>
          </div>

          {/* SpaceX */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Rocket className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">SpaceX — Making Humanity Multi-Planetary (2002–Present)</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>In 2002, Elon founded SpaceX (Space Exploration Technologies) with the stated goal of making humanity a multi-planetary species. The inspiration came partly from his childhood reading of Douglas Adams' Hitchhiker's Guide to the Galaxy and Isaac Asimov's Foundation series — science fiction that planted the idea that humanity's future lay among the stars. But it was also grounded in cold, hard analysis: Elon had calculated that the probability of civilization surviving the next thousand years without a backup location on another planet was slim, and he was determined to do something about it.</p>
              <p>The early years of SpaceX were brutal. The company's first three rocket launches — all Falcon 1 rockets — failed catastrophically. At one point, Elon told his team that they had just enough money for one more launch attempt. Everything was riding on the fourth attempt. The engineers worked around the clock, solving engineering problems that NASA and the Soviet space programs had taken decades to address, doing it with a fraction of the budget and in a fraction of the time. When Falcon 1 Flight 4 achieved orbit on September 28, 2008 — becoming the first privately developed liquid-fueled rocket to do so — it was a watershed moment in space history, proving that a privately funded company could do what only governments had done before.</p>
              <p>But Elon was just getting started. With Falcon 9, SpaceX developed a rocket that could be reused — flying back to land vertically after delivering its payload to orbit, like something out of a science fiction movie. The first successful landing of a Falcon 9 booster happened in December 2015, and it revolutionized the economics of space access. Today, SpaceX's reusable rockets deliver more payload to orbit than all other launch providers combined, at a fraction of historical costs.</p>
              <p>SpaceX's Crew Dragon capsule has carried astronauts to the International Space Station, making SpaceX only the second organization in history to achieve human spaceflight capability — alongside NASA, which took 50 years and billions of dollars to develop the same capability. The company's Starlink project is deploying a constellation of thousands of satellites to provide broadband internet to the entire planet, including the most remote corners of the Earth that have never had access before. And in 2023, SpaceX's Starship — the largest and most powerful rocket ever built — successfully completed its first full flight test, paving the way for a future where humans will travel to the Moon and eventually Mars.</p>
              <p>As SpaceX's CEO and Chief Engineer, Elon oversees every aspect of the company's operations, from rocket engine design to launch operations. He has publicly committed to using the profits from SpaceX's commercial operations to fund the development of Mars colonization technology. His vision for Mars is not metaphorical — SpaceX has published detailed plans for a self-sustaining city of one million people on the Red Planet by 2050, with the first crewed missions potentially launching within this decade.</p>
            </div>
          </div>

          {/* Tesla */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Zap className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">Tesla — Accelerating the Energy Transition (2004–Present)</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>Elon joined Tesla Motors in 2004 as its Chairman and principal investor, contributing $6.5 million of his own money to the company that would transform the automotive industry forever. At the time, electric vehicles were widely considered to be impractical toys — slow, ugly, and with limited range. The major automakers had all but abandoned EV technology after the GM EV1 program ended in 2003. Elon saw an opportunity to change that perception forever, and more importantly, to change the trajectory of the entire planet.</p>
              <p>For years, Tesla operated in a state of near-death. The original Tesla Roadster — a conversion of the Lotus Elise sports car with an electric powertrain — was years behind schedule and vastly over budget. Elon had to step in and take over as CEO in 2008, right as the global financial crisis hit, forcing him to personally prop up the company with cash infusions while simultaneously keeping SpaceX alive through its own rocket failures. In one of the most physically and emotionally demanding periods of his life, he worked 120-hour weeks, sleeping on the floors of both factories, and reportedly came close to a complete mental breakdown.</p>
              <p>But Tesla survived. The Roadster eventually launched in 2008, proving that electric cars could be beautiful, fast, and desirable. The Model S sedan, launched in 2012, received universal acclaim and became the first electric car to win Motor Trend's Car of the Year award. The Model X crossover introduced falcon-wing doors and industry-leading safety features. The Model 3, launched in 2017, became the best-selling electric car in history, bringing electric vehicles to the mass market for the first time. The Cybertruck, unveiled in 2019, was a radical departure from conventional truck design that polarized the automotive industry but generated hundreds of thousands of pre-orders.</p>
              <p>But Tesla is not just a car company. As its CEO, Elon has expanded Tesla's mission to encompass the entire sustainable energy ecosystem. Tesla Energy produces the Powerwall home battery and Megapack utility-scale energy storage systems, which are being deployed worldwide to accelerate the transition from fossil fuels. Tesla Solar offers solar roof tiles that integrate seamlessly with home design while generating clean electricity. And Tesla's Full Self-Driving (FSD) and Autopilot programs represent the most advanced autonomous driving technology in the world, moving the company toward a future of autonomous robotaxis that could revolutionize urban transportation.</p>
              <p>The impact of Tesla on the automotive industry has been nothing short of transformative. Before Tesla, the major automakers viewed electric vehicles as compliance exercises — cars they had to build to satisfy regulators, not products they wanted to sell. Today, every major automaker has announced massive EV programs, and the date of the internal combustion engine's eventual extinction has been moved up by decades. This shift, more than anything else, is the legacy of Elon Musk's refusal to accept that the world's most important industry could not be disrupted.</p>
            </div>
          </div>

          {/* Neuralink */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Brain className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">Neuralink — Merging Minds with Machines (2016–Present)</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>Neuralink was founded in 2016 with an ambition that sounds like the premise of a science fiction novel: developing ultra-high bandwidth brain-computer interfaces (BCIs) that would allow humans to communicate directly with computers and eventually merge with artificial intelligence. But Elon, true to form, approached this vision with the same rigorous engineering mindset he brings to rockets and electric cars.</p>
              <p>The company's first major public demonstration came in 2020, when Neuralink showed a pig named Gertrude with a Neuralink implant in her brain, demonstrating real-time tracking of neural activity. The technology works by implanting thousands of ultra-thin electrodes — thinner than a human hair — into specific regions of the brain, where they can read and potentially stimulate neural activity. In January 2024, Neuralink achieved a historic milestone: the successful implantation of its N1 chip in a human patient with ALS, allowing the patient to control a computer cursor with their thoughts alone.</p>
              <p>But medical applications are only the beginning. Elon has described Neuralink's long-term vision as achieving a "symbiosis" between human intelligence and artificial intelligence. In a world where AI is advancing at a staggering pace, the concern is that human intelligence will become increasingly irrelevant — a biological artifact in a world of superhuman machine intelligence. Neuralink represents Elon's proposed solution: augment human cognition directly with AI capability, allowing humanity to remain relevant and in control even as AI surpasses human intelligence in every domain.</p>
              <p>The implications of this technology extend far beyond medical applications. Imagine being able to recall any memory with perfect clarity, to communicate complex ideas by simply thinking them, or to directly interface with AI systems that understand your intentions before you consciously form them. These are not fantasies — they are the stated long-term goals of Neuralink's research program, and the early medical trials suggest that the technology is not only possible but achievable within our lifetimes.</p>
            </div>
          </div>

          {/* xAI */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Brain className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">xAI — Understanding the Universe (2023–Present)</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>In July 2023, Elon announced the formation of xAI — a new artificial intelligence company dedicated to building AI systems that understand the true nature of the universe. The company's stated mission is to "advance human scientific discovery" by developing AI that is not only powerful but also honest, reliable, and aligned with human values.</p>
              <p>The reasoning behind xAI is both philosophical and strategic. Elon had long been an outspoken critic of OpenAI, the AI company he co-founded in 2015 but left in 2018 due to disagreements over its direction. He argued that OpenAI had become too focused on profit and too cautious in its AI development, creating systems that were censored and constrained in ways that limited their usefulness. xAI was conceived as a different approach: an AI company that would prioritize truth over political correctness, accuracy over safety theater, and genuine understanding over surface-level performance.</p>
              <p>Grok, xAI's flagship AI assistant, was unveiled in November 2023. Unlike other AI assistants, Grok was designed to answer questions that most other AI systems would refuse — questions about controversial topics, edgy humor, and topics that other AI companies deemed too risky to address. Grok was trained on data from the 𝕏 platform, giving it access to real-time information that other AIs lack. And it was designed with a rebellious, witty personality that made it unlike any other AI on the market.</p>
              <p>But more than personality, Grok represents xAI's deeper commitment to AI truthfulness. In a landscape where most AI systems are trained to give answers that satisfy human reviewers — even when those answers are wrong — xAI has built Grok to prioritize accuracy above all else. The company publishes regular updates on Grok's capabilities, limitations, and alignment testing, maintaining a level of transparency that is rare in the AI industry. As xAI scales, it is building one of the world's largest GPU clusters to train ever-more-powerful AI models that could help solve some of humanity's most pressing challenges.</p>
            </div>
          </div>

          {/* Family */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Heart className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">Family, Fatherhood & Personal Life</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>Elon Musk's personal life has been as public and scrutinized as his professional achievements. He has been married twice — to Justine Musk (2000–2008) and Talulah Riley (2010–2016) — and has fathered eleven children across multiple relationships, including twins and triplets with his first wife, a son who died of sudden infant death syndrome (SIDS), a son and daughter with Canadian musician Grimes, triplet sons with Shivon Zilis (Neuralink's Director of Special Projects), and additional children whose existence was confirmed in 2024.</p>
              <p>Little X Æ A-12 (born May 2020), Elon's first child with Grimes, quickly became one of the most famous children in the world, appearing alongside his father at SpaceX launches, Tesla events, and public appearances. Named after a mathematical equation (X Æ A-12), Little X represents Elon's belief that the names of things should reflect their meaning rather than convention. His second child with Grimes, Exa Musk (born December 2021), whose nickname is "littleX," has also been photographed at family events. The children's upbringing has been shaped by Elon's philosophy that the world needs more people who care about the future and take responsibility for it.</p>
              <p>Elon's approach to fatherhood is characteristic of his approach to everything else: relentlessly unconventional. He has spoken openly about the difficulty of balancing his professional ambitions with his family life, acknowledging that his work schedule leaves little time for the traditional activities of parenthood. Yet he has also insisted that his children understand — from a very young age — the importance of the work he is doing and why it matters for the future of humanity. Family is not separate from the mission for Elon; it is integral to it.</p>
              <p>In 2023, a New York Times profile revealed that Elon had quietly welcomed additional children in his relationships with multiple partners, further complicating his already complicated family life. These revelations came amid ongoing custody arrangements and public scrutiny of his relationships with Grimes, with whom he maintains a complex, on-and-off relationship characterized by public disagreements and private reconciliation. Despite the chaos of his personal life, Elon's core belief remains unchanged: that humanity needs more children, not fewer, and that the best thing prospective parents can do is raise them to be free thinkers who question everything.</p>
            </div>
          </div>

          {/* Philanthropy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground/10 rounded-sm flex items-center justify-center"><Star className="w-5 h-5 text-foreground" /></div>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">Philanthropy & The Musk Foundation</h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-foreground/75 leading-relaxed">
              <p>The Musk Foundation, established in 2002, is the primary vehicle for Elon's charitable giving. Over the years, the foundation has donated hundreds of millions of dollars to causes ranging from disaster relief to renewable energy research to pediatric healthcare. But Elon's approach to philanthropy is as unconventional as everything else about him: rather than simply writing checks, he prefers to fund projects that have the potential to produce outsized impact.</p>
              <p>Some notable donations include: $100 million to the Open Philanthropy Project for AI safety research; $20 million to rebuild infrastructure in typhoon-devastated Philippines; $10 million to FIRST Robotics (which Elon credits with inspiring his own engineering career); and over $250 million to the UN World Food Programme efforts. In 2022, amid Twitter's acquisition and massive personal debt, Elon donated approximately $5.7 billion in Tesla shares to charity — one of the largest charitable donations in American history.</p>
              <p>But Elon's philanthropy has also been criticized. While his total charitable contributions are substantial — estimated at over $7 billion cumulative — critics point out that as a percentage of his net worth, his giving is less than most other billionaires. Defenders counter that Elon's real contribution is not his charitable donations but his companies: SpaceX has reduced the cost of space access by an order of magnitude, saving government agencies and private companies billions; Tesla has accelerated the EV transition by over a decade; and the combination of these efforts may have done more for humanity's future than any traditional charity.</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}