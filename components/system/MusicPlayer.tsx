'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Slider } from '@nextui-org/slider';
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
} from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  album: string;
  path: string;
}

export default function MusicApp() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/music');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Failed to load songs. Please try again later.');
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.path;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setError('Failed to play the song. Please try again.');
        });
      }
    }
  }, [currentSong, isPlaying]);

  const handlePlay = (song: Song, index: number) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!currentSong && songs.length > 0) {
      setCurrentSong(songs[0]);
      setCurrentSongIndex(0);
      setIsPlaying(true);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setError('Failed to play the song. Please try again.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number | number[]) => {
    const newTime = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleNext = () => {
    if (songs.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
      setCurrentSongIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (songs.length > 0) {
      const previousIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[previousIndex]);
      setCurrentSongIndex(previousIndex);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <Card>
          <CardBody>
            <p className="text-red-500">{error}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
          <Input
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Library</h2>
          <ul>
            {filteredSongs.map((song, index) => (
              <li key={index} className='my-1'>
                <Button
                  className={`py-2 px-3 rounded cursor-pointer w-full ${
                    currentSong?.path === song.path
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handlePlay(song, index)}
                >
                  <div className="font-semibold">{song.title}</div>
                  <div className="text-sm text-gray-400 truncate">{song.artist}</div>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6">Now Playing</h1>
          {currentSong && (
            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-gray-700 rounded-lg shadow-lg mb-6"></div>
              <h2 className="text-2xl font-bold">{currentSong.title}</h2>
              <p className="text-gray-400">{currentSong.artist}</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <Button isIconOnly onClick={handlePrevious} variant="light">
              <SkipBackIcon size={24} />
            </Button>
            <Button isIconOnly onClick={handlePlayPause} variant="light">
              {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </Button>
            <Button isIconOnly onClick={handleNext} variant="light">
              <SkipForwardIcon size={24} />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <VolumeIcon size={20} />
            <Slider
              aria-label="Volume"
              size="sm"
              step={0.1}
              maxValue={1}
              minValue={0}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <Slider
            aria-label="Song progress"
            size="sm"
            step={1}
            maxValue={duration}
            minValue={0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1"
          />
          <span className="text-sm">{formatTime(duration)}</span>
        </div>
      </div>
      <audio
        ref={audioRef}
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
        onError={() => {
          setError(
            'An error occurred while playing the audio. Please try again.'
          );
        }}
      >
        <track kind="captions" />
      </audio>
    </div>
  );
}
