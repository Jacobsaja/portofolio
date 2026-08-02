import { useState } from 'react'
import { getDecryptedText } from '../utils.js'

const socials = [
  { label: 'Email', href: 'simorangkirjacob@gmail.com', value: 'simorangkirjacob@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/jacobsaja', value: 'github.com/jacobsaja' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jacob-simorangkir-680177345', value: 'linkedin.com/in/jacob' },
]

function EncryptedContactLink({ social }) {
  const [progress, setProgress] = useState(0)
  
  const handleMouseEnter = () => {
    setProgress(0)
    let p = 0
    const interval = setInterval(() => {
      p += 0.05
      if (p >= 1) {
        setProgress(1)
        clearInterval(interval)
      } else {
        setProgress(p)
      }
    }, 30)
  }
  
  const handleMouseLeave = () => {
    setProgress(0)
  }

  return (
    <a
      href={social.href}
      target={social.href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group rounded-lg border border-edge-hover px-5 py-2.5 text-sm transition-colors hover:border-accent font-mono w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
    >
      <span className="text-faint/50 group-hover:text-accent/60 transition-colors mr-2">[{social.label}]</span>
      <span className="text-ink transition-colors group-hover:text-accent">
        {progress > 0 ? getDecryptedText(social.value, progress) : getDecryptedText(social.value, 0)}
      </span>
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <h3 className="mb-2 font-mono text-sm text-accent">06 — Kontak</h3>
      <h2 className="mb-6 text-2xl font-medium text-ink sm:text-3xl">Ngobrol yuk</h2>

      <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
        Lagi cari developer buat project atau cuma mau ngobrolin ide? Kirim email langsung,
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        {socials.map((social) => (
          <EncryptedContactLink key={social.label} social={social} />
        ))}
      </div>
    </section>
  )
}

