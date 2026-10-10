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
        {/* LEFT: photo + intro + CV */}
        <div>
          <PhotoReveal
            image1={`${import.meta.env.BASE_URL}images/me.webp`}
            image2={`${import.meta.env.BASE_URL}images/me-alt.webp`}
            alt="Foto profil Jacob Simorangkir"
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
            Saya adalah mahasiswa S1 <R>Teknik Telekomunikasi</R> di <R>Telkom University</R> dan alumni <R>SMA Swasta Methodist 6 Medan</R>. Memiliki minat kuat dalam eksplorasi teknologi terapan, khususnya pada bidang <R>IoT, robotika, web development, dan networking</R>.
          </p>

          <DownloadCV />
        </div>

        {/* RIGHT: subsections dengan judul masing-masing */}
        <div className="flex flex-col gap-12">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/80">
              Latar Belakang & Minat
            </h4>
            <p className="max-w-lg text-base leading-relaxed text-muted">
              Sebagai mahasiswa Teknik Telekomunikasi, saya aktif mengeksplorasi integrasi antara perangkat keras dan perangkat lunak. Ketertarikan saya berakar pada bagaimana protokol komunikasi, sistem sensor IoT, dan antarmuka web modern dapat saling terhubung untuk memecahkan masalah riil.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/80">
              Arah Jangka Panjang
            </h4>
            <p className="max-w-lg text-base leading-relaxed text-muted">
              Arah target saya ke depan terfokus pada perolehan sertifikasi industri resmi (seperti Cisco / Huawei), meraih kesempatan magang di perusahaan teknologi besar, dan menyelesaikan proyek capstone inovatif yang mengintegrasikan telekomunikasi, jaringan, IoT, serta robotika.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}