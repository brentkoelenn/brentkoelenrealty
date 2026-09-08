// ============================================================================
// LEAD TYPES
// ----------------------------------------------------------------------------
// Shared shape for every lead-generating form on the site (property inquiry,
// buyer inquiry, home value, farm valuation, waterfront inquiry, general
// contact). Keeping one shape makes it simple to route all leads through a
// single future CRM/email/webhook integration.
// ============================================================================

export type LeadType =
  | "PROPERTY_INQUIRY"
  | "BUYER_INQUIRY"
  | "HOME_VALUE"
  | "FARM_VALUATION"
  | "WATERFRONT_INQUIRY"
  | "GENERAL_CONTACT";

export interface Lead {
  leadType: LeadType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;

  // Property-inquiry specific (populated automatically by the property page)
  propertyId?: string;
  propertyAddress?: string;

  // Buyer / search-preference specific
  searchPreferences?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;

  // Seller / home value specific
  propertyDetails?: Record<string, string | number | boolean | undefined>;

  // Farm valuation specific
  farmDetails?: Record<string, string | number | boolean | undefined>;

  // Free-form extra fields any form can attach (e.g. "interestedIn" for contact form)
  extra?: Record<string, string | undefined>;

  formSource: string; // e.g. "property-detail", "home-value-page", "contact-page"
  timestamp: string; // ISO string, set server-side on submit
}

export type LeadSubmissionResult =
  | { success: true }
  | { success: false; error: string };
