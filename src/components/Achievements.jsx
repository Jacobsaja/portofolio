import { useState } from 'react'

// Category 1: Riwayat Pendidikan
const educationData = [
  {
    id: 'edu-1',
    title: 'Sarjana Teknik Informatika (S.Kom)',
    institution: 'Universitas Sumatera Utara (USU)',
    year: '2020 - 2024',
    badge: 'CUM LAUDE',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Lulus dengan predikat Cum Laude (IPK 3.82/4.00). Fokus riset pada Rekayasa Perangkat Lunak, Arsitektur Sistem, dan Machine Learning.',
    highlights: ['Ketua Tim Tugas Akhir', 'Publikasi Jurnal Riset', 'Asisten Laboratorium Komputer'],
    icon: '🎓'
  },
  {
    id: 'edu-2',
    title: 'SMA / Sekolah Menengah Atas (MIPA)',
    institution: 'SMA Negeri 1 Medan',
    year: '2017 - 2020',
    badge: 'LULUSAN TERBAIK',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    description: 'Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA). Aktif dalam Klub Sains Komputer dan Olimpiade Sains Nasional (OSN).',
    highlights: ['Juara Olimpiade Informatika', 'Pengurus OSIS Sekbid IPTEK'],
    icon: '🏫'
  }
]

// Category 2: Prestasi & Sertifikasi
const awardsData = [
  {
    id: 'award-1',
    title: 'Juara 1 Hackathon Nasional',
    institution: 'Indonesia Tech Summit 2023',
    year: '2023',
    badge: 'JUARA 1',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    description: 'Mengembangkan solusi IoT dan Smart City Monitoring System berbasis AI dalam kompetisi maraton 48 jam bersama tim.',
    highlights: ['Lead System Architect', 'Pitching Presentation Winner'],
    icon: '🏆'
  },
  {
    id: 'award-2',
    title: 'Best Paper & Presentation Award',
    institution: 'International Conference on Computer Science',
    year: '2022',
    badge: 'PRESTASI INTERNASIONAL',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    description: 'Penghargaan makalah penelitian terbaik untuk topik Natural Language Processing & Sentiment Analysis Bahasa Indonesia.',
    highlights: ['Published Proceeding', 'Oral Speaker'],
    icon: '📝'
  },
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect',
    institution: 'Amazon Web Services (AWS)',
    year: '2023 - Valid',
    badge: 'SERTIFIKASI PRO',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    description: 'Sertifikasi profesional tingkat arsitek untuk perencanaan infrastructure cloud, scalability, security, dan high availability.',
    highlights: ['Cloud Infrastructure', 'Security & Compliance'],
    icon: '☁️'
  },
  {
    id: 'cert-2',
    title: 'Google UX Design Professional Certificate',
    institution: 'Google / Coursera',
    year: '2022',
    badge: 'SERTIFIKASI GLOBAL',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'Sertifikasi keahlian penelitian pengguna (user research), wireframing, prototyping, usability testing, dan desain antarmuka.',
    highlights: ['User Research', 'Interactive Prototyping'],
    icon: '🎨'
  }
]

// Category 3: Skill Non-Web (Soft Skills & Leadership)
const softSkillsData = [
  {
    id: 'soft-1',
    title: 'Leadership & Community Management',
    category: 'LEADERSHIP',
    level: 'Advanced',
    icon: '👑',
    description: 'Pengalaman memimpin komunitas Google Developer Student Club (500+ anggota aktif), mengorganisir 15+ workshop teknologi, dan membimbing anggota tim.',
    tags: ['Team Lead', 'Community Building', 'Event Management', 'Public Speaking']
  },
  {
    id: 'soft-2',
    title: 'Teamwork & Cross-functional Collaboration',
    category: 'COLLABORATION',
    level: 'Expert',
    icon: '🤝',
    description: 'Kemampuan berkolaborasi secara efisien dengan desainer UI/UX, Product Manager, QA Tester, dan tim hardware/IoT dengan komunikasi yang terbuka.',
    tags: ['Cross-functional', 'Agile/Scrum', 'Conflict Resolution', 'Peer Review']
  },
  {
    id: 'soft-3',
    title: 'Problem Solving & Critical Thinking',
    category: 'ANALYTICAL',
    level: 'Expert',
    icon: '🧠',
    description: 'Pendekatan analitis dalam memecahkan masalah kompleks, pemetaan skenario akar masalah (Root Cause Analysis), dan pengambilan keputusan berbasis data.',
    tags: ['Root Cause Analysis', 'Systemic Thinking', 'Debugging Mindset', 'Risk Mitigation']
  },
  {
    id: 'soft-4',
    title: 'Public Speaking & Technical Mentoring',
    category: 'COMMUNICATION',
    level: 'Advanced',
    icon: '🗣️',
    description: 'Terbiasa menyampaikan materi teknis dengan bahasa yang mudah dipahami. Pernah menjadi Asisten Dosen untuk 200+ mahasiswa dan pembicara seminar tech.',
    tags: ['Mentoring', 'Presentation', 'Knowledge Sharing', 'Technical Writing']
  },
  {
    id: 'soft-5',
    title: 'Adaptability & Rapid Learning',
    category: 'AGILITY',
    level: 'Expert',
    icon: '⚡',
    description: 'Kemampuan tinggi dalam mempelajari teknologi, framework, dan domain bisnis baru secara cepat dan mandiri (self-driven learner).',
    tags: ['Self-Taught', 'Fast Learner', 'Growth Mindset', 'Continuous Improvement']
  },
  {
    id: 'soft-6',
    title: 'Bahasa Asing & Komunikasi Global',
    category: 'LANGUAGES',
    level: 'Multilingual',
    icon: '🌐',
    description: 'Bahasa Indonesia (Native/Fasih), Bahasa Inggris (Professional Fluent - C1), Bahasa Jepang (JLPT N3 - Percakapan Sehari-hari).',
    tags: ['Indonesia (Native)', 'English (C1 Fluent)', 'Japanese (N3)']
  }
]

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'SEMUA', count: educationData.length + awardsData.length + softSkillsData.length },
    { id: 'edu', label: '1. RIWAYAT PENDIDIKAN', count: educationData.length },
    { id: 'awards', label: '2. PRESTASI & SERTIFIKASI', count: awardsData.length },
    { id: 'soft', label: '3. SKILL NON-WEB (SOFT SKILLS)', count: softSkillsData.length },
  ]

  const showEdu = activeTab === 'all' || activeTab === 'edu'
  const showAwards = activeTab === 'all' || activeTab === 'awards'
  const showSoft = activeTab === 'all' || activeTab === 'soft'

  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-24">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h3 className="mb-2 font-mono text-sm text-accent">
          <span className="text-faint/50">// </span>04 — Track Record
        </h3>
        <h2 className="text-2xl font-medium text-ink sm:text-3xl">
          Pencapaian & Kualifikasi
        </h2>
        <p className="mt-2 text-sm text-muted max-w-2xl">
          Riwayat pendidikan formal, penghargaan & sertifikasi resmi, serta keahlian interpersonal (non-web) pendukung karir profesional.
        </p>
      </div>

      {/* Cyber Tab Filter */}
      <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-edge/60 pb-4 font-mono text-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-accent bg-accent/15 text-accent shadow-[0_0_15px_rgba(222,115,86,0.15)] font-bold'
                : 'border-edge/50 bg-surface/40 text-muted hover:border-accent/40 hover:text-ink'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded px-1.5 py-0.2 text-[10px] ${
                activeTab === tab.id
                  ? 'bg-accent/20 text-accent font-bold'
                  : 'bg-edge/40 text-faint'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {/* ========================================== */}
        {/* 1. RIWAYAT PENDIDIKAN                     */}
        {/* ========================================== */}
        {showEdu && (
          <div className="animate-fadeUp">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent">
                01
              </span>
              <h3 className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
                Riwayat Pendidikan
              </h3>
              <span className="h-px flex-1 bg-edge/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="group relative rounded-xl border border-edge bg-surface/40 p-6 transition-all hover:border-accent/60 hover:bg-surface/80 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-base text-xl">
                        {edu.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-ink group-hover:text-accent transition-colors">
                          {edu.title}
                        </h4>
                        <p className="text-xs text-accent font-mono">{edu.institution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center gap-2 font-mono text-xs">
                    <span className="text-faint">{edu.year}</span>
                    <span className="text-faint/30">•</span>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${edu.badgeColor}`}>
                      {edu.badge}
                    </span>
                  </div>

                  <p className="mb-4 text-xs leading-relaxed text-muted">{edu.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-edge/30">
                    {edu.highlights.map((item, i) => (
                      <span
                        key={i}
                        className="rounded bg-base/60 border border-edge/40 px-2 py-1 font-mono text-[10px] text-faint"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* 2. PRESTASI & SERTIFIKASI                  */}
        {/* ========================================== */}
        {showAwards && (
          <div className="animate-fadeUp">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent">
                02
              </span>
              <h3 className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
                Prestasi & Sertifikasi
              </h3>
              <span className="h-px flex-1 bg-edge/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awardsData.map((award) => (
                <div
                  key={award.id}
                  className="group relative rounded-xl border border-edge bg-surface/40 p-6 transition-all hover:border-accent/60 hover:bg-surface/80 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-base text-xl">
                        {award.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-ink group-hover:text-accent transition-colors">
                          {award.title}
                        </h4>
                        <p className="text-xs text-accent font-mono">{award.institution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center gap-2 font-mono text-xs">
                    <span className="text-faint">{award.year}</span>
                    <span className="text-faint/30">•</span>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${award.badgeColor}`}>
                      {award.badge}
                    </span>
                  </div>

                  <p className="mb-4 text-xs leading-relaxed text-muted">{award.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-edge/30">
                    {award.highlights.map((item, i) => (
                      <span
                        key={i}
                        className="rounded bg-base/60 border border-edge/40 px-2 py-1 font-mono text-[10px] text-faint"
                      >
                        ⚡ {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* 3. SKILL NON-WEB (SOFT SKILLS & LEADERSHIP)*/}
        {/* ========================================== */}
        {showSoft && (
          <div className="animate-fadeUp">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent">
                03
              </span>
              <h3 className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
                Skill Non-Web & Soft Skills
              </h3>
              <span className="h-px flex-1 bg-edge/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {softSkillsData.map((soft) => (
                <div
                  key={soft.id}
                  className="group flex flex-col justify-between rounded-xl border border-edge bg-surface/30 p-5 transition-all hover:border-accent/60 hover:bg-surface/70"
                >
                  <div>
                    {/* Header: Category & Level */}
                    <div className="flex items-center justify-between mb-3 border-b border-edge/30 pb-2">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-accent/80">
                        ◈ {soft.category}
                      </span>
                      <span className="rounded bg-accent/10 border border-accent/20 px-2 py-0.5 font-mono text-[9px] text-accent font-bold">
                        {soft.level}
                      </span>
                    </div>

                    {/* Title & Icon */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{soft.icon}</span>
                      <h4 className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                        {soft.title}
                      </h4>
                    </div>

                    <p className="mb-4 text-xs text-muted leading-relaxed">
                      {soft.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-edge/30">
                    {soft.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded bg-base px-2 py-0.5 font-mono text-[10px] text-faint group-hover:text-muted transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cyber Status Footer */}
      <div className="mt-16 rounded-xl border border-edge bg-surface/30 p-4 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-faint text-[11px]">
          <span>RECORD_STATUS: <span className="text-green-400">VERIFIED</span></span>
          <span>•</span>
          <span>CATEGORIES: <span className="text-accent">3 SECTIONS</span></span>
          <span>•</span>
          <span>TOTAL: <span className="text-ink">{educationData.length + awardsData.length + softSkillsData.length} ITEMS</span></span>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-xs font-bold text-accent hover:bg-accent/20 transition-colors"
        >
          <span>📄</span>
          <span>Minta CV / Portfolio PDF</span>
        </a>
      </div>
    </section>
  )
}

