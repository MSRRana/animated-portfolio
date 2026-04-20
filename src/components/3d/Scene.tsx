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
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        performance={{ min: 0.3 }}
        frameloop={isMobile ? 'demand' : 'always'}
      >
        {/* Observatory lighting — low, directional, moonlit */}
        <ambientLight intensity={0.28} color="#b8c6ff" />
        <spotLight position={[6, 8, 6]} angle={0.25} penumbra={1} intensity={0.55} color="#e9ecff" />
        <pointLight position={[-8, -4, -6]} intensity={0.25} color="#a855f7" />

        <FloatingOrb />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isMobile}
          autoRotateSpeed={0.18}
          enabled={!isMobile}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
})
