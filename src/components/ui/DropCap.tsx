import { memo, type ReactNode } from "react";

/**
 * Wrap around a paragraph to render its first letter as a tall Fraunces drop cap
 * that hangs down into three lines of body copy — editorial standard for the
 * opening paragraph of a chapter.
 *
 * Usage:
 *   <DropCap>The rest of the paragraph follows normally…</DropCap>
 *
 * Accepts `first` to pass a custom opening letter/string when the paragraph
 * doesn't start with a letter (e.g. a quote). The child text is rendered after.
 */
export const DropCap = memo(function DropCap({
  children,
  first,
  className = "",
}: {
  children: ReactNode;
  first?: string;
  className?: string;
}) {
  // When a `first` override is supplied, render it separately; otherwise slice
  // off the first character of the child string (the common case).
  let leading: string | null = null;
  let rest: ReactNode = children;

  if (first) {
    leading = first;
  } else if (typeof children === "string" && children.length > 0) {
    leading = children.charAt(0);
    rest = children.slice(1);
  }

  return (
    <p className={`text-base sm:text-lg leading-relaxed text-ash-600 dark:text-ash-200 ${className}`}>
      {leading && (
        <span
          className="float-left font-serif font-light text-[5rem] sm:text-[6rem] leading-[0.82] mr-3 mt-1 text-ink dark:text-parchment"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 360" }}
          aria-hidden="true"
        >
          {leading}
        </span>
      )}
      {rest}
    </p>
  );
});
