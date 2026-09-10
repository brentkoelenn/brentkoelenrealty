import { Listing, ListingSearchParams } from "./types";
import { sampleListingService } from "./sampleListingService";
import { ddfListingService } from "./ddfListingService";

// ============================================================================
// LISTING SERVICE — THE SINGLE SOURCE OF TRUTH FOR LISTING DATA
// ----------------------------------------------------------------------------
// Every page/component (search page, property cards, property detail page,
// homepage featured listings, community pages, farms/waterfront pages) must
// import listing data from HERE and nowhere else.
//
// This automatically switches from sample data to real CREA DDF® listings
// once DDF_CLIENT_ID and DDF_CLIENT_SECRET are set as environment variables
// (in Vercel: Project → Settings → Environment Variables → add both, then
// redeploy). Nothing in app/search, app/property/[id], components/property,
// or any other UI code needs to change when that switch happens — they all
// depend only on the function signatures defined below.
// ============================================================================

export interface ListingService {
  getAllListings: () => Promise<Listing[]>;
  getListingById: (id: string) => Promise<Listing | null>;
  searchListings: (params: ListingSearchParams) => Promise<Listing[]>;
  getFeaturedListings: (count?: number) => Promise<Listing[]>;
  getListingsByCity: (city: string) => Promise<Listing[]>;
  getListingsByPropertyTypes: (types: string[]) => Promise<Listing[]>;
}

export const isUsingSampleData = !(process.env.DDF_CLIENT_ID && process.env.DDF_CLIENT_SECRET);

export const listingService: ListingService = isUsingSampleData
  ? sampleListingService
  : ddfListingService;

export type { Listing, ListingSearchParams };
