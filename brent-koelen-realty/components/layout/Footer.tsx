import Link from "next/link";
import Container from "@/components/ui/Container";
import { footerNavLinks, siteConfig } from "@/lib/config/site";
import { Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-24">
      <Container className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl">{siteConfig.agentName.toUpperCase()}</p>
          <p className="text-[11px] tracking-[0.28em] text-brand-red font-semibold mt-1">
            {siteConfig.agentTitle}
          </p>
          <p className="text-sm text-mist mt-4">{siteConfig.brokerage}</p>
          <p className="text-sm text-mist mt-1">{siteConfig.region}</p>

          <div className="flex gap-4 mt-6">
            <a
              href={siteConfig.contact.instagram}
              aria-label="Instagram"
              className="text-mist hover:text-brand-red transition-brand"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={siteConfig.contact.facebook}
              aria-label="Facebook"
              className="text-mist hover:text-brand-red transition-brand"
            >
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-mist mb-4">Explore</p>
          <ul className="space-y-3">
            {footerNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 hover:text-brand-red transition-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-mist mb-4">Communities</p>
          <ul className="space-y-3">
            <li><Link href="/communities" className="text-sm text-white/80 hover:text-brand-red transition-brand">All Communities</Link></li>
            <li><Link href="/farms" className="text-sm text-white/80 hover:text-brand-red transition-brand">Farms &amp; Acreage</Link></li>
            <li><Link href="/waterfront" className="text-sm text-white/80 hover:text-brand-red transition-brand">Waterfront</Link></li>
            <li><Link href="/search" className="text-sm text-white/80 hover:text-brand-red transition-brand">Search Homes</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-mist mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-brand-red shrink-0" />
              <a href={siteConfig.contact.phoneHref} className="hover:text-brand-red transition-brand">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-brand-red shrink-0" />
              <a href={siteConfig.contact.emailHref} className="hover:text-brand-red transition-brand">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="text-white/60 text-xs pt-2">{siteConfig.contact.officeAddress}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-xs text-white/50 leading-relaxed">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.agentName}, {siteConfig.agentTitle} —{" "}
            {siteConfig.brokerage}. All rights reserved.
          </p>
          <p className="mt-2">{siteConfig.disclosures.brokerage}</p>
          <p className="mt-1">{siteConfig.disclosures.trademark}</p>
          <p className="mt-1">{siteConfig.disclosures.mlsDisclaimer}</p>
          <p className="mt-3 text-white/40">
            This website currently displays sample listing data for demonstration purposes only,
            pending connection to the CREA REALTOR.ca DDF® feed.
          </p>
        </Container>
      </div>
    </footer>
  );
}
