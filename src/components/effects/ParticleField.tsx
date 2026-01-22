import { memo, useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

// Optimized ParticleField with reduced particles, squared distance, and throttled mouse
export const ParticleField = memo(function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number | null>(null)
  const lastMouseUpdate = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        ctx.scale(dpr, dpr)
      }, 100)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    // Reduced particle count - 30-40 instead of 100
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 40)
    const colors = ['#00f5ff', '#6366f1', '#8b5cf6']

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    // Throttled mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseUpdate.current < 50) return // Throttle to 20fps
      lastMouseUpdate.current = now
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Pre-calculate connection distance squared (avoid sqrt)
    const connectionDistSq = 80 * 80
    const mouseDistSq = 120 * 120

    // Animation loop with optimizations
    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      // Batch particle updates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction using squared distance (no sqrt)
        const mdx = p.x - mouseX
        const mdy = p.y - mouseY
        const mouseDistSqCalc = mdx * mdx + mdy * mdy

        if (mouseDistSqCalc < mouseDistSq && mouseDistSqCalc > 0) {
          const force = (1 - mouseDistSqCalc / mouseDistSq) * 0.15
          const invDist = 1 / Math.sqrt(mouseDistSqCalc) // Only sqrt when needed
          p.vx += mdx * invDist * force
          p.vy += mdy * invDist * force
        }

        // Apply velocity with damping
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96

        // Wrap around edges
        if (p.x < 0) p.x = width
        else if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        else if (p.y > height) p.y = 0
      }

      // Batch draw particles first
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      // Draw connections with spatial optimization
      // Only check nearby particles (reduced from O(n²) to O(n*k) where k is small)
      ctx.lineWidth = 0.3
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        // Only check next 10 particles instead of all remaining
        const checkLimit = Math.min(i + 10, particles.length)
        for (let j = i + 1; j < checkLimit; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < connectionDistSq) {
            const opacity = (1 - distSq / connectionDistSq) * 0.15
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = p1.color
            ctx.globalAlpha = opacity
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  )
})
