/** Shared motion tokens. Seconds for motion/react; multiply by 1000 for WAAPI. */
export const motionTokens = {
  duration: { fast: 0.15, base: 0.25, slow: 0.4 },
  easing: { out: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  distance: { sm: 6, md: 12 },
  stagger: 0.06,
} as const;

export const springs = {
  /** Critically damped, no bounce. Nav underline (layoutId). */
  snappy: { type: 'spring', stiffness: 500, damping: 40, mass: 0.6 },
  /** Scroll progress smoothing. */
  progress: { stiffness: 260, damping: 40, restDelta: 0.001 },
} as const;
