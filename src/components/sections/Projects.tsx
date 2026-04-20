import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'

/**
 * Each project is presented as a small case study:
 *   decision  — the meaningful choice made
 *   tradeoff  — what was given up for it
 *   outcome   — the measurable or human result
 * Three sentences, one per axis. Recruiters read this.
 */
const projects = [
  {
    id: 1,
    title: 'Healiom Workspace',
    kind: 'Telehealth platform · React Native',
    decision: 'Chose Zoom\u2019s native SDK over a WebRTC build so clinicians got the call quality they were used to from day one.',
    tradeoff: 'Accepted a heavier binary and vendor lock-in in exchange for reliability on hospital Wi-Fi and lower support load.',
    outcome: 'A Detox end-to-end suite ran on every PR, cutting escaped bugs by roughly a quarter over the following quarter.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format',
    tags: ['React Native', 'Zoom SDK', 'Stream Chat', 'Detox'],
    link: 'https://workspace.healiom.com/welcome',
    github: 'https://github.com/MSRRana',
  },
  {
    id: 2,
    title: 'Healiom CareSpace',
    kind: 'Care coordination app · React Native',
    decision: 'Moved state onto a WebSocket stream so that care teams saw patient updates within a second of the backend change.',
    tradeoff: 'Took on reconnection and backpressure complexity instead of the simpler polling model the team had started with.',
    outcome: 'Live updates replaced manual refresh across the product, which nurses cited as the single biggest usability win in the release.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format',
    tags: ['React Native', 'WebSockets', 'Redux', 'Firebase'],
    link: 'https://carespace.healiom.com/welcome',
    github: 'https://github.com/MSRRana',
  },
  {
    id: 3,
    title: 'SnapMeal',
    kind: 'Consumer nutrition app · iOS + Android',
    decision: 'Kept meal logging to a single photo plus one tap, resisting requests to add macros and micros on the primary surface.',
    tradeoff: 'Some power users wanted spreadsheet-level control and initially churned; detailed tracking moved into an opt-in detail view.',
    outcome: 'Shipped to the App Store and Play Store with payments, order flow, and an everyday logging path that stuck.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format',
    tags: ['React Native', 'Firebase', 'Payments', 'Maps'],
    link: 'https://snapmeal.com/',
    github: 'https://github.com/MSRRana',
  },
  {
    id: 4,
    title: 'This portfolio',
    kind: 'Personal site · React + Three.js',
    decision: 'Built a single continuous 3D atmosphere the page lives inside, rather than per-section illustrations that each demand attention.',
    tradeoff: 'First paint is slightly heavier than a static site; mitigated with lazy R3F loading and a reduced-motion path for locked-down devices.',
    outcome: 'One metaphor, one signature line of motion, and typography that carries weight — a portfolio that reads as considered rather than busy.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format',
    tags: ['React', 'Three.js', 'Framer Motion', 'Fraunces'],
    link: '#',
    github: 'https://github.com/MSRRana',
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <SectionTitle
          numeral="III"
          eyebrow="Selected work"
          title={<>Things I&rsquo;ve made</>}
          lede="A small collection. Each one is here because a decision inside it is worth talking about."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <article className="relative h-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-ink/10 dark:ring-parchment/10 bg-parchment/60 dark:bg-ink/40 backdrop-blur-sm transition-colors duration-500 hover:ring-ink/25 dark:hover:ring-parchment/25">
                {/* Project Image — a single still, no gradient overlay */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} — ${project.kind}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-[filter] duration-700"
                    animate={{ scale: hoveredProject === project.id ? 1.04 : 1 }}
                    transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent dark:from-ink/90 dark:via-ink/20" />
                </div>

                {/* Case study body */}
                <div className="p-5 sm:p-7 flex flex-col flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ash-400 dark:text-ash-300 mb-2">
                    {project.kind}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-ink dark:text-parchment mb-5"
                      style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 400" }}>
                    {project.title}
                  </h3>

                  <dl className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-ash-500 dark:text-ash-200 mb-6">
                    <div className="flex gap-3">
                      <dt className="shrink-0 w-20 text-[11px] uppercase tracking-[0.18em] text-ash-400 dark:text-ash-300 pt-0.5">Decision</dt>
                      <dd>{project.decision}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="shrink-0 w-20 text-[11px] uppercase tracking-[0.18em] text-ash-400 dark:text-ash-300 pt-0.5">Tradeoff</dt>
                      <dd>{project.tradeoff}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="shrink-0 w-20 text-[11px] uppercase tracking-[0.18em] text-ash-400 dark:text-ash-300 pt-0.5">Outcome</dt>
                      <dd>{project.outcome}</dd>
                    </div>
                  </dl>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-medium text-ash-500 dark:text-ash-200 ring-1 ring-ink/10 dark:ring-parchment/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links — quiet, underlined on hover */}
                  <div className="flex items-center gap-5 pt-4 border-t border-ink/10 dark:border-parchment/10">
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span className="border-b border-transparent hover:border-current">Visit</span>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment transition-colors"
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      <span className="border-b border-transparent hover:border-current">Source</span>
                    </a>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <a
            href="https://github.com/MSRRana"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium uppercase tracking-[0.18em] text-ink/90 dark:text-parchment/90 ring-1 ring-ink/20 dark:ring-parchment/25 rounded-full transition-colors hover:bg-ink hover:text-parchment dark:hover:bg-parchment dark:hover:text-ink"
          >
            <span>More on GitHub</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
