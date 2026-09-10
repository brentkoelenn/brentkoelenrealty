import { slugify } from "@/lib/utils/slug";
import { communityList } from "@/lib/config/site";

// ============================================================================
// COMMUNITY CONTENT
// ----------------------------------------------------------------------------
// Short, generic introductory content for each community page. This is
// intentionally factual/geographic rather than claiming specific market
// statistics Brent hasn't provided. Expand each entry with local knowledge,
// photos, and more detail as the site grows.
// ============================================================================

export interface CommunityInfo {
  name: string;
  slug: string;
  province: "ON";
  blurb: string;
  seoTitle: string;
  seoDescription: string;
}

const blurbs: Record<string, string> = {
  Hanover:
    "Known as the 'Friendly Town,' Hanover is a full-service community in Grey Bruce with shopping, schools, trails, and a growing mix of starter homes, family properties, and new construction.",
  Walkerton:
    "The county seat of Bruce County, Walkerton sits along the Saugeen River and offers a walkable downtown, established neighbourhoods, and easy access to surrounding farmland.",
  "Owen Sound":
    "Owen Sound is the largest city in Grey County, set at the base of the Niagara Escarpment on Georgian Bay, with a mix of urban amenities, waterfront parks, and a wide range of housing options.",
  Chesley:
    "A small, close-knit community in Bruce County, Chesley offers affordable housing and easy access to surrounding hobby farms and rural acreage.",
  Kincardine:
    "A popular Lake Huron town known for its lighthouse, sandy beaches, and a mix of in-town homes and waterfront properties along the shoreline.",
  "Port Elgin":
    "Part of the Municipality of Saugeen Shores, Port Elgin combines a sandy Lake Huron beach with a growing residential base and strong family appeal.",
  Southampton:
    "Sitting at the mouth of the Saugeen River on Lake Huron, Southampton is known for its beach, marina, and a blend of historic and newer homes.",
  "Sauble Beach":
    "Home to one of Ontario's longest freshwater beaches, Sauble Beach is a sought-after destination for cottages, waterfront lots, and vacation properties.",
  "Grey Bruce":
    "Grey Bruce refers broadly to the combined Grey County and Bruce County region — a mix of lakeside towns, farmland, and rural communities in southwestern Ontario.",
  "Bruce County":
    "Bruce County spans Lake Huron shoreline communities and productive farmland, making it a region with both waterfront and agricultural real estate opportunities.",
};

export const communities: CommunityInfo[] = communityList.map((name) => ({
  name,
  slug: slugify(name),
  province: "ON",
  blurb: blurbs[name] ?? `Explore homes and properties in ${name}, Ontario.`,
  seoTitle: `Homes for Sale in ${name}, Ontario | Real Estate`,
  seoDescription: `Search homes and real estate for sale in ${name}, Ontario with REALTOR® Brent Koelen, eXp Realty. Local Grey Bruce & Bruce County expertise.`,
}));

export function getCommunityBySlug(slug: string): CommunityInfo | undefined {
  return communities.find((c) => c.slug === slug);
}
