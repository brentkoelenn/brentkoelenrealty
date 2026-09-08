// ============================================================================
// SITE CONFIGURATION
// ----------------------------------------------------------------------------
// Central place for brand info, navigation, and contact placeholders.
// IMPORTANT: Phone, email, and social links below are PLACEHOLDERS.
// Brent must replace them with real values before launch — we do not
// invent contact information.
// ============================================================================

export const siteConfig = {
  agentName: "Brent Koelen",
  agentTitle: "REALTOR®",
  brokerage: "eXp Realty",
  region: "Grey Bruce / Bruce County, Ontario",
  siteName: "Brent Koelen Real Estate",
  siteUrl: "https://www.example.com", // TODO: replace with real domain before launch

  // TODO: Replace all placeholders below with Brent's real contact details.
  contact: {
    phone: "[Phone number goes here]",
    phoneHref: "#", // TODO: set to "tel:+1XXXXXXXXXX" once phone is provided
    email: "[Email address goes here]",
    emailHref: "#", // TODO: set to "mailto:brent@example.com" once email is provided
    instagram: "#", // TODO: add real Instagram URL
    facebook: "#", // TODO: add real Facebook URL
    officeAddress: "[Brokerage office address goes here]",
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
  { label: "My Listings", href: "/my-listings" },
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
  { label: "My Listings", href: "/my-listings" },
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
