import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortraitSection from "@/components/PortraitSection";
import CryptoPayment from "@/components/CryptoPayment";
import Footer from "@/components/Footer";
import GrokWidget from "@/components/GrokWidget";

export default function CryptoPay() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <Hero />
      <PortraitSection />
      <CryptoPayment />
      <Footer />
      <GrokWidget />
    </div>
  );
}