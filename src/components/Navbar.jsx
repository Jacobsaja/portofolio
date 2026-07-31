import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { href: '#hero', label: 'Beranda' },
  { href: '#projects', label: 'Project' },
  { href: '#about', label: 'Profil' },
  { href: '#contact', label: 'Kontak' },
]

export default function Navbar({ visible = true, dockRef, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)

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
      } ${scrolled ? 'border-b border-edge bg-base/80 backdrop-blur' : 'bg-transparent'}`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="#welcome" className="font-display text-sm font-medium text-ink">
            Jacob<span className="text-accent">.dev</span>
          </a>
          {/* Empty socket - EyeOverlay measures this to know where to dock the eye */}
          <div ref={dockRef} style={{ width: 34, height: 18 }} aria-hidden="true" />
        </div>

        <ul className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
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
            className="rounded-lg border border-edge-hover px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Hubungi
          </a>
        </div>
      </nav>
    </header>
  )
}