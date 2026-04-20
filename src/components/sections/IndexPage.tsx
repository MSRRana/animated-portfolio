import { memo } from 'react'
import { motion } from 'framer-motion'

/**
 * Alphabetical index, printed at the back of the issue. Topics reference the
 * section (numeral + eyebrow) where they appear, in the way a book index does.
 */
type Entry = { term: string; ref: string; href: string }

const ENTRIES: Entry[] = [
  { term: 'About', ref: 'I. A quiet introduction', href: '#about' },
  { term: 'Case studies', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Contact', ref: 'V. Say hello', href: '#contact' },
  { term: 'Craft', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'Correspondence', ref: 'V. Say hello', href: '#contact' },
  { term: 'Detox', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'Firebase', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'Framer Motion', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'Healiom CareSpace', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Healiom Workspace', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Node.js', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'React', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'React Native', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'Résumé', ref: 'IV. The long form', href: '#resume' },
  { term: 'Scroll-as-camera', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Skills', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'SnapMeal', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Tailwind', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'Three.js', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'TypeScript', ref: 'II. The tools I reach for', href: '#skills' },
  { term: 'WebSockets', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Work', ref: 'III. Things I\u2019ve made', href: '#projects' },
  { term: 'Zoom SDK', ref: 'III. Things I\u2019ve made', href: '#projects' },
]

// Group alphabetically by first letter
function groupByLetter(entries: Entry[]) {
  const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term))
  const groups: Record<string, Entry[]> = {}
  sorted.forEach((e) => {
    const letter = e.term.charAt(0).toUpperCase()
    ;(groups[letter] ||= []).push(e)
  })
  return groups
}

export const IndexPage = memo(function IndexPage() {
  const groups = groupByLetter(ENTRIES)

  return (
    <section id="index" className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-6">
      <div className="relative max-w-3xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ash-500 dark:text-ash-300 mb-4">
            Appendix
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink dark:text-parchment"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 380" }}
          >
            Index
          </h2>
          <div aria-hidden="true" className="mt-4 h-px w-12 bg-ink/20 dark:bg-parchment/25" />
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="columns-1 sm:columns-2 gap-10 text-[13px] leading-relaxed"
        >
          {Object.entries(groups).map(([letter, items]) => (
            <div key={letter} className="break-inside-avoid mb-8">
              <p
                className="font-serif italic text-xl text-ash-400 dark:text-ash-300 mb-2"
                style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 80, 'wght' 380" }}
              >
                {letter}
              </p>
              <ul className="space-y-1.5">
                {items.map((e, i) => (
                  <li key={`${e.term}-${i}`} className="flex items-baseline gap-2">
                    <a
                      href={e.href}
                      className="text-ink/90 dark:text-parchment/90 hover:underline underline-offset-[4px] decoration-1"
                    >
                      {e.term}
                    </a>
                    <span
                      aria-hidden="true"
                      className="flex-1 border-b border-dotted border-ash-300 dark:border-ash-400/40 translate-y-[-3px]"
                    />
                    <span className="text-ash-400 dark:text-ash-300 italic font-serif text-[12px]"
                          style={{ fontVariationSettings: "'opsz' 14, 'SOFT' 80, 'wght' 380" }}>
                      {e.ref}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})
