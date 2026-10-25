"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LocaleSwitcherProps = {
  compact?: boolean;
};

export function LocaleSwitcher({ compact = false }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale");

  return (
    <div
      className={`flex items-center rounded-full bg-apple-fill p-0.5 ${
        compact ? "text-[11px]" : "text-xs"
      }`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`min-h-7 rounded-full px-2.5 font-medium transition-colors ${
              isActive
                ? "bg-white text-apple-label shadow-sm"
                : "text-apple-secondary hover:text-apple-label"
            }`}
            aria-pressed={isActive}
          >
            {t(loc)}
          </button>
        );
      })}
    </div>
  );
}
