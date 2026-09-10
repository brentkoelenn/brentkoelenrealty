import { listingService, isUsingSampleData } from "@/lib/listings/listingService";
import { safeListingCall } from "@/lib/listings/safeFetch";
import PropertyCard from "@/components/property/PropertyCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export const revalidate = 900; // 15 minutes — keeps real DDF listings fresh

export default async function FeaturedListings() {
  const listings = await safeListingCall(() => listingService.getFeaturedListings(6), []);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Properties"
            title="Recently Listed in Grey Bruce"
            subtitle={
              isUsingSampleData
                ? "A sample of the kind of properties you'll find across Grey Bruce and Bruce County."
                : "Recently listed properties across Grey Bruce and Bruce County."
            }
          />
          <Button href="/search" variant="outline" className="shrink-0">
            View All Listings
          </Button>
        </div>

        {listings.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-stone">
            No listings are available to show right now. Check back shortly.
          </p>
        )}
      </Container>
    </section>
  );
}
