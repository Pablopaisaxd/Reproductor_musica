import React, { useState } from 'react'
import canciones from  "/src/data/canciones.json"
import imgdefault from "/src/assets/portadas/unown.jpg"

export const File = () => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState("")

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"]
    const validFiles = selectedFiles.filter(file =>
      allowedTypes.includes(file.type)
    )

    if (validFiles.length > 0) {
      setFiles(validFiles)
      setError("")

      const coincidencias = validFiles.map((file) => {
        const nombreSinExtension = file.name.replace(/\.[^/.]+$/, "");
        const cancionEncontrada = canciones.find(
          (c) => c.titulo.toLowerCase() === nombreSinExtension.toLowerCase()
        );

        return {
          archivo: file.name,
          titulo: nombreSinExtension,
          artista: cancionEncontrada ? cancionEncontrada.artista : "Desconocido",
          duracion: cancionEncontrada ? cancionEncontrada.duracion : "N/A",
          peso: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          imagen: cancionEncontrada ? cancionEncontrada.imagen : imgdefault
        };
      });

      setFiles(coincidencias);
    } else {
      setFiles([])
      setError("Solo se permiten archivos de música (.mp3, .wav, .ogg, .m4a)")
    }
  }

  const artistaCancion = canciones.map(cancion => {
    console.log(cancion)
  })

  
  console.log(files)
  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept=".mp3,.wav,.ogg,.m4a" 
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>Titulo: {file.titulo}</p>
              <p>Artista: {file.artista}</p>
              <p>Peso: {file.peso}</p>
              <img src={file.imagen} alt="" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
