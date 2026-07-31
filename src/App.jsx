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
import HUD from './components/HUD.jsx'
import FilmGrain from './components/FilmGrain.jsx'
import CommandPalette from './components/CommandPalette.jsx'

export default function App() {
  const [navReady, setNavReady] = useState(false)
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )
  const [wipe, setWipe] = useState(null)
  const heroDockRef = useRef(null)
  const navDockRef = useRef(null)

  // Console Easter Egg
  useEffect(() => {
    console.log(
      '%c╔═══════════════════════════════╗\n║  hey, you found the terminal  ║\n║  jacob@dev is hiring.         ║\n║  simorangkirjacob@gmail.com   ║\n╚═══════════════════════════════╝',
      'font-family: monospace; color: #DE7356; font-size: 14px; font-weight: bold;'
    )
  }, [])

  // Page Visibility API - Signal Lost tab title
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '[SIGNAL LOST] Jacob.dev'
        // Opsional: force mata tertidur, tapi karena blur tab kadang OS handle JS freeze
      } else {
        document.title = 'Jacob — Full Stack Developer'
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

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
    <div className="min-h-screen bg-base relative">
      <FilmGrain />
      <CustomCursor />
      <CommandPalette theme={theme} onToggleTheme={handleToggleTheme} />
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
      {/* HUD system status overlay — appears after eye activates */}
      <HUD theme={theme} navReady={navReady} />
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
