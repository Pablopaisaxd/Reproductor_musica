import React from 'react';

const estilos = {
  contenedor: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 400,
    margin: 'auto',
  },
  boton: {
    cursor: 'pointer',
    fontSize: 20,
  },
  barraVolumen: {
    width: 100,
  },
};

const Buttons = ({ isPlaying, togglePlay, volumen, cambiarVolumen, mute, toggleMute }) => {
  return (
    <div style={estilos.contenedor}>
      <button onClick={togglePlay} style={estilos.boton}>
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={mute ? 0 : volumen * 100}
        onChange={(e) => cambiarVolumen(Number(e.target.value) / 100)}
        style={estilos.barraVolumen}
      />

      <button onClick={toggleMute} style={estilos.boton}>
        {mute ? '🔈' : '🔇'}
      </button>
    </div>
  );
};

export default Buttons;
