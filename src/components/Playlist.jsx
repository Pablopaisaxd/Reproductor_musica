import React, { use, useEffect, useState } from "react";
import "../styles/playlist.css";

export const Playlist = ({ files, setCurrentSong, setFiles, currentSong }) => {

  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const eliminarCancion = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const limpiarPlaylist = () => {
  setFiles([]);
  setCurrentSong(null);
  localStorage.removeItem("playlist");
  localStorage.removeItem("ultimaCancion");
};

const ordenarPorArtista = () => {
  const sorted = [...files].sort((a, b) => {
    if (a.artista.toLowerCase() < b.artista.toLowerCase()) return ordenAscendente ? -1 : 1;
    if (a.artista.toLowerCase() > b.artista.toLowerCase()) return ordenAscendente ? 1 : -1;
    return 0;
  });
  setFiles(sorted);
  setOrdenAscendente(!ordenAscendente);

  localStorage.setItem("playlist", JSON.stringify(sorted));
};



  useEffect(() => {
    if (files.length > 0) {
      const metadatos = files.map((f) => ({
        id: f.id,
        titulo: f.titulo,
        artista: f.artista,
        duracion: f.duracion,
        imagen: f.imagen,
        peso: f.peso,
      }));
      localStorage.setItem("playlist", JSON.stringify(metadatos));
    }
  }, [files]);
  return (
    <div>
      <div className="main-div-playlist" transition-style="in:wipe:right">
        <button onClick={ordenarPorArtista} className="sort-button">
  Ordenar por Artista {ordenAscendente ? "⬆️" : "⬇️"}
</button>
        {files.length > 0 ? (
          <ul className="playlist-ul">
            {files.map((file, index) => (
              <li
                key={index}
                className="playlist-item"
                onClick={() => setCurrentSong(file)}
              >
                <span className="playlist-duracion">
                  Duración: {file.duracion}
                </span>
                <img
                  src={file.imagen}
                  alt={file.titulo}
                  className="playlist-img"
                />
                <p className="playlist-titulo">{file.titulo}</p>
                <p className="playlist-artista">
                  <strong>Artista:</strong> {file.artista}
                </p>
                <p className="playlist-peso">
                  <strong>Peso:</strong> {file.peso}
                </p>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="trash-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarCancion(file.id);
                    if (currentSong && currentSong.id === file.id) {
                      setCurrentSong(null);
                      localStorage.removeItem("ultimaCancion");
                    }
                  }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                      stroke="#000000"
                      stroke-width="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: "40px" }}>No hay archivos seleccionados</p>
        )}
        <button onClick={limpiarPlaylist} className="clean-all-playlist"> Limpiar Playlist</button>
      </div>
      

    </div>
  );
};
