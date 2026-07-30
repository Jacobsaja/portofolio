const socials = [
  { label: 'Email', href: 'simorangkirjacob@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/jacobsaja' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jacob-simorangkir-680177345' },
]

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <h3 className="mb-2 font-mono text-sm text-accent">04 — Kontak</h3>
      <h2 className="mb-6 text-2xl font-medium text-ink sm:text-3xl">Ngobrol yuk</h2>

      <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
        Lagi cari developer buat project atau cuma mau ngobrolin ide? Kirim email langsung,
      </p>

      <div className="flex flex-wrap gap-4">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="rounded-lg border border-edge-hover px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {social.label}
          </a>
        ))}
      </div>
    </section>
  )
}
