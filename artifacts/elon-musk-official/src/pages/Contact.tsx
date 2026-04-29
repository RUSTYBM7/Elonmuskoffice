import Header from "@/components/Header";
import PortraitSection from "@/components/PortraitSection";
import QuotesMarquee from "@/components/QuotesMarquee";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      <Header />
      <PortraitSection />
      <QuotesMarquee />
      <Newsletter />
      <Footer />
    </div>
  );
}
