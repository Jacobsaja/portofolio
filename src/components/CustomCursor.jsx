import { useEffect, useRef, useState } from 'react'

const HOVER_SELECTOR = 'a, button, [data-cursor-hover]'

export default function CustomCursor() {
  const [supportsHover, setSupportsHover] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    setSupportsHover(mql.matches)
  }, [])

  useEffect(() => {
    if (!supportsHover) return

    function onMove(e) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    function onOver(e) {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        ringRef.current?.classList.add('cursor-ring--hover')
      }
    }
    function onOut(e) {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        ringRef.current?.classList.remove('cursor-ring--hover')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.body.classList.add('custom-cursor-active')

    let frame
    function loop() {
      // Ring eases toward the real pointer position for a soft trailing feel.
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      frame = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('custom-cursor-active')
      cancelAnimationFrame(frame)
    }
  }, [supportsHover])

  if (!supportsHover) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
