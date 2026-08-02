import { useEffect, useState, useRef } from 'react'
import { playTerminalOpen, playTerminalClose } from '../utils/audio.js'

export default function CommandPalette({ theme, devMode, setDevMode, onToggleTheme, onClear, onRestore, hardwareSupported, hardwareConnected, onHardwareConnect, onHardwareDisconnect, onToggleSimulator }) {
  const ACTIONS = [
    { id: 'go-hero', label: 'Go to Home', action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-projects', label: 'Go to Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-about', label: 'Go to About', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-contact', label: 'Go to Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'toggle-theme', label: 'Toggle Theme', action: () => {
      onToggleTheme(window.innerWidth / 2, window.innerHeight / 2)
    }},
    { id: 'clear', label: 'Clear Terminal (Hide Content)', action: () => onClear?.() },
    { id: 'restore', label: 'Restore Content', action: () => onRestore?.() },
    { id: 'help', label: 'Help / Show Commands', action: () => { console.log('Available Commands: go-hero, go-projects, go-about, go-contact, toggle-theme, clear, restore, matrix-toggle, simulator') } },
    { id: 'matrix-toggle', label: devMode ? 'Exit Matrix Mode' : 'Enter Matrix Mode', action: () => setDevMode(!devMode) },
    { id: 'simulator', label: 'Open Arduino Simulator', action: () => onToggleSimulator?.() },
  ]

  // Add hardware connection actions if supported
  if (hardwareSupported) {
    if (hardwareConnected) {
      ACTIONS.push({ id: 'hardware-disconnect', label: 'Disconnect Hardware', action: () => onHardwareDisconnect?.() })
    } else {
      ACTIONS.push({ id: 'hardware-connect', label: 'Connect Hardware (Arduino)', action: () => onHardwareConnect?.() })
    }
  }
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  // Buka/Tutup dengan Cmd+K / Ctrl+K atau Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => {
          const next = !prev
          if (next) playTerminalOpen()
          else playTerminalClose()
          return next
        })
        setQuery('')
      }
      if (e.key === 'Escape') {
        if (isOpen) playTerminalClose()
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input saat terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Filter actions
  const filteredActions = ACTIONS.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  )

  // Reset selected index kalau query berubah
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Handle navigasi keyboard dalam list
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const action = filteredActions[selectedIndex]
      if (action) {
        action.action()
        setIsOpen(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="command-palette-overlay fixed inset-0 z-[9999] flex items-start justify-center pt-32" onClick={() => { playTerminalClose(); setIsOpen(false); }}>
      <div 
        className="w-full max-w-lg rounded-xl border border-edge bg-surface shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-edge p-3 flex items-center gap-3">
          <span className="text-accent">❯</span>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint/50"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="text-[10px] text-faint/50 rounded bg-base px-1.5 py-0.5 border border-edge">ESC</span>
        </div>
        
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="p-4 text-center text-sm text-faint/60">No commands found.</div>
          ) : (
            <ul className="flex flex-col gap-1">
              {filteredActions.map((action, index) => (
                <li key={action.id}>
                  <button
                    className={`w-full text-left flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      index === selectedIndex 
                        ? 'bg-accent/10 text-accent border border-accent/20' 
                        : 'text-muted hover:bg-base hover:text-ink border border-transparent'
                    }`}
                    onClick={() => {
                      action.action()
                      playTerminalClose()
                      setIsOpen(false)
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span>{action.label}</span>
                    {index === selectedIndex && <span className="text-[10px] text-accent/60">ENTER</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
