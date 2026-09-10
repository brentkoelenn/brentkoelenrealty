import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { communityList } from "@/lib/config/site";
import { slugify } from "@/lib/utils/slug";
import { MapPin } from "lucide-react";

export default function CommunitiesStrip() {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-fog">
      <Container>
        <SectionHeading
          eyebrow="Communities"
          title="Serving Towns Across Grey Bruce"
          subtitle="Local expertise in the communities that make up Grey Bruce and Bruce County."
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {communityList.map((c) => (
            <Link
              key={c}
              href={`/communities/${slugify(c)}`}
              className="group flex items-center gap-2 border border-fog rounded-sm px-4 py-4 hover:border-brand-red transition-brand"
            >
              <MapPin size={16} className="text-brand-red shrink-0" />
              <span className="text-sm font-medium text-charcoal group-hover:text-brand-red transition-brand">
                {c}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
