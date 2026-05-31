import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import StockWidget from "@/components/StockWidget";
import Bio from "@/components/Bio";
import PhotoGallery from "@/components/PhotoGallery";
import Forbes from "@/components/Forbes";
import Timeline from "@/components/Timeline";
import VentureExplorer from "@/components/VentureExplorer";
import Ventures from "@/components/Ventures";
import CompanyLogos from "@/components/CompanyLogos";
import PressWall from "@/components/PressWall";
import Newsletter from "@/components/Newsletter";
import IndependentNewsletter from "@/components/IndependentNewsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <StockWidget />
      <Bio />
      <PhotoGallery />
      <Forbes />
      <Timeline />
      <VentureExplorer />
      <Ventures />
      <CompanyLogos />
      <PressWall />
      <Newsletter />
      <IndependentNewsletter />
      <PressTicker />
      <Footer />
    </div>
  );
}
