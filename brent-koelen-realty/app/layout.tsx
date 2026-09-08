import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config/site";

// NOTE: This project intentionally uses a system font stack (defined in
// globals.css) instead of next/font/google, since that requires a live
// connection to fonts.googleapis.com at build time — which isn't guaranteed
// in every hosting/CI environment. System fonts also load instantly with
// zero extra network requests. If Brent wants a custom Google Font later
// (e.g. Fraunces for headings), reintroducing next/font/google is a small,
// self-contained change in this file plus globals.css.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.agentName} | ${siteConfig.agentTitle} in Grey Bruce & Bruce County`,
    template: `%s | ${siteConfig.agentName}, ${siteConfig.agentTitle}`,
  },
  description:
    "Brent Koelen is a REALTOR® with eXp Realty serving Grey Bruce and Bruce County, Ontario — including Hanover, Walkerton, Owen Sound, Kincardine, Port Elgin, Southampton and Sauble Beach. Search homes, farms, and waterfront properties.",
  keywords: [
    "real estate Grey Bruce",
    "Grey Bruce realtor",
    "homes for sale Grey Bruce",
    "homes for sale Hanover Ontario",
    "real estate Hanover Ontario",
    "homes for sale Walkerton Ontario",
    "farms for sale Bruce County",
    "waterfront homes Bruce County",
    "cottages for sale Sauble Beach",
  ],
  openGraph: {
    title: `${siteConfig.agentName} | ${siteConfig.agentTitle} in Grey Bruce & Bruce County`,
    description:
      "Search homes, farms, and waterfront properties across Grey Bruce and Bruce County, Ontario with REALTOR® Brent Koelen, eXp Realty.",
    siteName: siteConfig.siteName,
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
