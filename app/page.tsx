import CampaignnerLanding from "@/components/CampaignnerLanding";
import FeaturesSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LogoFIles from "@/components/landing/LogoFIles";
import Navbar from "@/components/landing/Navbar";
import SocialProofSection from "@/components/landing/SocialProofSection";
import WaitlistSection from "@/components/landing/WaitListsSection";

export default function Home() {
  return (
    <>
    <main className="min-h-screen font-sans antialiased">
      <Navbar />
      <HeroSection />
      {/* <LogoFIles /> */}
      <FeaturesSection />
      <HowItWorksSection />
      {/* <SocialProofSection /> */}
      <WaitlistSection />
      <Footer />
    </main>
    {/* <CampaignnerLanding /> */}
    </>
  )
}
