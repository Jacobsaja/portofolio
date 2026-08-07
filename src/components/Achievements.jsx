const achievements = [
  {
    id: 'edu-1',
    type: 'education',
    title: 'Sarjana Teknik Informatika',
    institution: 'Universitas Sumatera Utara',
    year: '2020 - 2024',
    description: 'Lulus dengan predikat Cum Laude. Fokus pada Software Engineering dan Machine Learning.',
    icon: '🎓'
  },
  {
    id: 'award-1',
    type: 'award',
    title: 'Juara 1 Hackathon Nasional',
    institution: 'Indonesia Tech Summit 2023',
    year: '2023',
    description: 'Mengembangkan solusi IoT untuk smart city dalam waktu 48 jam bersama tim.',
    icon: '🏆'
  },
  {
    id: 'cert-1',
    type: 'certification',
    title: 'AWS Certified Solutions Architect',
    institution: 'Amazon Web Services',
    year: '2023',
    description: 'Sertifikasi profesional untuk arsitektur cloud dan deployment.',
    icon: '📜'
  },
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Teaching Assistant',
    institution: 'Fakultas Teknik USU',
    year: '2022 - 2023',
    description: 'Mengasistensi mata kuliah Algoritma dan Struktur Data untuk 200+ mahasiswa.',
    icon: '👨‍🏫'
  },
  {
    id: 'award-2',
    type: 'award',
    title: 'Best Paper Award',
    institution: 'International Conference on Computer Science',
    year: '2022',
    description: 'Publikasi penelitian tentang Natural Language Processing untuk bahasa Indonesia.',
    icon: '📝'
  },
  {
    id: 'cert-2',
    type: 'certification',
    title: 'Google UX Design Certificate',
    institution: 'Google',
    year: '2022',
    description: 'Sertifikasi profesional untuk User Experience Design dan Research.',
    icon: '🎨'
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Community Leader',
    institution: 'Google Developer Student Club',
    year: '2021 - 2022',
    description: 'Memimpin komunitas developer mahasiswa dengan 500+ anggota aktif.',
    icon: '👥'
  },
  {
    id: 'skill-1',
    type: 'skill',
    title: 'Bahasa Asing',
    institution: 'Self-Taught',
    year: 'Ongoing',
    description: 'Bahasa Inggris (Fluent), Bahasa Jepang (N3), Bahasa Korea (Basic).',
    icon: '🌍'
  }
]

const typeColors = {
  education: 'from-blue-500 to-cyan-500',
  award: 'from-yellow-500 to-orange-500',
  certification: 'from-purple-500 to-pink-500',
  experience: 'from-green-500 to-emerald-500',
  skill: 'from-red-500 to-rose-500'
}

const typeLabels = {
  education: 'PENDIDIKAN',
  award: 'PENGHARGAAN',
  certification: 'SERTIFIKASI',
  experience: 'PENGALAMAN',
  skill: 'KEAHLIAN'
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-accent">Pencapaian</h2>
          <p className="text-muted">Perjalanan, pengalaman, dan milestone penting</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent hidden md:block" />

          {/* Achievement Items */}
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="relative pl-0 md:pl-20 group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 -translate-x-1/2 hidden md:flex h-4 w-4 rounded-full bg-accent border-4 border-base z-10 group-hover:scale-125 transition-transform" />

                {/* Card */}
                <div className="rounded-xl border border-edge bg-base/50 p-6 transition-all hover:border-accent/50 hover:bg-accent/5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 text-2xl">
                      {achievement.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full bg-gradient-to-r ${typeColors[achievement.type]}`}>
                          {typeLabels[achievement.type]}
                        </span>
                        <span className="text-xs text-muted font-mono">{achievement.year}</span>
                      </div>

                      <h3 className="mb-1 text-lg font-bold text-ink">{achievement.title}</h3>
                      <p className="mb-2 text-sm text-accent">{achievement.institution}</p>
                      <p className="text-sm text-muted">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-edge bg-base/50 p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">4+</div>
            <div className="text-xs text-muted">Tahun Pengalaman</div>
          </div>
          <div className="rounded-xl border border-edge bg-base/50 p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">10+</div>
            <div className="text-xs text-muted">Proyek Selesai</div>
          </div>
          <div className="rounded-xl border border-edge bg-base/50 p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">5+</div>
            <div className="text-xs text-muted">Sertifikasi</div>
          </div>
          <div className="rounded-xl border border-edge bg-base/50 p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">3+</div>
            <div className="text-xs text-muted">Penghargaan</div>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent/10 px-6 py-3 text-sm font-bold text-accent hover:bg-accent/20 transition-colors"
          >
            <span>📄</span>
            <span>Download CV Lengkap</span>
          </a>
        </div>
      </div>
    </section>
  )
}
