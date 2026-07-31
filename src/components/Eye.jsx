import { forwardRef, useEffect, useState } from 'react'

// Almond/marquise eye shape (pointed left and right corners), not a circle.
// - `eyeOpen` false (blink): quick eyelid-close, scales down vertically.
// - `asleep` true: the whole eye fades away, leaving empty space behind -
//   this is a slower, separate transition from blinking.
// - `theme` 'light' | 'dark': when switching to light, pupil dilates angrily.
const Eye = forwardRef(function Eye({ pupil = { x: 0, y: 0 }, eyeOpen, asleep, theme, toggleHovering }, ref) {
  const [pupilScale, setPupilScale] = useState(1)
  const [showOpacity, setShowOpacity] = useState(1)

  // reaksi mata marah saat kursor hover di toggle button
  useEffect(() => {
    if (toggleHovering) {
      setPupilScale(1.5)
    } else {
      setPupilScale(1)
    }
  }, [toggleHovering])

  // reaksi mata marah saat switch ke light mode
  useEffect(() => {
    if (theme === 'light') {
      // langsung membesar
      setPupilScale(1.6)
      // lalu agak normal tapi tetap dilated (marah)
      const timer1 = setTimeout(() => setPupilScale(1.4), 200)
      // SETELAH reaksi marah selesai (600ms), baru fade out
      const timer2 = setTimeout(() => setShowOpacity(0), 600)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      // kembali normal saat dark mode
      setShowOpacity(1)
      if (!toggleHovering) {
        setPupilScale(1)
      }
    }
  }, [theme, toggleHovering])

  return (
    <div
      ref={ref}
      className="animate-float"
      style={{
        width: 340,
        height: 180,
        opacity: asleep ? 0 : showOpacity,
        transition: 'opacity 900ms ease',
      }}
    >
      <svg
        width="340"
        height="180"
        viewBox="0 0 340 180"
        style={{
          transformOrigin: 'center',
          transition: 'transform 150ms ease',
          transform: eyeOpen ? 'scaleY(1)' : 'scaleY(0.06)',
        }}
      >
        <defs>
          <clipPath id="eyeClip">
            <path d="M10,90 Q170,4 330,90 Q170,177 10,90 Z" />
          </clipPath>
        </defs>
        <path d="M10,90 Q170,4 330,90 Q170,177 10,90 Z" fill="#1C1C1C" stroke="#3A3A3A" strokeWidth="2" />
        <g clipPath="url(#eyeClip)">
          <g
            style={{
              transform: `scale(${pupilScale})`,
              transformOrigin: `${170 + pupil.x * 0.6}px ${90 + pupil.y * 0.6}px`,
              transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <circle cx={170 + pupil.x * 0.6} cy={90 + pupil.y * 0.6} r="48" fill="#141414" />
            <circle cx={170 + pupil.x} cy={90 + pupil.y} r="18" fill="#DE7356" />
          </g>
        </g>
      </svg>
    </div>
  )
})

export default Eye