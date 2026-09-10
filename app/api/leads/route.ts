import { NextRequest, NextResponse } from "next/server";
import { Lead } from "@/lib/leads/types";

// ============================================================================
// LEAD INTAKE API ROUTE
// ----------------------------------------------------------------------------
// This is the single server-side endpoint every lead form on the site
// submits to. Right now it validates the payload and logs it to the server
// console — it does NOT send an email, does NOT save to a database, and does
// NOT notify a CRM. That is intentional: we do not want to claim a
// notification was sent when no email/CRM service is actually connected yet.
//
// ============================================================================
// >>> FUTURE INTEGRATION POINT <<<
// When Brent is ready to receive real leads, this is where to add ONE (or
// more) of the following, without touching any form component:
//   - Email notification: e.g. send via Resend/SendGrid/Postmark using an
//     API key stored in an environment variable (never hard-code it).
//   - CRM push: POST the lead to a CRM's API (e.g. Follow Up Boss, kvCORE,
//     LionDesk) — again via an environment-variable-based API key/webhook.
//   - Database: insert into a database (e.g. Postgres/Supabase) for a lead
//     dashboard.
//   - Generic webhook: POST the lead JSON to any webhook URL Brent supplies.
// The `Lead` type in lib/leads/types.ts already contains every field these
// integrations would need (leadType, contact info, propertyId/address,
// search preferences, etc.).
// ============================================================================

export async function POST(req: NextRequest) {
  let body: Partial<Lead>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.leadType || !body.firstName || !body.lastName || !body.email || !body.phone) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    ...(body as Lead),
    timestamp: new Date().toISOString(),
  };

  // Development-time visibility only. Replace/extend with a real
  // integration per the comment block above when ready.
  console.log("[LEAD RECEIVED]", JSON.stringify(lead, null, 2));

  // TODO: FUTURE INTEGRATION — send `lead` to CRM / email / webhook / DB here.

  return NextResponse.json({ success: true });
}
