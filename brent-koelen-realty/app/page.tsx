import Hero from "@/components/sections/Hero";
import ValueProps from "@/components/sections/ValueProps";
import FeaturedListings from "@/components/sections/FeaturedListings";
import FarmCTA from "@/components/sections/FarmCTA";
import CommunitiesStrip from "@/components/sections/CommunitiesStrip";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedListings />
      <FarmCTA />
      <CommunitiesStrip />
      <FinalCTA />
    </>
  );
}
