import { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config/site";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Brent Koelen | REALTOR®, Grey Bruce & Bruce County",
  description:
    "Get in touch with Brent Koelen, REALTOR® with eXp Realty, about buying, selling, farms, or waterfront property in Grey Bruce and Bruce County, Ontario.",
};

export default function ContactPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">Get In Touch</p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">Let&apos;s Talk Real Estate.</h1>
            <p className="mt-4 text-stone leading-relaxed">
              Whether you have a quick question or are ready to get started, I&apos;d love to hear
              from you.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-brand-red" />
                <a href={siteConfig.contact.phoneHref} className="text-charcoal hover:text-brand-red transition-brand">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-brand-red" />
                <a href={siteConfig.contact.emailHref} className="text-charcoal hover:text-brand-red transition-brand">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a href={siteConfig.contact.instagram} aria-label="Instagram" className="text-stone hover:text-brand-red transition-brand">
                <InstagramIcon size={20} />
              </a>
              <a href={siteConfig.contact.facebook} aria-label="Facebook" className="text-stone hover:text-brand-red transition-brand">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white border border-fog rounded-sm p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
