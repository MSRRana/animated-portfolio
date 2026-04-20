import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, lazy, Suspense, useMemo, useCallback, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { TerminalGame } from "../games/TerminalGame";

// Lazy load the 3D Scene component for better initial page load
const Scene = lazy(() => import("../3d/Scene").then(module => ({ default: module.Scene })));

const roles = [
  "Full Stack Developer",
  "Mobile & Web Developer",
  "AI Integration Specialist",
];

// Pre-computed name letters to avoid recreation
const NAME_LETTERS = ["M", "a", "n", "i", "s", "h", " ", "S", "i", "n", "g", "h", " ", "R", "a", "n", "a"];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const lastMouseUpdate = useRef(0);

  // A small orbit of quiet motes around the portrait — restrained, not a swarm
  const orbitParticles = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 3,
      delay: i * 0.6,
    })),
  []);

  // Parallax depth effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25 }; // Reduced stiffness
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig); // Reduced rotation
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  // Throttled mouse handler for parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastMouseUpdate.current < 32) return; // Throttle to ~30fps
    lastMouseUpdate.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset click count after 2 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0 && clickCount < 3) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleNameClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setShowTerminal(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Scene />
      </Suspense>

      {/* Soft vignette — deeper at the edges, invisible at the center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* A few quiet motes orbiting the portrait */}
              {orbitParticles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="absolute top-1/2 left-1/2 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-white/70 dark:bg-white/80"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.9, 0],
                    x: Math.cos((particle.angle * Math.PI) / 180) * 92,
                    y: Math.sin((particle.angle * Math.PI) / 180) * 92,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 14,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 12px rgba(255,255,255,0.6)",
                  }}
                />
              ))}

              {/* Portrait — a single soft ring, no pixel-reveal, no glitch, no scan */}
              <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-white/40 via-white/10 to-white/30 dark:from-white/30 dark:via-white/5 dark:to-white/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 ring-1 ring-black/10 dark:ring-white/10 relative">
                  <img
                    src={`${import.meta.env.BASE_URL || '/'}assets/profile.jpg`}
                    alt="Manish Singh Rana — Full Stack Developer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

            </motion.div>
          </motion.div>

          {/* Name — Fraunces display, optical margin, restrained entrance */}
          <motion.h1
            className="font-serif hang-punct text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-4 sm:mb-6 cursor-pointer select-none text-gray-950 dark:text-white/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            onClick={handleNameClick}
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'wght' 360" }}
            title="Click 3 times for a surprise"
          >
            {NAME_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.035,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* A thin horizontal rule — a pause before the role */}
          <motion.div
            className="mx-auto mb-6 h-px w-16 bg-gray-400/60 dark:bg-white/25 origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            aria-hidden="true"
          />

          {/* Rotating roles — italic Fraunces, quieter */}
          <div className="h-14 sm:h-16 mb-8 sm:mb-10 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentRole}
                className="font-serif italic text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {roles[currentRole]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-medium uppercase tracking-[0.18em] text-ink/90 dark:text-parchment/90 ring-1 ring-ink/20 dark:ring-parchment/25 rounded-full transition-colors hover:bg-ink hover:text-parchment dark:hover:bg-parchment dark:hover:text-ink"
              aria-label="Navigate to projects section"
            >
              <span>See the work</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            role="img"
            aria-label="Scroll down indicator"
          >
            <ArrowDown className="w-6 h-6 text-neon-cyan" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>

      {/* Terminal Game Modal (Easter Egg) */}
      <AnimatePresence>
        {showTerminal && <TerminalGame onClose={() => setShowTerminal(false)} />}
      </AnimatePresence>
    </section>
  );
}
