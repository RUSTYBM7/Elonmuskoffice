import Header from "@/components/Header";
import ContactHero from "@/components/ContactHero";
import MissionVision from "@/components/MissionVision";
import Foundation from "@/components/Foundation";
import NeuralinkSection from "@/components/NeuralinkSection";
import AISection from "@/components/AISection";
import DirectorSection from "@/components/DirectorSection";
import CompaniesGrid from "@/components/CompaniesGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <ContactHero />
      <MissionVision />
      <Foundation />
      <NeuralinkSection />
      <AISection />
      <DirectorSection />
      <CompaniesGrid />
      <Newsletter />
      <Footer />
    </div>
  );
}