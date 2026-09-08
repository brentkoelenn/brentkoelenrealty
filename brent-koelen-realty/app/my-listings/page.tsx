import { Metadata } from "next";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/property/PropertyCard";
import { listingService } from "@/lib/listings/listingService";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "My Listings | Brent Koelen, REALTOR®",
  description: "Sample listings representing the type of properties Brent Koelen, REALTOR® with eXp Realty, works with across Grey Bruce and Bruce County.",
};

export default async function MyListingsPage() {
  const listings = await listingService.getAllListings();

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">Portfolio</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">My Listings</h1>

        <div className="mt-6 flex items-start gap-3 bg-brand-red-light border border-brand-red/20 rounded-sm p-4 max-w-2xl">
          <AlertTriangle size={18} className="text-brand-red shrink-0 mt-0.5" />
          <p className="text-sm text-charcoal">
            <strong>Demo content:</strong> the properties below are sample/demo listings shown to
            illustrate this page&apos;s design. They do not represent Brent&apos;s actual current or
            past listings. This section will be replaced with real listings once connected to live
            data.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Container>
    </div>
  );
}
