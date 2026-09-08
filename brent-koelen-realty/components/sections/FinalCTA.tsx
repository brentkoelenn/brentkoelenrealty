import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-24 bg-brand-red">
      <Container className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-white">Let&apos;s Talk Real Estate.</h2>
        <p className="mt-4 text-white/90 max-w-xl mx-auto leading-relaxed">
          Have a question about buying, selling, or the Grey Bruce market? Reach out — I&apos;m happy
          to help.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact" size="lg" variant="secondary" className="bg-white text-brand-red hover:bg-fog">
            Contact Brent
          </Button>
          <Button href="/buyers" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-red">
            Help Me Find a Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
