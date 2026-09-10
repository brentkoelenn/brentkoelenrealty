import { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyCard from "@/components/property/PropertyCard";
import FarmValuationForm from "@/components/forms/FarmValuationForm";
import { listingService, isUsingSampleData } from "@/lib/listings/listingService";
import { safeListingCall } from "@/lib/listings/safeFetch";

export const metadata: Metadata = {
  title: "Farms & Acreage for Sale in Grey Bruce & Bruce County",
  description:
    "Browse farms, hobby farms, and acreage for sale across Grey Bruce and Bruce County, Ontario. Rural and agricultural property expertise from REALTOR® Brent Koelen.",
};

export const revalidate = 900;

const categories = [
  "Farms",
  "Hobby Farms",
  "Dairy Farms",
  "Beef / Cow-Calf Farms",
  "Cash Crop Farms",
  "Mixed Farms",
  "Rural Residential",
  "Vacant Agricultural Land",
  "Acreage",
];

export default async function FarmsPage() {
  const listings = await safeListingCall(
    () => listingService.getListingsByPropertyTypes(["Farm", "Hobby Farm", "Vacant Land"]),
    []
  );

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">Rural &amp; Agricultural</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Farms &amp; Acreage</h1>
        <p className="mt-4 text-stone leading-relaxed max-w-2xl">
          Grey Bruce and Bruce County are farm country. From cash crop operations to hobby farms and
          vacant agricultural land, I work with rural buyers and sellers across the region.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="text-xs font-medium text-charcoal bg-white border border-fog rounded-full px-3.5 py-1.5">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow={isUsingSampleData ? "Sample Listings" : "Listings"}
            title="Farm & Acreage Properties"
          />
          {listings.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-stone">No farm or acreage listings available right now.</p>
          )}
        </div>

        <div id="farm-valuation" className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12 scroll-mt-24">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-ink">Thinking of Selling Your Farm?</h2>
            <p className="mt-4 text-stone leading-relaxed">
              Let&apos;s talk about your property, your goals and what the current market may
              support.
            </p>
          </div>
          <div className="lg:col-span-3 bg-white border border-fog rounded-sm p-6 sm:p-8">
            <FarmValuationForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
