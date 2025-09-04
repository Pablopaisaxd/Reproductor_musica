import React from 'react'

export const  Reproductor = () => {


  return (
    <div> 
      <audio controls>
        <source src="viper.mp3" type="audio/mp3" />                              +
        <source src="viper.ogg" type="audio/ogg" />
        <p>
          Su navegador no es compatible con audio HTML5. Aquí hay un
          <a href="viper.mp3">enlace al audio</a> en su lugar.
        </p>
      </audio>
    </div>
  )
}
