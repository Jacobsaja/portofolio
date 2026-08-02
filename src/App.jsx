import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Intro from './components/Intro.jsx'
import EyeOverlay from './components/EyeOverlay.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ThemeWipe from './components/ThemeWipe.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import OtherProjects from './components/OtherProjects.jsx'
import HardwareControls from './components/HardwareControls.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import HUD from './components/HUD.jsx'
import FilmGrain from './components/FilmGrain.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import MatrixRain from './components/MatrixRain.jsx'
import GridBackground from './components/GridBackground.jsx'
import HardwareStatus from './components/HardwareStatus.jsx'
import ArduinoSimulator from './components/ArduinoSimulator.jsx'
import { initAudio, playMatrixEnter, playMatrixExit } from './utils/audio.js'
import useSerialConnection from './hooks/useSerialConnection.js'

export default function App() {
  const [navReady, setNavReady] = useState(false)
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )
  const [wipe, setWipe] = useState(null)
  const [devMode, setDevMode] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  const [hardwareAuth, setHardwareAuth] = useState(false)
  const [cableConnected, setCableConnected] = useState(false)
  const [simulatorVisible, setSimulatorVisible] = useState(false)
  
  const heroDockRef = useRef(null)
  const navDockRef = useRef(null)
  
  const { connected, data, error, connect, disconnect, sendCommand, supported } = useSerialConnection()

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
      } else {
        document.title = 'Jacob — Full Stack Developer'
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Konami Code listener (still works as backup)
  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e) => {
      if (e.key === konami[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konami.length) {
          setDevMode((prev) => {
            const next = !prev
            if (next) {
              setTheme('matrix')
              playMatrixEnter()
            } else {
              setTheme('dark')
              playMatrixExit()
            }
            return next
          })
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle serial data from Arduino
  useEffect(() => {
    if (!data) return

    switch (data.type) {
      case 'auth':
        if (data.value === 'VALID') {
          setHardwareAuth(true)
          // Hardware auth also unlocks Matrix mode
          if (!devMode) {
            setDevMode(true)
            setTheme('matrix')
            playMatrixEnter()
          }
        }
        break
      case 'theme':
        if (data.value === 'LIGHT' || data.value === 'DARK' || data.value === 'MATRIX') {
          setTheme(data.value.toLowerCase())
          if (data.value === 'MATRIX' && !devMode) {
            setDevMode(true)
            playMatrixEnter()
          } else if (data.value !== 'MATRIX' && devMode) {
            setDevMode(false)
            playMatrixExit()
          }
        }
        break
      case 'eye':
        // Eye position data - could be used to override mouse tracking
        // For now, we'll let the HardwareStatus component display it
        break
      default:
        break
    }
  }, [data, devMode])

  // Init audio on first click anywhere
  useEffect(() => {
    const handleFirstClick = () => {
      initAudio()
      window.removeEventListener('click', handleFirstClick)
    }
    window.addEventListener('click', handleFirstClick)
    return () => window.removeEventListener('click', handleFirstClick)
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
    <div className="min-h-screen bg-base relative overflow-hidden">
      {devMode && <MatrixRain />}
      <GridBackground />
      <FilmGrain />
      <CustomCursor />
      <CommandPalette 
        theme={theme} 
        devMode={devMode}
        setDevMode={(val) => {
          setDevMode(val)
          if(val) { setTheme('matrix'); playMatrixEnter() }
          else { setTheme('dark'); playMatrixExit() }
        }}
        onToggleTheme={handleToggleTheme} 
        onClear={() => setIsCleared(true)} 
        onRestore={() => setIsCleared(false)}
        hardwareSupported={supported}
        hardwareConnected={connected}
        onHardwareConnect={connect}
        onHardwareDisconnect={disconnect}
        onToggleSimulator={() => setSimulatorVisible(prev => !prev)}
      />
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
      <HUD theme={theme} navReady={navReady} hardwareConnected={connected} />
      
      {!isCleared && (
        <main>
          <Intro onAwake={() => setNavReady(true)} heroDockRef={heroDockRef} />
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Experience />
          <HardwareControls 
            theme={theme} 
            setTheme={setTheme} 
            onCableConnected={setCableConnected}
            setDevMode={setDevMode}
            playMatrixEnter={playMatrixEnter}
            playMatrixExit={playMatrixExit}
          />
          {cableConnected && <OtherProjects />}
          <Contact />
        </main>
      )}
      
      {!isCleared && <Footer />}
      {wipe && (
        <ThemeWipe
          key={wipe.key}
          x={wipe.x}
          y={wipe.y}
          color={wipe.color}
          onDone={() => setWipe(null)}
        />
      )}
      <HardwareStatus 
        connected={connected} 
        data={data} 
        error={error} 
        theme={theme} 
      />
      <ArduinoSimulator
        visible={simulatorVisible}
        theme={theme}
        setTheme={setTheme}
        onClose={() => setSimulatorVisible(false)}
        onCableConnected={setCableConnected}
      />
    </div>
  )
}
