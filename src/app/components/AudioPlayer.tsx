'use client'

import { useState, useRef } from 'react'

interface AudioPlayerProps {
  base64Data: string
  assetType?: string
}

export function AudioPlayer({ base64Data, assetType = 'audio/mp3' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioSrc = `data:${assetType};base64,${base64Data}`

  const togglePlayback = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <button
        onClick={togglePlayback}
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid #333',
          borderRadius: '6px',
          backgroundColor: isPlaying ? '#007bff' : '#f8f9fa',
          color: isPlaying ? 'white' : '#333',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = isPlaying ? '#0056b3' : '#e9ecef'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = isPlaying ? '#007bff' : '#f8f9fa'
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <audio 
        ref={audioRef}
        preload="none"
        onEnded={handleAudioEnded}
        style={{ display: 'none' }}
      >
        <source src={audioSrc} type={assetType} />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
