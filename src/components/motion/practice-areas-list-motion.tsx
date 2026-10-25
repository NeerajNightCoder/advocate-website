"use client";

import { SiteImage } from "@/components/ui/site-image";
import { ScrollReveal } from "./scroll-reveal";
import type { SiteImageKey } from "@/lib/site-images";

type PracticeAreaItem = {
  key: string;
  indexLabel: string;
  title: string;
  body: string;
  imageKey: SiteImageKey;
  imageAlt: string;
};

type PracticeAreasListMotionProps = {
  items: PracticeAreaItem[];
};

export function PracticeAreasListMotion({ items }: PracticeAreasListMotionProps) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item.key}>
          <ScrollReveal delay={index * 0.05}>
            <article
              className="overflow-hidden rounded-2xl bg-apple-bg ring-1 ring-black/5 md:flex"
            >
              <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-full md:min-h-[12rem] md:w-72 md:shrink-0">
                <SiteImage
                  imageKey={item.imageKey}
                  alt={item.imageAlt}
                  fill
                  sizes="288px"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-medium tabular-nums text-apple-tertiary">
                  {item.indexLabel}
                </p>
                <h2 className="mt-2 text-[21px] font-semibold tracking-tight text-apple-label">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-apple-secondary">
                  {item.body}
                </p>
              </div>
            </article>
          </ScrollReveal>
        </li>
      ))}
    </ol>
  );
}
