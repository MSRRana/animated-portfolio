import { memo } from 'react'

/**
 * A small footer note on how the site is made. Designers appreciate these,
 * and the constraint of writing one teaches you what you actually chose.
 */
export const Colophon = memo(function Colophon() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-16 sm:mt-24 border-t border-ink/10 dark:border-parchment/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ash-400 dark:text-ash-300 mb-6">
          Colophon
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-4 sm:gap-y-5 sm:gap-x-6 text-[15px] leading-relaxed">
          <dt className="text-ash-500 dark:text-ash-300">Set in</dt>
          <dd className="text-ink/90 dark:text-parchment/90">
            <span className="font-serif italic" style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 80" }}>Fraunces</span>{' '}
            for display; Inter for body. Optical sizing and soft terminals on the display axis.
          </dd>

          <dt className="text-ash-500 dark:text-ash-300">Palette</dt>
          <dd className="text-ink/90 dark:text-parchment/90">
            Parchment and ink with one warm amber accent. Periwinkle where a cool note is needed.
          </dd>

          <dt className="text-ash-500 dark:text-ash-300">Built with</dt>
          <dd className="text-ink/90 dark:text-parchment/90">
            React, TypeScript, Vite, Tailwind. Motion by Framer Motion. The 3D atmosphere uses Three.js via React Three Fiber; the camera flies through waypoints as you scroll.
          </dd>

          <dt className="text-ash-500 dark:text-ash-300">Signature</dt>
          <dd className="text-ink/90 dark:text-parchment/90">
            A single continuous SVG stroke that draws itself in proportion to scroll — one metaphor, one line, one thread.
          </dd>

          <dt className="text-ash-500 dark:text-ash-300">Shortcuts</dt>
          <dd className="text-ink/90 dark:text-parchment/90">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-ink/5 dark:bg-parchment/10 ring-1 ring-ink/10 dark:ring-parchment/10 text-[12px] tabular-nums">⌘ K</span>{' '}
            opens the command palette.{' '}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-ink/5 dark:bg-parchment/10 ring-1 ring-ink/10 dark:ring-parchment/10 text-[12px]">/</span>{' '}
            works too.
          </dd>

          <dt className="text-ash-500 dark:text-ash-300">Source</dt>
          <dd className="text-ink/90 dark:text-parchment/90">
            <a
              href="https://github.com/MSRRana/animated-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent hover:border-current transition-colors"
            >
              github.com/MSRRana/animated-portfolio
            </a>
          </dd>
        </div>

        <div className="mt-10 pt-6 border-t border-ink/10 dark:border-parchment/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12px] text-ash-400 dark:text-ash-300">
          <p>© {year} Manish Singh Rana. Written, designed, and built in Delhi.</p>
          <p className="italic font-serif" style={{ fontVariationSettings: "'opsz' 14, 'SOFT' 80" }}>
            Revised often. Finished rarely.
          </p>
        </div>
      </div>
    </footer>
  )
})
