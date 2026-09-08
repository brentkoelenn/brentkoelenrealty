# Brent Koelen Real Estate Website

A lead-generation real estate website for Brent Koelen, REALTOR® with eXp Realty, serving Grey Bruce and Bruce County, Ontario. Built with Next.js, TypeScript, and Tailwind CSS.

**IMPORTANT — this site currently runs entirely on SAMPLE listing data.** No real MLS® listings are displayed, and no CRM/email service is connected to the lead forms yet. See "What's Not Real Yet" below.

## Getting Started (Local Development)

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser. The site will hot-reload as files change.

## Before You Launch — Fill In These Placeholders

Search the project for `TODO` and `[... goes here]` to find every spot that needs real information. The main ones:

1. **`lib/config/site.ts`** — phone number, email, Instagram/Facebook URLs, office address, brokerage disclosure text, and your real domain name (`siteUrl`).
2. **`app/about/page.tsx`** — your professional photo and biography (currently placeholders).
3. **Photos** — sample listings currently use royalty-free stock photos from Unsplash purely as visual placeholders. Replace with real listing photos once connected to live data.

## Project Structure

- `app/` — every page/route (homepage, search, property details, farms, waterfront, communities, about, contact, and the lead API route)
- `components/` — reusable UI (buttons, cards), layout (navbar/footer), search, property display, and lead forms
- `lib/listings/` — the listing data layer. **This is the key architecture piece**: `listingService.ts` defines the interface every page uses; `sampleListingService.ts` implements it with sample data today. See the comments in that file for exactly how to swap in CREA DDF® data later without touching any page or component.
- `lib/leads/` — the lead-handling system. Every form calls `submitLead()`, which posts to `app/api/leads/route.ts`. That route currently just logs submissions — see the comments there for where to plug in a CRM, email service, or webhook.
- `lib/config/site.ts` — all brand info, navigation links, and contact placeholders in one place.

## What's Not Real Yet (By Design)

- **Listings**: All 14 sample listings are fictional, clearly labeled "Sample Listing," and use placeholder MLS® numbers (`SAMPLE-xxxxxx`). No real property data is shown.
- **Lead forms**: Forms work end-to-end (validation, submission, success message) but do not send an email or push to a CRM yet — submissions are only logged to the server console. Nothing in the UI claims otherwise.
- **Saved Search**: The "Save Search" button on the search page shows a message explaining this feature isn't connected yet — no account system exists.
- **Map**: Property detail pages show a map placeholder rather than an embedded map.

## Connecting Real Data Later

### CREA REALTOR.ca DDF® Listings
1. Create `lib/listings/ddfListingService.ts` implementing the same functions as `sampleListingService.ts` (see the `ListingService` interface in `lib/listings/listingService.ts`).
2. Fetch DDF data server-side only — never expose DDF credentials to the browser. Store credentials in environment variables.
3. Change one line in `lib/listings/listingService.ts` to export `ddfListingService` instead of `sampleListingService`.
No changes are needed to the search page, property cards, filters, or property detail pages.

### CRM / Email Notifications / Webhooks
Edit `app/api/leads/route.ts` — that's the single place every lead passes through. Add an email send (e.g. Resend, SendGrid), a CRM API call, a database insert, or a webhook POST there. The `Lead` type (`lib/leads/types.ts`) already contains every field a CRM would need, including which property a buyer inquired about.

## Deployment

This is a standard Next.js app, which gives you two deployment paths:

- **Recommended for full functionality (lead form API, future DDF integration): Vercel or Netlify.** Both connect directly to a GitHub repository and deploy automatically, with generous free tiers, and support Next.js's server features out of the box.
- **GoDaddy shared hosting**: GoDaddy's standard shared hosting only serves static files, not Node.js server code. To deploy there, you'd export the site as static HTML — this works for every page, but the `/api/leads` route (and any future server-side DDF fetching) would need to move to an external service (e.g. Formspree for form handling, or a small serverless function elsewhere). If you have a GoDaddy VPS or dedicated hosting plan with Node.js support, the app can run there directly like it does locally (`npm run build && npm run start`).

If you're not sure which path fits your GoDaddy plan, that's worth checking before launch.

## Legal / Compliance Notes

- Replace the placeholder brokerage disclosure text in `lib/config/site.ts` with the exact wording eXp Realty and RECO require.
- Do not remove the "SAMPLE LISTING" labeling until real listings (via DDF or manual entry) replace the sample data.
- Real MLS® numbers must never be fabricated — once DDF is connected, MLS® numbers come directly from the feed.
