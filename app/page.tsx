import CanvasGrid from "./components/ui/CanvasGrid";

import Header from "./components/layout/Header";
import HeroSection from "./components/sections/hero/HeroSection";
import IntroSection from "./components/sections/intro/IntroSection";
import Feature from "./components/sections/featurework/Feature";
import Footer from "./components/layout/Footer";
import Contact from "./components/layout/contact";
import Tools from "./components/sections/tools/Tools";

export default function Home() {
  return (
    <main className="relative w-full">
      <Header />

      <section className="relative w-full h-[100dvh] overflow-hidden">
        <CanvasGrid />
        <HeroSection />
      </section>

      <section className="relative w-full min-h-[100dvh] bg-[#050505] z-10">
        <IntroSection />
        <Feature />
        <Tools />
        <Contact />
        <Footer />

      </section>

    </main>
  );
}
