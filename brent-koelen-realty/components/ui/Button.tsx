import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-brand rounded-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark",
  secondary: "bg-ink text-white hover:bg-charcoal",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-brand-red",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

type Props = ButtonAsButton | ButtonAsLink;

export default function Button(props: Props) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { type, onClick, disabled } = props as ButtonAsButton;

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
