"use client";

import { PageHeader, Section } from "@/components/ui/section";
import { ScrollReveal } from "./scroll-reveal";
import type { ReactNode } from "react";

type MotionSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted";
  revealDelay?: number;
};

export function MotionSection({
  children,
  revealDelay = 0,
  ...sectionProps
}: MotionSectionProps) {
  return (
    <Section {...sectionProps}>
      <ScrollReveal delay={revealDelay}>{children}</ScrollReveal>
    </Section>
  );
}

type MotionPageHeaderProps = {
  title: string;
  intro?: string;
  centered?: boolean;
};

export function MotionPageHeader(props: MotionPageHeaderProps) {
  return (
    <ScrollReveal>
      <PageHeader {...props} />
    </ScrollReveal>
  );
}
