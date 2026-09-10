import Image from "next/image";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/search/SearchBar";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative bg-ink">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
          alt="Rolling farmland and countryside in Grey Bruce County, Ontario"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      </div>

      <Container className="relative pt-20 pb-28 sm:pt-28 sm:pb-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-5">
              Grey Bruce &amp; Bruce County, Ontario
            </p>
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.1] text-white">
              Find Your Place in Grey Bruce.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
              Whether you&apos;re buying your first home, moving up, selling a farm, or looking for
              your next investment, I&apos;m here to help.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button href="/search" size="lg">
                Search Homes
              </Button>
              <Button href="/home-value" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ink">
                What&apos;s My Home Worth?
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-sm p-4 shrink-0 animate-fade-up">
            <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0 border-2 border-white/30">
              <Image
                src="/images/brand/brent-koelen-headshot.png"
                alt="Brent Koelen, REALTOR®"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-display text-lg leading-tight">Brent Koelen</p>
              <p className="text-white/70 text-xs tracking-wide uppercase mt-1">REALTOR® · eXp Realty</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative -mt-14 sm:-mt-20 pb-16">
        <SearchBar />
      </Container>
    </section>
  );
}
