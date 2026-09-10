// ============================================================================
// SAFE LISTING CALL
// ----------------------------------------------------------------------------
// Wraps a listing-service call so a real-world hiccup — the DDF feed not yet
// active, an expired token refresh failing, a transient network error —
// results in an empty/fallback result instead of crashing the whole page.
// The error is still logged server-side so it's visible in Vercel's logs.
// ============================================================================

export async function safeListingCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[listingService] call failed, using fallback:", err);
    return fallback;
  }
}
