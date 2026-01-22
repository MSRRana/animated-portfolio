import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { FloatingOrb } from './FloatingOrb'
import { useState, useEffect, memo, useCallback } from 'react'

// Memoized Scene to prevent unnecessary re-renders
export const Scene = memo(function Scene() {
  const [isMobile, setIsMobile] = useState(false)

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    checkMobile()
    // Passive listener for better scroll performance
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [checkMobile])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? 1 : [1, 1.5]} // Lower pixel ratio overall
        performance={{ min: 0.3 }} // More aggressive frame drop allowed
        frameloop={isMobile ? 'demand' : 'always'} // On-demand rendering on mobile
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />

        <FloatingOrb />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isMobile}
          autoRotateSpeed={0.4}
          enabled={!isMobile}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
})
