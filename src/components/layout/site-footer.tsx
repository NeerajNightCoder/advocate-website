import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = 2026;

  const links = [
    { href: "/profile" as const, label: nav("profile") },
    { href: "/practice-areas" as const, label: nav("practiceAreas") },
    { href: "/contact" as const, label: nav("contact") },
    { href: "/privacy" as const, label: t("privacy") },
    { href: "/disclaimer" as const, label: t("disclaimer") },
  ];

  return (
    <footer className="mt-auto border-t border-apple-border bg-apple-muted">
      <div className="mx-auto max-w-[980px] px-5 py-10 md:px-8 md:py-12">
        <p className="text-xs leading-relaxed text-apple-secondary">{t("conductNote")}</p>
        <nav
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-apple-secondary"
          aria-label="Footer"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-apple-label hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-xs text-apple-tertiary">
          © {year} {siteConfig.advocateName}. {t("copyright")} {t("tagline")}
        </p>
      </div>
    </footer>
  );
}
