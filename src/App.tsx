import { Navbar } from './components/ui/Navbar'
import { CustomCursor } from './components/ui/CustomCursor'
import { ProgressBar } from './components/ui/ProgressBar'
import { BackToTop } from './components/ui/BackToTop'
import { SectionNav } from './components/ui/SectionNav'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Resume } from './components/sections/Resume'
import { Contact } from './components/sections/ContactEnhanced'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-950 dark:text-white md:cursor-none transition-colors duration-300">
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
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </div>
  )
}

export default App
