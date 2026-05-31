import Header from "@/components/Header";
import DonationHero from "@/components/DonationHero";
import DonationForm from "@/components/DonationForm";
import Footer from "@/components/Footer";

export default function Donate() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <DonationHero />
      <DonationForm />
      <Footer />
    </div>
  );
}