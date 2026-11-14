"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

/*
 * Hero entrance. Only transform animates: the server renders every item fully
 * opaque (slightly offset), and `initial` matches that output, so nothing is
 * hidden before hydration and LCP is unaffected. Reduced motion → no transform
 * (MotionConfig reducedMotion="user").
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: motionTokens.stagger } },
};

const item: Variants = {
  hidden: { y: motionTokens.distance.sm },
  show: {
    y: 0,
    transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.out },
  },
};

export function HeroStagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={container} initial="hidden" animate="show">
      {children}
    </m.div>
  );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}
