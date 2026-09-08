import { Metadata } from "next";
import Container from "@/components/ui/Container";
import HomeValueForm from "@/components/forms/HomeValueForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "What's My Home Worth? | Free Home Valuation",
  description:
    "Get a personalized opinion of value for your home in Grey Bruce or Bruce County, Ontario from REALTOR® Brent Koelen.",
};

const points = [
  "Local market knowledge across Grey Bruce & Bruce County",
  "A personalized review — not an automated estimate",
  "No obligation to list",
];

export default function HomeValuePage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">For Sellers</p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">What&apos;s Your Home Worth?</h1>
            <p className="mt-4 text-stone leading-relaxed">
              Get a personalized opinion of value based on your property, location and current
              market conditions.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-charcoal">
                  <CheckCircle2 size={18} className="text-brand-red shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-mist leading-relaxed">
              This tool does not generate an automatic appraisal or instant estimate. Brent
              personally reviews every submission and follows up with a considered opinion of value.
            </p>
          </div>

          <div className="lg:col-span-3 bg-white border border-fog rounded-sm p-6 sm:p-8">
            <HomeValueForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
