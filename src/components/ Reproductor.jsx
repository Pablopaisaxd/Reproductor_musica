import React, { useState, useEffect } from 'react';
import Buttons from './Buttons';
import musica1 from '../assets/music/Mon Laferte - Mi Buen Amor ft. Enrique Bunbury.mp3';
// import musica2 from '../assets/music/Los Bukis - Tu cárcel.mp3';

const estilos = {
  contenedor: {
    maxWidth: 400,
    margin: 'auto',
  },
  barraProgreso: {
    width: '100%',
    marginTop: 10,
  },
};

const Reproductor = () => {
  const [audio] = useState(new Audio(musica1));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, audio]);

  useEffect(() => {
    audio.volume = volumen;
    audio.muted = mute;
  }, [volumen, mute, audio]);

  useEffect(() => {
    const manejarTiempo = () => setProgreso(audio.currentTime);
    const manejarCargaMetadata = () => setDuracion(audio.duration);
    const manejarFin = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', manejarTiempo);
    audio.addEventListener('loadedmetadata', manejarCargaMetadata);
    audio.addEventListener('ended', manejarFin);

    return () => {
      audio.removeEventListener('timeupdate', manejarTiempo);
      audio.removeEventListener('loadedmetadata', manejarCargaMetadata);
      audio.removeEventListener('ended', manejarFin);
    };
  }, [audio]);

  const manejarCambioProgreso = (e) => {
    const nuevoTiempo = Number(e.target.value);
    audio.currentTime = nuevoTiempo;
    setProgreso(nuevoTiempo);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const cambiarVolumen = (nuevoVolumen) => {
    setVolumen(nuevoVolumen);
    setMute(nuevoVolumen === 0);
  };

  const toggleMute = () => setMute(!mute);

  return (
    <div className="reproductor" style={estilos.contenedor}>
      <input
        type="range"
        min="0"
        max={duracion}
        value={progreso}
        onChange={manejarCambioProgreso}
        style={estilos.barraProgreso}
      />

      <Buttons
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        volumen={volumen}
        cambiarVolumen={cambiarVolumen}
        mute={mute}
        toggleMute={toggleMute}
      />
    </div>
  );
};

export default Reproductor;
