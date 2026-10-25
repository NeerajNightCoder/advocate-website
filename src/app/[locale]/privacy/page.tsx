import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionPageHeader, MotionSection } from "@/components/motion/motion-section";
import { Section } from "@/components/ui/section";

type PrivacyPageProps = PageProps<"/[locale]/privacy">;

type PrivacySection = { heading: string; body: string };

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <>
      <Section className="pb-8 pt-12 md:pt-16">
        <MotionPageHeader title={t("title")} intro={t("intro")} centered />
      </Section>
      {sections.map((section, index) => (
        <MotionSection
          key={section.heading}
          tone={index % 2 === 0 ? "muted" : "default"}
          revealDelay={index * 0.04}
        >
          <h2 className="apple-subhead">{section.heading}</h2>
          <p className="mt-4 max-w-3xl apple-body">{section.body}</p>
        </MotionSection>
      ))}
    </>
  );
}
