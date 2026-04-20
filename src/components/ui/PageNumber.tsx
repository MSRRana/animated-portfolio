import { memo, useEffect, useState } from "react";

/**
 * A tiny floating page-number indicator, bottom-left, that updates with scroll.
 * Reads scroll progress and maps it to a pseudo page count (1–100). Pure visual
 * flavour — lifted from the bottom corner of a printed magazine.
 */
export const PageNumber = memo(function PageNumber() {
  const [n, setN] = useState(1);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      setN(Math.max(1, Math.min(100, Math.round(1 + p * 99))));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-ash-400 dark:text-ash-300 tabular-nums mix-blend-difference"
    >
      <span>Pg.</span>
      <span className="text-ink dark:text-parchment">{String(n).padStart(3, "0")}</span>
      <span>/</span>
      <span>100</span>
    </div>
  );
});
