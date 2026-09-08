import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Home, Users, Wheat, HandHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Brent Koelen | REALTOR®, eXp Realty",
  description:
    "Meet Brent Koelen, a REALTOR® with eXp Realty serving buyers and sellers across Grey Bruce and Bruce County, Ontario.",
};

const services = [
  {
    icon: Users,
    title: "Buyer Services",
    description: "Guidance through searching, viewing, offering on, and closing on your next property.",
  },
  {
    icon: Home,
    title: "Seller Services",
    description: "A clear, honest process for pricing, preparing, and marketing your home.",
  },
  {
    icon: Wheat,
    title: "Farm & Rural Expertise",
    description: "Experience with acreage, outbuildings, and the unique considerations of rural property.",
  },
  {
    icon: HandHeart,
    title: "Local, Approachable Service",
    description: "Straightforward communication and a genuine focus on what works for you.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="aspect-[4/5] bg-fog rounded-sm flex items-center justify-center text-mist text-sm border border-fog">
              [Professional photo goes here]
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">About</p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">Meet Brent</h1>

            <div className="mt-6 bg-white border border-dashed border-fog rounded-sm p-6 text-stone text-sm leading-relaxed">
              [Brent&apos;s biography goes here — a short introduction covering background, approach
              to real estate, and connection to the Grey Bruce area.]
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-charcoal mb-2">Local Knowledge</p>
              <p className="text-sm text-stone leading-relaxed">
                Brent works with buyers and sellers across Grey Bruce and Bruce County, including
                Hanover, Walkerton, Owen Sound, Kincardine, Port Elgin, Southampton, and Sauble
                Beach — from in-town homes to farms and waterfront property.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map(({ icon: Icon, title, description }) => (
                <div key={title} className="border border-fog rounded-sm p-5 bg-white">
                  <Icon size={20} className="text-brand-red" />
                  <p className="mt-3 font-medium text-ink text-sm">{title}</p>
                  <p className="mt-1.5 text-sm text-stone leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-sm font-semibold text-charcoal mb-2">Why Work With Brent</p>
              <p className="text-sm text-stone leading-relaxed">
                [Additional detail on Brent&apos;s approach, values, or what clients can expect goes
                here.]
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/contact">Contact Brent</Button>
              <Button href="/search" variant="outline">Search Homes</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
