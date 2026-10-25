import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader, Section } from "@/components/ui/section";

type DisclaimerPageProps = PageProps<"/[locale]/disclaimer">;

type DisclaimerSection = { heading: string; body: string };

export async function generateMetadata({ params }: DisclaimerPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclaimer" });
  return { title: t("title") };
}

export default async function DisclaimerPage({ params }: DisclaimerPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("disclaimer");
  const sections = t.raw("sections") as DisclaimerSection[];

  return (
    <>
      <Section className="pb-8 pt-12 md:pt-16">
        <PageHeader title={t("title")} intro={t("intro")} centered />
      </Section>
      {sections.map((section, index) => (
        <Section key={section.heading} tone={index % 2 === 0 ? "muted" : "default"}>
          <h2 className="apple-subhead">{section.heading}</h2>
          <p className="mt-4 max-w-3xl apple-body">{section.body}</p>
        </Section>
      ))}
    </>
  );
}
