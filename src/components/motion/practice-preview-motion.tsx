"use client";

import { SiteImage } from "@/components/ui/site-image";
import { ScrollReveal } from "./scroll-reveal";
import type { SiteImageKey } from "@/lib/site-images";

type PracticeCard = {
  key: string;
  title: string;
  body: string;
  imageKey: SiteImageKey;
  imageAlt: string;
};

type PracticePreviewMotionProps = {
  cards: PracticeCard[];
};

export function PracticePreviewMotion({ cards }: PracticePreviewMotionProps) {
  return (
    <ul className="mt-12 grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <li key={card.key}>
          <ScrollReveal delay={index * 0.07}>
            <article
              className="overflow-hidden rounded-2xl bg-apple-muted ring-1 ring-black/5 transition-colors hover:bg-apple-fill"
            >
              <div className="relative aspect-[4/3] w-full bg-apple-fill">
                <SiteImage
                  imageKey={card.imageKey}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-[19px] font-semibold tracking-tight text-apple-label">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-apple-secondary">
                  {card.body}
                </p>
              </div>
            </article>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}
