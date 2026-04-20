import { memo, type ReactNode } from "react";

/**
 * Desktop-only right-gutter note, like a sketchbook annotation beside the body copy.
 * Wrap around a paragraph to anchor the note next to it.
 *
 * Usage:
 *   <Marginalia note="Built in 2023, sunset 2024.">
 *     <p>…body copy aligned to the left column…</p>
 *   </Marginalia>
 *
 * On mobile the note collapses into a small italic caption after the content.
 */
export const Marginalia = memo(function Marginalia({
  children,
  note,
  number,
}: {
  children: ReactNode;
  note: ReactNode;
  /** Optional footnote-style number, rendered superscript inside the body. */
  number?: number;
}) {
  return (
    <div className="relative lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
      <div className="relative">
        {children}
        {number !== undefined && (
          <sup className="ml-0.5 text-[11px] text-ash-400 dark:text-ash-300 font-medium tabular-nums">
            {number}
          </sup>
        )}
      </div>
      <aside
        className="hidden lg:block text-[12px] leading-relaxed text-ash-400 dark:text-ash-300 italic font-serif pt-1"
        style={{ fontVariationSettings: "'opsz' 14, 'SOFT' 80, 'wght' 380" }}
      >
        {number !== undefined && (
          <span className="mr-1.5 not-italic font-sans text-[11px] tabular-nums">{number}.</span>
        )}
        {note}
      </aside>
      {/* Mobile fallback — same note, quieter placement below the content */}
      <p
        className="lg:hidden mt-3 text-[12px] italic text-ash-400 dark:text-ash-300 font-serif"
        style={{ fontVariationSettings: "'opsz' 14, 'SOFT' 80, 'wght' 380" }}
      >
        {number !== undefined && (
          <span className="mr-1.5 not-italic font-sans tabular-nums">{number}.</span>
        )}
        {note}
      </p>
    </div>
  );
});
