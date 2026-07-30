import { forwardRef } from 'react'

// Almond/marquise eye shape (pointed left and right corners), not a circle.
// - `eyeOpen` false (blink): quick eyelid-close, scales down vertically.
// - `asleep` true: the whole eye fades away, leaving empty space behind -
//   this is a slower, separate transition from blinking.
const Eye = forwardRef(function Eye({ pupil, eyeOpen, asleep }, ref) {
  return (
    <div
      ref={ref}
      className="animate-float"
      style={{
        width: 340,
        height: 180,
        opacity: asleep ? 0 : 1,
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
          <circle cx={170 + pupil.x * 0.6} cy={90 + pupil.y * 0.6} r="48" fill="#141414" />
          <circle cx={170 + pupil.x} cy={90 + pupil.y} r="18" fill="#DE7356" />
        </g>
      </svg>
    </div>
  )
})

export default Eye
