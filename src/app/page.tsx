import ImageStackedPinning from "@/components/Home/CardStack";
import FloatingGallery from "@/components/Home/FloatingCard";
import HeroSection from "@/components/Home/HeroSection";
import HoverText from "@/components/Home/HoverText";
import TestimonialSection from "@/components/Home/Testinomials";
import WaitlistSection from "@/components/Home/WaitlistSection";
import Navbar from "@/components/Layout/Nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden scroll-smooth">
          <Navbar />
          <HeroSection />
          <ImageStackedPinning/>
          <FloatingGallery/>
          <TestimonialSection/>
          <HoverText/>
          <WaitlistSection/>
    </main>
  );
}
