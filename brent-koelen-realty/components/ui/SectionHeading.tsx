import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" && "text-center mx-auto max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl leading-tight text-ink">{title}</h2>
      {subtitle && <p className="mt-4 text-stone text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}
