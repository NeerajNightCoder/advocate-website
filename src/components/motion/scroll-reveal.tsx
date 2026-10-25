"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { scrollSpring } from "./spring-config";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** 0–0.4 — staggers scrubbed entrance along the scroll timeline */
  delay?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 36%"],
  });

  const progress = useSpring(scrollYProgress, scrollSpring);
  const clampedDelay = Math.min(Math.max(delay, 0), 0.4);

  const opacity = useTransform(progress, (value) => {
    const adjusted = scrub(value, clampedDelay);
    return 0.1 + adjusted * 0.9;
  });

  const y = useTransform(progress, (value) => 52 * (1 - scrub(value, clampedDelay)));

  const scale = useTransform(
    progress,
    (value) => 0.985 + scrub(value, clampedDelay) * 0.015,
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        scale,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}

function scrub(value: number, delay: number): number {
  if (delay <= 0) {
    return value;
  }
  return Math.min(1, Math.max(0, (value - delay) / (1 - delay)));
}
