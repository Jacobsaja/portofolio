// A beam that shoots from the eye's pupil through the cursor and keeps
// going all the way to the edge of the viewport - narrow at the eye, wide
// by the time it exits the screen. Everything inside the beam has its
// colors inverted (backdrop-filter), it does not look like added light.
// `scale` accounts for the eye being visually shrunk when docked in the
// navbar, so the pupil offset (in raw SVG units) is scaled down to match.
export default function LightBeam({ eyeRef, pupil, mouse, visible, scale = 1 }) {
  const eyeRect = eyeRef.current?.getBoundingClientRect()
  if (!eyeRect) return null

  const originX = eyeRect.left + eyeRect.width / 2 + pupil.x * scale
  const originY = eyeRect.top + eyeRect.height / 2 + pupil.y * scale

  const dx = mouse.x - originX
  const dy = mouse.y - originY
  const distance = Math.sqrt(dx * dx + dy * dy) || 1
  const dirX = dx / distance
  const dirY = dy / distance

  // perpendicular direction, used to widen the beam as it travels
  const px = -dirY
  const py = dirX

  const originHalfWidth = 0
  const taperRate = 0.055 // how quickly the beam widens per pixel traveled
  const farDistance = Math.hypot(window.innerWidth, window.innerHeight) * 2
  const farHalfWidth = originHalfWidth + taperRate * farDistance

  const farX = originX + dirX * farDistance
  const farY = originY + dirY * farDistance

  const nearLeft = { x: originX + px * originHalfWidth, y: originY + py * originHalfWidth }
  const nearRight = { x: originX - px * originHalfWidth, y: originY - py * originHalfWidth }
  const farLeft = { x: farX + px * farHalfWidth, y: farY + py * farHalfWidth }
  const farRight = { x: farX - px * farHalfWidth, y: farY - py * farHalfWidth }

  const clipPath = `polygon(${nearLeft.x}px ${nearLeft.y}px, ${farLeft.x}px ${farLeft.y}px, ${farRight.x}px ${farRight.y}px, ${nearRight.x}px ${nearRight.y}px)`

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 65,
        clipPath,
        WebkitClipPath: clipPath,
        backdropFilter: 'invert(1)',
        WebkitBackdropFilter: 'invert(1)',
        opacity: visible ? 1 : 0,
        transition: visible ? 'opacity 150ms ease' : 'opacity 400ms ease',
      }}
    />
  )
}
