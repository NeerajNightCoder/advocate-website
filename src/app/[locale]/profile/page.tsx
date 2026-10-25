import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionPageHeader, MotionSection } from "@/components/motion/motion-section";
import { ScrollParallaxFrame } from "@/components/motion/scroll-parallax-frame";
import { SiteImage } from "@/components/ui/site-image";
import { Section } from "@/components/ui/section";
import { getAdvocateDisplayName, siteConfig } from "@/lib/site-config";

type ProfilePageProps = PageProps<"/[locale]/profile">;

export async function generateMetadata({ params }: ProfilePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });
  return { title: t("title") };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("profile");
  const images = await getTranslations("images");
  const educationItems = t.raw("educationItems") as string[];
  const advocateName = getAdvocateDisplayName(locale);

  return (
    <>
      <Section className="pb-4 pt-12 md:pt-16">
        <MotionPageHeader title={t("title")} intro={t("intro")} centered />
        <ScrollParallaxFrame className="mx-auto mt-10 aspect-[3/4] max-w-xs rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <SiteImage
            imageKey="profilePortrait"
            alt={images("profilePortrait")}
            fill
            sizes="320px"
          />
        </ScrollParallaxFrame>
      </Section>

      <MotionSection tone="muted">
        <h2 className="apple-subhead">{t("identityHeading")}</h2>
        <p className="mt-4 max-w-3xl apple-body">{t("identityBody")}</p>
        <ul className="mt-6 space-y-2 text-[15px] legal-citation text-apple-secondary">
          <li>{advocateName}</li>
          <li>{siteConfig.barCouncil}</li>
          <li>
            {t("enrolmentLabel")}: {siteConfig.enrolmentNumber} ({siteConfig.enrolmentYear})
          </li>
          <li>{siteConfig.courtName}, {siteConfig.location}</li>
        </ul>
      </MotionSection>

      <MotionSection revealDelay={0.05}>
        <h2 className="apple-subhead">{t("educationHeading")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-apple-secondary">
          {educationItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </MotionSection>

      <MotionSection tone="muted" revealDelay={0.06}>
        <h2 className="apple-subhead">{t("backgroundHeading")}</h2>
        <p className="mt-4 max-w-3xl apple-body">{t("backgroundBody")}</p>
      </MotionSection>

      <MotionSection revealDelay={0.08}>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <h2 className="apple-subhead">{t("addressHeading")}</h2>
            <address className="mt-4 not-italic text-[17px] leading-relaxed text-apple-secondary">
              {siteConfig.chamberAddress.line1}
              <br />
              {siteConfig.chamberAddress.line2}
            </address>
          </div>
          <ScrollParallaxFrame className="aspect-[16/9] rounded-3xl bg-apple-muted ring-1 ring-black/5">
            <SiteImage
              imageKey="location"
              alt={images("location")}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </ScrollParallaxFrame>
        </div>
      </MotionSection>
    </>
  );
}
