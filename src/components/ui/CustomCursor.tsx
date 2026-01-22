import { memo, useEffect, useState, useCallback, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

type CursorType = 'default' | 'hover' | 'text'

// Optimized CustomCursor with reduced animations and memoization
export const CustomCursor = memo(function CustomCursor() {
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Default to true to prevent flash
  const rafRef = useRef<number>(0)
  const lastUpdateRef = useRef(0)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Single spring config - reduced from 4 to 2 springs
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  // Throttled mouse position update
  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const now = performance.now()
    // Throttle to ~60fps
    if (now - lastUpdateRef.current < 16) return
    lastUpdateRef.current = now

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      cursorX.set(clientX)
      cursorY.set(clientY)
    })
  }, [cursorX, cursorY])

  useEffect(() => {
    // Check mobile once on mount
    const checkMobile = () => {
      const isTouchDevice = window.innerWidth < 768 || 'ontouchstart' in window
      setIsMobile(isTouchDevice)
    }
    checkMobile()

    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.closest('input, textarea')) {
        setCursorType('text')
      } else if (target.closest('button, a, [data-cursor-hover]')) {
        setCursorType('hover')
      } else {
        setCursorType('default')
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    window.addEventListener('resize', checkMobile, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile, updatePosition])

  if (isMobile) return null

  const isHovering = cursorType === 'hover'
  const isTextInput = cursorType === 'text'

  return (
    <>
      {/* Outer ring - simplified */}
      <motion.div
        className="fixed pointer-events-none z-[9998] will-change-transform"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-gray-800 dark:border-white/30"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            borderColor: isHovering ? 'rgba(16, 185, 129, 0.6)' : undefined,
            scale: isClicking ? 0.9 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            background: isHovering ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        {isTextInput ? (
          <div className="w-0.5 h-5 bg-emerald-400 rounded-full" />
        ) : (
          <motion.div
            className="rounded-full bg-gray-900 dark:bg-white"
            animate={{
              width: isClicking ? 6 : 8,
              height: isClicking ? 6 : 8,
              backgroundColor: isHovering ? '#10b981' : undefined,
            }}
            transition={{ duration: 0.15 }}
            style={{
              boxShadow: isHovering
                ? '0 0 12px rgba(16, 185, 129, 0.6)'
                : '0 0 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        )}
      </motion.div>
    </>
  )
})
