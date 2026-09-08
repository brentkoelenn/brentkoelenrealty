"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bath, Ruler, Heart } from "lucide-react";
import { Listing } from "@/lib/listings/types";
import { formatPrice, formatNumber } from "@/lib/utils/format";
import clsx from "clsx";

export default function PropertyCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group bg-white border border-fog rounded-sm overflow-hidden transition-brand hover:shadow-lg hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/property/${listing.id}`}>
          <Image
            src={listing.photos[0]}
            alt={`${listing.headline} — ${listing.address}, ${listing.city}, ON`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-brand group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-ink text-white text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-sm">
            {listing.status}
          </span>
          <span className="bg-brand-red text-white text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-sm">
            Sample Listing
          </span>
        </div>

        <button
          aria-label={saved ? "Remove from favourites" : "Save to favourites"}
          onClick={(e) => {
            e.preventDefault();
            setSaved((v) => !v);
          }}
          className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-brand"
        >
          <Heart
            size={17}
            className={clsx(saved ? "fill-brand-red text-brand-red" : "text-charcoal")}
          />
        </button>
      </div>

      <Link href={`/property/${listing.id}`} className="block p-5">
        <p className="font-display text-2xl text-ink">{formatPrice(listing.price)}</p>
        <p className="mt-2 text-sm font-medium text-charcoal">{listing.address}</p>
        <p className="text-sm text-stone">
          {listing.city}, {listing.province}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-stone">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bed size={16} className="text-brand-red" /> {listing.bedrooms}
            </span>
          )}
          {listing.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={16} className="text-brand-red" /> {listing.bathrooms}
            </span>
          )}
          {listing.squareFeet && (
            <span className="flex items-center gap-1.5">
              <Ruler size={16} className="text-brand-red" /> {formatNumber(listing.squareFeet)} sqft
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-fog flex items-center justify-between text-xs text-mist">
          <span>{listing.propertyType}</span>
          <span>MLS® {listing.mlsNumber}</span>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <Link
          href={`/property/${listing.id}`}
          className="block text-center w-full border border-ink text-ink text-sm font-medium py-2.5 rounded-sm hover:bg-ink hover:text-white transition-brand"
        >
          View Property
        </Link>
      </div>
    </div>
  );
}
