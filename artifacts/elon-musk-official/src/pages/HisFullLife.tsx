import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import Biography from "@/components/Biography";
import Forbes from "@/components/Forbes";
import Timeline from "@/components/Timeline";
import Ventures from "@/components/Ventures";
import Vision from "@/components/Vision";
import Newsletter from "@/components/Newsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";

export default function HisFullLife() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <Biography />
      <Forbes />
      <Timeline />
      <Ventures />
      <Vision />
      <Newsletter />
      <PressTicker />
      <Footer />
      <GrokWidget />
    </div>
  );
}