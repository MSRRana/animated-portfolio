import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowDown } from "lucide-react";
import { TerminalGame } from "../games/TerminalGame";

// Lazy load the 3D Scene component for better initial page load
const Scene = lazy(() => import("../3d/Scene").then(module => ({ default: module.Scene })));

const roles = [
  "Full Stack Developer",
  "Mobile & Web Developer",
  "AI Integration Specialist",
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  // Generate orbit particles
  const orbitParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    delay: i * 0.3,
  }));

  // Generate matrix rain characters
  const matrixChars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    char: String.fromCharCode(0x30A0 + Math.random() * 96), // Japanese characters
    position: (i * 360) / 12,
    delay: Math.random() * 2,
  }));

  // Parallax depth effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset click count after 2 seconds
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  // Open terminal on 3 clicks
  useEffect(() => {
    if (clickCount === 3) {
      setShowTerminal(true);
      setClickCount(0);
    }
  }, [clickCount]);

  const handleNameClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Scene />
      </Suspense>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
              {/* Matrix Rain Border */}
              {matrixChars.map((char) => (
                <motion.div
                  key={char.id}
                  className="absolute top-1/2 left-1/2 -ml-2 -mt-2 pointer-events-none"
                  style={{
                    transformOrigin: '50% 50%',
                  }}
                >
                  <motion.div
                    className="text-neon-cyan font-mono text-xs font-bold"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: Math.cos((char.position * Math.PI) / 180) * 90,
                      y: Math.sin((char.position * Math.PI) / 180) * 90,
                    }}
                    transition={{
                      duration: 2,
                      delay: char.delay + 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "linear",
                    }}
                  >
                    {char.char}
                  </motion.div>
                </motion.div>
              ))}

              {/* Particle Orbit System */}
              {orbitParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 4,
                    delay: particle.delay + 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    transformOrigin: '50% 50%',
                  }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet shadow-lg shadow-neon-cyan/50"
                    animate={{
                      x: [
                        Math.cos((particle.angle * Math.PI) / 180) * 80,
                        Math.cos(((particle.angle + 360) * Math.PI) / 180) * 80,
                      ],
                      y: [
                        Math.sin((particle.angle * Math.PI) / 180) * 80,
                        Math.sin(((particle.angle + 360) * Math.PI) / 180) * 80,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      delay: particle.delay + 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              ))}

              {/* Electric Arc Effect */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 1, 0, 1, 0, 0],
                  scale: [1, 1, 1.02, 1, 1.03, 1, 1],
                }}
                transition={{
                  duration: 0.8,
                  delay: 5,
                  repeat: Infinity,
                  repeatDelay: 7,
                  times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
                }}
                style={{
                  background: `radial-gradient(circle at 50% 50%,
                    transparent 45%,
                    rgba(0, 245, 255, 0.8) 48%,
                    rgba(139, 92, 246, 0.6) 49%,
                    transparent 52%
                  )`,
                  filter: 'blur(1px)',
                }}
              />

              {/* Static gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-violet to-neon-cyan p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 border-2 border-black dark:border-white/10 relative">
                  <img
                    src={`${import.meta.env.BASE_URL || '/'}assets/profile.jpg`}
                    alt="Manish Singh Rana - Full Stack Developer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />

                  {/* Pixel reveal effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-blue via-neon-violet to-neon-cyan"
                    initial={{
                      clipPath: 'inset(0 0 0 0)',
                    }}
                    animate={{
                      clipPath: [
                        'inset(0 0 0 0)',
                        'inset(0 0 100% 0)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 245, 255, 0.3) 2px,
                          rgba(0, 245, 255, 0.3) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(139, 92, 246, 0.3) 2px,
                          rgba(139, 92, 246, 0.3) 4px
                        )
                      `,
                    }}
                  />

                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/50 to-transparent"
                    initial={{
                      y: '-100%',
                      opacity: 0,
                    }}
                    animate={{
                      y: '100%',
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      height: '30%',
                    }}
                  />

                  {/* Glitch effect during reveal */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0, 0.6, 0, 0],
                      x: [0, -3, 3, -2, 2, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8,
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    }}
                    style={{
                      backgroundImage: `linear-gradient(90deg,
                        rgba(255, 0, 0, 0.3) 0%,
                        transparent 10%,
                        transparent 90%,
                        rgba(0, 255, 255, 0.3) 100%
                      )`,
                    }}
                  />

                  {/* Holographic Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 2,
                      repeat: Infinity,
                      repeatDelay: 8,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 w-[200%] h-full"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        delay: 2,
                        repeat: Infinity,
                        repeatDelay: 8,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: `linear-gradient(
                          90deg,
                          transparent 0%,
                          rgba(255, 0, 255, 0.1) 20%,
                          rgba(0, 255, 255, 0.2) 40%,
                          rgba(255, 255, 0, 0.2) 50%,
                          rgba(0, 255, 255, 0.2) 60%,
                          rgba(255, 0, 255, 0.1) 80%,
                          transparent 100%
                        )`,
                      }}
                    />
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </motion.div>

          {/* Name with letter animation - Click 3 times for terminal */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 sm:mb-6 cursor-pointer select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            onClick={handleNameClick}
            title="Click 3 times for a surprise!"
          >
            {[
              "M",
              "a",
              "n",
              "i",
              "s",
              "h",
              " ",
              "S",
              "i",
              "n",
              "g",
              "h",
              " ",
              "R",
              "a",
              "n",
              "a",
            ].map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-gradient"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.05,
                  ease: [0.6, 0.05, 0.01, 0.9],
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Rotating roles */}
          <div className="h-16 sm:h-20 mb-6 sm:mb-8 flex items-center justify-center px-4">
            <motion.p
              key={currentRole}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-medium text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRole]}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a
              href="#projects"
              className="group relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-neon-blue to-neon-violet rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all hover:scale-105"
              aria-label="Navigate to projects section"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-violet to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
