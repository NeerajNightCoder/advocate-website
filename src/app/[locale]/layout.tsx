import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
});

type LocaleLayoutProps = LayoutProps<"/[locale]">;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("siteTitle"),
      template: `%s · ${siteConfig.advocateName}`,
    },
    description: t("siteDescription"),
    openGraph: {
      images: [{ url: "/images/hero-patna-high-court.jpg", width: 1920, height: 1080 }],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "hi")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isHindi = locale === "hi";

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <body
        className={`${inter.variable} ${notoSansDevanagari.variable} flex min-h-full flex-col ${
          isHindi
            ? "font-[family-name:var(--font-noto-sans-devanagari)]"
            : "font-apple"
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
