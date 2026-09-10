import { notFound } from "next/navigation";
import { Metadata } from "next";
import { listingService, isUsingSampleData } from "@/lib/listings/listingService";
import { formatPrice, formatNumber } from "@/lib/utils/format";
import Container from "@/components/ui/Container";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInquiryForm from "@/components/forms/PropertyInquiryForm";
import { Bed, Bath, Ruler, Car, Calendar, LandPlot, Building2 } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

// Pages are revalidated (re-fetched) periodically so real DDF listings stay
// fresh without a full rebuild/redeploy.
export const revalidate = 900; // 15 minutes

export async function generateStaticParams() {
  // Only pre-build pages for sample data at build time. Once real DDF
  // listings are live, isUsingSampleData is false, so we skip pre-building
  // (which could mean thousands of pages) and let pages render on-demand
  // instead — see `dynamicParams` below.
  if (!isUsingSampleData) return [];
  const listings = await listingService.getAllListings();
  return listings.map((l) => ({ id: l.id }));
}

// Allow any property id not covered by generateStaticParams to still render
// (needed once real DDF listings are live).
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await listingService.getListingById(id);
  if (!listing) return {};
  const sampleNote = listing.isSample ? " Sample listing." : "";
  return {
    title: `${listing.address}, ${listing.city}, ON | ${formatPrice(listing.price)}`,
    description: `${listing.headline} — ${listing.bedrooms} bed, ${listing.bathrooms} bath ${listing.propertyType.toLowerCase()} in ${listing.city}, Ontario.${sampleNote}`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = await listingService.getListingById(id);
  if (!listing) notFound();

  const fullAddress = `${listing.address}, ${listing.city}, ${listing.province}`;

  const stats = [
    { icon: Bed, label: "Bedrooms", value: listing.bedrooms || "—" },
    { icon: Bath, label: "Bathrooms", value: listing.bathrooms || "—" },
    { icon: Ruler, label: "Square Feet", value: listing.squareFeet ? formatNumber(listing.squareFeet) : "—" },
    { icon: LandPlot, label: "Lot Size", value: listing.lotSize ?? "—" },
    { icon: Car, label: "Garage", value: listing.garage ?? "—" },
    { icon: Calendar, label: "Year Built", value: listing.yearBuilt ?? "—" },
  ];

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="bg-ink text-white text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-sm">
            {listing.status}
          </span>
          {listing.isSample && (
            <span className="bg-brand-red text-white text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-sm">
              Sample Listing — Not Actually For Sale
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <PropertyGallery photos={listing.photos} alt={`${listing.address}, ${listing.city}`} />

            <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl text-ink">{formatPrice(listing.price)}</h1>
                <p className="mt-2 text-base text-charcoal">{fullAddress}</p>
                <p className="text-sm text-mist mt-1">
                  MLS® {listing.mlsNumber}
                  {listing.isSample && " (sample)"}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-fog py-6">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={20} className="text-brand-red shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{value}</p>
                    <p className="text-xs text-mist">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-10">
              <h2 className="font-display text-2xl text-ink">Overview</h2>
              <p className="mt-3 text-stone leading-relaxed">{listing.headline}</p>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-2xl text-ink">Description</h2>
              <p className="mt-3 text-stone leading-relaxed">{listing.description}</p>
            </section>

            {listing.featureGroups.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-2xl text-ink">Features</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {listing.featureGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-sm font-semibold text-ink mb-2">{group.title}</p>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="text-sm text-stone flex items-start gap-2">
                            <span className="text-brand-red mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {listing.rooms.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-2xl text-ink">Rooms</h2>
                <div className="mt-4 border border-fog rounded-sm overflow-hidden">
                  {listing.rooms.map((room, i) => (
                    <div
                      key={room.name + i}
                      className="flex items-center justify-between px-4 py-3 text-sm border-b border-fog last:border-none odd:bg-white even:bg-paper"
                    >
                      <span className="font-medium text-charcoal">{room.name}</span>
                      <span className="text-stone">{room.level}</span>
                      <span className="text-mist">{room.dimensions ?? "—"}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-8">
              <h2 className="font-display text-2xl text-ink">Property Details</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                <DetailRow label="Property Type" value={listing.propertyType} />
                <DetailRow label="Listing Type" value={listing.listingType} />
                <DetailRow label="Storeys" value={listing.storeys ?? "—"} />
                <DetailRow label="Acreage" value={listing.acreage ? `${listing.acreage} acres` : "—"} />
                <DetailRow label="Waterfront" value={listing.waterfront ? "Yes" : "No"} />
                <DetailRow label="Listing Brokerage" value={listing.listingBrokerage} />
              </div>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-2xl text-ink flex items-center gap-2">
                <Building2 size={20} className="text-brand-red" /> Location
              </h2>
              <p className="mt-2 text-sm text-stone">{fullAddress}</p>
              <div className="mt-4 aspect-[16/7] bg-fog rounded-sm flex items-center justify-center text-mist text-sm">
                [Map placeholder — will show property location]
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 bg-white border border-fog rounded-sm p-6">
              <h2 className="font-display text-xl text-ink">Interested in this property?</h2>
              <p className="mt-2 text-sm text-stone">
                Send a message and I&apos;ll follow up with you directly.
              </p>
              <div className="mt-5">
                <PropertyInquiryForm propertyId={listing.id} propertyAddress={fullAddress} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-fog py-2">
      <span className="text-stone">{label}</span>
      <span className="font-medium text-charcoal">{value}</span>
    </div>
  );
}
