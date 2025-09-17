import React, { createContext, useState } from 'react'
import canciones from  "/src/data/canciones.json"
import imgdefault from "/src/assets/portadas/unown.jpg"
import "../styles/file.css"


export const File = ({setFiles, mostrarPlaylist}) => {
  const [error, setError] = useState("")

  const obtenerDuracion = (file) => {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio")
    audio.src = URL.createObjectURL(file)

    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration) // duración en segundos
    })

    audio.addEventListener("error", (e) => {
      reject("No se pudo leer la duración del archivo")
    })
  })
}
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
          id: Date.now()+Math.random(),
          archivo: file.name,
          archivoReal: file,
          titulo: nombreSinExtension,
          artista: cancionEncontrada ? cancionEncontrada.artista : "Desconocido",
          duracion: obtenerDuracion(file).then((duracionSegundos) => {
            const minutos = Math.floor(duracionSegundos / 60);
            const segundos = Math.floor(duracionSegundos % 60);
            return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
          }),
          peso: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          imagen: cancionEncontrada ? cancionEncontrada.imagen : imgdefault,
        };
      });

      setFiles(coincidencias);
    } else {
      setFiles([])
      setError("Solo se permiten archivos de música (.mp3, .wav, .ogg, .m4a)")
    }
  }




  
  return (
    <div >
      
       <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept=".mp3,.wav,.ogg,.m4a"
        className={mostrarPlaylist ? 'mostrar' : 'ocultar' }
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
