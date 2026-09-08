export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—";
  return new Intl.NumberFormat("en-CA").format(n);
}

export const PROPERTY_TYPES = [
  "Detached",
  "Townhouse",
  "Condo",
  "Farm",
  "Hobby Farm",
  "Vacant Land",
  "Waterfront",
  "Cottage",
  "Investment",
] as const;
