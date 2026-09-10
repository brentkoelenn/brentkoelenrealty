import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { communities } from "@/lib/config/communities";
import { listingService } from "@/lib/listings/listingService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl;
  const listings = await listingService.getAllListings();

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
