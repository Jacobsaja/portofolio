import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { href: '#hero', label: 'Beranda' },
  { href: '#about', label: 'Profil' },
  { href: '#projects', label: 'Project' },
  { href: '#achievements', label: 'Pencapaian' },
  { href: '#contact', label: 'Kontak' },
]

export default function Navbar({ visible = true, dockRef, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      } ${scrolled || mobileMenuOpen ? 'border-b border-edge bg-base/90 backdrop-blur' : 'bg-transparent'}`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="#welcome" className="font-display text-sm font-medium text-ink">
            Jacob<span className="text-accent">.dev</span>
          </a>
          {/* Empty socket - EyeOverlay measures this to know where to dock the eye */}
          <div ref={dockRef} style={{ width: 34, height: 18 }} aria-hidden="true" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent font-mono"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          
          <a
            href="#contact"
            className="hidden sm:inline-block rounded-lg border border-edge-hover px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent font-mono"
          >
            Hubungi
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-edge/60 bg-surface/50 text-ink hover:border-accent text-xs font-mono"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-edge/40 bg-base/95 px-6 py-4 backdrop-blur font-mono animate-fadeUp">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  ❯ {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-edge/30">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-center rounded border border-accent/40 bg-accent/10 text-xs font-bold text-accent"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}