export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-edge px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-faint sm:flex-row">
        <p>© {year} Jacob. Dibangun dengan React.</p>
        <a href="#welcome" className="transition-colors hover:text-accent">
          Kembali ke atas ↑
        </a>
      </div>
    </footer>
  )
}
