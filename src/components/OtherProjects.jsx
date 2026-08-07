const otherProjects = [
  {
    id: 'secret-1',
    title: 'Cekadu',
    tag: 'Prototype',
    description: 'Web Rasionaliasi Kuliah berbasis AI(cikal bakal ROC)',
    link: 'https://cek-aja-dulu-phi.vercel.app/',
  },
  {
    id: 'secret-2',
    title: 'Restoran By Dart',
    tag: 'Experimental',
    description: 'Eksperimen menggunakan Dart.',
    link: 'https://github.com/Jacobsaja/SIMPLE-RESTAURANT-PROGRAM-DART.git',
  },
  {
    id: 'secret-3',
    title: 'Kalkulator',
    tag: 'Experimental',
    description: 'App saya yang menggunakan Typescript',
    link: '#',
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
              className="group rounded-xl border border-accent/50 bg-accent/5 p-6 transition-all hover:border-accent hover:bg-accent/10"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-mono text-accent">{project.tag}</span>
                <span className="text-xs text-muted">🔓 UNLOCKED</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink">{project.title}</h3>
              <p className="mb-4 text-sm text-muted">{project.description}</p>
              <a
                href={project.link}
                target="_blank"           // <-- Ditambahkan agar kebuka di tab baru
                rel="noopener noreferrer" // <-- Standar keamanan untuk target="_blank"
                className="inline-block text-sm font-bold text-accent transition-colors hover:text-accent/80"
              >
                Lihat Detail →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-edge bg-base/50 p-6 text-center">
          <p className="text-sm text-muted">
            <span className="text-accent">🔓</span> Section ini terbuka karena kamu telah menghubungkan kabel A-B di Arduino Lab
          </p>
        </div>
      </div>
    </section>
  )
}