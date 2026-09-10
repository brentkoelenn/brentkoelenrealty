import { Metadata } from "next";
import Container from "@/components/ui/Container";
import BuyerLeadForm from "@/components/forms/BuyerLeadForm";

export const metadata: Metadata = {
  title: "Buy a Home in Grey Bruce & Bruce County",
  description:
    "Let's find your next home in Grey Bruce or Bruce County, Ontario. Tell Brent Koelen what you're looking for and get matched with the right properties.",
};

export default function BuyersPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">For Buyers</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Let&apos;s Find Your Next Home.</h1>
        <p className="mt-4 text-stone leading-relaxed max-w-xl">
          Tell me a bit about what you&apos;re looking for and where — I&apos;ll follow up with
          properties that fit, including ones that may not be posted online yet.
        </p>

        <div className="mt-10 bg-white border border-fog rounded-sm p-6 sm:p-8">
          <BuyerLeadForm />
        </div>
      </Container>
    </div>
  );
}
