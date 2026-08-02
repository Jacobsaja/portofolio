import { useEffect, useState } from 'react'
import { setMute, getMute } from '../utils/audio.js'

// HUD overlay: shows real-time system status in a corner panel.
// Appears only after navReady (eye has been activated) so it doesn't
// clutter the terminal boot phase.
export default function HUD({ theme, navReady, hardwareConnected }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [eyeOpen, setEyeOpen] = useState(false)
  const [time, setTime] = useState('')
  const [show, setShow] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Delay reveal until after eye activates
  useEffect(() => {
    if (!navReady) return
    const t = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(t)
  }, [navReady])

  // Track cursor position
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Watch body[data-eye-open] attribute set by EyeOverlay.jsx
  useEffect(() => {
    const check = () => setEyeOpen(document.body.dataset.eyeOpen === 'true')
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-eye-open'],
    })
    return () => observer.disconnect()
  }, [])

  // Live clock
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  
  // Sync mute state on mount
  useEffect(() => {
    setIsMuted(getMute())
  }, [])
  
  const toggleMute = () => {
    const next = !isMuted
    setIsMuted(next)
    setMute(next)
  }

  if (!show) return null

  return (
    <div
      aria-hidden="true"
      className="hud-animate fixed bottom-6 left-6 z-40 pointer-events-none select-none"
    >
      <div className="flex flex-col gap-1 rounded border border-edge/40 bg-base/75 px-3 py-2.5 backdrop-blur font-mono text-xs text-faint">
        {/* Header */}
        <span className="mb-0.5 tracking-widest text-[10px] text-accent/50">◈ SYS.STATUS</span>

        {/* Status grid */}
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
          <span className="text-faint/50">SYS</span>
          <span className="text-green-400/70">ONLINE</span>

          <span className="text-faint/50">GAZE</span>
          <span className={eyeOpen ? 'text-accent' : 'text-faint/40'}>
            {eyeOpen ? (
              <><span className="hud-dot">●</span> ACTIVE</>
            ) : (
              'DORMANT'
            )}
          </span>

          <span className="text-faint/50">MODE</span>
          <span className="text-ink/50">{theme === 'dark' ? 'DARK' : theme === 'light' ? 'LIGHT' : 'MATRIX'}</span>

          <span className="text-faint/50">HW</span>
          <span className={hardwareConnected ? 'text-green-400/70' : 'text-faint/40'}>
            {hardwareConnected ? (
              <><span className="hud-dot">●</span> CONNECTED</>
            ) : (
              'OFFLINE'
            )}
          </span>

          <span className="text-faint/50">POS</span>
          <span className="tabular-nums text-faint/40">
            {String(cursor.x).padStart(4, '0')},{String(cursor.y).padStart(4, '0')}
          </span>
          
          <span className="text-faint/50">AUDIO</span>
          <button 
            className="text-left font-mono pointer-events-auto hover:text-accent transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <span className="text-red-400/70">MUTED</span> : <span className="text-green-400/70">ON</span>}
          </button>
        </div>

        {/* Clock */}
        <span className="mt-0.5 text-[10px] text-faint/25 tabular-nums">{time}</span>
      </div>
    </div>
  )
}
