"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { MUSIC_LIBRARY } from "@/data/music";
import { RepeatMode, Track } from "@/types/music";
import { createAudioElement } from "@/lib/music/player";
import { getNextTrackIndex, getPreviousTrackIndex } from "@/lib/music/queue";
import { loadMusicPreferences, saveMusicPreference } from "@/lib/music/storage";

interface MusicContextValue {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  error: string | null;
  playTrack: (queryOrId?: string) => boolean;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
}

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(MUSIC_LIBRARY[0].duration);
  const [volume, setVolumeState] = useState(0.75);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = MUSIC_LIBRARY[trackIndex] || MUSIC_LIBRARY[0];

  // Hydrate preferences on mount
  useEffect(() => {
    const prefs = loadMusicPreferences();
    if (prefs.trackId) {
      const idx = MUSIC_LIBRARY.findIndex((t) => t.id === prefs.trackId);
      if (idx !== -1) setTrackIndex(idx);
    }
    setVolumeState(prefs.volume);
    setMuted(prefs.muted);
    setShuffle(prefs.shuffle);
    setRepeat(prefs.repeat);
  }, []);

  // Initialize HTML5 Audio instance
  useEffect(() => {
    const audio = createAudioElement();
    if (!audio) return;
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setError(null);
    };

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onError = () => {
      setError("Unable to load track from /public/music/. Place MP3 files in public/music/.");
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Sync track source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setError(null);
    audio.src = currentTrack.audio;
    setDuration(currentTrack.duration);
    setCurrentTime(0);
    saveMusicPreference("TRACK_ID", currentTrack.id);

    if (isPlaying) {
      audio.play().catch(() => {
        setError("Unable to load track. Check MP3 path in /public/music/.");
        setIsPlaying(false);
      });
    }
  }, [trackIndex]);

  // Handle track ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const nextIdx = getNextTrackIndex(trackIndex, MUSIC_LIBRARY.length, shuffle, repeat);
      if (nextIdx !== null) {
        setTrackIndex(nextIdx);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [trackIndex, shuffle, repeat]);

  // Sync volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const resume = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) audio.src = currentTrack.audio;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setError(null);
      })
      .catch(() => {
        setError("Unable to load track.");
        setIsPlaying(false);
      });
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else resume();
  };

  const playTrack = (queryOrId?: string): boolean => {
    if (!queryOrId) {
      resume();
      return true;
    }

    const q = queryOrId.toLowerCase().trim();
    const foundIdx = MUSIC_LIBRARY.findIndex(
      (track) => track.id.toLowerCase() === q || track.title.toLowerCase().includes(q)
    );

    if (foundIdx === -1) return false;

    if (foundIdx === trackIndex) {
      resume();
      return true;
    }

    setTrackIndex(foundIdx);
    setIsPlaying(true);
    return true;
  };

  const next = () => {
    const nextIdx = getNextTrackIndex(trackIndex, MUSIC_LIBRARY.length, shuffle, repeat);
    if (nextIdx === null) {
      setIsPlaying(false);
      return;
    }
    if (nextIdx === trackIndex) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      setCurrentTime(0);
      resume();
      return;
    }
    setTrackIndex(nextIdx);
  };

  const previous = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setTrackIndex(getPreviousTrackIndex(trackIndex, MUSIC_LIBRARY.length));
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(time, duration));
    audioRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    setMuted(clamped === 0);
    saveMusicPreference("VOLUME", clamped);
    saveMusicPreference("MUTED", clamped === 0);
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    saveMusicPreference("MUTED", nextMuted);
  };

  const toggleShuffle = () => {
    const nextShuffle = !shuffle;
    setShuffle(nextShuffle);
    saveMusicPreference("SHUFFLE", nextShuffle);
  };

  const cycleRepeat = () => {
    const order: RepeatMode[] = ["off", "all", "one"];
    const nextMode = order[(order.indexOf(repeat) + 1) % order.length];
    setRepeat(nextMode);
    saveMusicPreference("REPEAT", nextMode);
  };

  return (
    <MusicContext.Provider
      value={{
        tracks: MUSIC_LIBRARY,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        muted,
        shuffle,
        repeat,
        error,
        playTrack,
        togglePlay,
        pause,
        resume,
        next,
        previous,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle,
        cycleRepeat,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
