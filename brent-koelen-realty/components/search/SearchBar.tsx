"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";
import { PROPERTY_TYPES } from "@/lib/utils/format";
import { communityList } from "@/lib/config/site";
import Button from "@/components/ui/Button";
import clsx from "clsx";

const inputClass =
  "w-full bg-white border border-fog rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-brand-red transition-brand";
const labelClass = "block text-xs font-semibold text-stone mb-1.5";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [listingType, setListingType] = useState("Any");
  const [minSquareFeet, setMinSquareFeet] = useState("");
  const [minAcreage, setMinAcreage] = useState("");
  const [waterfrontOnly, setWaterfrontOnly] = useState(false);
  const [garageOnly, setGarageOnly] = useState(false);
  const [minStoreys, setMinStoreys] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (propertyType !== "Any") params.set("propertyType", propertyType);
    if (listingType !== "Any") params.set("listingType", listingType);
    if (minSquareFeet) params.set("minSquareFeet", minSquareFeet);
    if (minAcreage) params.set("minAcreage", minAcreage);
    if (waterfrontOnly) params.set("waterfrontOnly", "true");
    if (garageOnly) params.set("garageOnly", "true");
    if (minStoreys) params.set("minStoreys", minStoreys);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={clsx(
        "bg-white border border-fog rounded-sm shadow-xl shadow-ink/5 p-5 sm:p-6",
        compact && "shadow-none"
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label className={labelClass}>Location</label>
          <input
            list="community-list"
            className={inputClass}
            placeholder="Town, address, or postal code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <datalist id="community-list">
            {communityList.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div>
          <label className={labelClass}>Min Price</label>
          <input
            type="number"
            className={inputClass}
            placeholder="No Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Max Price</label>
          <input
            type="number"
            className={inputClass}
            placeholder="No Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Bedrooms</label>
          <select className={inputClass} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Bathrooms</label>
          <select className={inputClass} value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Property Type</label>
          <select
            className={inputClass}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="Any">Any</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Listing Type</label>
          <select
            className={inputClass}
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="For Sale">For Sale</option>
            <option value="For Lease">For Lease</option>
          </select>
        </div>
      </div>

      {showMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-fog animate-fade-up">
          <div>
            <label className={labelClass}>Min Square Footage</label>
            <input
              type="number"
              className={inputClass}
              placeholder="Any"
              value={minSquareFeet}
              onChange={(e) => setMinSquareFeet(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Min Acreage</label>
            <input
              type="number"
              className={inputClass}
              placeholder="Any"
              value={minAcreage}
              onChange={(e) => setMinAcreage(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Storeys</label>
            <select className={inputClass} value={minStoreys} onChange={(e) => setMinStoreys(e.target.value)}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="1.5">1.5+</option>
              <option value="2">2+</option>
            </select>
          </div>
          <div className="flex items-end gap-6 pb-1">
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={waterfrontOnly}
                onChange={(e) => setWaterfrontOnly(e.target.checked)}
                className="accent-brand-red h-4 w-4"
              />
              Waterfront
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={garageOnly}
                onChange={(e) => setGarageOnly(e.target.checked)}
                className="accent-brand-red h-4 w-4"
              />
              Garage
            </label>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 sm:justify-between">
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-brand-red transition-brand"
        >
          <SlidersHorizontal size={16} />
          {showMore ? "Fewer Filters" : "More Filters"}
        </button>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          <Search size={17} />
          Search Properties
        </Button>
      </div>
    </form>
  );
}
