interface AudioPlayerProps {
  base64Data: string
  assetType?: string
}

export function AudioPlayer({ base64Data, assetType = 'audio/mp3' }: AudioPlayerProps) {
  const audioSrc = `data:${assetType};base64,${base64Data}`

  return (
    <audio 
      controls 
      preload="none"
      style={{ 
        width: '100%', 
        maxWidth: '300px', 
        height: '40px',
        borderRadius: '6px'
      }}
    >
      <source src={audioSrc} type={assetType} />
      Your browser does not support the audio element.
    </audio>
  )
}
