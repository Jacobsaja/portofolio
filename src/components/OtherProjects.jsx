const otherProjects = [
  {
    id: 'secret-1',
    title: 'Cekadu',
    tag: 'Prototype',
    description: 'Web Rasionalisasi Kuliah berbasis AI (cikal bakal ROC)',
    image: 'images/projects/cekadu.webp',
    link: 'https://cek-aja-dulu-phi.vercel.app/',
  },
  {
    id: 'secret-2',
    title: 'Restoran By Dart',
    tag: 'Experimental',
    description: 'Eksperimen program & engine restoran modular menggunakan Dart.',
    image: 'images/projects/restaurant.webp',
    link: 'https://github.com/Jacobsaja/SIMPLE-RESTAURANT-PROGRAM-DART.git',
  },
  {
    id: 'secret-3',
    title: 'Kalkulator Typescript',
    tag: 'Experimental',
    description: 'Aplikasi kalkulator presisi berbasis TypeScript & Web API',
    image: 'images/projects/calculator.webp',
    link: 'https://github.com/Jacobsaja',
  },
]

export default function OtherProjects() {
  return (
    <section id="other-projects" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-accent">Projek Lainnya</h2>
          <p className="text-muted">Fitur tersembunyi yang terbuka via Arduino Lab</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-accent/50 bg-accent/5 transition-all hover:border-accent hover:bg-accent/10"
            >
              {project.image && (
                <div className="relative h-36 w-full overflow-hidden bg-base border-b border-accent/30">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image}`}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-green-400 border border-green-500/40 backdrop-blur">
                    🔓 UNLOCKED
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-accent">{project.tag}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-ink">{project.title}</h3>
                  <p className="mb-4 text-sm text-muted leading-relaxed">{project.description}</p>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-bold text-accent transition-colors hover:text-accent/80 pt-2 border-t border-accent/20"
                >
                  Lihat Detail →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-edge bg-base/50 p-6 text-center">
          <p className="text-sm text-muted font-mono">
            <span className="text-accent">🔓</span> Section ini terbuka karena kamu telah menghubungkan kabel A-B di Arduino Lab
          </p>
        </div>
      </div>
    </section>
  )
}