import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Sparkles, Zap, Rocket } from 'lucide-react'

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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Transforming ideas into seamless mobile and web experiences with 2+ years of expertise
          </p>
        </motion.div>

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

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 glass p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-neon-blue via-neon-violet to-neon-cyan p-1 flex-shrink-0 shadow-lg"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 border-2 border-black dark:border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL || '/'}assets/profile.jpg`}
                  alt="Manish Singh Rana - Full Stack Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-neon-cyan"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">
                Building <span className="text-gradient">Impactful Solutions</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                I'm Manish Singh Rana, a passionate Front End Developer with 2+ years of experience specializing
                in React Native and ReactJS. Currently working at Healiom Inc (California), I've expertly developed
                advanced user interfaces, incorporating 3rd-party SDKs like Zoom and Stream Chat, web sockets, and
                robust API integrations.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                I transform complex Figma designs into intuitive, user-centric interfaces and have published
                numerous apps on the App Store and Play Store. With a Master's in Mathematics from Gurukul Kangri
                University, I bring strong problem-solving skills and a commitment to continuous learning.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                Based in Uttrakhand, India, I'm eager to leverage my expertise as I transition to a full-stack
                developer role, contributing front-end mastery while expanding across the tech stack.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                {['React Native', 'ReactJS', 'Redux', 'JavaScript', 'Firebase', 'API Integration'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full text-xs sm:text-sm font-medium hover:shadow-neon transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
