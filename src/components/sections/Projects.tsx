import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Healiom Workspace',
    description: 'Enterprise healthcare platform with React Native mobile app. Integrated Zoom SDK and Stream Chat for telehealth. Implemented detox tests achieving 25% bug reduction.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format',
    tags: ['React Native', 'Zoom SDK', 'Stream Chat', 'Detox', 'Redux'],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://workspace.healiom.com/welcome',
    github: 'https://github.com/MSRRana',
  },
  {
    id: 2,
    title: 'Healiom CareSpace',
    description: 'Healthcare management application with advanced UI/UX. Built with React Native featuring real-time updates, WebSocket integration, and seamless API interactions.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format',
    tags: ['React Native', 'WebSockets', 'API Integration', 'Redux', 'Firebase'],
    gradient: 'from-cyan-500 to-teal-500',
    link: 'https://carespace.healiom.com/welcome',
    github: 'https://github.com/MSRRana',
  },
  {
    id: 3,
    title: 'SnapMeal - Eat Smarter',
    description: 'Food and nutrition tracking app published on App Store and Play Store. Features meal logging, real-time tracking, payment integration, and order management.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format',
    tags: ['React Native', 'Firebase', 'API Integration', 'Redux', 'Maps'],
    gradient: 'from-purple-500 to-pink-500',
    link: 'https://snapmeal.com/',
    github: 'https://github.com/MSRRana',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Modern, animated portfolio website with 3D graphics, glassmorphism UI, and smooth animations. Built with React, Three.js, and Framer Motion.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    gradient: 'from-orange-500 to-red-500',
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
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.1),transparent_50%)]" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Transforming ideas into impactful digital solutions
          </p>
        </motion.div>

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
              <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} - ${project.description.substring(0, 50)}...`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    <motion.a
                      href={project.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 glass rounded-full hover:shadow-neon"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 glass rounded-full hover:shadow-neon"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 sm:mb-3 group-hover:text-gradient transition-all">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-medium bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View More */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-sm sm:text-base text-neon-cyan font-medium group-hover:text-neon-blue transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>

                {/* Gradient Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none`} />
              </div>
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
            className="inline-block group px-6 sm:px-8 py-3 sm:py-4 glass rounded-full text-sm sm:text-base font-semibold hover:shadow-neon-cyan transition-all"
          >
            <span className="flex items-center gap-2">
              View More on GitHub
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
