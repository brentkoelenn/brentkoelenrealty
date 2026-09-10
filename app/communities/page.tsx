import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { communities } from "@/lib/config/communities";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Grey Bruce & Bruce County Communities",
  description:
    "Explore real estate in communities across Grey Bruce and Bruce County, Ontario — Hanover, Walkerton, Owen Sound, Kincardine, Port Elgin, Southampton, Sauble Beach and more.",
};

export default function CommunitiesPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">Local Areas</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Communities</h1>
        <p className="mt-4 text-stone leading-relaxed max-w-2xl">
          Grey Bruce and Bruce County are made up of distinct towns and rural areas, each with its
          own character. Explore real estate by community below.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {communities.map((c) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="group bg-white border border-fog rounded-sm p-6 hover:border-brand-red transition-brand"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-ink group-hover:text-brand-red transition-brand">
                  {c.name}
                </h2>
                <ArrowRight size={18} className="text-brand-red opacity-0 group-hover:opacity-100 transition-brand" />
              </div>
              <p className="mt-2 text-sm text-stone leading-relaxed">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
