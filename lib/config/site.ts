// ============================================================================
// SITE CONFIGURATION
// ----------------------------------------------------------------------------
// Central place for brand info, navigation, and contact details.
// ============================================================================

export const siteConfig = {
  agentName: "Brent Koelen",
  agentTitle: "REALTOR®",
  brokerage: "eXp Realty",
  team: "The Kirstine-Ellis Group",
  region: "Grey Bruce / Bruce County, Ontario",
  siteName: "Brent Koelen Real Estate",
  siteUrl: "https://www.example.com", // TODO: replace with real domain before launch

  contact: {
    phone: "519-270-1626",
    phoneHref: "tel:+15192701626",
    email: "brent@kirstineellis.ca",
    emailHref: "mailto:brent@kirstineellis.ca",
    instagram: "https://www.instagram.com/brent_koelen/",
    facebook: "https://www.facebook.com/brent.koelen/",
    // Brent does not want a brokerage office address listed on the site.
    officeAddress: null as string | null,
  },

  disclosures: {
    // TODO: Replace with Brent's real brokerage/regulatory disclosure text.
    brokerage:
      "[Brokerage disclosure text goes here — provided by eXp Realty / RECO requirements]",
    trademark:
      "REALTOR® is a registered trademark of REALTOR® Canada Inc., licensed to CREA. Used under license.",
    mlsDisclaimer:
      "The trademarks MLS®, Multiple Listing Service® and the associated logos are owned by CREA and identify the quality of services provided by real estate professionals who are members of CREA.",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNavLinks: NavLink[] = [
  { label: "Buy", href: "/buyers" },
  { label: "Sell", href: "/home-value" },
  { label: "Search Homes", href: "/search" },
  { label: "Farms & Acreage", href: "/farms" },
  { label: "Waterfront", href: "/waterfront" },
  { label: "Communities", href: "/communities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNavLinks: NavLink[] = [
  { label: "Buy", href: "/buyers" },
  { label: "Sell", href: "/home-value" },
  { label: "Search Homes", href: "/search" },
  { label: "Farms & Acreage", href: "/farms" },
  { label: "Waterfront", href: "/waterfront" },
  { label: "Communities", href: "/communities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const communityList = [
  "Hanover",
  "Walkerton",
  "Owen Sound",
  "Chesley",
  "Kincardine",
  "Port Elgin",
  "Southampton",
  "Sauble Beach",
  "Grey Bruce",
  "Bruce County",
] as const;
