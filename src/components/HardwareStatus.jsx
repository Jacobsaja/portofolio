import { useState, useEffect } from 'react'

export default function HardwareStatus({ connected, data, error, theme }) {
  const [signalHistory, setSignalHistory] = useState([])
  const [morseLog, setMorseLog] = useState([])
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (data?.type === 'signal') {
      setSignalHistory(prev => {
        const newHistory = [...prev, { strength: data.strength, quality: data.quality, time: Date.now() }]
        return newHistory.slice(-20) // Keep last 20 readings
      })
    }
  }, [data])

  useEffect(() => {
    if (data?.type === 'morse') {
      setMorseLog(prev => [...prev, { value: data.value, time: Date.now() }].slice(-10))
    }
  }, [data])

  useEffect(() => {
    if (data?.type === 'eye') {
      setEyePosition({ x: data.x, y: data.y })
    }
  }, [data])

  if (!connected) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="rounded-lg border border-edge/50 bg-surface/80 backdrop-blur-sm p-4 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-muted">Hardware: Disconnected</span>
          </div>
        </div>
      </div>
    )
  }

  const signalStrength = signalHistory.length > 0 ? signalHistory[signalHistory.length - 1].strength : 0
  const signalQuality = signalHistory.length > 0 ? signalHistory[signalHistory.length - 1].quality : 0

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <div className="rounded-lg border border-edge/50 bg-surface/90 backdrop-blur-sm p-4 shadow-xl">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between border-b border-edge/50 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-accent">HARDWARE: ONLINE</span>
          </div>
          <span className="text-[10px] text-faint">9600 BAUD</span>
        </div>

        {/* Signal Strength */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] text-muted">SIGNAL STRENGTH</span>
            <span className="text-[10px] font-mono text-accent">{signalStrength}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-edge/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
              style={{ width: `${signalStrength}%` }}
            />
          </div>
        </div>

        {/* Signal Quality */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] text-muted">SIGNAL QUALITY</span>
            <span className="text-[10px] font-mono text-accent">{signalQuality}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-edge/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${signalQuality}%` }}
            />
          </div>
        </div>

        {/* Eye Position */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] text-muted">EYE POSITION</span>
            <span className="text-[10px] font-mono text-accent">
              X:{eyePosition.x} Y:{eyePosition.y}
            </span>
          </div>
          <div className="relative h-12 w-full rounded border border-edge/30 bg-edge/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-10 rounded-full border border-accent/30" />
            </div>
            <div
              className="absolute h-2 w-2 rounded-full bg-accent transition-all duration-100"
              style={{
                left: `calc(50% + ${(eyePosition.x / 26) * 40}%)`,
                top: `calc(50% + ${(eyePosition.y / 16) * 40}%)`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        </div>

        {/* Morse Log */}
        {morseLog.length > 0 && (
          <div>
            <div className="mb-1 text-[10px] text-muted">MORSE INPUT</div>
            <div className="max-h-16 overflow-y-auto rounded border border-edge/30 bg-edge/10 p-2">
              {morseLog.map((entry, i) => (
                <div key={i} className="text-[10px] font-mono text-accent/80">
                  {entry.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-2 rounded bg-red-500/10 p-2">
            <span className="text-[10px] text-red-400">{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
