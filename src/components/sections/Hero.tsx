import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowDown } from "lucide-react";

// Lazy load the 3D Scene component for better initial page load
const Scene = lazy(() => import("../3d/Scene").then(module => ({ default: module.Scene })));

const roles = [
  "Full Stack Developer",
  "Mobile & Web Developer",
  "AI Integration Specialist",
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          {/* Name with letter animation */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
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
    </section>
  );
}
