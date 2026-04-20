import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionTitle } from '../ui/SectionTitle'

/**
 * A two-column table of tools and the reason I reach for each one.
 * Percent bars and tech-stack logos lie. Words don't.
 * Rewrite the `why` column in your own voice — it's the whole point.
 */
type Row = { tool: string; why: string }

const rows: { group: string; entries: Row[] }[] = [
  {
    group: 'Client',
    entries: [
      { tool: 'React Native',  why: 'A single codebase for iOS and Android with enough native escape hatches when performance matters.' },
      { tool: 'React',         why: 'Composable, inspectable, and the surface I can move fastest on without losing control.' },
      { tool: 'TypeScript',    why: 'A conversation with the compiler beats reading stack traces at 2am.' },
      { tool: 'Tailwind',      why: 'Design tokens become muscle memory; my CSS diffs stay small and reviewable.' },
    ],
  },
  {
    group: 'Motion & 3D',
    entries: [
      { tool: 'Framer Motion', why: 'Declarative motion that matches the mental model of React — choreography, not imperative timers.' },
      { tool: 'Three.js / R3F', why: 'When a scene is the product. R3F keeps the scene graph reactive and debuggable.' },
    ],
  },
  {
    group: 'Platform',
    entries: [
      { tool: 'Node.js',       why: 'The same language across the boundary — fewer context switches, faster iteration.' },
      { tool: 'Firebase',      why: 'Auth, realtime data, and hosting from one console when the team is small and the deadline is real.' },
      { tool: 'REST · WebSocket', why: 'Pick the lower-overhead surface per endpoint; WebSockets only where latency is the feature.' },
    ],
  },
  {
    group: 'Craft',
    entries: [
      { tool: 'Detox',         why: 'End-to-end tests on real devices catch the class of bugs unit tests never see.' },
      { tool: 'Figma',         why: 'Design decisions live where the designer can change them, not in my git log.' },
      { tool: 'Git · GitHub',  why: 'Small commits, readable PRs, and a history I can explain to the next person.' },
    ],
  },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <SectionTitle
          numeral="II"
          eyebrow="Craft"
          title={<>The tools I reach for</>}
          lede="Not a logo wall and not a percentage bar. A short list of what I use and why — rewrite in your own hand over time."
        />

        <div className="space-y-12 sm:space-y-14">
          {rows.map((section, si) => (
            <motion.section
              key={section.group}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: si * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-ash-400 dark:text-ash-300 mb-5 sm:mb-6">
                {section.group}
              </h3>

              <dl className="divide-y divide-ink/10 dark:divide-parchment/10 border-t border-ink/10 dark:border-parchment/10">
                {section.entries.map((row, ri) => (
                  <motion.div
                    key={row.tool}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: si * 0.08 + ri * 0.06 + 0.15 }}
                    className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4 sm:py-5"
                  >
                    <dt className="font-serif text-lg sm:text-xl text-ink dark:text-parchment tracking-tight"
                        style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'wght' 420" }}>
                      {row.tool}
                    </dt>
                    <dd className="text-[15px] sm:text-base text-ash-500 dark:text-ash-200 leading-relaxed">
                      {row.why}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  )
}
