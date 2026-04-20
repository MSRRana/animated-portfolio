import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { FloatingOrb } from "./FloatingOrb";
import { CameraRig } from "./CameraRig";
import { memo, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * The background scene — one faceted orb in a soft nebula, orbiting stars,
 * scroll-driven camera. Fully procedural: no CDN, no HDR fetch, works offline.
 *
 * Layer plan (near → far):
 *   1. Sparkles      — tiny drifting glints near the orb
 *   2. FloatingOrb   — the centrepiece (iridescent icosahedron)
 *   3. Nebula shell  — a large, dim coloured sphere behind the orb giving
 *                      the scene a depth cue without needing env reflections
 *   4. Stars         — procedural starfield at the outer radius
 */
export const Scene = memo(function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        performance={{ min: 0.3 }}
        frameloop="always"
      >
        {/* Deep ink sky + atmospheric fog for depth */}
        <color attach="background" args={["#07070f"]} />
        <fog attach="fog" args={["#07070f", 9, 30]} />

        {/* Observatory lighting — cool moonlit + one warm rim */}
        <ambientLight intensity={0.45} color="#b8c6ff" />
        <hemisphereLight args={["#c9d2ff", "#1a1530", 0.55]} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.4}
          color="#e9ecff"
          castShadow={false}
        />
        {/* A warm rim light from below-left — the "single warm note" */}
        <pointLight position={[-5, -2, -3]} intensity={1.1} color="#c89b56" distance={14} decay={1.4} />
        {/* A cool key fill from above-right for edge separation */}
        <pointLight position={[5, 3, 4]} intensity={0.8} color="#8b9bc7" distance={12} decay={1.4} />

        {/* Distant nebula shell — a giant translucent sphere that paints a
            soft gradient behind the orb. Rendered back-face so the camera
            sees the inside of the shell as ambient colour. */}
        <mesh position={[0, 0, -6]} scale={18}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#1e1f3a"
            transparent
            opacity={0.55}
            side={THREE.BackSide}
            depthWrite={false}
            fog={false}
          />
        </mesh>

        {/* Centrepiece */}
        <FloatingOrb />

        {/* Tiny drifting glints around the orb — like dust in a sunbeam.
            Cool colour to stay in the observatory family. */}
        <Sparkles
          count={isMobile ? 24 : 60}
          scale={[6, 5, 6]}
          size={2.4}
          speed={0.25}
          opacity={0.7}
          color="#c9d2ff"
          noise={0.6}
        />

        {/* Procedural starfield at the outer radius */}
        <Stars
          radius={80}
          depth={55}
          count={isMobile ? 900 : 2400}
          factor={3.5}
          saturation={0}
          fade
          speed={0.3}
        />

        <CameraRig />

        {/* Post-processing — the single biggest lift a scene like this can take.
            Bloom makes the orb's emissive + iridescent specular actually glow,
            so stars twinkle and the orb reads as a real light source. Everything
            else (vignette, chromatic aberration, film grain) is a gentle
            cinematic dressing — small amounts, not loud. Disabled on mobile to
            keep the frame rate comfortable. */}
        {!isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
              kernelSize={KernelSize.LARGE}
            />
            <ChromaticAberration
              offset={[0.0005, 0.0008]}
              radialModulation={false}
              modulationOffset={0}
              blendFunction={BlendFunction.NORMAL}
            />
            <Vignette eskil={false} offset={0.18} darkness={0.85} blendFunction={BlendFunction.NORMAL} />
            <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.22} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
});
