import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { FloatingOrb } from './FloatingOrb'
import { CameraRig } from './CameraRig'
import { memo, useEffect, useState } from 'react'

/**
 * The Scene is a fixed background canvas. The camera no longer orbits on a
 * timer — it flies between waypoints driven by page scroll (see CameraRig),
 * turning the whole site into a single continuous 3D atmosphere.
 */
export const Scene = memo(function Scene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        performance={{ min: 0.3 }}
        frameloop="always"
      >
        {/* Observatory lighting — low, directional, moonlit */}
        <ambientLight intensity={0.28} color="#b8c6ff" />
        <spotLight position={[6, 8, 6]} angle={0.25} penumbra={1} intensity={0.55} color="#e9ecff" />
        <pointLight position={[-8, -4, -6]} intensity={0.25} color="#a855f7" />

        <FloatingOrb />
        <CameraRig />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
})
