import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-apple-link text-white hover:bg-[var(--apple-link-hover)] active:opacity-90",
  secondary:
    "bg-apple-fill text-apple-link hover:bg-[#d9d9de] active:opacity-90",
  ghost:
    "text-apple-link hover:underline",
};

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const isGhost = variant === "ghost";

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-1 rounded-full px-6 text-[17px] font-normal transition-[background-color,opacity] duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {isGhost ? (
        <ChevronRight className="size-4 opacity-80" aria-hidden />
      ) : null}
    </Link>
  );
}
