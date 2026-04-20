import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Oversized italic Fraunces pull quote that breaks the column grid on the left,
 * with an attribution line below. Use sparingly — one per section at most.
 */
export const PullQuote = memo(function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="my-10 sm:my-14 md:-ml-8 lg:-ml-12 border-l-2 border-ink/30 dark:border-parchment/30 pl-6 sm:pl-8 max-w-2xl"
    >
      <blockquote
        className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-light leading-[1.25] text-ink dark:text-parchment hang-punct"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'wght' 360" }}
      >
        <span aria-hidden="true" className="text-ash-300 dark:text-ash-400 mr-1">&ldquo;</span>
        {children}
        <span aria-hidden="true" className="text-ash-300 dark:text-ash-400 ml-0.5">&rdquo;</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ash-400 dark:text-ash-300">
          — {attribution}
        </figcaption>
      )}
    </motion.figure>
  );
});
