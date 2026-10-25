import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteImage } from "@/components/ui/site-image";
import { ButtonLink } from "@/components/ui/button-link";
import { TextLink } from "@/components/ui/text-link";
import { Section } from "@/components/ui/section";
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

  return (
    <>
      <section className="bg-apple-bg px-5 pb-2 pt-14 text-center md:px-8 md:pt-20">
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
        <div className="relative mx-auto mt-12 aspect-[16/9] max-w-[1080px] overflow-hidden rounded-3xl bg-apple-muted md:mt-16">
          <SiteImage
            imageKey="hero"
            alt={images("hero")}
            priority
            fill
            sizes="(max-width: 1080px) 100vw, 1080px"
          />
        </div>
      </section>

      <Section id="profile-preview" tone="muted">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl bg-apple-fill shadow-sm ring-1 ring-black/5">
            <SiteImage
              imageKey="profilePortrait"
              alt={images("profilePortrait")}
              fill
              sizes="(max-width: 768px) 80vw, 384px"
            />
          </div>
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
      </Section>

      <Section id="practice-preview">
        <div className="text-center">
          <h2 className="apple-headline">{home("practiceHeading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl apple-body">{home("practiceIntro")}</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {practicePreviewKeys.map((key) => (
            <li
              key={key}
              className="overflow-hidden rounded-2xl bg-apple-muted ring-1 ring-black/5 transition-colors hover:bg-apple-fill"
            >
              <div className="relative aspect-[4/3] w-full bg-apple-fill">
                <SiteImage
                  imageKey={practiceCardImageKeys[key]}
                  alt={images(
                    key === "constitutional"
                      ? "practiceConstitutional"
                      : key === "civil"
                        ? "practiceCivil"
                        : "practiceCriminal",
                  )}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-[19px] font-semibold tracking-tight text-apple-label">
                  {practice(`areas.${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-apple-secondary">
                  {practice(`areas.${key}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <ButtonLink href="/practice-areas" variant="ghost">
            {home("practiceCta")}
          </ButtonLink>
        </p>
      </Section>

      <Section id="location" tone="muted">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-center md:text-left">
            <h2 className="apple-headline">{home("locationHeading")}</h2>
            <p className="mt-4 apple-body">{home("locationBody")}</p>
            <p className="mt-8">
              <TextLink href="/contact">{home("locationCta")}</TextLink>
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-apple-fill ring-1 ring-black/5">
            <SiteImage
              imageKey="location"
              alt={images("location")}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
        </div>
      </Section>

      <Section id="contact-preview">
        <div className="overflow-hidden rounded-3xl bg-apple-muted ring-1 ring-black/5">
          <div className="relative aspect-[21/9] w-full min-h-[180px] md:aspect-[2.4/1]">
            <SiteImage
              imageKey="contactOffice"
              alt={images("contactOffice")}
              fill
              sizes="(max-width: 980px) 100vw, 980px"
            />
          </div>
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
                <dd className="mt-1 legal-citation text-apple-label">{siteConfig.phone}</dd>
              </div>
            </dl>
            <p className="mt-8">
              <ButtonLink href="/contact" variant="secondary">
                {home("contactCta")}
              </ButtonLink>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
