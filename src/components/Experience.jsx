import React from 'react'

const experiences = [
  // Riwayat Pengalaman Kerja / Magang: [ISI jika ada]
  // Saat ini difokuskan pada persiapan sertifikasi industri, magang teknologi, dan studi akademik.
]

export default function Experience() {
  if (experiences.length === 0) return null

  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-20">
      <h3 className="mb-2 font-mono text-sm text-accent">04 — Pengalaman</h3>
      <h2 className="mb-10 text-2xl font-medium text-ink sm:text-3xl">Pengalaman & Magang</h2>

      <div className="flex flex-col gap-10">
        {experiences.map((exp) => (
          <div key={exp.id} className="group relative pl-6 border-l border-edge hover:border-accent transition-colors duration-300">
            {/* Timeline dot */}
            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-edge group-hover:bg-accent ring-4 ring-base transition-colors duration-300" />
            
            <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-lg font-medium text-ink">{exp.role}</h4>
              <span className="mt-1 sm:mt-0 font-mono text-xs text-faint group-hover:text-accent/80 transition-colors duration-300">
                {exp.duration}
              </span>
            </div>
            <p className="mb-3 font-mono text-sm text-accent/80">{exp.company}</p>
            <p className="text-sm leading-relaxed text-muted">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
