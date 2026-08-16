import { useState } from 'react'
import { getDecryptedText } from '../utils.js'

const socials = [
  { label: 'Email', href: 'mailto:simorangkirjacob@gmail.com', value: 'simorangkirjacob@gmail.com' },
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
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sentStatus, setSentStatus] = useState('idle') // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return

    setSentStatus('sending')

    // Construct 100% direct mailto: link from user's device (No 3rd party API)
    const subject = encodeURIComponent(`[PORTFOLIO CONTACT] Pesan dari ${form.name}`)
    const bodyContent = encodeURIComponent(
      `Nama: ${form.name}\nEmail Pengirim: ${form.email || 'Tidak dicantumkan'}\n\nPesan:\n${form.message}`
    )
    const mailtoUrl = `mailto:simorangkirjacob@gmail.com?subject=${subject}&body=${bodyContent}`

    setTimeout(() => {
      window.location.href = mailtoUrl
      setSentStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSentStatus('idle'), 4000)
    }, 500)
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <h3 className="mb-2 font-mono text-sm text-accent">
        <span className="text-faint/50">// </span>05 — Kontak
      </h3>
      <h2 className="mb-6 text-2xl font-medium text-ink sm:text-3xl">Mari Terhubung</h2>

      <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
        Apakah Anda sedang mencari developer untuk proyek, peluang kolaborasi, atau sekadar ingin bertukar ide? Silakan hubungi saya melalui form terminal atau tautan sosial di bawah ini.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Terminal Message Form */}
        <div className="rounded-xl border border-edge bg-surface/50 p-6 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-edge/60 pb-3 mb-4">
            <span className="text-accent text-[11px] font-bold">◈ TERMINAL_MESSAGE.SH</span>
            <span className="text-[10px] text-faint">PORT: 443</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-faint mb-1.5 text-[11px]">&gt; USER_NAME:</label>
              <input
                type="text"
                required
                placeholder="Masukkan nama Anda..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded border border-edge bg-base px-3 py-2 text-ink text-xs outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-faint mb-1.5 text-[11px]">&gt; USER_EMAIL (Opsional):</label>
              <input
                type="email"
                placeholder="email@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded border border-edge bg-base px-3 py-2 text-ink text-xs outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-faint mb-1.5 text-[11px]">&gt; MESSAGE_PAYLOAD:</label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan pesan atau ide proyek Anda..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded border border-edge bg-base px-3 py-2 text-ink text-xs outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sentStatus === 'sending'}
              className="w-full rounded border border-accent/60 bg-accent/15 py-2.5 text-xs font-bold text-accent hover:bg-accent/25 transition-all shadow-[0_0_15px_rgba(222,115,86,0.15)]"
            >
              {sentStatus === 'sending' && '⏳ TRANSMITTING_PACKET...'}
              {sentStatus === 'success' && '✓ PACKET_DELIVERED! TERIMA KASIH'}
              {sentStatus === 'idle' && '[ EXECUTE_SEND_MESSAGE ]'}
            </button>
          </form>
        </div>

        {/* Social Links & Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
              Direct Channels
            </h4>
            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <EncryptedContactLink key={social.label} social={social} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-edge/40 bg-surface/30 p-4 font-mono text-xs text-faint space-y-1">
            <p className="text-accent text-[11px] font-bold">📍 LOCALIZATION & AVAILABILITY</p>
            <p>• Location: Medan / Remote Worldwide</p>
            <p>• Status: <span className="text-green-400">Available for Opportunities</span></p>
            <p>• Response Time: &lt; 24 Hours</p>
          </div>
        </div>
      </div>
    </section>
  )
}

