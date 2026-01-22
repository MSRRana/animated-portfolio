import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'link'>('default')
  const [isMobile, setIsMobile] = useState(false)
  const hoveredElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const updateMousePosition = (e: MouseEvent) => {
      let finalX = e.clientX
      let finalY = e.clientY

      // Magnetic effect - pull cursor toward interactive elements
      const target = e.target as HTMLElement
      const interactive = target.closest('button, a, [data-magnetic]') as HTMLElement

      if (interactive) {
        hoveredElementRef.current = interactive
        const rect = interactive.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate distance from center
        const dx = finalX - centerX
        const dy = finalY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply magnetic pull if within range
        const magneticRange = 80
        if (distance < magneticRange) {
          const pullStrength = 0.3
          finalX = finalX - dx * pullStrength
          finalY = finalY - dy * pullStrength
        }
      } else {
        hoveredElementRef.current = null
      }

      setMousePosition({ x: e.clientX, y: e.clientY })
      setTargetPosition({ x: finalX, y: finalY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('button')
      const link = target.closest('a')

      if (button) {
        setIsHovering(true)
        setCursorVariant('button')
      } else if (link) {
        setIsHovering(true)
        setCursorVariant('link')
      } else {
        setIsHovering(false)
        setCursorVariant('default')
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Don't render custom cursor on mobile devices
  if (isMobile) return null

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(0, 245, 255, 0)',
      border: '2px solid rgba(255, 255, 255, 1)',
    },
    button: {
      scale: 1.8,
      backgroundColor: 'rgba(0, 245, 255, 0.1)',
      border: '2px solid rgba(0, 245, 255, 1)',
    },
    link: {
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '2px solid rgba(139, 92, 246, 1)',
    },
  }

  return (
    <>
      {/* Main cursor with magnetic effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: targetPosition.x - 16,
          y: targetPosition.y - 16,
          ...cursorVariants[cursorVariant],
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 20 },
          y: { type: 'spring', stiffness: 300, damping: 20 },
          scale: { type: 'spring', stiffness: 400, damping: 25 },
          backgroundColor: { duration: 0.2 },
          border: { duration: 0.2 },
        }}
      >
        <div className="w-full h-full rounded-full" />
      </motion.div>

      {/* Trail cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 rounded-full"
        style={{
          backgroundColor: cursorVariant === 'button' ? '#00f5ff' : cursorVariant === 'link' ? '#8b5cf6' : '#00f5ff',
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Hover glow effect */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: targetPosition.x - 30,
            y: targetPosition.y - 30,
            opacity: 0.3,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          <div className="w-16 h-16 rounded-full bg-neon-cyan blur-xl" />
        </motion.div>
      )}
    </>
  )
}
