"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "relevant", label: "Most Relevant" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <select
      className="border border-fog rounded-sm px-3 py-2 text-sm text-charcoal bg-white focus:outline-none focus:border-brand-red transition-brand"
      defaultValue={searchParams.get("sortBy") ?? "relevant"}
      onChange={(e) => handleChange(e.target.value)}
      aria-label="Sort properties"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
