import { useEffect, useRef, useState } from 'react'
import useGazeTracking from '../hooks/useGazeTracking.js'
import Eye from './Eye.jsx'
import LightBeam from './LightBeam.jsx'

const EYE_WIDTH = 340
const DOCK_WIDTH = 34
// How much scroll (in px) it takes to fully dock the eye into the navbar.
const TRANSITION_DISTANCE = 500

// Eases the raw scroll progress (0-1) so the morph starts/ends gently
// instead of moving at a constant linear rate.
function smoothstep(t) {
  return t * t * (3 - 2 * t)
}

export default function EyeOverlay({ awake, heroDockRef, navDockRef, theme }) {
  const eyeRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [heroAnchor, setHeroAnchor] = useState(null)
  const [dockAnchor, setDockAnchor] = useState(null)

  const { pupil, eyeOpen, asleep, mouse } = useGazeTracking(eyeRef)

  // Measure both anchor points once the eye is revealed (and again on
  // resize, so it stays correct if the layout reflows).
  useEffect(() => {
    if (!awake) return

    function measure() {
      const heroEl = heroDockRef.current
      const dockEl = navDockRef.current
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        setHeroAnchor({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }
      if (dockEl) {
        const rect = dockEl.getBoundingClientRect()
        setDockAnchor({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [awake, heroDockRef, navDockRef])

  useEffect(() => {
    let frame = null
    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        frame = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Light mode overrides the eye's natural state: it goes to sleep
  // immediately (reusing the same slow fade used for idle-sleep) and the
  // beam is hidden, regardless of cursor activity.
  const forcedAsleep = theme === 'light'
  const displayAsleep = asleep || forcedAsleep
  const displayEyeOpen = eyeOpen && !forcedAsleep

  useEffect(() => {
    document.body.dataset.eyeOpen = displayEyeOpen ? 'true' : 'false'
  }, [displayEyeOpen])

  if (!awake || !heroAnchor || !dockAnchor) return null

  const t = Math.min(Math.max(scrollY / TRANSITION_DISTANCE, 0), 1)
  const ease = smoothstep(t)

  const scale = 1 - ease * (1 - DOCK_WIDTH / EYE_WIDTH)
  const centerX = heroAnchor.x + (dockAnchor.x - heroAnchor.x) * ease
  const centerY = heroAnchor.y + (dockAnchor.y - heroAnchor.y) * ease

  return (
    <>
      <div
        id="eye-anchor"
        style={{
          position: 'fixed',
          left: centerX,
          top: centerY,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center',
          zIndex: 60,
          pointerEvents: 'none',
        }}
      >
        <Eye ref={eyeRef} pupil={pupil} eyeOpen={displayEyeOpen} asleep={displayAsleep} />
      </div>
      <LightBeam eyeRef={eyeRef} pupil={pupil} mouse={mouse} visible={displayEyeOpen} scale={scale} />
    </>
  )
}
