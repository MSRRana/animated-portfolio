import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'games', label: 'Games' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <nav className="flex flex-col gap-4" aria-label="Section navigation">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id
          const isHovered = hoveredSection === id

          return (
            <div key={id} className="relative group">
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 10,
                }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 glass rounded-lg whitespace-nowrap pointer-events-none"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {label}
                </span>
              </motion.div>

              {/* Dot Button */}
              <button
                onClick={() => scrollToSection(id)}
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection(null)}
                className="relative w-3 h-3 rounded-full transition-all"
                aria-label={`Navigate to ${label} section`}
              >
                {/* Outer ring on hover/active */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  animate={{
                    borderColor: isActive
                      ? 'rgba(0, 212, 255, 1)'
                      : isHovered
                        ? 'rgba(168, 85, 247, 0.8)'
                        : 'rgba(255, 255, 255, 0.3)',
                    scale: isActive || isHovered ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Inner dot */}
                <motion.div
                  className="absolute inset-0 m-auto rounded-full"
                  animate={{
                    width: isActive ? '8px' : '6px',
                    height: isActive ? '8px' : '6px',
                    backgroundColor: isActive
                      ? '#00d4ff'
                      : isHovered
                        ? '#a855f7'
                        : 'rgba(255, 255, 255, 0.5)',
                  }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
