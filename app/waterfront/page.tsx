import { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyCard from "@/components/property/PropertyCard";
import WaterfrontInquiryForm from "@/components/forms/WaterfrontInquiryForm";
import { listingService, isUsingSampleData } from "@/lib/listings/listingService";
import { safeListingCall } from "@/lib/listings/safeFetch";

export const metadata: Metadata = {
  title: "Waterfront Homes & Cottages for Sale | Lake Huron, Bruce County",
  description:
    "Waterfront homes, cottages, and vacant waterfront land for sale near Sauble Beach, Southampton, Port Elgin, and Kincardine on Lake Huron.",
};

export const revalidate = 900;

const areas = ["Sauble Beach", "Southampton", "Port Elgin", "Kincardine", "Lake Huron", "Bruce County", "Grey County"];

export default async function WaterfrontPage() {
  const allListings = await safeListingCall(() => listingService.getAllListings(), []);
  const listings = allListings.filter((l) => l.waterfront);

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">Lake Huron &amp; Beyond</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Waterfront Properties</h1>
        <p className="mt-4 text-stone leading-relaxed max-w-2xl">
          From year-round waterfront homes to classic cottages and vacant waterfront lots, I help
          buyers and sellers navigate Lake Huron&apos;s shoreline communities.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {areas.map((a) => (
            <span key={a} className="text-xs font-medium text-charcoal bg-white border border-fog rounded-full px-3.5 py-1.5">
              {a}
            </span>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow={isUsingSampleData ? "Sample Listings" : "Listings"}
            title="Waterfront Homes, Cottages & Land"
          />
          {listings.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-stone">No waterfront listings available right now.</p>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-ink">Looking for Waterfront?</h2>
            <p className="mt-4 text-stone leading-relaxed">
              Tell me what you have in mind and I&apos;ll follow up with waterfront properties that
              match — including ones that may not be posted online yet.
            </p>
          </div>
          <div className="lg:col-span-3 bg-white border border-fog rounded-sm p-6 sm:p-8">
            <WaterfrontInquiryForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
