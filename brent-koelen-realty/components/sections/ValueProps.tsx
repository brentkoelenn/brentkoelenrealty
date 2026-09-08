import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Home, Wheat, Waves, Search } from "lucide-react";

const items = [
  {
    icon: Search,
    title: "Search Every Property Type",
    description:
      "From starter homes to farms, waterfront cottages to investment properties — search it all in one place.",
  },
  {
    icon: Home,
    title: "Buying & Selling Guidance",
    description:
      "Local, honest guidance through every step — from your first showing to closing day.",
  },
  {
    icon: Wheat,
    title: "Farm & Rural Expertise",
    description:
      "Grey Bruce is farm country. I understand acreage, outbuildings, and rural property value.",
  },
  {
    icon: Waves,
    title: "Waterfront Knowledge",
    description:
      "From Sauble Beach to Kincardine, I know what makes Lake Huron waterfront properties unique.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-fog">
      <Container>
        <SectionHeading
          eyebrow="Why Work With Brent"
          title="Local Knowledge. Straightforward Guidance."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center px-2">
              <div className="mx-auto h-14 w-14 rounded-full bg-brand-red-light flex items-center justify-center">
                <Icon size={24} className="text-brand-red" />
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm text-stone leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
