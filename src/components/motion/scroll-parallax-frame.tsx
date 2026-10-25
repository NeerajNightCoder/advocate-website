"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { scrollSpring } from "./spring-config";

type ScrollParallaxFrameProps = {
  children: ReactNode;
  className?: string;
};

/** Scroll-scrubbed parallax frame (position tied to scroll progress + spring momentum). */
export function ScrollParallaxFrame({
  children,
  className = "",
}: ScrollParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    ...scrollSpring,
    stiffness: 85,
    damping: 26,
  });

  const y = useTransform(progress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(progress, [0, 0.5, 1], [1.06, 1, 0.98]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.85, 1, 1, 0.92]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
