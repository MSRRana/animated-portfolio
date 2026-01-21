import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { FloatingOrb } from './FloatingOrb'
import { useState, useEffect } from 'react'

export function Scene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
        performance={{ min: 0.5 }} // Allow frame rate to drop if needed
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <FloatingOrb />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isMobile} // Disable auto-rotation on mobile for better performance
          autoRotateSpeed={0.5}
          enabled={!isMobile} // Disable orbit controls on mobile
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
