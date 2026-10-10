import { useState } from 'react'

// Category 1: Riwayat Pendidikan
const educationData = [
  {
    id: 'edu-1',
    title: 'S1 Teknik Telekomunikasi',
    institution: 'Telkom University',
    year: '2026 - Sekarang',
    badge: 'MAHASISWA AKTIF',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Menempuh studi sarjana Teknik Telekomunikasi dengan fokus minat pada IoT, robotika, web development, dan networking.',
    highlights: ['Minat IoT & Robotika', 'Networking & Web Development', 'Persiapan Sertifikasi Cisco/Huawei'],
    icon: '🎓'
  },
  {
    id: 'edu-2',
    title: 'Sekolah Menengah Atas (SMA)',
    institution: 'SMA Swasta Methodist 6 Medan',
    year: 'Lulus 2026',
    badge: 'ALUMNI',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    description: 'Menyelesaikan pendidikan menengah atas dengan aktif berorganisasi kepengurusan OSIS dan berpartisipasi pada ajang kompetisi sains & bahasa.',
    highlights: ['Wakil Ketua OSIS 2024/2025', 'Peringkat 10 Kihajar STEM Sumut', 'Juara 3 Cerdas Cermat Regional'],
    icon: '🏫'
  }
]

// Category 2: Prestasi & Organisasi
const awardsData = [
  {
    id: 'org-1',
    title: 'Wakil Ketua OSIS',
    institution: 'SMA Swasta Methodist 6 Medan',
    year: '2024 / 2025',
    badge: 'ORGANISASI',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    description: 'Menjalankan kepemimpinan kesiswaan, memimpin koordinasi lintas divisi, serta merancang dan mengeksekusi program kerja organisasi sekolah.',
    highlights: ['Kepemimpinan Kesiswaan', 'Manajemen Program Kerja'],
    icon: '👑'
  },
  {
    id: 'award-1',
    title: 'Juara 3 Cerdas Cermat Regional',
    institution: 'Gebyar Hardiknas 2024',
    year: '2024',
    badge: 'JUARA 3',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    description: 'Meraih Juara 3 dalam kompetisi akademik cerdas cermat tingkat regional pada ajang Gebyar Hari Pendidikan Nasional 2024.',
    highlights: ['Tingkat Regional', 'Kompetisi Akademik'],
    icon: '🏆'
  },
  {
    id: 'award-2',
    title: 'Peringkat 10 Provinsi Sumatera Utara',
    institution: 'Kihajar STEM 2024',
    year: '2024',
    badge: 'TOP 10 PROVINSI',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    description: 'Meraih posisi 10 besar tingkat Provinsi Sumatera Utara dalam ajang kompetisi eksplorasi sains, teknologi, rekayasa, dan matematika (Kihajar STEM).',
    highlights: ['Science, Tech, Engineering & Math', 'Tingkat Provinsi'],
    icon: '🔬'
  },
  {
    id: 'award-3',
    title: 'Skor UKBI Kategori Tinggi',
    institution: 'Badan Pengembangan dan Pembinaan Bahasa',
    year: 'Terverifikasi',
    badge: 'KEMAHIRAN BAHASA',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'Memperoleh predikat kategori Tinggi pada Uji Kemahiran Berbahasa Indonesia (UKBI), mencerminkan standar kemahiran komunikasi dan tata bahasa tingkat lanjut.',
    highlights: ['Uji Standar Nasional', 'Kemahiran Komunikasi'],
    icon: '📜'
  }
]

// Category 3: Skill Non-Web & Bahasa
const softSkillsData = [
  {
    id: 'soft-1',
    title: 'Leadership & Manajemen Organisasi',
    category: 'LEADERSHIP',
    level: 'Organisasi',
    icon: '👑',
    description: 'Pengalaman kepemimpinan strategis sebagai Wakil Ketua OSIS periode 2024/2025: delegasi tugas, penyelarasan tim, dan komunikasi antarsiswa.',
    tags: ['Wakil Ketua OSIS', 'Team Coordination', 'Event Planning']
  },
  {
    id: 'soft-2',
    title: 'Penalaran STEM & Problem Solving',
    category: 'ANALYTICAL',
    level: 'Kompetisi',
    icon: '🧠',
    description: 'Keahlian analisis dan pemecahan masalah berbasis sains dan teknologi yang terasah melalui kompetisi Kihajar STEM dan cerdas cermat.',
    tags: ['STEM', 'Analytical Thinking', 'Problem Solving']
  },
  {
    id: 'soft-3',
    title: 'Bahasa Indonesia (Native)',
    category: 'LANGUAGES',
    level: 'Kategori Tinggi',
    icon: '🌐',
    description: 'Penutur asli (Native) dengan capaian skor kategori Tinggi pada Uji Kemahiran Berbahasa Indonesia (UKBI).',
    tags: ['Indonesia (Native)', 'UKBI Kategori Tinggi', 'Komunikasi Formal']
  },
  {
    id: 'soft-4',
    title: 'Bahasa Inggris',
    category: 'LANGUAGES',
    level: '[ISI Level]',
    icon: '🗣️',
    description: 'Kemampuan komunikasi dan telaah literatur teknis dalam Bahasa Inggris. Kualifikasi/level spesifik: [ISI level kemahiran / skor tes].',
    tags: ['English', '[ISI Level]']
  }
]

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'SEMUA', count: educationData.length + awardsData.length + softSkillsData.length },
    { id: 'edu', label: '1. RIWAYAT PENDIDIKAN', count: educationData.length },
    { id: 'awards', label: '2. PRESTASI & ORGANISASI', count: awardsData.length },
    { id: 'soft', label: '3. BAHASA & SOFT SKILLS', count: softSkillsData.length },
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
        {/* 2. PRESTASI & ORGANISASI                   */}
        {/* ========================================== */}
        {showAwards && (
          <div className="animate-fadeUp">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent">
                02
              </span>
              <h3 className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
                Prestasi & Organisasi
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
        {/* 3. BAHASA & SOFT SKILLS                    */}
        {/* ========================================== */}
        {showSoft && (
          <div className="animate-fadeUp">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent">
                03
              </span>
              <h3 className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
                Bahasa & Soft Skills
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

