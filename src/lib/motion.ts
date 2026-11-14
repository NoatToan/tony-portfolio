/** Shared motion tokens. Durations in seconds (motion) — use the *Ms values in CSS. */
export const motionTokens = {
  duration: { fast: 0.15, base: 0.25, slow: 0.4 },
  // ease-out, no overshoot
  easing: { out: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  distance: { sm: 6, md: 12 },
  stagger: 0.06,
} as const;

export const springs = {
  // Critically damped: no bounce. Used only for the nav underline (layoutId).
  snappy: { type: "spring", stiffness: 500, damping: 40, mass: 0.6 },
  // Scroll progress smoothing: critically damped so the bar never overshoots.
  progress: { stiffness: 260, damping: 40, restDelta: 0.001 },
} as const;
