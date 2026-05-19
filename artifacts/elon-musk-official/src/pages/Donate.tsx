import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import Bio from "@/components/Bio";
import Forbes from "@/components/Forbes";
import Timeline from "@/components/Timeline";
import DonationForm from "@/components/DonationForm";
import Newsletter from "@/components/Newsletter";
import PressTicker from "@/components/PressTicker";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";

export default function Donate() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <Bio />
      <Forbes />
      <Timeline />
      <DonationForm />
      <Newsletter />
      <PressTicker />
      <Footer />
      <GrokWidget />
    </div>
  );
}