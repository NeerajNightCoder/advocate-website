import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteImage } from "@/components/ui/site-image";
import { PageHeader, Section } from "@/components/ui/section";
import { practiceAreaImageKeys } from "@/lib/site-images";

type PracticePageProps = PageProps<"/[locale]/practice-areas">;

const areaKeys = [
  "constitutional",
  "civil",
  "criminal",
  "service",
  "commercial",
] as const;

const imageAltKeys: Record<
  (typeof areaKeys)[number],
  | "practiceConstitutional"
  | "practiceCivil"
  | "practiceCriminal"
  | "practiceLibrary"
> = {
  constitutional: "practiceConstitutional",
  civil: "practiceCivil",
  criminal: "practiceCriminal",
  service: "practiceLibrary",
  commercial: "practiceCivil",
};

export async function generateMetadata({ params }: PracticePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "practice" });
  return { title: t("title") };
}

export default async function PracticeAreasPage({ params }: PracticePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("practice");
  const images = await getTranslations("images");

  return (
    <>
      <Section className="pb-4 pt-12 md:pt-16">
        <PageHeader title={t("title")} intro={t("intro")} centered />
        <div className="relative mx-auto mt-10 aspect-[21/9] max-w-4xl overflow-hidden rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <SiteImage
            imageKey="practiceLibrary"
            alt={images("practiceLibrary")}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </Section>

      <Section tone="muted">
        <ol className="space-y-4">
          {areaKeys.map((key, index) => (
            <li
              key={key}
              className="overflow-hidden rounded-2xl bg-apple-bg ring-1 ring-black/5 md:flex"
            >
              <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-72 md:shrink-0">
                <SiteImage
                  imageKey={practiceAreaImageKeys[key]}
                  alt={images(imageAltKeys[key])}
                  fill
                  sizes="288px"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-medium tabular-nums text-apple-tertiary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-[21px] font-semibold tracking-tight text-apple-label">
                  {t(`areas.${key}.title`)}
                </h2>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-apple-secondary">
                  {t(`areas.${key}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
