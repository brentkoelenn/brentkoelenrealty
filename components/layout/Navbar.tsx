"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { primaryNavLinks, siteConfig } from "@/lib/config/site";
import clsx from "clsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu on route change (state adjustment during render,
  // per React's recommended pattern, instead of setState inside an effect).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-fog">
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-xl sm:text-2xl tracking-wide text-ink group-hover:text-brand-red transition-brand">
            BRENT KOELEN
          </span>
          <span className="text-[11px] tracking-[0.28em] text-brand-red font-semibold mt-1">
            REALTOR®
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-brand hover:text-brand-red",
                pathname === link.href ? "text-brand-red" : "text-charcoal"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/home-value" size="sm">
            What&apos;s My Home Worth?
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-fog bg-white">
          <Container className="py-6 flex flex-col gap-1">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "py-3 text-base font-medium border-b border-fog/70 last:border-none",
                  pathname === link.href ? "text-brand-red" : "text-charcoal"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/home-value" className="mt-5 w-full">
              What&apos;s My Home Worth?
            </Button>
            <p className="mt-6 text-xs text-mist">
              {siteConfig.agentName}, {siteConfig.agentTitle} · {siteConfig.brokerage}
            </p>
          </Container>
        </div>
      )}
    </header>
  );
}
