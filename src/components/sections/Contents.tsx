import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Command } from 'lucide-react'

/**
 * The opening spread of the magazine. Replaces the conventional "hero with a
 * rotating job title" with a table of contents. No portrait, no CTA gradient —
 * just the masthead, a title, a numbered list of chapters, and one quiet note.
 *
 * The 3D atmosphere lives at App level and remains visible behind the spread.
 */
const CHAPTERS = [
  { numeral: 'I',   title: 'A quiet introduction', href: '#about',    eyebrow: 'About',         pages: '004' },
  { numeral: 'II',  title: 'The tools I reach for', href: '#skills',   eyebrow: 'Craft',         pages: '018' },
  { numeral: 'III', title: 'Things I\u2019ve made',  href: '#projects', eyebrow: 'Selected work', pages: '034' },
  { numeral: 'IV',  title: 'The long form',        href: '#resume',   eyebrow: 'R\u00e9sum\u00e9', pages: '072' },
  { numeral: 'V',   title: 'Say hello',            href: '#contact',  eyebrow: 'Correspondence', pages: '090' },
]

const YEAR = new Date().getFullYear()

export const Contents = memo(function Contents() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center py-20 sm:py-24 overflow-hidden"
    >
      {/* Soft vignette so type stays readable over the 3D atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, transparent 30%, rgba(10,10,18,0.55) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Masthead — the magazine's title block */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-baseline justify-between gap-4 mb-14 sm:mb-20 pb-4 sm:pb-5 border-b border-ink/20 dark:border-parchment/25"
        >
          <div className="flex items-baseline gap-3 sm:gap-5">
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-ash-500 dark:text-ash-300">
              Manish Singh Rana
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-ink/20 dark:bg-parchment/25" />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-ash-400 dark:text-ash-300">
              Volume I
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-ash-400 dark:text-ash-300 tabular-nums">
            {YEAR}
          </span>
        </motion.div>

        {/* Title block — the issue's headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-ash-500 dark:text-ash-300 mb-5">
            Contents
          </p>
          <h1
            className="font-serif hang-punct text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.02] tracking-tight text-ink dark:text-parchment"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 340" }}
          >
            Work, tools, and a little&nbsp;
            <span className="italic" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'wght' 340" }}>correspondence</span>
            .
          </h1>
          <p
            className="mt-6 text-base sm:text-lg text-ash-500 dark:text-ash-200 leading-relaxed max-w-xl"
          >
            A short magazine about what I&rsquo;ve built, the choices behind it, and the
            tools I reach for. Read in order or skip by chapter.
          </p>
        </motion.div>

        {/* Chapter list — the table of contents */}
        <motion.ol
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
          }}
          className="divide-y divide-ink/10 dark:divide-parchment/10 border-t border-b border-ink/10 dark:border-parchment/10"
        >
          {CHAPTERS.map((c) => (
            <motion.li
              key={c.numeral}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
              }}
            >
              <a
                href={c.href}
                className="group grid grid-cols-[36px_1fr_60px] sm:grid-cols-[56px_120px_1fr_80px] items-baseline gap-3 sm:gap-6 py-4 sm:py-5 transition-colors hover:bg-ink/[0.03] dark:hover:bg-parchment/[0.03]"
              >
                <span
                  className="font-serif italic text-lg sm:text-xl text-ash-400 dark:text-ash-300 tabular-nums"
                  style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 80, 'wght' 400" }}
                >
                  {c.numeral}
                </span>
                <span className="hidden sm:inline text-[11px] font-medium uppercase tracking-[0.22em] text-ash-500 dark:text-ash-300">
                  {c.eyebrow}
                </span>
                <span
                  className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-ink dark:text-parchment group-hover:underline underline-offset-[6px] decoration-1"
                  style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'wght' 380" }}
                >
                  {c.title}
                </span>
                <span className="text-right text-[11px] font-medium uppercase tracking-[0.22em] text-ash-400 dark:text-ash-300 tabular-nums">
                  {c.pages}
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ol>

        {/* Footer row — quiet note and a hint about the palette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-ash-500 dark:text-ash-300"
        >
          <p
            className="font-serif italic max-w-md"
            style={{ fontVariationSettings: "'opsz' 14, 'SOFT' 80, 'wght' 400" }}
          >
            Printed from Delhi. Revised often. Finished rarely.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em]">
              <Command className="w-3 h-3" aria-hidden="true" />
              <span>K to search</span>
            </span>
            <a
              href="#about"
              className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] hover:text-ink dark:hover:text-parchment transition-colors"
            >
              <span>Begin</span>
              <ArrowDown className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
})
