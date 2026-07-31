import { useEffect, useState } from 'react'
import PhotoReveal from './PhotoReveal.jsx'

const skills = ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Figma']

export default function About() {
  const [eyeOpen, setEyeOpen] = useState(false)

  // Watch body[data-eye-open] — set by EyeOverlay.jsx, same pattern as PhotoReveal.jsx
  useEffect(() => {
    const check = () => setEyeOpen(document.body.dataset.eyeOpen === 'true')
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-eye-open'],
    })
    return () => observer.disconnect()
  }, [])

  // Shorthand: redacted span that reveals when the eye beam is active
  const R = ({ children }) => (
    <span className={`redacted${eyeOpen ? ' revealed' : ''}`}>{children}</span>
  )

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-20">
      <h3 className="mb-2 font-mono text-sm text-accent">03 — Profil</h3>
      <h2 className="mb-6 text-2xl font-medium text-ink sm:text-3xl">Sedikit tentang saya</h2>

      <PhotoReveal
        image1={`${import.meta.env.BASE_URL}images/me.jpg`}
        image2={`${import.meta.env.BASE_URL}images/me-alt.jpg`}
        alt="Foto profil"
        width={280}
        height={280}
        className="mb-8"
      />

      {/* Classified indicator */}
      <p className="mb-2 font-mono text-xs text-faint/50">
        {eyeOpen
          ? '// [CLASSIFIED] — beam active, decrypting...'
          : '// [CLASSIFIED] — activate gaze to reveal'}
      </p>

      <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
        Bagian dari development yang <R>jarang dilihat</R> orang: transisi{' '}
        <R>300ms yang pas</R>, cursor yang <R>berubah bentuk</R> di waktu yang tepat,
        halaman kosong yang tetap terasa disengaja. Bagiku,{' '}
        <R>detail kecil itu</R> yang membedakan produk yang &ldquo;berfungsi&rdquo; dengan
        produk yang <R>&ldquo;diingat&rdquo;</R>.
      </p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-edge px-3 py-1.5 text-sm text-ink"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
