import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Memoized FloatingOrb to prevent unnecessary re-renders
export const FloatingOrb = memo(function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const lastTime = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return

    // Throttle updates to ~30fps for smoother performance
    const delta = state.clock.elapsedTime - lastTime.current
    if (delta < 0.033) return
    lastTime.current = state.clock.elapsedTime

    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    meshRef.current.rotation.y += 0.004
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <mesh ref={meshRef} scale={2.5}>
      {/* Reduced from 64x64 to 32x32 segments - significant performance gain */}
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color="#00d4ff"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
})
