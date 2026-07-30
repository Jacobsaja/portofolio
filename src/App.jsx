import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Intro from './components/Intro.jsx'
import EyeOverlay from './components/EyeOverlay.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ThemeWipe from './components/ThemeWipe.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [navReady, setNavReady] = useState(false)
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )
  const [wipe, setWipe] = useState(null)
  const heroDockRef = useRef(null)
  const navDockRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // localStorage unavailable (private browsing etc.) - theme just won't persist
    }
  }, [theme])

  function handleToggleTheme(x, y) {
    const next = theme === 'light' ? 'dark' : 'light'
    const oldBaseChannels = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-base')
      .trim()

    setWipe({ x, y, color: `rgb(${oldBaseChannels})`, key: Date.now() })
    setTheme(next)
  }

  return (
    <div className="min-h-screen bg-base">
      <CustomCursor />
      <Navbar
        visible={navReady}
        dockRef={navDockRef}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <EyeOverlay
        awake={navReady}
        heroDockRef={heroDockRef}
        navDockRef={navDockRef}
        theme={theme}
      />
      <main>
        <Intro onAwake={() => setNavReady(true)} heroDockRef={heroDockRef} />
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      {wipe && (
        <ThemeWipe
          key={wipe.key}
          x={wipe.x}
          y={wipe.y}
          color={wipe.color}
          onDone={() => setWipe(null)}
        />
      )}
    </div>
  )
}
