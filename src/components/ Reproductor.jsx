import React, { useState, useEffect, use } from "react";
import Buttons from "./Buttons";
import "../styles/reproductor.css";

const estilos = {
  contenedor: {
    maxWidth: 400,
    margin: "auto",
  },
  barraProgreso: {
    width: "100%",
    marginTop: 10,
  },
};

const Reproductor = ({
  setMostrarPlaylist,
  mostrarPlaylist,
  currentSong,
  files,
  setCurrentSong,
}) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const [mute, setMute] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // "off", "one", "all"

  useEffect(() => {
    const guardado = localStorage.getItem("ultimaCancion");
    if (guardado && files.length > 0) {
      const { id, progreso, archivoReal, volumen, mute } = JSON.parse(guardado);
      const ultima = files.find((f) => f.archivoReal.name === archivoReal);
      if (ultima) {
        setCurrentSong({ ...ultima, progresoGuardado: progreso });
        setVolumen(volumen);
        setMute(mute);
      }
    }
  }, [files]);

  if (currentSong === null) {
    audio && audio.pause();
    progreso !== 0 && setProgreso(0);
    duracion !== 0 && setDuracion(0);
    isPlaying && setIsPlaying(false);
  }
  useEffect(() => {
    if (currentSong) {
      if (audio) audio.pause();

      const nuevoAudio = new Audio(
        URL.createObjectURL(currentSong.archivoReal)
      );
      setAudio(nuevoAudio);
      setIsPlaying(true);

      if (currentSong.progresoGuardado) {
        nuevoAudio.currentTime = currentSong.progresoGuardado;
      }

      nuevoAudio.addEventListener("timeupdate", () =>
        setProgreso(nuevoAudio.currentTime)
      );
      nuevoAudio.addEventListener("loadedmetadata", () =>
        setDuracion(nuevoAudio.duration)
      );
      nuevoAudio.addEventListener("ended", playNextSong,  () => {
        const indexActual = files.findIndex((f) => f.id === currentSong.id);
        const siguiente = files[indexActual + 1];
        if (siguiente) {
          setCurrentSong(siguiente);
        } else {
          setIsPlaying(false);
          localStorage.removeItem("ultimaCancion");
        }
      });
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem(
        "ultimaCancion",
        JSON.stringify({
          id: currentSong.id,
          progreso: progreso,
          archivoReal: currentSong.archivoReal.name,
          volumen: volumen,
          mute: mute,
        })
      );
    }
  }, [currentSong, progreso, volumen, mute]);


  useEffect(() => {
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (audio) {
      audio.volume = volumen;
      audio.muted = mute;
    }
  }, [volumen, mute, audio]);

  const manejarCambioProgreso = (e) => {
    if (audio) {
      const nuevoTiempo = Number(e.target.value);
      audio.currentTime = nuevoTiempo;
      setProgreso(nuevoTiempo);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const cambiarVolumen = (nuevoVolumen) => {
    setVolumen(nuevoVolumen);
    setMute(nuevoVolumen === 0);
  };
  const toggleMute = () => setMute(!mute);



  const toggleShuffle = () => {
  setIsShuffle((prev) => !prev);
};


const playNextSong = () => {
  if (!currentSong || files.length === 0) return;

  const currentIndex = files.findIndex((f) => f.id === currentSong.id);

  if (isShuffle) {

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * files.length);
    } while (randomIndex === currentIndex && files.length > 1);
    setCurrentSong(files[randomIndex]);
    return;
  }

  if (repeatMode === "one") {

    setCurrentSong({ ...currentSong, progreso: 0 });
    return;
  }

  if (repeatMode === "all") {

    const nextIndex = (currentIndex + 1) % files.length;
    setCurrentSong(files[nextIndex]);
    return;
  }


  if (currentIndex < files.length - 1) {
    setCurrentSong(files[currentIndex + 1]);
  }
};

const playPreviousSong = () => {
  if (!currentSong || files.length === 0) return;

  const currentIndex = files.findIndex((f) => f.id === currentSong.id);

  if (isShuffle) {

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * files.length);
    } while (randomIndex === currentIndex && files.length > 1);
    setCurrentSong(files[randomIndex]);
    return;
  }

  if (repeatMode === "one") {

    setCurrentSong({ ...currentSong, progreso: 0 });
    return;
  }

  if (repeatMode === "all") {

    const prevIndex = (currentIndex - 1 + files.length) % files.length;
    setCurrentSong(files[prevIndex]);
    return;
  }


  if (currentIndex > 0) {
    setCurrentSong(files[currentIndex - 1]);
  }
};

const toggleRepeat = () => {
  setRepeatMode((prev) => {
    if (prev === "off") return "one";
    if (prev === "one") return "all";
    return "off";
  });
};

useEffect(() => {
  if (currentSong && currentSong.progreso === currentSong.duracion) {
    if (repeatMode === "one") {

      setCurrentSong({ ...currentSong, progreso: 0 });
    } else if (repeatMode === "all") {

      const currentIndex = files.findIndex((f) => f.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % files.length;
      setCurrentSong(files[nextIndex]);
    } else {

      const currentIndex = files.findIndex((f) => f.id === currentSong.id);
      if (currentIndex < files.length - 1) {
        setCurrentSong(files[currentIndex + 1]);
      }
    }
  }
}, [currentSong?.progreso]);
  return (
    <div>
      <div
        className={!mostrarPlaylist ? "playlist-active" : "playlist-close"}
        onClick={() => setMostrarPlaylist(!mostrarPlaylist)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="16"
          viewBox="0 0 12 16"
          id="three"
          className="three-bars-svg"
          style={{ display: !mostrarPlaylist ? "inline-block" : "none" }}
        >
          <g
            id="Octicons"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="three-bars" fill="#000">
              <path
                id="Shape"
                d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
              ></path>
            </g>
          </g>
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: mostrarPlaylist ? "inline-block" : "none" }}
          className="close-svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Edit / Close_Square">
              {" "}
              <path
                id="Vector"
                d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      <div className="reproductor" style={estilos.contenedor}>
        {currentSong ? (
          <div className="info-cancion">
            <img
              src={currentSong.imagen}
              alt={currentSong.titulo}
              className="imagen-cancion"
            />
            <div>
              <h3 className="titulo-cancion">{currentSong.titulo}</h3>
              <p className="artista-cancion">{currentSong.artista}</p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Selecciona una canción</p>
        )}
        { duracion > 0 &&
          <span className="duracion">
            {Math.floor(duracion / 60)}:
            {Math.floor(duracion % 60) <= 1 ? "0" : ""}
            {Math.floor(duracion % 60)}
          </span>
        }
        <input
          type="range"
          min="2"
          max={duracion}
          value={progreso}
          onChange={manejarCambioProgreso}
          style={estilos.barraProgreso}
        />{" "}
        { duracion > 0 &&
          <span className="progreso">
            {Math.floor(progreso / 60)}:
            {Math.floor(progreso % 60) < 10 ? "0" : ""}
            {Math.floor(progreso % 60)}
          </span>
        }
        <Buttons
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          volumen={volumen}
          cambiarVolumen={cambiarVolumen}
          mute={mute}
          toggleMute={toggleMute}
          toggleShuffle={toggleShuffle}
          isShuffle={isShuffle}
          toggleRepeat={toggleRepeat}
          repeatMode={repeatMode}
          playPreviousSong={playPreviousSong}
          playNextSong={playNextSong}
        />
      </div>
    </div>
  );
};

export default Reproductor;
