import React, { useRef } from 'react'
import projects from '../data/projects.js'

// 1. Buat komponen terpisah agar useRef aman per card
function ProjectCard({ project }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    const card = cardRef.current
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  const imageUrl = `${import.meta.env.BASE_URL}${project.image}`

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card tilt-card group flex flex-col justify-between overflow-hidden rounded-xl border border-edge bg-surface transition-all duration-300 hover:border-accent shadow-lg"
    >
      {/* WebP Image Preview Container */}
      {project.image && (
        <div className="relative h-44 w-full overflow-hidden bg-base border-b border-edge/60">
          <img
            src={imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          
          <span className="absolute top-3 left-3 rounded-md border border-accent/40 bg-base/80 px-2 py-0.5 font-mono text-[10px] text-accent backdrop-blur">
            {project.tag}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="mb-2 flex items-center justify-between pointer-events-none">
            <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-faint/40 group-hover:text-accent transition-colors">
              [↗]
            </span>
          </div>

          <p className="text-xs leading-relaxed text-muted pointer-events-none">
            {project.description}
          </p>
        </div>

        {/* Scan line separator — reveals on hover */}
        <div className="mt-4 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none pt-2 border-t border-edge/30">
          <span className="h-px flex-1 bg-accent/30" />
          <span className="font-mono text-[10px] text-accent/80">KUNJUNGI DEMO</span>
        </div>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <h3 className="mb-2 font-mono text-sm text-accent">
        <span className="text-faint/50">// </span>02 — Project
      </h3>
      <h2 className="mb-12 text-2xl font-medium text-ink sm:text-3xl">
        Beberapa hal yang saya bangun
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 tilt-card-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}