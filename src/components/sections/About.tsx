import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Sparkles, Zap, Rocket } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { DropCap } from '../ui/DropCap'
import { PullQuote } from '../ui/PullQuote'
import { Marginalia } from '../ui/Marginalia'

const timeline = [
  {
    year: '2017-20',
    title: 'Bachelor of Computer Science',
    description: 'Gurukul Kangri Deemed to be University - Building foundation in CS',
    icon: Code2,
  },
  {
    year: '2020-22',
    title: 'Master of Science (Mathematics)',
    description: 'Gurukul Kangri University - Advanced mathematical & computational skills',
    icon: Sparkles,
  },
  {
    year: '2022',
    title: 'React Native Developer',
    description: 'Started professional journey at Appsfactor & Healiom - Mobile app development',
    icon: Zap,
  },
  {
    year: '2022-Present',
    title: 'Front End Developer at Healiom',
    description: 'Building healthcare apps with React Native, 3rd-party SDKs, WebSockets & APIs',
    icon: Rocket,
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background Grid */}

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <SectionTitle
          numeral="I"
          eyebrow="About"
          title={<>A quiet introduction</>}
          lede="Transforming ideas into seamless mobile and web experiences with 2+ years of expertise."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Central line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-neon-blue via-neon-violet to-neon-cyan" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-8 sm:mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'
              }`}
            >
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} text-left`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass p-4 sm:p-6 rounded-2xl group cursor-pointer"
                >
                  <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'}`}>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-cyan" />
                    <span className="text-xl sm:text-2xl font-bold text-neon-blue">{item.year}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-2 group-hover:text-gradient transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              </div>

              {/* Center Node - hidden on mobile */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-neon-cyan"
              />
            </motion.div>
          ))}
        </div>

        {/* Editorial spread — drop cap opener, marginalia, pull quote, closing paragraph */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 sm:mt-28 max-w-3xl mx-auto"
        >
          <Marginalia
            number={1}
            note={
              <>
                Currently at <em>Healiom Inc.</em>, building telehealth and care-coordination
                products used by clinicians in the United States.
              </>
            }
          >
            <DropCap>
              {`I'm a front-end developer with a bias for finish: the bit of the work where a feature stops being “done” and starts being “good.” Two years in, most of that time has gone into React Native apps shipped to clinicians and patients — interfaces where a skipped loading state or a mistimed animation is something somebody feels, not just sees.`}
            </DropCap>
          </Marginalia>

          <PullQuote attribution="On the craft">
            A skipped loading state or a mistimed animation is something somebody feels, not just sees.
          </PullQuote>

          <Marginalia
            number={2}
            note={
              <>
                Published on the App Store and Play Store. Real users, real uninstalls, real
                change requests — the best feedback loop I know.
              </>
            }
          >
            <p className="text-base sm:text-lg leading-relaxed text-ash-600 dark:text-ash-200 mb-6">
              I&rsquo;ve translated enough Figma files into production UI to trust the process:
              start with the worst of the three ideas on paper, ship the next one, keep the third
              in a notebook. A Master&rsquo;s in mathematics probably explains the preference for
              small, composable pieces over cleverness.
            </p>
          </Marginalia>

          <p className="text-base sm:text-lg leading-relaxed text-ash-600 dark:text-ash-200">
            Writing from Uttarakhand. Moving toward the full stack — learning the backend the
            same way I learned the front end: small pieces, real projects, slowly, in public.
          </p>
        </motion.article>
      </div>
    </section>
  )
}
