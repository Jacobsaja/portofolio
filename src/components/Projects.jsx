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

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"             // <-- Ditambahkan agar kebuka di tab baru
      rel="noopener noreferrer"   // <-- Keamanan standar untuk target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card tilt-card group rounded-xl border border-edge bg-surface p-5 transition-colors hover:border-accent"
    >
      {/* Tag row + arrow indicator */}
      <div className="mb-3 flex items-center justify-between pointer-events-none">
        <span className="inline-block rounded-md bg-accent-dim px-2 py-1 font-mono text-xs text-accent">
          {project.tag}
        </span>
        <span className="font-mono text-xs text-faint/30 transition-colors group-hover:text-accent/60">
          [→]
        </span>
      </div>

      <h3 className="mb-1.5 text-base font-medium text-ink pointer-events-none">{project.title}</h3>
      <p className="text-sm leading-relaxed text-muted pointer-events-none">{project.description}</p>

      {/* Scan line separator — reveals on hover */}
      <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <span className="h-px flex-1 bg-accent/30" />
        <span className="font-mono text-xs text-accent/50">OPEN</span>
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