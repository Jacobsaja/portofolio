import { useEffect, useState } from 'react'
import PhotoReveal from './PhotoReveal.jsx'
import DownloadCV from './DownloadCV.jsx'

export default function About() {
  const [eyeOpen, setEyeOpen] = useState(false)

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

  const R = ({ children }) => (
    <span className={`redacted${eyeOpen ? ' revealed' : ''}`}>{children}</span>
  )

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <h3 className="mb-2 font-mono text-sm text-accent">01 — Profil</h3>
      <h2 className="mb-12 text-2xl font-medium text-ink sm:text-3xl">Sedikit tentang saya</h2>

      <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
        {/* LEFT: photo + intro + CV, tetap seperti sebelumnya */}
        <div>
          <PhotoReveal
            image1={`${import.meta.env.BASE_URL}images/me.jpg`}
            image2={`${import.meta.env.BASE_URL}images/me-alt.jpg`}
            alt="Foto profil"
            width={280}
            height={280}
            className="mb-8"
          />

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

          <DownloadCV />
        </div>

        {/* RIGHT: subsections dengan judul masing-masing, spacing longgar */}
        <div className="flex flex-col gap-12">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/80">
              Fokus & Tech Stack
            </h4>
            <p className="max-w-lg text-base leading-relaxed text-muted">
              Sebagai Full Stack Developer, saya membangun dari backend sampai
              micro-interaction di layer paling atas — <span className="text-ink">React</span>{' '}
              dan <span className="text-ink">Tailwind</span> di sisi antarmuka,{' '}
              <span className="text-ink">PHP (Laravel / CodeIgniter)</span> dan{' '}
              <span className="text-ink">MySQL</span> di sisi server, dengan RESTful API
              sebagai penghubung keduanya.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/80">
              Cara Kerja
            </h4>
            <p className="max-w-lg text-base leading-relaxed text-muted">
              Terbiasa memegang satu sistem dari kebutuhan sampai deploy — bukan
              cuma nulis fitur, tapi mikirin skema database, performa query, dan
              apakah kode itu masih masuk akal enam bulan dari sekarang.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}