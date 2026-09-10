import { Metadata } from "next";
import { listingService, isUsingSampleData } from "@/lib/listings/listingService";
import { safeListingCall } from "@/lib/listings/safeFetch";
import { ListingSearchParams } from "@/lib/listings/types";
import PropertyCard from "@/components/property/PropertyCard";
import SearchBar from "@/components/search/SearchBar";
import SortSelect from "@/components/search/SortSelect";
import SaveSearchButton from "@/components/search/SaveSearchButton";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Search Homes for Sale in Grey Bruce & Bruce County",
  description:
    "Search homes, farms, and waterfront properties for sale across Grey Bruce and Bruce County, Ontario — including Hanover, Walkerton, Owen Sound, Kincardine and more.",
};

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toNumber(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string" || value === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function toStr(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;

  const params: ListingSearchParams = {
    location: toStr(sp.location),
    minPrice: toNumber(sp.minPrice),
    maxPrice: toNumber(sp.maxPrice),
    bedrooms: toNumber(sp.bedrooms),
    bathrooms: toNumber(sp.bathrooms),
    propertyType: (toStr(sp.propertyType) as ListingSearchParams["propertyType"]) ?? "Any",
    listingType: (toStr(sp.listingType) as ListingSearchParams["listingType"]) ?? "Any",
    minSquareFeet: toNumber(sp.minSquareFeet),
    minAcreage: toNumber(sp.minAcreage),
    waterfrontOnly: sp.waterfrontOnly === "true",
    garageOnly: sp.garageOnly === "true",
    minStoreys: toNumber(sp.minStoreys),
    sortBy: (toStr(sp.sortBy) as ListingSearchParams["sortBy"]) ?? "relevant",
  };

  const results = await safeListingCall(() => listingService.searchListings(params), []);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Find Your Next Home</h1>
        <p className="mt-3 text-stone max-w-2xl">
          Browse {isUsingSampleData ? "sample " : ""}listings across Hanover, Walkerton, Owen
          Sound, Kincardine, Port Elgin, Southampton, Sauble Beach and rural Grey Bruce &amp; Bruce
          County.
        </p>

        <div className="mt-8">
          <SearchBar compact />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm font-medium text-charcoal">
            {results.length} {results.length === 1 ? "Property" : "Properties"} Found
          </p>
          <div className="flex items-center gap-3">
            <SortSelect />
            <SaveSearchButton />
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {results.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-16 border border-fog rounded-sm bg-white">
            <p className="text-lg font-medium text-charcoal">No properties match your search.</p>
            <p className="mt-2 text-sm text-stone">Try adjusting or clearing some filters.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
