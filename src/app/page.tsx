import HeroSection from "@/components/Home/HeroSection";
import HoverText from "@/components/Home/HoverText";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
          <HeroSection />
          <HoverText/>
    </main>
  );
}
