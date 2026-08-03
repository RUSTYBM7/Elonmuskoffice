import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import Biography from "@/components/Biography";
import Forbes from "@/components/Forbes";
import StockWidget from "@/components/StockWidget";
import VentureExplorer from "@/components/VentureExplorer";
import Ventures from "@/components/Ventures";
import Vision from "@/components/Vision";
import Timeline from "@/components/Timeline";
import SpacexIpo from "@/components/SpacexIpo";
import PressWall from "@/components/PressWall";
import ElonQuiz from "@/components/ElonQuiz";
import LiveNewsStrip from "@/components/LiveNewsStrip";
import Newsletter from "@/components/Newsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";
import StarlinkCoverage from "@/components/StarlinkCoverage";
import LaunchCountdown from "@/components/LaunchCountdown";

export default function HisFullLife() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <ElonQuiz />
      <Biography />
      <Forbes />
      <StockWidget />
      <StarlinkCoverage />
      <LaunchCountdown />
      <VentureExplorer />
      <Ventures />
      <Vision />
      <Timeline />
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
