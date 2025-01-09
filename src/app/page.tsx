import { ProductCollections } from "./shop/collections/collections";
import { NewReleaseCollections } from "./shop/collections/new-releases";
import HeroSection from "./components/hero/hero-section";
import { OffersHomeSection } from "./components/offers/offers-home-section";
import ProcessSection from "./components/process/process";
import { ArchitectureCollections } from "./shop/collections/architecture";
import { BestSellersCollections } from "./shop/collections/best-sellers";
import { BotanyCollections } from "./shop/collections/botany";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-12 ">
      <HeroSection />
      <ProcessSection />
      <OffersHomeSection />
      <NewReleaseCollections limit={4} />
      <BestSellersCollections limit={4} />
      <ArchitectureCollections limit={4} />
      <BotanyCollections />
    </div>
  );
}
