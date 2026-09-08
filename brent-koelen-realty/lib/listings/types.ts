// ============================================================================
// LISTING TYPES
// ----------------------------------------------------------------------------
// This shape is intentionally broad/DDF-compatible so that a future
// DDFListingService can map CREA DDF/RESO fields onto it with minimal
// translation. UI components should only ever depend on this type — never
// on SampleListing-specific fields.
// ============================================================================

export type ListingStatus = "Active" | "Sold" | "Pending" | "Coming Soon";

export type PropertyType =
  | "Detached"
  | "Townhouse"
  | "Condo"
  | "Farm"
  | "Hobby Farm"
  | "Vacant Land"
  | "Waterfront"
  | "Cottage"
  | "Investment";

export type ListingType = "For Sale" | "For Lease";

export interface ListingFeatureGroup {
  title: string;
  items: string[];
}

export interface ListingRoom {
  name: string;
  level: string;
  dimensions?: string;
}

export interface Listing {
  id: string; // internal slug/id, used in /property/[id]
  mlsNumber: string; // SAMPLE placeholder MLS number, never real
  isSample: true; // always true until DDF is connected — UI uses this to show "SAMPLE LISTING"

  address: string;
  city: string;
  province: string;
  postalCode: string;
  latitude: number;
  longitude: number;

  price: number;
  status: ListingStatus;
  listingType: ListingType;
  propertyType: PropertyType;

  bedrooms: number;
  bathrooms: number;
  squareFeet: number | null;
  lotSize: string | null; // e.g. "0.5 acres" or "66 x 132 ft"
  acreage: number | null; // numeric acreage when applicable (farms/land)
  garage: string | null; // e.g. "2 Car Attached"
  storeys: number | null;
  yearBuilt: number | null;
  waterfront: boolean;

  headline: string;
  description: string;
  featureGroups: ListingFeatureGroup[];
  rooms: ListingRoom[];

  photos: string[]; // paths under /public/images
  listingBrokerage: string;
  listingAgent: string;
  listingDate: string; // ISO date
  modifiedDate: string; // ISO date
}

// ----------------------------------------------------------------------------
// Search / filter contract — the SearchBar, FilterPanel, and /search page all
// build one of these and pass it to ListingService.searchListings(). A future
// DDF-backed service implements the same signature.
// ----------------------------------------------------------------------------
export interface ListingSearchParams {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType | "Any";
  listingType?: ListingType | "Any";
  minSquareFeet?: number;
  minLotSize?: number;
  waterfrontOnly?: boolean;
  minAcreage?: number;
  garageOnly?: boolean;
  minStoreys?: number;
  sortBy?: "relevant" | "newest" | "price-asc" | "price-desc";
}
