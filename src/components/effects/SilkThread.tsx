import { memo } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A single continuous silk-thin line that weaves through every section
 * as the user scrolls. It draws itself in proportion to scroll progress,
 * and pulses with a soft glow at section anchors.
 *
 * Design principles:
 *   - one stroke, no fills, no extra decoration
 *   - organic cubic-bezier sway rather than a straight line
 *   - honours prefers-reduced-motion (renders static at full length)
 *   - fixed overlay, pointer-events none, -z-0 so content sits above
 */
const PATH_D = [
  "M 50 0",
  "C 10 160, 90 260, 50 400",
  "S 10 640, 50 800",
  "S 90 1040, 50 1200",
  "S 10 1440, 50 1600",
  "S 90 1840, 50 2000",
  "S 10 2240, 50 2400",
  "S 90 2640, 50 2800",
  "S 10 3040, 50 3200",
  "S 90 3440, 50 3600",
  "S 10 3840, 50 4000",
  "S 90 4240, 50 4400",
].join(" ");

export const SilkThread = memo(function SilkThread() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full z-0 opacity-60 dark:opacity-80"
      viewBox="0 0 100 4400"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="silk-thread-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.0" />
          <stop offset="15%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
        </linearGradient>
        <filter id="silk-thread-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The drawn thread */}
      <motion.path
        d={PATH_D}
        stroke="url(#silk-thread-gradient)"
        strokeWidth="0.35"
        strokeLinecap="round"
        filter="url(#silk-thread-glow)"
        style={{
          pathLength: prefersReduced ? 1 : pathLength,
          opacity: 0.9,
        }}
      />

      {/* A faint companion strand for depth */}
      <motion.path
        d={PATH_D}
        stroke="url(#silk-thread-gradient)"
        strokeWidth="0.15"
        strokeLinecap="round"
        transform="translate(1.5 0)"
        style={{
          pathLength: prefersReduced ? 1 : pathLength,
          opacity: 0.35,
        }}
      />
    </svg>
  );
});
