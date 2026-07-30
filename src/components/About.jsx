import PhotoReveal from './PhotoReveal.jsx'

const skills = ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Figma']

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-20">
      <h3 className="mb-2 font-mono text-sm text-accent">03 — Profil</h3>
      <h2 className="mb-6 text-2xl font-medium text-ink sm:text-3xl">Sedikit tentang saya</h2>

      
      <PhotoReveal
        image1="/images/me.jpg"
        image2="/images/me-alt.jpg"
        alt="Foto profil"
        width={280}
        height={280}
        className="mb-8"
      />
      <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
        Bagian dari development yang jarang dilihat orang: transisi 300ms yang pas,
        cursor yang berubah bentuk di waktu yang tepat, halaman kosong yang tetap terasa
        disengaja. Bagiku, detail kecil itu yang membedakan produk yang "berfungsi" dengan
        produk yang "diingat".
      </p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-edge px-3 py-1.5 text-sm text-ink"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
