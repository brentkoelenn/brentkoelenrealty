import { Lead, LeadSubmissionResult } from "./types";

// ============================================================================
// LEAD SERVICE — client-side helper that posts to /api/leads
// ----------------------------------------------------------------------------
// This is the ONE function every lead form on the site should call. It talks
// to the /api/leads route, which is the future home for CRM/email/webhook
// integration (see app/api/leads/route.ts for the integration point).
// ============================================================================

export async function submitLead(
  lead: Omit<Lead, "timestamp">
): Promise<LeadSubmissionResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, error: body?.error ?? "Something went wrong. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please check your connection and try again." };
  }
}
