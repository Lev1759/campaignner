
import FeaturesSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

import Navbar from "@/components/landing/Navbar";
import WaitlistSection from "@/components/landing/WaitListsSection";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "website",
    name: "Campaignner",
    alternateName: "Campaignner",
    url: "https://campaignner.com",
  }
  return (
    <>
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} 
    />
    <main className="min-h-screen font-sans antialiased">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WaitlistSection />
      <Footer />
    </main>
    </>
  )
}
