import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type TextLinkProps = ComponentProps<typeof Link> & {
  showIcon?: boolean;
};

export function TextLink({
  children,
  className = "",
  showIcon = true,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={`group inline-flex items-center gap-0.5 text-[17px] text-apple-link transition-opacity hover:underline ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showIcon ? (
        <ChevronRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}
