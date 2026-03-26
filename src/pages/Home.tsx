import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhatWeOfferSection from "../components/WhatWeOfferSection";
import ImpactSection from "../components/ImpactSection";
import FreeTrialSection from "../components/FreeTrialSection";
import TeamSection from "../components/TeamSection";
import PartnerWithUsSection from "../components/PartnerWithUsSection";
import WorkshopSection from "../components/WorkshopSection";
import ClosingSection from "../components/ClosingSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-w-0">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatWeOfferSection />
      <ImpactSection />
      <FreeTrialSection />
      <TeamSection />
      <PartnerWithUsSection />
      <WorkshopSection />
      <ClosingSection />
      <Footer />
    </main>
  );
}
