import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass animate-pulse" />
    )
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 glass rounded-full hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 90,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-5 h-5 text-neon-cyan" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -90,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-5 h-5 text-yellow-400" />
      </motion.div>
      {/* Invisible placeholder to maintain button size */}
      <div className="w-5 h-5 opacity-0">
        <Moon className="w-5 h-5" />
      </div>
    </motion.button>
  )
}
