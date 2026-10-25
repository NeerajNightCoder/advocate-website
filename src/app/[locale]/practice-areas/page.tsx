import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  MotionPageHeader,
  MotionSection,
} from "@/components/motion/motion-section";
import { PracticeAreasListMotion } from "@/components/motion/practice-areas-list-motion";
import { ScrollParallaxFrame } from "@/components/motion/scroll-parallax-frame";
import { SiteImage } from "@/components/ui/site-image";
import { Section } from "@/components/ui/section";
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

  const items = areaKeys.map((key, index) => ({
    key,
    indexLabel: String(index + 1).padStart(2, "0"),
    title: t(`areas.${key}.title`),
    body: t(`areas.${key}.body`),
    imageKey: practiceAreaImageKeys[key],
    imageAlt: images(imageAltKeys[key]),
  }));

  return (
    <>
      <Section className="pb-4 pt-12 md:pt-16">
        <MotionPageHeader title={t("title")} intro={t("intro")} centered />
        <ScrollParallaxFrame className="mx-auto mt-10 aspect-[21/9] max-w-4xl rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <SiteImage
            imageKey="practiceLibrary"
            alt={images("practiceLibrary")}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </ScrollParallaxFrame>
      </Section>

      <MotionSection tone="muted">
        <PracticeAreasListMotion items={items} />
      </MotionSection>
    </>
  );
}
