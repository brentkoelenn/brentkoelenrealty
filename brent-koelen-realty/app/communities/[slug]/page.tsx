import { notFound } from "next/navigation";
import { Metadata } from "next";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/property/PropertyCard";
import Button from "@/components/ui/Button";
import { communities, getCommunityBySlug } from "@/lib/config/communities";
import { listingService } from "@/lib/listings/listingService";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return {};
  return { title: community.seoTitle, description: community.seoDescription };
}

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  const listings = await listingService.getListingsByCity(community.name);

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">Community</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          Homes for Sale in {community.name}, Ontario
        </h1>
        <p className="mt-4 text-stone leading-relaxed max-w-2xl">{community.blurb}</p>

        <div className="mt-8">
          <Button href={`/search?location=${encodeURIComponent(community.name)}`} variant="outline">
            Search All {community.name} Listings
          </Button>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl text-ink mb-6">
            Sample Listings in {community.name}
          </h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone">
              No sample listings are currently tagged to {community.name}. Use the search page to
              browse all available properties.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
