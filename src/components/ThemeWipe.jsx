import { useEffect, useRef } from 'react'

const DURATION = 700

// `color` is the theme's base color from *before* the switch - the actual
// page has already flipped to the new theme by the time this mounts, so
// this overlay just needs to "peel away" from the click point to reveal it.
export default function ThemeWipe({ x, y, color, onDone }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    const start = performance.now()
    let frame = null

    function tick(now) {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      el.style.setProperty('--wipe-r', `${eased * maxRadius}px`)
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        onDone?.()
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      if (frame) cancelAnimationFrame(frame)
    }
  }, [x, y, onDone])

  const mask = `radial-gradient(circle at ${x}px ${y}px, transparent var(--wipe-r), black calc(var(--wipe-r) + 1px))`

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        pointerEvents: 'none',
        backgroundColor: color,
        '--wipe-r': '0px',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  )
}
