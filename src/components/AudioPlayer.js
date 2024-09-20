// src/components/AudioPlayer.js
import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Inicialmente no está reproduciendo

  useEffect(() => {
    // Función para intentar reproducir el audio
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true); // Marcar como reproducido si tiene éxito
      } catch (error) {
        console.log('Autoplay prevented:', error);
        // No hacer nada si la reproducción automática falla
      }
    };

    // Intentar reproducir el audio cuando el componente se monta
    playAudio();

    // Limpiar la reproducción cuando el componente se desmonte
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-20 right-4">
      <button
        onClick={togglePlayPause}
        className="bg-violet-400 p-2 rounded-full hover:bg-teal-700"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <img
          src="/miboda/images/musica.png"
          alt={isPlaying ? 'Pause' : 'Play'}
          className="w-6 h-6"
        />
      </button>
      <audio ref={audioRef} loop>
        <source src="/miboda/music/fondomusic.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;