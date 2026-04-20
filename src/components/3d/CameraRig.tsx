import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Scroll-driven camera flight.
 *
 * Each waypoint maps a normalized scroll position (0..1 down the page) to a
 * camera position and a look-at target. The camera lerps smoothly between
 * waypoints — a constant, light pull toward the computed target gives it a
 * floating, weighty feel without explicit easing curves.
 *
 * Stations loosely align with the page sections:
 *   0.00  hero       — neutral, framed dead-on
 *   0.15  about      — drift up + slightly left, observatory feel
 *   0.32  skills     — pull right + lower, looking across the orb
 *   0.50  projects   — pull back for scale, looking down
 *   0.68  games      — close + off-centre, intimate
 *   0.85  resume     — arc around to the other side
 *   1.00  contact    — pull far back, sky-wide
 */
type Waypoint = {
  at: number
  position: [number, number, number]
  lookAt: [number, number, number]
}

const WAYPOINTS: Waypoint[] = [
  { at: 0.00, position: [0,    0.0,  5.0], lookAt: [0, 0, 0] },
  { at: 0.15, position: [-1.2, 0.6,  4.6], lookAt: [0, 0, 0] },
  { at: 0.32, position: [1.8, -0.4,  4.8], lookAt: [0, 0.1, 0] },
  { at: 0.50, position: [0.4,  1.4,  6.6], lookAt: [0, -0.2, 0] },
  { at: 0.68, position: [-0.8,-0.2,  3.2], lookAt: [0.2, 0, 0] },
  { at: 0.85, position: [2.2,  0.8,  4.2], lookAt: [-0.2, 0, 0] },
  { at: 1.00, position: [0,    0.0,  8.0], lookAt: [0, 0, 0] },
]

const tmpTargetPos = new THREE.Vector3()
const tmpTargetLook = new THREE.Vector3()
const tmpCurrentLook = new THREE.Vector3()

function interp(p: number): { pos: THREE.Vector3; look: THREE.Vector3 } {
  // Find bracketing waypoints
  let a = WAYPOINTS[0]
  let b = WAYPOINTS[WAYPOINTS.length - 1]
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (p >= WAYPOINTS[i].at && p <= WAYPOINTS[i + 1].at) {
      a = WAYPOINTS[i]
      b = WAYPOINTS[i + 1]
      break
    }
  }
  const span = b.at - a.at || 1
  const t = Math.max(0, Math.min(1, (p - a.at) / span))
  // smoothstep for nicer transitions between stations
  const s = t * t * (3 - 2 * t)

  tmpTargetPos.set(
    a.position[0] + (b.position[0] - a.position[0]) * s,
    a.position[1] + (b.position[1] - a.position[1]) * s,
    a.position[2] + (b.position[2] - a.position[2]) * s,
  )
  tmpTargetLook.set(
    a.lookAt[0] + (b.lookAt[0] - a.lookAt[0]) * s,
    a.lookAt[1] + (b.lookAt[1] - a.lookAt[1]) * s,
    a.lookAt[2] + (b.lookAt[2] - a.lookAt[2]) * s,
  )
  return { pos: tmpTargetPos, look: tmpTargetLook }
}

/**
 * Must render inside <Canvas>. Hooks into window scroll + pointer, lerps
 * the camera toward the scroll-mapped waypoint every frame, and adds a
 * tiny parallax offset from the pointer for a "looking through a window"
 * feel. Honours prefers-reduced-motion by snapping to waypoints.
 */
export function CameraRig() {
  const { camera } = useThree()
  const scrollProgress = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const reduced = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.current = mql.matches
    const onMql = () => { reduced.current = mql.matches }
    mql.addEventListener('change', onMql)

    const computeScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      scrollProgress.current = max > 0 ? doc.scrollTop / max : 0
    }
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    computeScroll()
    window.addEventListener('scroll', computeScroll, { passive: true })
    window.addEventListener('resize', computeScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      mql.removeEventListener('change', onMql)
      window.removeEventListener('scroll', computeScroll)
      window.removeEventListener('resize', computeScroll)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  useFrame((_, delta) => {
    const { pos, look } = interp(scrollProgress.current)

    // Pointer parallax: small lateral + vertical offset, disabled under reduced-motion
    const parallaxX = reduced.current ? 0 : pointer.current.x * 0.18
    const parallaxY = reduced.current ? 0 : -pointer.current.y * 0.12

    const lerpRate = reduced.current ? 1 : 1 - Math.pow(0.0025, delta)
    camera.position.lerp(
      tmpTargetPos.set(pos.x + parallaxX, pos.y + parallaxY, pos.z),
      lerpRate,
    )

    // Smoothly steer lookAt too so the camera doesn't snap when stations change
    tmpCurrentLook.copy(look)
    camera.lookAt(tmpCurrentLook)
  })

  return null
}
