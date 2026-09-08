import { Listing, ListingSearchParams } from "./types";
import { sampleListingService } from "./sampleListingService";

// ============================================================================
// LISTING SERVICE — THE SINGLE SOURCE OF TRUTH FOR LISTING DATA
// ----------------------------------------------------------------------------
// Every page/component (search page, property cards, property detail page,
// homepage featured listings, community pages, farms/waterfront pages) must
// import listing data from HERE and nowhere else.
//
// Today this simply re-exports the sample-data-backed implementation.
//
// ============================================================================
// >>> FUTURE DDF INTEGRATION POINT <<<
// When CREA REALTOR.ca DDF® access is ready:
//   1. Create lib/listings/ddfListingService.ts implementing the same
//      three functions below (getAllListings, getListingById, searchListings),
//      pulling data from the DDF API server-side (keep credentials in
//      environment variables, never in client code).
//   2. Change the export below from `sampleListingService` to the new
//      `ddfListingService`.
//   3. Nothing in app/search, app/property/[id], components/property, or
//      any other UI code needs to change, because they all depend only on
//      the function signatures defined here.
// ============================================================================

export interface ListingService {
  getAllListings: () => Promise<Listing[]>;
  getListingById: (id: string) => Promise<Listing | null>;
  searchListings: (params: ListingSearchParams) => Promise<Listing[]>;
  getFeaturedListings: (count?: number) => Promise<Listing[]>;
  getListingsByCity: (city: string) => Promise<Listing[]>;
  getListingsByPropertyTypes: (types: string[]) => Promise<Listing[]>;
}

// Swap this single line to `ddfListingService` once DDF is connected.
export const listingService: ListingService = sampleListingService;

export type { Listing, ListingSearchParams };
