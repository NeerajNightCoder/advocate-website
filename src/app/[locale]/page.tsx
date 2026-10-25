import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeHeroMotion } from "@/components/motion/home-hero-motion";
import { MotionSection } from "@/components/motion/motion-section";
import { PracticePreviewMotion } from "@/components/motion/practice-preview-motion";
import { ScrollParallaxFrame } from "@/components/motion/scroll-parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SiteImage } from "@/components/ui/site-image";
import { ButtonLink } from "@/components/ui/button-link";
import { TextLink } from "@/components/ui/text-link";
import { getAdvocateDisplayName, siteConfig } from "@/lib/site-config";
import { practiceCardImageKeys } from "@/lib/site-images";

type HomePageProps = PageProps<"/[locale]">;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hero");
  const home = await getTranslations("home");
  const practice = await getTranslations("practice");
  const images = await getTranslations("images");
  const advocateName = getAdvocateDisplayName(locale);

  const practicePreviewKeys = [
    "constitutional",
    "civil",
    "criminal",
  ] as const;

  const practiceCards = practicePreviewKeys.map((key) => ({
    key,
    title: practice(`areas.${key}.title`),
    body: practice(`areas.${key}.body`),
    imageKey: practiceCardImageKeys[key],
    imageAlt: images(
      key === "constitutional"
        ? "practiceConstitutional"
        : key === "civil"
          ? "practiceCivil"
          : "practiceCriminal",
    ),
  }));

  return (
    <>
      <section className="bg-apple-bg px-5 pb-2 pt-14 text-center md:px-8 md:pt-20">
        <HomeHeroMotion
          intro={
            <div className="mx-auto max-w-[880px]">
              <p className="text-sm font-medium text-apple-secondary md:text-base">
                {t("eyebrow")}
              </p>
              <h1 className="mt-2 text-5xl font-semibold tracking-tight text-apple-label md:text-7xl md:tracking-[-0.03em]">
                {advocateName}
              </h1>
              <p className="mt-3 apple-subhead text-apple-secondary md:text-3xl md:font-semibold">
                {t("title")}
              </p>
              <p className="mx-auto mt-6 max-w-2xl apple-body">{t("intro")}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/profile">{t("profileLink")}</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  {t("contactLink")}
                </ButtonLink>
              </div>
            </div>
          }
          image={
            <SiteImage
              imageKey="hero"
              alt={images("hero")}
              priority
              fill
              sizes="(max-width: 1080px) 100vw, 1080px"
            />
          }
        />
      </section>

      <MotionSection id="profile-preview" tone="muted">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <ScrollParallaxFrame className="mx-auto aspect-[3/4] w-full max-w-sm rounded-3xl bg-apple-fill shadow-sm ring-1 ring-black/5">
            <SiteImage
              imageKey="profilePortrait"
              alt={images("profilePortrait")}
              fill
              sizes="(max-width: 768px) 80vw, 384px"
            />
          </ScrollParallaxFrame>
          <div className="text-center md:text-left">
            <h2 className="apple-headline">{home("profileHeading")}</h2>
            <p className="mt-4 apple-body">{home("profileExcerpt")}</p>
            <p className="mt-4 text-sm text-apple-tertiary">
              <span className="legal-citation">
                {siteConfig.barCouncil} · {siteConfig.enrolmentNumber}
              </span>
            </p>
            <p className="mt-8">
              <TextLink href="/profile">{home("profileCta")}</TextLink>
            </p>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="practice-preview" revealDelay={0.04}>
        <div className="text-center">
          <h2 className="apple-headline">{home("practiceHeading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl apple-body">{home("practiceIntro")}</p>
        </div>
        <PracticePreviewMotion cards={practiceCards} />
        <p className="mt-10 text-center">
          <ButtonLink href="/practice-areas" variant="ghost">
            {home("practiceCta")}
          </ButtonLink>
        </p>
      </MotionSection>

      <MotionSection id="location" tone="muted" revealDelay={0.06}>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-center md:text-left">
            <h2 className="apple-headline">{home("locationHeading")}</h2>
            <p className="mt-4 apple-body">{home("locationBody")}</p>
            <p className="mt-8">
              <TextLink href="/contact">{home("locationCta")}</TextLink>
            </p>
          </div>
          <ScrollParallaxFrame className="aspect-[16/9] rounded-3xl bg-apple-fill ring-1 ring-black/5">
            <SiteImage
              imageKey="location"
              alt={images("location")}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </ScrollParallaxFrame>
        </div>
      </MotionSection>

      <MotionSection id="contact-preview" revealDelay={0.08}>
        <div className="overflow-hidden rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <ScrollParallaxFrame className="aspect-[21/9] min-h-[180px] w-full md:aspect-[2.4/1]">
            <SiteImage
              imageKey="contactOffice"
              alt={images("contactOffice")}
              fill
              sizes="(max-width: 980px) 100vw, 980px"
            />
          </ScrollParallaxFrame>
          <ScrollReveal delay={0.1}>
            <div className="mx-auto max-w-xl p-8 text-center md:p-12">
              <h2 className="apple-subhead">{home("contactHeading")}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-apple-secondary">
                {home("contactIntro")}
              </p>
              <dl className="mt-8 space-y-4 text-left text-[15px]">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-apple-tertiary">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${siteConfig.email}`} className="text-apple-link">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-apple-tertiary">
                    Phone
                  </dt>
                  <dd className="mt-1 legal-citation text-apple-label">
                    {siteConfig.phone}
                  </dd>
                </div>
              </dl>
              <p className="mt-8">
                <ButtonLink href="/contact" variant="secondary">
                  {home("contactCta")}
                </ButtonLink>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </MotionSection>
    </>
  );
}
