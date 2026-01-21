import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Database, Cloud, Sparkles } from 'lucide-react'

const skillCategories = [
  {
    title: 'Mobile Development',
    icon: Code2,
    color: 'from-neon-blue to-cyan-500',
    skills: [
      { name: 'React Native', level: 95 },
      { name: 'React Hooks', level: 93 },
      { name: 'Redux', level: 90 },
      { name: 'JavaScript', level: 92 },
    ],
  },
  {
    title: 'Web Development',
    icon: Database,
    color: 'from-neon-violet to-purple-500',
    skills: [
      { name: 'ReactJS', level: 95 },
      { name: 'HTML / CSS', level: 93 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Responsive Design', level: 92 },
    ],
  },
  {
    title: 'Backend & Tools',
    icon: Cloud,
    color: 'from-neon-cyan to-teal-500',
    skills: [
      { name: 'Firebase', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'Elastic Search', level: 80 },
    ],
  },
  {
    title: 'Testing & Collaboration',
    icon: Sparkles,
    color: 'from-neon-pink to-rose-500',
    skills: [
      { name: 'Detox Testing', level: 85 },
      { name: 'Postman', level: 88 },
      { name: 'JIRA', level: 85 },
      { name: 'Slack', level: 90 },
    ],
  },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-neon-violet/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Mastering modern technologies to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass p-6 sm:p-8 rounded-3xl group cursor-pointer"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${category.color}`}
                >
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-display font-bold group-hover:text-gradient transition-all">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1.5 sm:mb-2">
                      <span className="text-sm sm:text-base text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-sm sm:text-base text-neon-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3,
                          ease: 'easeOut',
                        }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 glass p-6 sm:p-8 rounded-3xl"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-center">
            Development <span className="text-gradient">Tools</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {[
              'VS Code',
              'Git',
              'Figma',
              'Postman',
              'Firebase',
              'Redux',
              'Slack',
              'JIRA',
              'Zoom SDK',
              'Stream Chat',
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 glass rounded-full text-xs sm:text-sm md:text-base font-medium hover:shadow-neon-cyan transition-all cursor-pointer"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
