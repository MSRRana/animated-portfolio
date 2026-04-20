import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  /** Chapter numeral, e.g. "I", "II". Rendered as an understated header above the eyebrow. */
  numeral?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  id?: string;
}

/**
 * Magazine-style chapter head: numeral → rule → eyebrow → serif display → rule → lede.
 * The numeral is set in Fraunces italic at a small optical size so it reads like a
 * chapter marker in a printed book, not a bold sports jersey number.
 */
export const SectionTitle = memo(function SectionTitle({
  numeral,
  eyebrow,
  title,
  lede,
  align = "center",
  id,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <motion.header
      id={id}
      className={`mb-12 sm:mb-16 ${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {numeral && (
        <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : "justify-start"} mb-5`}>
          <span
            className="font-serif italic text-xl sm:text-2xl text-ash-400 dark:text-ash-300"
            style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 80, 'wght' 400" }}
          >
            {numeral}
          </span>
          <span className="h-px w-10 bg-ink/20 dark:bg-parchment/25" aria-hidden="true" />
        </div>
      )}

      {eyebrow && (
        <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-ash-500 dark:text-ash-300 mb-4">
          {eyebrow}
        </p>
      )}

      <h2
        className="font-serif hang-punct text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] text-ink dark:text-parchment tracking-tight"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 380" }}
      >
        {title}
      </h2>

      <div
        className={`h-px w-12 bg-ink/20 dark:bg-parchment/25 mt-6 ${isCenter ? "mx-auto" : ""}`}
        aria-hidden="true"
      />

      {lede && (
        <p className="mt-6 text-base sm:text-lg text-ash-500 dark:text-ash-200 leading-relaxed">
          {lede}
        </p>
      )}
    </motion.header>
  );
});
