"use client";

import { ScrollParallaxFrame } from "./scroll-parallax-frame";
import { ScrollReveal } from "./scroll-reveal";
import type { ReactNode } from "react";

type HomeHeroMotionProps = {
  intro: ReactNode;
  image: ReactNode;
};

export function HomeHeroMotion({ intro, image }: HomeHeroMotionProps) {
  return (
    <>
      <ScrollReveal>{intro}</ScrollReveal>
      <ScrollParallaxFrame className="mx-auto mt-12 aspect-[16/9] max-w-[1080px] rounded-3xl bg-apple-muted md:mt-16">
        {image}
      </ScrollParallaxFrame>
    </>
  );
}
