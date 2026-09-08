"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function PropertyGallery({
  photos,
  alt,
}: {
  photos: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-fog">
        <Image
          src={photos[active]}
          alt={`${alt} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {photos.map((photo, i) => (
            <button
              key={photo + i}
              onClick={() => setActive(i)}
              className={clsx(
                "relative aspect-square rounded-sm overflow-hidden border-2 transition-brand",
                active === i ? "border-brand-red" : "border-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={`View photo ${i + 1}`}
            >
              <Image src={photo} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
