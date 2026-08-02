import React from 'react'

const skills = [
  { 
    name: 'React / Next.js', 
    category: 'Frontend', 
    status: 'ONLINE', 
    statusColor: 'text-green-400/70', 
    dotClass: 'bg-green-400/70' 
  },
  { 
    name: 'Node.js / Express', 
    category: 'Backend', 
    status: 'ONLINE', 
    statusColor: 'text-green-400/70', 
    dotClass: 'bg-green-400/70' 
  },
  { 
    name: 'Arduino / IoT', 
    category: 'Hardware', 
    status: 'IN PROGRESS', 
    statusColor: 'text-accent', 
    dotClass: 'bg-accent' 
  },
  { 
    name: 'Figma', 
    category: 'Design', 
    status: 'STANDBY', 
    statusColor: 'text-faint/50', 
    dotClass: 'bg-faint/50' 
  },
]

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-20">
      <h3 className="mb-2 font-mono text-sm text-accent">04 — Keahlian</h3>
      <h2 className="mb-10 text-2xl font-medium text-ink sm:text-3xl">System Capabilities</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="group flex flex-col gap-2 rounded border border-edge/40 bg-surface/30 p-4 font-mono text-xs text-faint transition-colors hover:border-accent/50"
          >
            {/* Header: Category & Status */}
            <div className="flex justify-between items-center border-b border-edge/30 pb-2 mb-1">
              <span className="tracking-widest text-[10px] text-accent/70">◈ {skill.category.toUpperCase()}</span>
              <span className={`text-[10px] ${skill.statusColor} flex items-center gap-1.5`}>
                <span className={`h-1.5 w-1.5 rounded-full ${skill.dotClass} ${skill.status === 'ONLINE' ? 'animate-pulse' : ''}`}></span>
                {skill.status}
              </span>
            </div>
            
            {/* Name */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-ink transition-colors group-hover:text-accent">{skill.name}</span>
              <span className="text-faint/30 font-mono text-[10px]">{'['}OK{']'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
