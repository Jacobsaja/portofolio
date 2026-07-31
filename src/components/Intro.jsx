import { useEffect, useState, useCallback } from 'react'

const BOOT_LINES = [
  { text: '> initializing jacob.dev...', color: 'text-muted', ms: 0 },
  { text: '> loading gaze_tracker.js       [OK]', color: 'text-green-400/70', ms: 620 },
  { text: '> loading light_beam.js         [OK]', color: 'text-green-400/70', ms: 1100 },
  { text: '> loading theme_engine.js       [OK]', color: 'text-green-400/70', ms: 1550 },
  { text: '> loading cursor_system.js      [OK]', color: 'text-green-400/70', ms: 1980 },
  { text: '> anomaly detected — observer present', color: 'text-accent', ms: 2600 },
  { text: '> awaiting identity confirmation...', color: 'text-ink', ms: 3200 },
]

// The eye itself no longer lives here - it's rendered by the global
// <EyeOverlay> in App.jsx so it can persist across the whole site and dock
// into the navbar on scroll. This component only handles the terminal boot,
// scroll lock, and the "confirm identity" button, plus a same-size placeholder
// so the layout doesn't jump once the eye is revealed.
export default function Intro({ onAwake, heroDockRef }) {
  const [stage, setStage] = useState('boot') // 'boot' -> 'button' -> 'awake'
  const [visibleCount, setVisibleCount] = useState(0)
  const [isLight, setIsLight] = useState(false)

  // Lock scroll during boot + button phase
  useEffect(() => {
    document.body.style.overflow = stage === 'awake' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  // Boot line reveal sequence
  useEffect(() => {
    if (stage !== 'boot') return
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setStage('button'), 700)
        }
      }, line.ms)
    )
    return () => timers.forEach(clearTimeout)
  }, [stage])

  // Skip boot — click anywhere or press any key
  const skipBoot = useCallback(() => {
    if (stage === 'boot') {
      setVisibleCount(BOOT_LINES.length)
      setStage('button')
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'boot') return
    window.addEventListener('keydown', skipBoot)
    return () => window.removeEventListener('keydown', skipBoot)
  }, [stage, skipBoot])

  // Watch <html> for theme changes so the awake copy can react
  useEffect(() => {
    const check = () =>
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light')
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })
    return () => observer.disconnect()
  }, [])

  function reveal() {
    setStage('awake')
    onAwake?.()
  }

  const showTerminal = stage === 'boot' || stage === 'button'

  return (
    <section
      id="welcome"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
      onClick={stage === 'boot' ? skipBoot : undefined}
    >
      {/* ── TERMINAL BOOT ── */}
      {showTerminal && (
        <div className="w-full max-w-lg text-left font-mono text-sm">
          <div className="rounded-lg border border-edge bg-surface/60 p-6 backdrop-blur-sm shadow-2xl">
            {/* Title bar */}
            <div className="mb-4 flex items-center gap-2 border-b border-edge pb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/60" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" aria-hidden="true" />
              <span className="ml-3 text-xs text-faint">jacob@dev — zsh</span>
              {stage === 'boot' && (
                <button
                  onClick={(e) => { e.stopPropagation(); skipBoot() }}
                  className="ml-auto text-xs text-faint/40 hover:text-faint transition-colors pointer-events-auto"
                >
                  skip →
                </button>
              )}
            </div>

            {/* Boot lines */}
            <div className="space-y-1.5 mb-3">
              {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
                <p
                  key={i}
                  className={`${line.color} animate-fadeUp opacity-0`}
                  style={{ animationFillMode: 'forwards' }}
                >
                  {line.text}
                </p>
              ))}

              {/* Blinking cursor while still typing */}
              {stage === 'boot' && visibleCount < BOOT_LINES.length && (
                <p className="text-muted">
                  <span className="terminal-cursor" />
                </p>
              )}
            </div>

            {/* Confirm button — appears after boot completes */}
            {stage === 'button' && (
              <button
                onClick={reveal}
                className="animate-fadeUp mt-3 w-full rounded border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent opacity-0 transition-all hover:bg-accent/20 hover:border-accent focus-visible:ring-2 focus-visible:ring-accent"
                style={{ animationFillMode: 'forwards' }}
              >
                [ CONFIRM IDENTITY ]
              </button>
            )}
          </div>

          {stage === 'boot' && (
            <p className="mt-2 text-center text-xs text-faint/30">
              klik atau tekan sembarang tombol untuk skip
            </p>
          )}
        </div>
      )}

      {/* ── AWAKE PHASE ── */}
      {stage === 'awake' && (
        <>
          {/* Reserves the eye's footprint in the layout; EyeOverlay reads
              this element's position to know where the eye starts before
              it begins docking into the navbar. */}
          <div ref={heroDockRef} style={{ width: 340, height: 180 }} aria-hidden="true" />

          <div className="animate-fadeUp text-center font-mono opacity-0 [animation-delay:0.3s]">
            <p className="mb-3 text-xs text-accent/60">
              {isLight ? '// mode: dormant' : '// mode: scanning active'}
            </p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
              Jacob<span className="glitch-text">.dev</span>
            </h1>
            <p className="text-sm text-muted tracking-wide">
              {isLight
                ? '> eye.sleep() — switch to dark mode'
                : '> move cursor — gaze tracking engaged'}
            </p>
          </div>
        </>
      )}
    </section>
  )
}