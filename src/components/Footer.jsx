export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-edge px-6 py-8">
      <div className="mx-auto max-w-5xl">
        {/* ASCII art border — hidden on mobile to avoid wrapping */}
        <pre
          className="mb-4 hidden select-none font-mono text-xs leading-tight text-faint/20 sm:block"
          aria-hidden="true"
        >
          {`┌─────────────────────────────────────────┐
│    jacob.dev  -  end of transmission │
└─────────────────────────────────────────┘`}
        </pre>

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-faint sm:flex-row font-mono">
          <p>
            © {year} Jacob.{' '}
            <span className="text-faint/40">// built with React + Vite</span>
          </p>
          <a href="#welcome" className="transition-colors hover:text-accent">
            ↑ return to top
          </a>
        </div>
      </div>
    </footer>
  )
}
