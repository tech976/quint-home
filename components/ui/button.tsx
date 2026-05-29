import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "link";
type Size = "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  withArrow?: boolean;
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans uppercase tracking-[0.18em] transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-aerial)] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-charcoal)] text-[color:var(--color-ivory)] hover:bg-[color:var(--color-clay-deep)]",
  ghost:
    "border border-[color:var(--color-charcoal)] text-[color:var(--color-charcoal)] hover:bg-[color:var(--color-charcoal)] hover:text-[color:var(--color-ivory)]",
  link:
    "border-b border-[color:var(--color-charcoal)] pb-1 text-[color:var(--color-charcoal)] hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-7 text-[0.72rem]",
  lg: "h-12 px-9 text-[0.78rem]",
};

const linkSize = "text-[0.78rem]";

type LinkProps = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;
type ButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export function Button(props: LinkProps | ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    children,
    className,
    ...rest
  } = props;

  const styling = cn(
    base,
    variants[variant],
    variant === "link" ? linkSize : sizes[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight className="h-[14px] w-[14px] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as LinkProps;
    return (
      <Link href={href} className={styling} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={styling} {...(rest as ButtonProps)}>
      {content}
    </button>
  );
}
