"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { getAdvocateDisplayName, siteConfig } from "@/lib/site-config";
import { useLocale } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/profile", key: "profile" as const },
  { href: "/practice-areas", key: "practiceAreas" as const },
  { href: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const advocateName = getAdvocateDisplayName(locale);

  return (
    <header className="sticky top-0 z-50 glass-bar border-b border-black/5">
      <div className="mx-auto flex h-12 max-w-[980px] items-center justify-between gap-4 px-5 md:h-[52px] md:px-8">
        <Link href="/" className="min-w-0 truncate text-[19px] font-semibold tracking-tight text-apple-label">
          {advocateName}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs transition-colors ${
                  isActive
                    ? "text-apple-label"
                    : "text-apple-secondary hover:text-apple-label"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <LocaleSwitcher />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher compact />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-apple-label"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
            <span className="sr-only">{isOpen ? t("closeMenu") : t("openMenu")}</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-black/5 bg-apple-bg px-5 py-3 md:hidden"
          aria-label="Primary mobile"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center text-[17px] text-apple-label"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
