import projects from '../data/projects.js'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <h3 className="mb-2 font-mono text-sm text-accent">02 — Project</h3>
      <h2 className="mb-12 text-2xl font-medium text-ink sm:text-3xl">Beberapa hal yang saya bangun</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            className="group rounded-xl border border-edge bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent"
          >
            <span className="mb-3 inline-block rounded-md bg-accent-dim px-2 py-1 text-xs text-accent">
              {project.tag}
            </span>
            <h3 className="mb-1.5 text-base font-medium text-ink">{project.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
