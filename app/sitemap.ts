import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { communities } from "@/lib/config/communities";
import { listingService } from "@/lib/listings/listingService";
import { safeListingCall } from "@/lib/listings/safeFetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl;
  // Never let a listings-source hiccup take down the whole sitemap (and
  // therefore the whole build) — fall back to an empty list instead.
  const listings = await safeListingCall(() => listingService.getAllListings(), []);

  const staticRoutes = [
    "",
    "/search",
    "/buyers",
    "/home-value",
    "/farms",
    "/waterfront",
    "/communities",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const communityRoutes = communities.map((c) => ({
    url: `${base}/communities/${c.slug}`,
    lastModified: new Date(),
  }));

  const propertyRoutes = listings.map((l) => ({
    url: `${base}/property/${l.id}`,
    lastModified: new Date(l.modifiedDate),
  }));

  return [...staticRoutes, ...communityRoutes, ...propertyRoutes];
}
