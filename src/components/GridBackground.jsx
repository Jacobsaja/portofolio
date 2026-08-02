import React, { useEffect, useState } from 'react'

export default function GridBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Parallax effect: Calculate offset based on mouse position relative to center
      const offsetX = (e.clientX - window.innerWidth / 2) / window.innerWidth
      const offsetY = (e.clientY - window.innerHeight / 2) / window.innerHeight
      setMousePos({ x: offsetX * 20, y: offsetY * 20 })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      className="fixed inset-0 z-[1] pointer-events-none opacity-20 transition-transform duration-200 ease-out"
      style={{
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        backgroundImage: `
          linear-gradient(to right, var(--color-edge) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-edge) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        width: '110vw',
        height: '110vh',
        left: '-5vw',
        top: '-5vh'
      }}
    >
      <div className="absolute inset-0 bg-base opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"></div>
    </div>
  )
}
