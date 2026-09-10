import { Listing, ListingSearchParams } from "./types";
import { sampleListings } from "./sampleData";
import { ListingService } from "./listingService";

// ============================================================================
// SAMPLE LISTING SERVICE
// ----------------------------------------------------------------------------
// Implements the ListingService interface using the static sample data in
// sampleData.ts. This is a stand-in for the future DDFListingService — it
// deliberately implements the exact same function signatures so it can be
// swapped out in listingService.ts without touching any UI code.
// ============================================================================

async function getAllListings(): Promise<Listing[]> {
  return sampleListings;
}

async function getListingById(id: string): Promise<Listing | null> {
  return sampleListings.find((l) => l.id === id) ?? null;
}

async function getFeaturedListings(count = 6): Promise<Listing[]> {
  return [...sampleListings]
    .sort((a, b) => (a.listingDate < b.listingDate ? 1 : -1))
    .slice(0, count);
}

async function getListingsByCity(city: string): Promise<Listing[]> {
  const normalized = city.toLowerCase();
  return sampleListings.filter((l) => l.city.toLowerCase().includes(normalized));
}

async function getListingsByPropertyTypes(types: string[]): Promise<Listing[]> {
  const normalized = types.map((t) => t.toLowerCase());
  return sampleListings.filter((l) => normalized.includes(l.propertyType.toLowerCase()));
}

async function searchListings(params: ListingSearchParams): Promise<Listing[]> {
  let results = [...sampleListings];

  if (params.location) {
    const loc = params.location.toLowerCase().trim();
    results = results.filter(
      (l) =>
        l.city.toLowerCase().includes(loc) ||
        l.address.toLowerCase().includes(loc) ||
        l.postalCode.toLowerCase().replace(/\s/g, "").includes(loc.replace(/\s/g, ""))
    );
  }

  if (params.minPrice !== undefined) {
    results = results.filter((l) => l.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    results = results.filter((l) => l.price <= params.maxPrice!);
  }
  if (params.bedrooms !== undefined) {
    results = results.filter((l) => l.bedrooms >= params.bedrooms!);
  }
  if (params.bathrooms !== undefined) {
    results = results.filter((l) => l.bathrooms >= params.bathrooms!);
  }
  if (params.propertyType && params.propertyType !== "Any") {
    results = results.filter((l) => l.propertyType === params.propertyType);
  }
  if (params.listingType && params.listingType !== "Any") {
    results = results.filter((l) => l.listingType === params.listingType);
  }
  if (params.minSquareFeet !== undefined) {
    results = results.filter((l) => (l.squareFeet ?? 0) >= params.minSquareFeet!);
  }
  if (params.minAcreage !== undefined) {
    results = results.filter((l) => (l.acreage ?? 0) >= params.minAcreage!);
  }
  if (params.waterfrontOnly) {
    results = results.filter((l) => l.waterfront);
  }
  if (params.garageOnly) {
    results = results.filter((l) => !!l.garage);
  }
  if (params.minStoreys !== undefined) {
    results = results.filter((l) => (l.storeys ?? 0) >= params.minStoreys!);
  }

  switch (params.sortBy) {
    case "newest":
      results.sort((a, b) => (a.listingDate < b.listingDate ? 1 : -1));
      break;
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    default:
      // "relevant" — active listings first, then newest
      results.sort((a, b) => {
        if (a.status === "Active" && b.status !== "Active") return -1;
        if (b.status === "Active" && a.status !== "Active") return 1;
        return a.listingDate < b.listingDate ? 1 : -1;
      });
  }

  return results;
}

export const sampleListingService: ListingService = {
  getAllListings,
  getListingById,
  searchListings,
  getFeaturedListings,
  getListingsByCity,
  getListingsByPropertyTypes,
};
