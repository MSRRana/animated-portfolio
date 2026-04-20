import { lazy, Suspense } from 'react'
import { Navbar } from './components/ui/Navbar'
import { CustomCursor } from './components/ui/CustomCursor'
import { ProgressBar } from './components/ui/ProgressBar'
import { BackToTop } from './components/ui/BackToTop'
import { SectionNav } from './components/ui/SectionNav'
import { ParticleField } from './components/effects/ParticleField'
import { SilkThread } from './components/effects/SilkThread'
import { CommandPalette } from './components/ui/CommandPalette'
import { Colophon } from './components/ui/Colophon'
import { PageNumber } from './components/ui/PageNumber'
import { Contents } from './components/sections/Contents'

// Lazy-load the shared 3D atmosphere so first paint stays fast
const Scene = lazy(() => import('./components/3d/Scene').then(m => ({ default: m.Scene })))

// Lazy load below-the-fold sections for faster initial load
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })))
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })))
const Resume = lazy(() => import('./components/sections/Resume').then(m => ({ default: m.Resume })))
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })))
const IndexPage = lazy(() => import('./components/sections/IndexPage').then(m => ({ default: m.IndexPage })))

// Loading fallback — a thin hairline ring, matches the restrained grammar
const SectionLoading = () => (
  <div className="min-h-[40vh] flex items-center justify-center" aria-busy="true" aria-live="polite">
    <div className="w-6 h-6 border border-ink/20 dark:border-parchment/20 border-t-ink/70 dark:border-t-parchment/70 rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <div className="min-h-screen text-ink dark:text-parchment md:cursor-none transition-colors duration-300">
      {/* Shared 3D atmosphere — camera flies through waypoints as the page scrolls.
          The root div is intentionally background-transparent so this fixed canvas
          (z-index -10) isn't occluded by a parent paint. The parchment/ink fill
          lives on <html> (see index.css). */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <ParticleField />
      <SilkThread />
      <CustomCursor />
      <CommandPalette />
      <PageNumber />
      <ProgressBar />
      <BackToTop />
      <SectionNav />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-parchment focus:rounded-lg font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" role="main">
        <Contents />
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
          <Resume />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <IndexPage />
        </Suspense>
        <Colophon />
      </main>
    </div>
  )
}

export default App
