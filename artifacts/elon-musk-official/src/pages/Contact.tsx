import Header from "@/components/Header";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import MissionVision from "@/components/MissionVision";
import Foundation from "@/components/Foundation";
import NeuralinkSection from "@/components/NeuralinkSection";
import AISection from "@/components/AISection";
import DirectorSection from "@/components/DirectorSection";
import CompaniesGrid from "@/components/CompaniesGrid";
import Newsletter from "@/components/Newsletter";
import GrokWidget from "@/components/GrokWidget";
import Footer from "@/components/Footer";
import MuskQuotes from "@/components/MuskQuotes";
import NewsletterAI from "@/components/NewsletterAI";

export default function Contact() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <ContactHero />
      <ContactForm />
      <MissionVision />
      <Foundation />
      <NeuralinkSection />
      <AISection />
      <MuskQuotes />
      <NewsletterAI />
      <DirectorSection />
      <CompaniesGrid />
      <Newsletter />
      <Footer />
      <GrokWidget />
    </div>
  );
}