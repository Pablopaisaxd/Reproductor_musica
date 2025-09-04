import React, { useState } from 'react'

export const File = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"]
    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile)
      setError("")
    } else {
      setFile(null)
      setError("Solo se permiten archivos de música (.mp3, .wav, .ogg, .m4a)")
    }
  }

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".mp3,.wav,.ogg,.m4a" 
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {file && (
        <div>
          <p>Nombre: {file.name}</p>
          <p>Tipo: {file.type}</p>
          <p>Tamaño: {Math.round(file.size / 1024 / 1024)} MB</p>
        </div>
      )}
    </div>
  )
}
