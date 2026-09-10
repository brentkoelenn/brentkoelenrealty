import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24">
      <Container className="text-center max-w-lg">
        <p className="font-display text-6xl text-brand-red">404</p>
        <h1 className="mt-4 font-display text-2xl text-ink">Page Not Found</h1>
        <p className="mt-3 text-stone">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/">Back to Home</Button>
          <Button href="/search" variant="outline">
            Search Homes
          </Button>
        </div>
        <p className="mt-8 text-xs text-mist">
          Or visit the <Link href="/contact" className="underline hover:text-brand-red">contact page</Link>.
        </p>
      </Container>
    </div>
  );
}
