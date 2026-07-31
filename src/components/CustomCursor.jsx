import { useEffect, useRef, useState } from 'react'

const HOVER_SELECTOR = 'a, button, [data-cursor-hover]'
const TRAIL_LENGTH = 12

function getIsLightTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
}

export default function CustomCursor() {
  const [supportsHover, setSupportsHover] = useState(false)
  const [isLight, setIsLight] = useState(false)
  
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailsRef = useRef([])
  
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  
  // Store trail history
  const history = useRef(Array(TRAIL_LENGTH).fill({ x: -100, y: -100 }))

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    setSupportsHover(mql.matches)
  }, [])

  useEffect(() => {
    setIsLight(getIsLightTheme())
    const observer = new MutationObserver(() => setIsLight(getIsLightTheme()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })
    return () => observer.disconnect()
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
      // 1. Update ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      
      // 2. Update trails
      let currX = mouse.current.x
      let currY = mouse.current.y
      
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const h = history.current[i]
        
        // easing
        h.x += (currX - h.x) * 0.3
        h.y += (currY - h.y) * 0.3
        
        if (trailsRef.current[i]) {
          trailsRef.current[i].style.transform = `translate(${h.x}px, ${h.y}px) translate(-50%, -50%) scale(${1 - i / TRAIL_LENGTH})`
        }
        
        currX = h.x
        currY = h.y
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
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[99]"
          style={{ opacity: 0.3 * (1 - i / TRAIL_LENGTH) }}
          aria-hidden="true"
        />
      ))}
      <div
        ref={dotRef}
        className={`cursor-dot ${isLight ? 'cursor-dot--dim' : ''}`}
        aria-hidden="true"
      />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}