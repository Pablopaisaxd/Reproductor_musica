import React from "react";
import "../styles/buttons.css"

const estilos = {
  contenedor: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
  },
  boton: {
    cursor: "pointer",
    fontSize: 20,
  },
  barraVolumen: {
    width: 100,
  },
};

const Buttons = ({
  isPlaying,
  togglePlay,
  volumen,
  cambiarVolumen,
  mute,
  toggleMute,
  playNextSong,
  playPreviousSong,
  toggleShuffle,
  isShuffle,
  toggleRepeat,
  repeatMode
}) => {
  return (
    <div style={estilos.contenedor}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`repeat-button ${repeatMode}`} onClick={toggleRepeat}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.57996 5.15991H17.42C19.08 5.15991 20.42 6.49991 20.42 8.15991V11.4799" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.73996 2L3.57996 5.15997L6.73996 8.32001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.42 18.84H6.57996C4.91996 18.84 3.57996 17.5 3.57996 15.84V12.52" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.26 21.9999L20.42 18.84L17.26 15.6799" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g>{repeatMode === "one" && (
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
          fontWeight="bold"
        >
          1
        </text>
      )}</svg>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="previous-button" onClick={playPreviousSong}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.24 18.1801V5.82007" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <button onClick={togglePlay} style={estilos.boton}>
        {isPlaying ? "⏸️" : "▶️"}
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
        {mute ? "🔈" : "🔇"}
      </button>

      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="next-button" onClick={playNextSong}>
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
          <path
            d="M20.24 18.1801V5.82007"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>
      </svg>
    
<svg
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className={isShuffle ? "shuffle-button active" : "shuffle-button inactive"}
  onClick={toggleShuffle}
>
  <path
    d="M3 17.9799L5.54999 17.9899C6.45999 17.9899 7.31 17.5399 7.81 16.7899L14.2 7.20994C14.7 6.45994 15.55 5.99993 16.46 6.00993L21.01 6.02994"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M19 19.98L21 17.98"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M8.89001 8.61993L7.81 7.11993C7.3 6.40993 6.47999 5.98993 5.60999 5.99993L3 6.00994"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12.97 15.3799L14.19 16.9499C14.7 17.6099 15.5 17.9999 16.34 17.9999L21.01 17.9799"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M21 6.02002L19 4.02002"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

    </div>
  );
};

export default Buttons;
