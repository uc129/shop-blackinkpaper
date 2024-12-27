import HeroSection from "./components/hero/hero-section";
import { OffersHomeSection } from "./components/offers/offers-home-section";
import ProcessSection from "./components/process/process";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-12">
      <HeroSection />
      <ProcessSection />
      <OffersHomeSection />
    </div>
  );
}
