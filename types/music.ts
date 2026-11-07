export type RepeatMode = "off" | "all" | "one";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  audio: string;
  artwork: string;
  duration: number;
}

export interface MusicState {
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
}
