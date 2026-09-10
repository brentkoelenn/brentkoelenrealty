export default function SuccessMessage({
  heading = "Thanks! I'll be in touch shortly.",
  subtext,
}: {
  heading?: string;
  subtext?: string;
}) {
  return (
    <div className="bg-brand-red-light border border-brand-red/20 rounded-sm p-8 text-center">
      <p className="font-display text-2xl text-ink">{heading}</p>
      {subtext && <p className="mt-2 text-sm text-stone">{subtext}</p>}
    </div>
  );
}
