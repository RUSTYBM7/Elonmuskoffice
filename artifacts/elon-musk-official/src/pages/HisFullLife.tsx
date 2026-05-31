import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import StockWidget from "@/components/StockWidget";
import Biography from "@/components/Biography";
import PhotoGallery from "@/components/PhotoGallery";
import Forbes from "@/components/Forbes";
import Timeline from "@/components/Timeline";
import VentureExplorer from "@/components/VentureExplorer";
import Ventures from "@/components/Ventures";
import Vision from "@/components/Vision";
import PressWall from "@/components/PressWall";
import ElonQuiz from "@/components/ElonQuiz";
import Newsletter from "@/components/Newsletter";
import IndependentNewsletter from "@/components/IndependentNewsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";

export default function HisFullLife() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <StockWidget />
      <Biography />
      <PhotoGallery />
      <Forbes />
      <Timeline />
      <VentureExplorer />
      <Ventures />
      <Vision />
      <PressWall />
      <ElonQuiz />
      <Newsletter />
      <IndependentNewsletter />
      <PressTicker />
      <Footer />
      <GrokWidget />
    </div>
  );
}
