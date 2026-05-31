import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import Bio from "@/components/Bio";
import Forbes from "@/components/Forbes";
import Timeline from "@/components/Timeline";
import Ventures from "@/components/Ventures";
import Vision from "@/components/Vision";
import Newsletter from "@/components/Newsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";

export default function Management() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <Bio />
      <Forbes />
      <Timeline />
      <Ventures />
      <Vision />
      <Newsletter />
      <PressTicker />
      <Footer />
    </div>
  );
}