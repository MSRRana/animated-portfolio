import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  id?: string;
}

/**
 * Consistent section header: small uppercase eyebrow, Fraunces display title,
 * a thin hairline rule, and an optional lede. Establishes rhythm across sections
 * so the page feels composed rather than stitched together.
 */
export const SectionTitle = memo(function SectionTitle({
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
      {eyebrow && (
        <p
          className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-white/50 mb-4"
        >
          {eyebrow}
        </p>
      )}

      <h2
        className="font-serif hang-punct text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] text-gray-950 dark:text-white tracking-tight"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 380" }}
      >
        {title}
      </h2>

      <div
        className={`h-px w-12 bg-gray-400/60 dark:bg-white/25 mt-6 ${isCenter ? "mx-auto" : ""}`}
        aria-hidden="true"
      />

      {lede && (
        <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300/90 leading-relaxed">
          {lede}
        </p>
      )}
    </motion.header>
  );
});
