import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Download, Eye, FileText, Briefcase, GraduationCap, Code, ExternalLink } from 'lucide-react'

// Resume data
const resumeData = {
  summary: "Eager to leverage my 2-3 years of experience in React and React Native as I transition to a full-stack developer role. I'm passionate about crafting seamless user experiences and excited to expand my skills on the backend to build end-to-end solutions.",

  experience: [
    {
      title: "Front End Developer (React Native)",
      company: "Healiom Inc, California",
      period: "Aug 2022 - Present",
      achievements: [
        "Led development of Workspace & CareSpace apps with 100K+ downloads",
        "Integrated Zoom SDK and Stream Chat for telehealth features",
        "Implemented detox testing achieving 25% bug reduction",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      title: "Associate React Native Developer",
      company: "Appsfactor technology pvt. Ltd., Haridwar",
      period: "Jan 2022 - June 2022",
      achievements: [
        "Developed and maintained React Native mobile applications",
        "Collaborated with cross-functional teams to deliver high-quality features",
        "Implemented responsive UI components and state management solutions",
        "Participated in code reviews and agile development processes"
      ]
    },
  ],

  education: [
    {
      degree: "Master of Science (Mathematics)",
      institution: "Gurukul Kangri Deemed to be University",
      period: "2020 - 2022",
      achievements: [
        "Advanced studies in Mathematical Sciences",
        "Applied mathematical concepts to software development",
        "Research in computational mathematics"
      ]
    },
    {
      degree: "Bachelor of Science (Computer Science)",
      institution: "Gurukul Kangri Deemed to be University",
      period: "2017 - 2020",
      achievements: [
        "Comprehensive study of computer science fundamentals",
        "Focus on programming and software development",
        "Built strong foundation in algorithms and data structures"
      ]
    }
  ],

  skills: {
    frontend: ["React Native", "ReactJS", "Redux", "Javascript", "HTML", "CSS", "Tailwind CSS"],
    backend: ["Firebase", "RESTful APIs"],
    tools: ["Git", "Postman", "Slack", "JIRA", "Elastic Search"],
    mobile: ["React Hooks", "Mobile App Development", "Cross-platform Development"]
  },

  certifications: []
}

export function Resume() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'skills' | 'pdf'>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'pdf', label: 'PDF View', icon: Eye },
  ] as const

  return (
    <section id="resume" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_50%)]" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 mb-8">
            Download my resume or view it online to learn more about my experience and qualifications
          </p>

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href={`${import.meta.env.BASE_URL || '/'}assets/resume.pdf`}
              download="Manish_Singh_Rana_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-violet rounded-full font-semibold hover:shadow-neon transition-all"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.a>
            <motion.button
              onClick={() => setActiveTab('pdf')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 glass rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              <Eye className="w-5 h-5" />
              View Inside App
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Resume Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-white/10">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-neon-blue/20 to-neon-violet/20 border-b-2 border-neon-cyan'
                    : 'hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Professional Summary</h3>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                  {resumeData.summary}
                </p>

                <div className="grid grid-cols-1 gap-6 mt-8">
                  <div className="glass p-6 rounded-xl">
                    <Briefcase className="w-8 h-8 text-neon-violet mb-3" />
                    <h4 className="text-xl font-bold mb-2">Quick Stats</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>✓ 2-3 years of experience in React & React Native</li>
                      <li>✓ Currently Front End Developer at Healiom Inc</li>
                      <li>✓ Led development of apps with 100K+ downloads</li>
                      <li>✓ Specialized in mobile application development</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="glass p-6 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{job.title}</h3>
                        <p className="text-neon-cyan font-semibold">{job.company}</p>
                      </div>
                      <span className="text-gray-400 text-sm mt-2 sm:mt-0">{job.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="glass p-6 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{edu.degree}</h3>
                        <p className="text-neon-cyan font-semibold">{edu.institution}</p>
                      </div>
                      <span className="text-gray-400 text-sm mt-2 sm:mt-0">{edu.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-neon-cyan">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.frontend.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-neon-violet">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.backend.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-green-400">Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.tools.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-pink-400">Mobile Development</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.mobile.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PDF View Tab */}
            {activeTab === 'pdf' && (
              <motion.div
                key="pdf"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold">Resume PDF</h3>
                  <motion.a
                    href={`${import.meta.env.BASE_URL || '/'}assets/resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-full font-semibold hover:bg-white/10 transition-all text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in New Tab
                  </motion.a>
                </div>

                {/* PDF Embed - Desktop */}
                <div className="hidden md:block">
                  <div className="relative w-full bg-white/5 rounded-xl overflow-hidden border border-white/10" style={{ height: '800px' }}>
                    <iframe
                      src={`${import.meta.env.BASE_URL || '/'}assets/resume.pdf#toolbar=1&navpanes=0&scrollbar=1`}
                      className="w-full h-full"
                      title="Resume PDF"
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>

                {/* PDF Embed - Mobile/Tablet */}
                <div className="md:hidden">
                  <div className="relative w-full bg-white/5 rounded-xl overflow-hidden border border-white/10" style={{ height: '600px' }}>
                    <iframe
                      src={`${import.meta.env.BASE_URL || '/'}assets/resume.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                      className="w-full h-full"
                      title="Resume PDF"
                      style={{ border: 'none' }}
                    />
                  </div>

                  {/* Mobile Helper Text */}
                  <div className="mt-4 p-4 glass rounded-xl">
                    <p className="text-sm text-gray-400 text-center">
                      💡 <span className="text-white font-semibold">Tip:</span> For best viewing experience on mobile, tap "Open in New Tab" above
                    </p>
                  </div>
                </div>

                {/* Fallback Message */}
                <div className="mt-4 p-4 glass rounded-xl">
                  <p className="text-sm text-gray-400 text-center">
                    If the PDF doesn't load, you can{' '}
                    <a
                      href={`${import.meta.env.BASE_URL || '/'}assets/resume.pdf`}
                      download="Manish_Singh_Rana_Resume.pdf"
                      className="text-neon-cyan hover:text-neon-blue underline"
                    >
                      download it here
                    </a>
                    {' '}or{' '}
                    <a
                      href={`${import.meta.env.BASE_URL || '/'}assets/resume.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-cyan hover:text-neon-blue underline"
                    >
                      view it in a new tab
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
