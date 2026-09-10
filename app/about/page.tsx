import { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Home, Users, Wheat, HandHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Brent Koelen | REALTOR®, eXp Realty",
  description:
    "Meet Brent Koelen, a REALTOR® with eXp Realty and The Kirstine-Ellis Group, serving buyers and sellers across Grey Bruce and Bruce County, Ontario. Fluent in English and Dutch.",
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
    description: "A personal connection to rural properties, agriculture, and the communities that surround them.",
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
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden border border-fog">
              <Image
                src="/images/brand/brent-koelen-headshot.png"
                alt="Brent Koelen, REALTOR® with eXp Realty"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">About</p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">Meet Brent</h1>

            <div className="mt-6 space-y-4 text-stone text-sm sm:text-base leading-relaxed">
              <p>
                Buying or selling a property is a significant decision, and my goal is to make the
                process as straightforward, informed, and rewarding as possible.
              </p>
              <p>
                As a Sales Representative with eXp Realty and a member of The Kirstine-Ellis Group,
                I have the support, experience, and resources of a strong team behind me while
                maintaining a personalized approach with every client. I bring a strong
                understanding of the local market, a genuine connection to the communities I serve,
                and a commitment to putting my clients&apos; best interests first.
              </p>
              <p>
                Growing up on a large pig farm has given me a unique appreciation for rural
                properties, agriculture, and the people who make these communities home. Whether
                you are buying your first home, selling a property, or making a move in the
                country, I understand that every client and every property is different.
              </p>
              <p>
                I believe great real estate service comes down to communication, attention to
                detail, and being someone my clients can rely on throughout the entire process. I
                take the time to understand what matters to you and work hard to ensure you feel
                confident in every decision along the way.
              </p>
              <p>
                In addition to English, I am also fluent in Dutch, allowing me to assist
                Dutch-speaking clients throughout their real estate journey.
              </p>
              <p>
                I am proud to serve clients throughout Grey Bruce and surrounding areas, and I look
                forward to helping you with your next real estate move.
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
