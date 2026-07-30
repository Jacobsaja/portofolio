import { useEffect, useRef, useState } from 'react'

const BLINK_MIN_MS = 7000
const BLINK_MAX_MS = 15000
const BLINK_DURATION_MS = 320
const IDLE_SLEEP_MS = 15000

// Tracks pointer position relative to an eye element, plus two independent
// "closed" behaviors: quick random blinks (eyelid shuts briefly), and
// falling asleep after the cursor has been idle for IDLE_SLEEP_MS (the eye
// disappears entirely, woken up again on movement).
export default function useGazeTracking(eyeRef, { maxX = 26, maxY = 16 } = {}) {
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [eyeOpen, setEyeOpen] = useState(true)
  const [asleep, setAsleep] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const lastMoveRef = useRef(Date.now())
  const asleepRef = useRef(false)
  const blinkTimeoutRef = useRef(null)

  useEffect(() => {
    function scheduleBlink() {
      const delay = BLINK_MIN_MS + Math.random() * (BLINK_MAX_MS - BLINK_MIN_MS)
      blinkTimeoutRef.current = setTimeout(() => {
        if (!asleepRef.current) {
          setEyeOpen(false)
          setTimeout(() => {
            if (!asleepRef.current) setEyeOpen(true)
          }, BLINK_DURATION_MS)
        }
        scheduleBlink()
      }, delay)
    }

    scheduleBlink()
    return () => clearTimeout(blinkTimeoutRef.current)
  }, [])

  useEffect(() => {
    function handleMove(clientX, clientY) {
      setMouse({ x: clientX, y: clientY })
      lastMoveRef.current = Date.now()

      if (asleepRef.current) {
        asleepRef.current = false
        setAsleep(false)
        setEyeOpen(true)
      }

      const eye = eyeRef.current
      if (!eye) return

      const rect = eye.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy

      const nx = dx / 280
      const ny = dy / 181
      const magnitude = Math.sqrt(nx * nx + ny * ny)
      const scale = magnitude > 1 ? 1 / magnitude : 1

      setPupil({ x: nx * scale * maxX, y: ny * scale * maxY })
    }

    function onMouseMove(e) {
      handleMove(e.clientX, e.clientY)
    }
    function onTouchMove(e) {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    const idleCheck = setInterval(() => {
      if (!asleepRef.current && Date.now() - lastMoveRef.current > IDLE_SLEEP_MS) {
        asleepRef.current = true
        setAsleep(true)
        setEyeOpen(false)
      }
    }, 1000)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      clearInterval(idleCheck)
    }
  }, [eyeRef, maxX, maxY])

  return { pupil, eyeOpen, asleep, mouse }
}
