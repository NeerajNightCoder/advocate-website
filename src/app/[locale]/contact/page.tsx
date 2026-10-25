import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionPageHeader, MotionSection } from "@/components/motion/motion-section";
import { ScrollParallaxFrame } from "@/components/motion/scroll-parallax-frame";
import { SiteImage } from "@/components/ui/site-image";
import { Section } from "@/components/ui/section";
import { getAdvocateDisplayName, siteConfig } from "@/lib/site-config";

type ContactPageProps = PageProps<"/[locale]/contact">;

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const images = await getTranslations("images");
  const advocateName = getAdvocateDisplayName(locale);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.mapsQuery,
  )}`;

  const rows = [
    { label: t("nameLabel"), value: advocateName, large: true },
    {
      label: t("designationLabel"),
      value: `Advocate, ${siteConfig.courtName}`,
    },
    {
      label: t("addressLabel"),
      value: `${siteConfig.chamberAddress.line1}\n${siteConfig.chamberAddress.line2}`,
    },
    { label: t("phoneLabel"), value: siteConfig.phone, tel: true },
    { label: t("emailLabel"), value: siteConfig.email, mail: true },
    { label: t("hoursLabel"), value: siteConfig.officeHours },
  ];

  return (
    <>
      <Section className="pb-4 pt-12 md:pt-16">
        <MotionPageHeader title={t("title")} intro={t("intro")} centered />
        <ScrollParallaxFrame className="mx-auto mt-10 aspect-[16/9] max-w-4xl rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <SiteImage
            imageKey="contactOffice"
            alt={images("contactOffice")}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </ScrollParallaxFrame>
      </Section>

      <MotionSection tone="muted">
        <dl className="grid gap-3 md:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl bg-apple-bg p-6 ring-1 ring-black/5"
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-apple-tertiary">
                {row.label}
              </dt>
              <dd
                className={`mt-2 whitespace-pre-line ${
                  row.large
                    ? "text-[21px] font-semibold tracking-tight text-apple-label"
                    : "text-[15px] leading-relaxed text-apple-secondary"
                }`}
              >
                {"tel" in row && row.tel ? (
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="legal-citation text-apple-link"
                  >
                    {row.value}
                  </a>
                ) : "mail" in row && row.mail ? (
                  <a href={`mailto:${siteConfig.email}`} className="text-apple-link">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </MotionSection>

      <MotionSection revealDelay={0.05}>
        <ScrollParallaxFrame className="mb-10 aspect-[16/9] max-w-2xl rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <SiteImage
            imageKey="location"
            alt={images("location")}
            fill
            sizes="672px"
          />
        </ScrollParallaxFrame>
        <h2 className="apple-subhead text-center">{t("mapHeading")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] text-apple-secondary">
          {t("mapNote")}
        </p>
        <p className="mt-8 text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[17px] text-apple-link hover:underline"
          >
            Open map for {siteConfig.mapsQuery}
          </a>
        </p>
      </MotionSection>

      <MotionSection tone="muted" revealDelay={0.08}>
        <p className="mx-auto max-w-3xl text-center text-[13px] leading-relaxed text-apple-tertiary">
          {t("formNotice")}
        </p>
      </MotionSection>
    </>
  );
}
