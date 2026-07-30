import { useEffect, useState } from 'react'

const words = ['Welcome,', 'User']
const WELCOME_HOLD_MS = 2400

// The eye itself no longer lives here - it's rendered by the global
// <EyeOverlay> in App.jsx so it can persist across the whole site and dock
// into the navbar on scroll. This component only handles the welcome text,
// scroll lock, and the "check me" button, plus a same-size placeholder so
// the layout doesn't jump once the eye is revealed.
export default function Intro({ onAwake, heroDockRef }) {
  const [stage, setStage] = useState('welcome') // 'welcome' -> 'button' -> 'awake'

  useEffect(() => {
    document.body.style.overflow = stage === 'welcome' ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'welcome') return
    const timer = setTimeout(() => setStage('button'), WELCOME_HOLD_MS)
    return () => clearTimeout(timer)
  }, [stage])

  function reveal() {
    setStage('awake')
    onAwake?.()
  }

  return (
    <section
      id="welcome"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
    >
      {stage === 'welcome' && (
        <h1 className="font-display text-4xl font-medium text-ink sm:text-6xl">
          {words.map((word, i) => (
            <span
              key={word}
              className="mr-3 inline-block animate-fadeUp opacity-0"
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              {word}
            </span>
          ))}
        </h1>
      )}

      {stage === 'button' && (
        <button
          onClick={reveal}
          className="animate-fadeUp rounded-lg border border-edge-hover px-6 py-2.5 text-sm text-muted opacity-0 transition-colors hover:border-accent hover:text-accent"
        >
          check me
        </button>
      )}

      {stage === 'awake' && (
        <>
          {/* Reserves the eye's footprint in the layout; EyeOverlay reads
              this element's position to know where the eye starts before
              it begins docking into the navbar. */}
          <div ref={heroDockRef} style={{ width: 340, height: 180 }} aria-hidden="true" />
          <p className="animate-fadeUp text-sm text-muted opacity-0 [animation-delay:0.3s]">
            gerakkan kursor — ia mengawasi
          </p>
        </>
      )}
    </section>
  )
}
