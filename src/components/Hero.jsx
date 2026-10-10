export default function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-3xl px-6 py-28">
      <p className="mb-4 animate-fadeUp font-mono text-xs text-accent opacity-0">
        <span className="text-faint/50">// </span>Mahasiswa S1 Teknik Telekomunikasi — Telkom University
      </p>

      <h2 className="mb-6 animate-fadeUp text-3xl font-medium leading-snug text-ink opacity-0 sm:text-4xl [animation-delay:0.12s]">
        Menghubungkan hardware, jaringan, dan web{' '}
        <span className="glitch-text">menjadi sistem yang utuh</span>.
      </h2>

      <p className="mb-8 max-w-xl animate-fadeUp text-base leading-relaxed text-muted opacity-0 [animation-delay:0.24s]">
        Fokus pada eksplorasi IoT, robotika, web development, dan computer networking. Berkomitmen membangun solusi teknologi terintegrasi dari layer hardware hingga antarmuka pengguna.
      </p>

      <div className="flex animate-fadeUp gap-4 opacity-0 [animation-delay:0.36s]">
        <a
          href="#projects"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-base transition-colors hover:bg-accent-light"
        >
          Lihat project
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-edge-hover px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Hubungi saya
        </a>
      </div>
    </section>
  )
}
