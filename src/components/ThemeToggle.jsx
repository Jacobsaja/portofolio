import { useState, useRef, useCallback, useEffect } from 'react'

const CHARGE_DURATION = 650 // ms, durasi hold sampai penuh

export default function ThemeToggle({ theme, onToggle }) {
  const [progress, setProgress] = useState(0) // 0 - 1
  const [isHolding, setIsHolding] = useState(false)
  const [isEyeSquinting, setIsEyeSquinting] = useState(false)

  const rafRef = useRef(null)
  const startTimeRef = useRef(null)
  const btnRef = useRef(null)

  const cancelCharge = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    startTimeRef.current = null
    setIsHolding(false)
    setIsEyeSquinting(false)
    setProgress(0)
  }, [])

  const tick = useCallback(
    (timestamp) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const pct = Math.min(elapsed / CHARGE_DURATION, 1)
      setProgress(pct)

      // mata mulai menyipit begitu progress lewat setengah,
      // biar terasa "menahan cahaya"
      if (pct > 0.5 && !isEyeSquinting) setIsEyeSquinting(true)

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // charge penuh -> trigger toggle dari posisi tombol
        const rect = btnRef.current?.getBoundingClientRect()
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
        onToggle(x, y)
        cancelCharge()
      }
    },
    [isEyeSquinting, onToggle, cancelCharge]
  )

  function handlePointerDown(e) {
    e.preventDefault()
    setIsHolding(true)
    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(tick)
  }

  // batal kalau user lepas sebelum penuh, di mana pun pointer up terjadi
  useEffect(() => {
    if (!isHolding) return
    const handleUp = () => cancelCharge()
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleUp)
    return () => {
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleUp)
    }
  }, [isHolding, cancelCharge])

  // cleanup saat unmount
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), [])

  return (
    <button
      ref={btnRef}
      onPointerDown={handlePointerDown}
      aria-label={theme === 'light' ? 'Tahan untuk aktifkan mode gelap' : 'Tahan untuk aktifkan mode terang'}
      className="relative flex h-8 w-8 shrink-0 touch-none select-none items-center justify-center rounded-full border border-edge-hover text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {/* ring progress charge */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 32 32"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 14}
          strokeDashoffset={2 * Math.PI * 14 * (1 - progress)}
          className="text-accent"
          style={{
            transition: isHolding ? 'none' : 'stroke-dashoffset 0.15s ease-out',
            opacity: isHolding ? 1 : 0,
          }}
        />
      </svg>

      {/* glow beam, makin terang mendekati progress penuh */}
      {isHolding && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 ${8 + progress * 16}px ${2 + progress * 4}px currentColor`,
            opacity: 0.15 + progress * 0.4,
          }}
        />
      )}

      {/* mata mini sebagai icon toggle, menggantikan sun/moon */}
      <svg
        viewBox="0 0 40 24"
        className="relative h-3 w-5"
        style={{
          transform: isEyeSquinting ? 'scaleY(0.35)' : 'scaleY(1)',
          transformOrigin: 'center',
          transition: 'transform 0.18s ease-out',
        }}
      >
        <path
          d="M2 12 C 10 -2, 30 -2, 38 12 C 30 26, 10 26, 2 12 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="12"
          r={isHolding ? 3 + progress * 3 : 4}
          fill="currentColor"
          style={{ transition: isHolding ? 'none' : 'r 0.15s ease-out' }}
        />
      </svg>
    </button>
  )
}