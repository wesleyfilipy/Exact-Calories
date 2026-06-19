import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import AboutSection from "@/components/sections/about";
import HowItWorksSection from "@/components/sections/how-it-works";
import PremiumSection from "@/components/sections/premium";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PremiumSection />
      </main>
      <Footer />
    </div>
  );
}
