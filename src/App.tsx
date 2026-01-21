import { Navbar } from './components/ui/Navbar'
import { CustomCursor } from './components/ui/CustomCursor'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-black text-white md:cursor-none">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
