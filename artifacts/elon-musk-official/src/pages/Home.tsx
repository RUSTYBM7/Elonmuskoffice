import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import Bio from "@/components/Bio";
import Forbes from "@/components/Forbes";
import Timeline from "@/components/Timeline";
import Ventures from "@/components/Ventures";
import CompanyLogos from "@/components/CompanyLogos";
import LifeGallery from "@/components/LifeGallery";
import Newsletter from "@/components/Newsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <Bio />
      <Forbes />
      <Timeline />
      <Ventures />
      <CompanyLogos />
      <LifeGallery />
      <Newsletter />
      <PressTicker />
      <Footer />
    </div>
  );
}