export default function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-3xl px-6 py-28">
      <p className="mb-4 animate-fadeUp text-sm text-accent opacity-0">Full stack developer</p>

      <h2 className="mb-6 animate-fadeUp text-3xl font-medium leading-snug text-ink opacity-0 sm:text-4xl [animation-delay:0.12s]">
        Bangun produk yang <span className="text-accent">terasa hidup</span>, bukan cuma
        berfungsi.
      </h2>

      <p className="mb-8 max-w-xl animate-fadeUp text-base leading-relaxed text-muted opacity-0 [animation-delay:0.24s]">
        Fokus di React, sistem interaktif, dan detail micro-interaction yang bikin orang mau
        eksplor lebih jauh — bukan sekadar scroll lewat.
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
