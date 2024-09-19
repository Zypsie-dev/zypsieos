import { useState, useEffect, useRef } from 'react';

export function useAudio() {
  const audioRef = useRef(new Audio());
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const play = () => audioRef.current.play();
  const pause = () => audioRef.current.pause();
  const setTime = (time: number) => {
    audioRef.current.currentTime = time;
  };
  const setVolume = (volume: number) => {
    audioRef.current.volume = volume;
  };

  return {
    audio: audioRef.current,
    duration,
    currentTime,
    play,
    pause,
    setTime,
    setVolume,
  };
}
