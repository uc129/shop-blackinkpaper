import { ProductCollections } from "./shop/collections/collections";
import { NewReleaseCollections } from "./shop/collections/new-releases";
import HeroSection from "./components/hero/hero-section";
import { OffersHomeSection } from "./components/offers/offers-home-section";
import ProcessSection from "./components/process/process";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-12">
      <HeroSection />
      <ProcessSection />
      <OffersHomeSection />
      <NewReleaseCollections limit={8} />
    </div>
  );
}
