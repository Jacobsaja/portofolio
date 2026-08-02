import { useEffect, useRef, useState, useCallback } from 'react'

export default function useSerialConnection() {
  const [port, setPort] = useState(null)
  const [connected, setConnected] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const readerRef = useRef(null)
  const writerRef = useRef(null)

  const connect = useCallback(async () => {
    try {
      if (!navigator.serial) {
        setError('Web Serial API not supported in this browser')
        return false
      }

      const serialPort = await navigator.serial.requestPort()
      await serialPort.open({ baudRate: 9600 })

      setPort(serialPort)
      setConnected(true)
      setError(null)

      // Start reading
      const reader = serialPort.readable.getReader()
      readerRef.current = reader

      const writer = serialPort.writable.getWriter()
      writerRef.current = writer

      // Read loop
      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        // Decode and parse data
        const text = new TextDecoder().decode(value)
        const lines = text.split('\n').filter(line => line.trim())

        lines.forEach(line => {
          const parsed = parseSerialData(line.trim())
          if (parsed) setData(parsed)
        })
      }

      return true
    } catch (err) {
      setError(err.message)
      setConnected(false)
      return false
    }
  }, [])

  const disconnect = useCallback(async () => {
    try {
      if (readerRef.current) {
        await readerRef.current.cancel()
        readerRef.current = null
      }
      if (writerRef.current) {
        await writerRef.current.close()
        writerRef.current = null
      }
      if (port) {
        await port.close()
      }
      setPort(null)
      setConnected(false)
      setData(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [port])

  const sendCommand = useCallback(async (command) => {
    if (!writerRef.current) return false

    try {
      const encoder = new TextEncoder()
      await writerRef.current.write(encoder.encode(command + '\n'))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    connected,
    data,
    error,
    connect,
    disconnect,
    sendCommand,
    supported: !!navigator.serial
  }
}

function parseSerialData(line) {
  // Parse different data formats from Arduino
  if (line.startsWith('AUTH:')) {
    return { type: 'auth', value: line.split(':')[1] }
  }
  if (line.startsWith('EYE:')) {
    const [x, y, blink] = line.split(':')[1].split(',').map(Number)
    return { type: 'eye', x, y, blink }
  }
  if (line.startsWith('SIGNAL:')) {
    const [strength, quality] = line.split(':')[1].split(',').map(Number)
    return { type: 'signal', strength, quality }
  }
  if (line.startsWith('THEME:')) {
    return { type: 'theme', value: line.split(':')[1] }
  }
  if (line.startsWith('MORSE:')) {
    return { type: 'morse', value: line.split(':')[1] }
  }
  if (line.startsWith('STATUS:')) {
    return { type: 'status', value: line.split(':')[1] }
  }
  return { type: 'raw', value: line }
}
