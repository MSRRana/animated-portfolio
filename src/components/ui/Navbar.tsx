import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Games', href: '#games' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleResumeDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    // Use relative path that works with base path
    const basePath = import.meta.env.BASE_URL || '/'
    link.href = `${basePath}assets/resume.pdf`
    link.download = 'Manish_Singh_Rana_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo with Animated Profile Photo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3"
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 group">
            {/* Animated rotating gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-violet to-neon-cyan p-0.5"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 border-2 border-black dark:border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL || '/'}assets/profile.jpg`}
                  alt="Manish Singh Rana"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>

            {/* Pulsing ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-neon-cyan opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-xl sm:text-2xl font-display font-bold text-gradient">
            MR.
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ y: -2 }}
              className="text-sm lg:text-base text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
            >
              {item.name}
            </motion.a>
          ))}
          <ThemeToggle />
          <motion.button
            onClick={handleResumeDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 lg:px-5 py-2 text-sm lg:text-base bg-gradient-to-r from-neon-blue to-neon-violet rounded-full font-semibold hover:shadow-neon transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 glass rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass mt-3 sm:mt-4 mx-4 sm:mx-6 rounded-2xl overflow-hidden"
        >
          <div className="flex flex-col p-5 sm:p-6 gap-3 sm:gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium py-2 text-sm sm:text-base"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={handleResumeDownload}
              className="px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-neon-blue to-neon-violet rounded-full font-semibold mt-2 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
