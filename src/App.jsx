import React, { use, useEffect, useState } from 'react'
import { File } from './components/File'
import Reproductor from './components/ Reproductor'
import { Playlist } from './components/Playlist';

export const App = () => {
   const [mostrarPlaylist, setMostrarPlaylist] = useState(false);
     const [files, setFiles] = useState([])
     const [currentSong, setCurrentSong] = useState(null);
     
  return (
    <div>
        <File setFiles={setFiles} mostrarPlaylist={mostrarPlaylist}/>
        <Reproductor setMostrarPlaylist={setMostrarPlaylist} mostrarPlaylist={mostrarPlaylist} currentSong={currentSong} files={files} setCurrentSong={setCurrentSong}/>
        {mostrarPlaylist && <Playlist files={files} setCurrentSong={setCurrentSong} setFiles={setFiles} currentSong={currentSong}/> }
    </div>
  )
}

