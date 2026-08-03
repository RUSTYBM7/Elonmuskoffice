import { motion } from "framer-motion";

export default function Bio() {
  return (
    <section className="relative py-16 md:py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Biography
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
              About Elon Musk
            </h2>
          </div>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl mx-auto">
            <p>
              Elon Musk is the Technoking of Tesla and has served as our Chief
              Executive Officer since October 2008 and as a member of the Board
              since April 2004.
            </p>
            <p>
              Mr. Musk also currently serves as Chief Executive Officer, Chief
              Technology Officer, Chief Engineer and Chairman of Space
              Exploration Technologies Corp. ("SpaceX"), a company that designs,
              manufactures and launches advanced rockets and spacecraft, since
              May 2002, and Chief Executive Officer of 𝕏 Corp., a privately-held
              social media company, since October 2022.
            </p>
            <p>
              Mr. Musk also co-founded and serves as Chief Executive Officer of
              Neuralink Corp., a company developing ultra-high bandwidth
              brain-machine interfaces to connect humans and computers.
              Additionally, Mr. Musk is the Founder of The Boring Company, a
              tunnel and infrastructure company.
            </p>
            <p>
              Previously, Mr. Musk co-founded and served as Chairman of OpenAI,
              a non-profit company focused on developing artificial intelligence
              to benefit humanity. Prior to Tesla and SpaceX, Mr. Musk
              co-founded PayPal, the world's leading internet payment system,
              and was the founder of Zip2 Corporation, a provider of enterprise
              software and services to the new media industry.
            </p>
            <p>
              Mr. Musk holds a Bachelor of Arts degree in physics and a Bachelor
              of Science degree in economics from the University of
              Pennsylvania.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
