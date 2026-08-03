import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import Bio from "@/components/Bio";
import Forbes from "@/components/Forbes";
import StockWidget from "@/components/StockWidget";
import Ventures from "@/components/Ventures";
import Timeline from "@/components/Timeline";
import SpacexVideos from "@/components/SpacexVideos";
import SpacexIpo from "@/components/SpacexIpo";
import Terraform from "@/components/Terraform";
import PressWall from "@/components/PressWall";
import LiveNewsStrip from "@/components/LiveNewsStrip";
import Newsletter from "@/components/Newsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";
import MarsMissionPlanner from "@/components/MarsMissionPlanner";
import ISSTracker from "@/components/ISSTracker";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <Bio />
      <Forbes />
      <StockWidget />
      <SpacexVideos />
      <MarsMissionPlanner />
      <ISSTracker />
      <Ventures />
      <Timeline />
      <Terraform />
      <SpacexIpo />
      <PressWall />
      <LiveNewsStrip />
      <Newsletter />
      <PressTicker />
      <Footer />
      <GrokWidget />
    </div>
  );
}
