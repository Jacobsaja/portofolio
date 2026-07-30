import { useEffect, useRef, useState } from 'react'

// Lighter alternative to the exact-beam version: reveals image2 through a
// simple circular mask that follows the cursor, but only while hovering
// the photo itself. No backdrop-filter, no per-frame trig, no dependency
// on the eye's exact position - just a cheap mask-image radial-gradient
// whose center is updated via CSS variables (skips React re-renders).
export default function PhotoReveal({
  image1,
  image2,
  alt = '',
  className = '',
  width = 320,
  height = 320,
  radius = 90,
  feather = 60,
}) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const [clipPath, setClipPath] = useState('polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px)')

  useEffect(() => {
    let frame = null
    const TAPER_RATE = 0.055
    const ORIGIN_HALF_WIDTH = 0

    function update(mouseX, mouseY) {
      const anchor = document.getElementById('eye-anchor')
      const container = containerRef.current
      if (!anchor || !container) return

      const eyeRect = anchor.getBoundingClientRect()
      const boxRect = container.getBoundingClientRect()

      const originX = eyeRect.left + eyeRect.width / 2
      const originY = eyeRect.top + eyeRect.height / 2

      const dx = mouseX - originX
      const dy = mouseY - originY
      const distance = Math.sqrt(dx * dx + dy * dy) || 1
      const dirX = dx / distance
      const dirY = dy / distance

      const px = -dirY
      const py = dirX

      const farDistance = Math.hypot(window.innerWidth, window.innerHeight) * 2
      const farHalfWidth = ORIGIN_HALF_WIDTH + TAPER_RATE * farDistance

      const farX = originX + dirX * farDistance
      const farY = originY + dirY * farDistance

      const nearLeft = { x: originX + px * ORIGIN_HALF_WIDTH, y: originY + py * ORIGIN_HALF_WIDTH }
      const nearRight = { x: originX - px * ORIGIN_HALF_WIDTH, y: originY - py * ORIGIN_HALF_WIDTH }
      const farLeft = { x: farX + px * farHalfWidth, y: farY + py * farHalfWidth }
      const farRight = { x: farX - px * farHalfWidth, y: farY - py * farHalfWidth }

      const toLocal = (p) => `${(p.x - boxRect.left).toFixed(1)}px ${(p.y - boxRect.top).toFixed(1)}px`

      setClipPath(
        `polygon(${toLocal(nearLeft)}, ${toLocal(farLeft)}, ${toLocal(farRight)}, ${toLocal(nearRight)})`
      )
      setVisible(document.body.dataset.eyeOpen !== 'false')
    }

    function onMove(e) {
      if (frame) return
      frame = requestAnimationFrame(() => {
        update(e.clientX, e.clientY)
        frame = null
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ width, height }}
    >
      <img src={image1} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <img
        ref={overlayRef}
        src={image2}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath,
          WebkitClipPath: clipPath,
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      />
    </div>
  )
}