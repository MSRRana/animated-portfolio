import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The portfolio's central object — a faceted icosahedron with iridescent
 * clear-coat, rotating slowly in a soft nebula of light.
 *
 * Design notes:
 *   - Icosahedron (detail 4) reads as a cut stone rather than a beach ball;
 *     tiny facets catch and release specular highlights.
 *   - MeshPhysicalMaterial with iridescence gives a subtle oil-slick sheen
 *     that shifts with viewing angle — premium without a CDN-backed HDR.
 *   - Emissive base ensures legibility when env lighting is weak or absent.
 *   - Wrapped in <Float> for an organic drift that feels alive.
 */
export const FloatingOrb = memo(function FloatingOrb() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    // A slow, constant yaw on top of Float's organic motion — keeps facets
    // catching new highlights instead of settling.
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12
  })

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef}>
        {/* Core orb — the precious stone */}
        <mesh castShadow receiveShadow scale={2}>
          <icosahedronGeometry args={[1, 4]} />
          <meshPhysicalMaterial
            color="#8b9bc7"             /* periwinkle base */
            emissive="#24305a"          /* deep dusk glow so the orb reads in any lighting */
            emissiveIntensity={0.35}
            metalness={0.28}
            roughness={0.34}
            clearcoat={0.85}
            clearcoatRoughness={0.38}
            iridescence={0.7}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[120, 420]}
          />
        </mesh>

        {/* Inner halo — a slightly larger, near-transparent shell that backlights
            the orb's silhouette. No surface shading, just a soft glow envelope. */}
        <mesh scale={2.25}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#a8b4d4"
            transparent
            opacity={0.06}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  )
})
