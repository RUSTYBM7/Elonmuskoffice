import Header from "@/components/Header";
import CryptoPayment from "@/components/CryptoPayment";
import Footer from "@/components/Footer";

export default function CryptoPay() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <CryptoPayment />
      <Footer />
    </div>
  );
}