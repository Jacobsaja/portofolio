import React, { useState } from 'react'
import { playTypingSound, playConfirmSound } from '../utils/audio'

export default function DownloadCV() {
  const [status, setStatus] = useState('idle') // idle, loading, done
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    if (status !== 'idle') return
    setStatus('loading')
    setProgress(0)

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5
      if (current >= 100) {
        current = 100
        setProgress(100)
        clearInterval(interval)
        playConfirmSound()
        setStatus('done')

        // Simulate actual download delay
        setTimeout(() => {
          // In a real app, you would window.open('resume.pdf')
          const link = document.createElement('a')
          link.href = '/cv.pdf'
          link.download = 'CV_Jacob.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          // Reset after a while
          setTimeout(() => setStatus('idle'), 3000)
        }, 500)
      } else {
        playTypingSound()
        setProgress(current)
      }
    }, 150)
  }

  // Calculate the bar
  const totalBlocks = 20
  const filledBlocks = Math.floor((progress / 100) * totalBlocks)
  const bar = '='.repeat(filledBlocks) + (filledBlocks < totalBlocks ? '>' : '') + ' '.repeat(Math.max(0, totalBlocks - filledBlocks - 1))

  return (
    <div className="mt-8">
      {status === 'idle' && (
        <button
          onClick={handleDownload}
          className="group flex items-center gap-2 border border-edge hover:border-accent bg-surface/50 px-4 py-2 text-sm font-mono text-ink transition-colors"
        >
          <span className="text-accent group-hover:animate-pulse">↓</span>
          <span>Download_CV.pdf</span>
        </button>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-2 border border-edge bg-surface px-4 py-2 text-sm font-mono text-accent">
          <span>[{bar}]</span>
          <span>{progress}%</span>
        </div>
      )}

      {status === 'done' && (
        <div className="flex items-center gap-2 border border-green-500/50 bg-green-500/10 px-4 py-2 text-sm font-mono text-green-400">
          <span>[====================]</span>
          <span>100% COMPLETE</span>
        </div>
      )}
    </div>
  )
}
