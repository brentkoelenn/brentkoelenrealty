import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FarmCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative rounded-sm overflow-hidden bg-ink">
          <Image
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Farmland and barn in rural Bruce County, Ontario"
            fill
            className="object-cover opacity-35"
          />
          <div className="relative px-6 sm:px-16 py-16 sm:py-24 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-4">
              Farms &amp; Acreage
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight">
              Thinking of Selling Your Farm?
            </h2>
            <p className="mt-5 text-white/85 leading-relaxed">
              Let&apos;s talk about your property, your goals, and what the current market may
              support.
            </p>
            <Button href="/farms#farm-valuation" size="lg" className="mt-8">
              Get a Farm Valuation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
