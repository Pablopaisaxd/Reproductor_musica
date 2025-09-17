import React from 'react'
import "../styles/playlist.css"

export const Playlist = ({files, setCurrentSong}) => {
  return (
    <div>
      <div className='main-div-playlist' transition-style="in:wipe:right">
        {files.length > 0 ? (
          <ul className="playlist-ul">
            {files.map((file, index) => (
              <li key={index} className="playlist-item" onClick={() => setCurrentSong(file)}>
                <span className="playlist-duracion">
                  Duración: {file.duracion}
                </span>
                <img src={file.imagen} alt={file.titulo} className="playlist-img" />
                <p className="playlist-titulo">{file.titulo}</p>
                <p className="playlist-artista"><strong>Artista:</strong> {file.artista}</p>
                <p className="playlist-peso"><strong>Peso:</strong> {file.peso}</p>
              </li>
            ))}
          </ul>
        )
        : ( <p style={{marginTop:'40px'}}>No hay archivos seleccionados</p> )}
      </div>
    </div>
  )
}
