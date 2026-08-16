import { useState, useEffect, useRef } from 'react'

export default function ArduinoSimulator({ theme, setTheme, onEyeControl, visible, onClose, onCableConnected }) {
  const [ledStates, setLedStates] = useState({ red: false, green: false, blue: false, signal: false })
  const [buttonStates, setButtonStates] = useState({ auth: false, theme: false, blink: false, morse: false })
  const [potValues, setPotValues] = useState({ x: 50, y: 50 })
  const [sensorData, setSensorData] = useState({ temp: 25, humidity: 60, light: 500 })
  const [signalWave, setSignalWave] = useState([])
  const [dataPackets, setDataPackets] = useState([])
  const [circuitActive, setCircuitActive] = useState(true)
  const [cableConnected, setCableConnected] = useState(false)
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Simulate sensor data
  useEffect(() => {
    if (!visible) return
    
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temp: parseFloat((prev.temp + (Math.random() - 0.5) * 0.5).toFixed(1)),
        humidity: Math.min(100, Math.max(0, Math.floor(prev.humidity + (Math.random() - 0.5) * 3))),
        light: Math.floor(prev.light + (Math.random() - 0.5) * 20)
      }))
    }, 2000)
    
    return () => clearInterval(interval)
  }, [visible])

  // Simulate signal wave
  useEffect(() => {
    if (!visible) return
    
    const interval = setInterval(() => {
      setSignalWave(prev => {
        const newValue = Math.sin(Date.now() / 100) * 0.5 + 0.5
        const newWave = [...prev, newValue]
        return newWave.slice(-50)
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [visible])

  // Simulate data packets
  useEffect(() => {
    if (!visible) return
    
    const interval = setInterval(() => {
      setDataPackets(prev => {
        const newPacket = {
          id: Math.random().toString(36).substr(2, 9),
          type: ['DATA', 'ACK', 'SYNC'][Math.floor(Math.random() * 3)],
          size: Math.floor(Math.random() * 64) + 32
        }
        const newPackets = [...prev, newPacket]
        return newPackets.slice(-5)
      })
    }, 1500)
    
    return () => clearInterval(interval)
  }, [visible])

  // Draw signal wave on canvas
  useEffect(() => {
    if (!visible || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw grid
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      
      // Draw signal wave
      if (signalWave.length > 1) {
        ctx.strokeStyle = theme === 'matrix' ? '#00ff00' : '#00bcd4'
        ctx.lineWidth = 2
        ctx.beginPath()
        
        signalWave.forEach((value, index) => {
          const x = (index / signalWave.length) * canvas.width
          const y = canvas.height - (value * canvas.height * 0.8) - 10
          
          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        
        ctx.stroke()
      }
      
      animationRef.current = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [visible, signalWave, theme])

  const handleButtonClick = (button) => {
    setButtonStates(prev => ({ ...prev, [button]: true }))
    setTimeout(() => setButtonStates(prev => ({ ...prev, [button]: false })), 200)
    
    switch (button) {
      case 'auth':
        setTheme('matrix')
        flashLed('green')
        break
      case 'theme':
        const themes = ['dark', 'light', 'matrix']
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]
        setTheme(nextTheme)
        updateThemeLed(nextTheme)
        break
      case 'blink':
        onEyeControl?.({ type: 'blink' })
        flashLed('blue')
        break
      case 'morse':
        flashLed('red')
        break
    }
  }

  const handlePotChange = (axis, value) => {
    setPotValues(prev => {
      const updated = { ...prev, [axis]: value }
      // Use updated values to avoid stale closure
      onEyeControl?.({ type: 'move', x: (updated.x - 50) / 2, y: (updated.y - 50) / 2 })
      return updated
    })
  }

  const flashLed = (color) => {
    setLedStates(prev => ({ ...prev, [color]: true }))
    // Bug fix: closing paren was misplaced — LED was never turning off
    setTimeout(() => setLedStates(prev => ({ ...prev, [color]: false })), 300)
  }

  const updateThemeLed = (currentTheme) => {
    setLedStates({
      red: currentTheme === 'light',
      green: currentTheme === 'matrix',
      blue: currentTheme === 'dark',
      signal: ledStates.signal
    })
  }

  const handleCableToggle = () => {
    const newState = !cableConnected
    setCableConnected(newState)
    onCableConnected?.(newState)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-edge bg-surface p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-edge pb-4">
          <div>
            <h2 className="text-2xl font-bold text-accent">Arduino Simulator</h2>
            <p className="text-sm text-muted">Virtual IoT & Telecommunications Lab</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-edge bg-base px-4 py-2 text-sm text-ink hover:bg-accent/10 hover:text-accent transition-colors"
          >
            Close Simulator
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Arduino Board */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-edge bg-base/50 p-6">
              <h3 className="mb-4 text-sm font-bold text-accent">ARDUINO UNO R3</h3>
              
              {/* Board Visualization */}
              <div className="relative mb-6 rounded-lg bg-teal-800 p-4 shadow-inner">
                <div className="absolute left-0 top-1/2 h-12 w-8 -translate-y-1/2 rounded-r bg-silver-400 border-2 border-silver-600" />
                <div className="absolute left-0 top-4 h-8 w-6 rounded-r bg-black border-2 border-gray-700" />
                <div className="mx-auto mb-4 h-20 w-24 rounded bg-black border-2 border-gray-700 flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-mono">ATMEGA328P</span>
                </div>
                <div className="absolute right-4 top-4 space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-600 border border-yellow-800" />
                      <span className="text-[10px] text-white font-mono">D{i}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute left-4 bottom-4 space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-white font-mono">A{i}</span>
                      <div className="h-3 w-3 rounded-full bg-yellow-600 border border-yellow-800" />
                    </div>
                  ))}
                </div>
                <div className="absolute left-4 top-4 flex gap-2">
                  <div className={`h-2 w-2 rounded-full ${ledStates.signal ? 'bg-green-500 animate-pulse' : 'bg-green-900'}`} />
                  <span className="text-[8px] text-white">PWR</span>
                  <div className={`h-2 w-2 rounded-full ${circuitActive ? 'bg-yellow-500' : 'bg-yellow-900'}`} />
                  <span className="text-[8px] text-white">ON</span>
                </div>
              </div>

              {/* Virtual Components */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted">DIGITAL INPUTS</h4>
                  <button
                    onClick={() => handleButtonClick('auth')}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      buttonStates.auth ? 'bg-accent/20 border-accent' : 'bg-base border-edge hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-ink">D2 - AUTH</span>
                      <div className={`h-4 w-4 rounded-full ${buttonStates.auth ? 'bg-accent' : 'bg-edge'}`} />
                    </div>
                  </button>
                  <button
                    onClick={() => handleButtonClick('theme')}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      buttonStates.theme ? 'bg-accent/20 border-accent' : 'bg-base border-edge hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-ink">D3 - THEME</span>
                      <div className={`h-4 w-4 rounded-full ${buttonStates.theme ? 'bg-accent' : 'bg-edge'}`} />
                    </div>
                  </button>
                  <button
                    onClick={() => handleButtonClick('blink')}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      buttonStates.blink ? 'bg-accent/20 border-accent' : 'bg-base border-edge hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-ink">D4 - BLINK</span>
                      <div className={`h-4 w-4 rounded-full ${buttonStates.blink ? 'bg-accent' : 'bg-edge'}`} />
                    </div>
                  </button>
                  <button
                    onClick={() => handleButtonClick('morse')}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      buttonStates.morse ? 'bg-accent/20 border-accent' : 'bg-base border-edge hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-ink">D8 - MORSE</span>
                      <div className={`h-4 w-4 rounded-full ${buttonStates.morse ? 'bg-accent' : 'bg-edge'}`} />
                    </div>
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted">ANALOG INPUTS</h4>
                  <div className="rounded-lg border border-edge bg-base p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-ink">A0 - EYE X</span>
                      <span className="text-xs text-accent">{potValues.x}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={potValues.x}
                      onChange={(e) => handlePotChange('x', parseInt(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                  <div className="rounded-lg border border-edge bg-base p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-ink">A1 - EYE Y</span>
                      <span className="text-xs text-accent">{potValues.y}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={potValues.y}
                      onChange={(e) => handlePotChange('y', parseInt(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                  <div className="rounded-lg border border-edge bg-base p-3">
                    <span className="text-xs font-mono text-ink block mb-2">RGB LED (D5-D7)</span>
                    <div className="flex gap-2">
                      <div className={`h-6 w-6 rounded-full ${ledStates.red ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900'}`} />
                      <div className={`h-6 w-6 rounded-full ${ledStates.green ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-green-900'}`} />
                      <div className={`h-6 w-6 rounded-full ${ledStates.blue ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-blue-900'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telecommunications */}
            <div className="rounded-xl border border-edge bg-base/50 p-6">
              <h3 className="mb-4 text-sm font-bold text-accent">TELECOMMUNICATIONS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-muted">RF SIGNAL</span>
                    <span className="text-xs text-accent font-mono">2.4 GHz</span>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={200}
                    height={80}
                    className="w-full rounded border border-edge bg-black/50"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-muted">DATA STREAM</span>
                    <span className="text-xs text-accent font-mono">9600 BAUD</span>
                  </div>
                  <div className="h-20 overflow-y-auto rounded border border-edge bg-black/50 p-2 space-y-1">
                    {dataPackets.map((packet, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-green-400">{packet.type}</span>
                        <span className="text-faint">{packet.id}</span>
                        <span className="text-accent">{packet.size}B</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* IoT Sensors */}
          <div className="space-y-6">
            <div className="rounded-xl border border-edge bg-base/50 p-6">
              <h3 className="mb-4 text-sm font-bold text-accent">IoT SENSORS</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-edge bg-base p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">🌡️</span>
                    <span className="text-xs text-muted">TEMPERATURE</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">{sensorData.temp}°C</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-edge/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-500"
                      style={{ width: `${((sensorData.temp - 20) / 20) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-edge bg-base p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">💧</span>
                    <span className="text-xs text-muted">HUMIDITY</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">{sensorData.humidity}%</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-edge/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${sensorData.humidity}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-edge bg-base p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    <span className="text-xs text-muted">LIGHT LEVEL</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">{sensorData.light} lx</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-edge/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-300 transition-all duration-500"
                      style={{ width: `${(sensorData.light / 1000) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (sensorData.light > 700) {
                      setTheme('light')
                      setLedStates(prev => ({ ...prev, red: true, green: true, blue: true }))
                    } else {
                      setTheme('dark')
                      setLedStates(prev => ({ ...prev, red: false, green: false, blue: true }))
                    }
                  }}
                  className="w-full rounded-lg border border-accent/50 bg-accent/10 p-3 text-sm text-accent hover:bg-accent/20 transition-colors"
                >
                  {sensorData.light > 700 ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
                </button>
              </div>
            </div>

            {/* Cable A-B Feature */}
            <div className="rounded-xl border border-edge bg-base/50 p-6">
              <h3 className="mb-4 text-sm font-bold text-accent">KABEL A-B</h3>
              <p className="mb-4 text-xs text-muted">Hubungkan untuk buka "Projek Lainnya"</p>
              <div className="relative h-20 rounded-lg bg-edge/10 p-4 mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className="h-6 w-6 rounded-full border-2 border-accent bg-base flex items-center justify-center">
                    <span className="text-[10px] font-bold text-accent">A</span>
                  </div>
                </div>
                {cableConnected ? (
                  <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-accent to-accent/50 rounded-full animate-pulse" />
                ) : (
                  <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-0.5 bg-edge/30 border-t-2 border-dashed border-edge/50" />
                )}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-6 w-6 rounded-full border-2 border-accent bg-base flex items-center justify-center">
                    <span className="text-[10px] font-bold text-accent">B</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCableToggle}
                className={`w-full rounded-lg border p-3 text-sm font-bold transition-all ${
                  cableConnected
                    ? 'bg-accent border-accent text-base'
                    : 'bg-base border-edge text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {cableConnected ? '⚡ TERHUBUNG' : '🔌 HUBUNGKAN'}
              </button>
              {cableConnected && (
                <div className="mt-3 rounded bg-green-500/10 border border-green-500/30 p-2 text-center">
                  <span className="text-xs text-green-400">✓ Fitur terbuka!</span>
                </div>
              )}
            </div>

            {/* Circuit Status */}
            <div className="rounded-xl border border-edge bg-base/50 p-6">
              <h3 className="mb-4 text-sm font-bold text-accent">CIRCUIT STATUS</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">POWER</span>
                  <span className="text-green-400">5.0V</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">CURRENT</span>
                  <span className="text-accent">45mA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">UPTIME</span>
                  <span className="text-ink">{Math.floor(Date.now() / 1000) % 10000}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">MEMORY</span>
                  <span className="text-ink">1.8KB / 2KB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">STATUS</span>
                  <span className="text-green-400">OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
