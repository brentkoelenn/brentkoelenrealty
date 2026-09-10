import { Listing, ListingSearchParams, PropertyType, ListingStatus } from "./types";
import { ListingService } from "./listingService";

// ============================================================================
// DDF LISTING SERVICE
// ----------------------------------------------------------------------------
// Talks to CREA's DDF® Web API — a RESO Data Dictionary–based OData API — to
// pull real MLS® listings for this site. This is automatically activated by
// lib/listings/listingService.ts once DDF_CLIENT_ID and DDF_CLIENT_SECRET
// are set as environment variables (Vercel: Project → Settings →
// Environment Variables). Never hard-code the actual username/password here
// or anywhere else in the codebase.
//
// Reference docs used to build this: https://ddfapi-docs.realtor.ca/
// ============================================================================

const TOKEN_URL = "https://identity.crea.ca/connect/token";
const API_BASE = "https://ddfapi.realtor.ca/odata/v1";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.DDF_CLIENT_ID;
  const clientSecret = process.env.DDF_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("DDF_CLIENT_ID / DDF_CLIENT_SECRET environment variables are not set.");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "DDFApi_Read",
    }),
    // Tokens are valid for 3600s (per CREA's docs) — cache just under that
    // so we're not requesting a new one on every single page view.
    next: { revalidate: 3000 },
  });

  if (!res.ok) {
    throw new Error(`DDF token request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

async function ddfFetch(path: string): Promise<{ value: DdfProperty[] } & Record<string, unknown>> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    // Cache real listing data briefly so search/property pages stay fast and
    // we don't hammer CREA's API on every request. Pages also declare
    // `export const revalidate` so this data refreshes periodically.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`DDF API request failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

// ----------------------------------------------------------------------------
// Raw RESO/DDF Property record shape (only the fields we use). CREA's DDF
// Web API follows the RESO Data Dictionary standard — if the live payload
// uses slightly different field names than expected here, this is the only
// place that needs adjusting; nothing else on the site depends on DDF's
// actual field names.
// ----------------------------------------------------------------------------
interface DdfProperty {
  ListingKey?: string;
  ListingId?: string;
  UnparsedAddress?: string;
  StreetNumber?: string;
  StreetName?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  Latitude?: number;
  Longitude?: number;
  ListPrice?: number;
  StandardStatus?: string;
  MlsStatus?: string;
  TransactionType?: string;
  PropertyType?: string;
  PropertySubType?: string;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  LotSizeArea?: number;
  LotSizeUnits?: string;
  GarageSpaces?: number;
  StoriesTotal?: number;
  YearBuilt?: number;
  WaterfrontYN?: boolean;
  PublicRemarks?: string;
  Media?: { MediaURL: string }[];
  ListOfficeName?: string;
  ListAgentFullName?: string;
  ListingContractDate?: string;
  ModificationTimestamp?: string;
}

function mapProperty(p: DdfProperty): Listing {
  const media = Array.isArray(p.Media) ? p.Media.map((m) => m.MediaURL).filter(Boolean) : [];
  const id = String(p.ListingKey ?? p.ListingId ?? "");

  return {
    id,
    mlsNumber: String(p.ListingId ?? p.ListingKey ?? ""),
    isSample: false,
    address: p.UnparsedAddress || [p.StreetNumber, p.StreetName].filter(Boolean).join(" "),
    city: p.City ?? "",
    province: p.StateOrProvince ?? "ON",
    postalCode: p.PostalCode ?? "",
    latitude: Number(p.Latitude ?? 0),
    longitude: Number(p.Longitude ?? 0),
    price: Number(p.ListPrice ?? 0),
    status: mapStatus(p.StandardStatus ?? p.MlsStatus),
    listingType: p.TransactionType === "For Lease" ? "For Lease" : "For Sale",
    propertyType: mapPropertyType(p.PropertyType, p.PropertySubType),
    bedrooms: Number(p.BedroomsTotal ?? 0),
    bathrooms: Number(p.BathroomsTotalInteger ?? 0),
    squareFeet: p.LivingArea ? Number(p.LivingArea) : null,
    lotSize: p.LotSizeArea ? `${p.LotSizeArea} ${p.LotSizeUnits ?? ""}`.trim() : null,
    acreage: p.LotSizeArea && /acre/i.test(p.LotSizeUnits ?? "") ? Number(p.LotSizeArea) : null,
    garage: p.GarageSpaces ? `${p.GarageSpaces} Car Garage` : null,
    storeys: p.StoriesTotal ? Number(p.StoriesTotal) : null,
    yearBuilt: p.YearBuilt ? Number(p.YearBuilt) : null,
    waterfront: Boolean(p.WaterfrontYN),
    headline: (p.PublicRemarks ?? "").slice(0, 160),
    description: p.PublicRemarks ?? "",
    featureGroups: [],
    rooms: [],
    photos: media.length > 0 ? media : ["/images/placeholder-property.jpg"],
    listingBrokerage: p.ListOfficeName ?? "",
    listingAgent: p.ListAgentFullName ?? "",
    listingDate: p.ListingContractDate ?? p.ModificationTimestamp ?? new Date().toISOString(),
    modifiedDate: p.ModificationTimestamp ?? new Date().toISOString(),
  };
}

function mapStatus(status?: string): ListingStatus {
  switch (status) {
    case "Closed":
    case "Sold":
      return "Sold";
    case "Pending":
    case "Conditional":
      return "Pending";
    case "Coming Soon":
      return "Coming Soon";
    case "Active":
    default:
      return "Active";
  }
}

function mapPropertyType(type?: string, subType?: string): PropertyType {
  const t = `${subType ?? ""} ${type ?? ""}`.toLowerCase();
  if (t.includes("hobby")) return "Hobby Farm";
  if (t.includes("farm") || t.includes("agricult")) return "Farm";
  if (t.includes("vacant") || t.includes("land")) return "Vacant Land";
  if (t.includes("water")) return "Waterfront";
  if (t.includes("condo")) return "Condo";
  if (t.includes("town")) return "Townhouse";
  if (t.includes("cottage") || t.includes("recreation")) return "Cottage";
  if (t.includes("multi") || t.includes("invest")) return "Investment";
  return "Detached";
}

function escapeOData(value: string): string {
  return value.replace(/'/g, "''");
}

function buildFilter(params: ListingSearchParams): string {
  const clauses: string[] = [];
  if (params.location) clauses.push(`contains(City,'${escapeOData(params.location)}')`);
  if (params.minPrice !== undefined) clauses.push(`ListPrice ge ${params.minPrice}`);
  if (params.maxPrice !== undefined) clauses.push(`ListPrice le ${params.maxPrice}`);
  if (params.bedrooms !== undefined) clauses.push(`BedroomsTotal ge ${params.bedrooms}`);
  if (params.bathrooms !== undefined) clauses.push(`BathroomsTotalInteger ge ${params.bathrooms}`);
  if (params.waterfrontOnly) clauses.push(`WaterfrontYN eq true`);
  return clauses.join(" and ");
}

async function getAllListings(): Promise<Listing[]> {
  const data = await ddfFetch(`/Property?$top=200&$orderby=ModificationTimestamp desc`);
  return (data.value ?? []).map(mapProperty);
}

async function getListingById(id: string): Promise<Listing | null> {
  try {
    const data = await ddfFetch(`/Property?$filter=${encodeURIComponent(`ListingKey eq '${escapeOData(id)}'`)}`);
    const record = data.value?.[0];
    return record ? mapProperty(record) : null;
  } catch {
    return null;
  }
}

async function getFeaturedListings(count = 6): Promise<Listing[]> {
  const data = await ddfFetch(`/Property?$top=${count}&$orderby=ModificationTimestamp desc`);
  return (data.value ?? []).map(mapProperty);
}

async function getListingsByCity(city: string): Promise<Listing[]> {
  const filter = `contains(City,'${escapeOData(city)}')`;
  const data = await ddfFetch(`/Property?$filter=${encodeURIComponent(filter)}&$top=100`);
  return (data.value ?? []).map(mapProperty);
}

async function getListingsByPropertyTypes(types: string[]): Promise<Listing[]> {
  // DDF's PropertySubType values don't map 1:1 to our internal PropertyType
  // names, so we fetch broadly and filter using the same mapPropertyType()
  // logic used everywhere else.
  const data = await ddfFetch(`/Property?$top=200`);
  const mapped = (data.value ?? []).map(mapProperty);
  const normalized = types.map((t) => t.toLowerCase());
  return mapped.filter((l) => normalized.includes(l.propertyType.toLowerCase()));
}

async function searchListings(params: ListingSearchParams): Promise<Listing[]> {
  const filter = buildFilter(params);
  const query = filter ? `?$filter=${encodeURIComponent(filter)}&$top=100` : `?$top=100`;
  const data = await ddfFetch(`/Property${query}`);
  let results = (data.value ?? []).map(mapProperty);

  if (params.propertyType && params.propertyType !== "Any") {
    results = results.filter((l) => l.propertyType === params.propertyType);
  }

  switch (params.sortBy) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      results.sort((a, b) => (a.listingDate < b.listingDate ? 1 : -1));
      break;
  }

  return results;
}

export const ddfListingService: ListingService = {
  getAllListings,
  getListingById,
  searchListings,
  getFeaturedListings,
  getListingsByCity,
  getListingsByPropertyTypes,
};
