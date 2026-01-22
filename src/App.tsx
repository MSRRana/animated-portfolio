import { lazy, Suspense } from 'react'
import { Navbar } from './components/ui/Navbar'
import { CustomCursor } from './components/ui/CustomCursor'
import { ProgressBar } from './components/ui/ProgressBar'
import { BackToTop } from './components/ui/BackToTop'
import { SectionNav } from './components/ui/SectionNav'
import { ParticleField } from './components/effects/ParticleField'
import { Hero } from './components/sections/Hero'

// Lazy load below-the-fold sections for faster initial load
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })))
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })))
const Games = lazy(() => import('./components/sections/Games').then(m => ({ default: m.Games })))
const Resume = lazy(() => import('./components/sections/Resume').then(m => ({ default: m.Resume })))
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })))

// Loading fallback component
const SectionLoading = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-950 dark:text-white md:cursor-none transition-colors duration-300">
      <ParticleField />
      <CustomCursor />
      <ProgressBar />
      <BackToTop />
      <SectionNav />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neon-cyan focus:text-black focus:rounded-lg font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" role="main">
        <Hero />
        <Suspense fallback={<SectionLoading />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Games />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Resume />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  )
}

export default App
