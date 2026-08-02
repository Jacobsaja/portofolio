import { useState } from 'react'

export default function HardwareControls({ theme, setTheme, onCableConnected, setDevMode, playMatrixEnter, playMatrixExit }) {
  const [cableConnected, setCableConnected] = useState(false)
  const [lampOn, setLampOn] = useState(false)

  const handleCableToggle = () => {
    const newState = !cableConnected
    setCableConnected(newState)
    onCableConnected?.(newState)
  }

  const handleLampToggle = () => {
    const newState = !lampOn
    setLampOn(newState)
    if (newState) {
      setTheme('matrix')
      setDevMode?.(true)
      playMatrixEnter?.()
    } else {
      setTheme('dark')
      setDevMode?.(false)
      playMatrixExit?.()
    }
  }

  return (
    <section id="hardware-controls" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-accent">Hardware Controls</h2>
          <p className="text-muted">Interactive circuit controls for special features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cable Connection */}
          <div className="rounded-xl border border-edge bg-base/50 p-6">
            <h3 className="mb-4 text-sm font-bold text-accent">KABEL A-B</h3>
            <p className="mb-4 text-xs text-muted">Hubungkan kabel A ke B untuk membuka "Projek Lainnya"</p>
            
            <div className="relative h-32 rounded-lg bg-edge/10 p-4">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <div className="h-8 w-8 rounded-full border-2 border-accent bg-base flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">A</span>
                </div>
              </div>
              
              {cableConnected ? (
                <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-accent to-accent/50 rounded-full animate-pulse" />
              ) : (
                <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-0.5 bg-edge/30 border-t-2 border-dashed border-edge/50" />
              )}
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="h-8 w-8 rounded-full border-2 border-accent bg-base flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">B</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCableToggle}
              className={`mt-4 w-full rounded-lg border p-3 text-sm font-bold transition-all ${
                cableConnected
                  ? 'bg-accent border-accent text-base'
                  : 'bg-base border-edge text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {cableConnected ? '⚡ TERHUBUNG' : '🔌 HUBUNGKAN KABEL'}
            </button>
            
            {cableConnected && (
              <div className="mt-3 rounded bg-green-500/10 border border-green-500/30 p-2 text-center">
                <span className="text-xs text-green-400">✓ Fitur "Projek Lainnya" terbuka!</span>
              </div>
            )}
          </div>

          {/* Lamp Control */}
          <div className="rounded-xl border border-edge bg-base/50 p-6">
            <h3 className="mb-4 text-sm font-bold text-accent">LAMPU MATRIX</h3>
            <p className="mb-4 text-xs text-muted">Nyalakan lampu untuk masuk ke Matrix Mode</p>
            
            <div className="relative h-32 rounded-lg bg-edge/10 p-4 overflow-hidden">
              <div className={`absolute left-1/2 top-4 -translate-x-1/2 w-16 h-16 rounded-full transition-all duration-500 ${
                lampOn
                  ? 'bg-green-500 shadow-[0_0_60px_rgba(0,255,0,0.8)] animate-pulse'
                  : 'bg-gray-700 shadow-none'
              }`} />
              
              {lampOn && (
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent animate-pulse" />
              )}
            </div>
            
            <button
              onClick={handleLampToggle}
              className={`mt-4 w-full rounded-lg border p-3 text-sm font-bold transition-all ${
                lampOn
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-base border-edge text-muted hover:border-green-500 hover:text-green-500'
              }`}
            >
              {lampOn ? '💡 LAMPU NYALA' : '🔘 LAMPU MATI'}
            </button>
            
            {lampOn && (
              <div className="mt-3 rounded bg-green-500/10 border border-green-500/30 p-2 text-center">
                <span className="text-xs text-green-400">✓ Matrix Mode aktif!</span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 rounded-xl border border-edge bg-base/50 p-6">
          <h3 className="mb-4 text-sm font-bold text-accent">STATUS SIRKUIT</h3>
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted">KABEL A-B</span>
              <span className={cableConnected ? 'text-green-400' : 'text-red-400'}>
                {cableConnected ? 'TERHUBUNG' : 'TERPUTUS'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">LAMPU</span>
              <span className={lampOn ? 'text-green-400' : 'text-red-400'}>
                {lampOn ? 'NYALA' : 'MATI'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">MODE</span>
              <span className="text-accent">{theme.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">POWER</span>
              <span className="text-green-400">5.0V</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
