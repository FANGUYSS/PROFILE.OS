import { RepeatMode } from "@/types/music";

const KEYS = {
  TRACK_ID: "profile_os_music_track_id",
  VOLUME: "profile_os_music_volume",
  MUTED: "profile_os_music_muted",
  SHUFFLE: "profile_os_music_shuffle",
  REPEAT: "profile_os_music_repeat",
} as const;

export interface PersistedMusicPreferences {
  trackId: string | null;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
}

export function loadMusicPreferences(): PersistedMusicPreferences {
  if (typeof window === "undefined") {
    return {
      trackId: null,
      volume: 0.75,
      muted: false,
      shuffle: false,
      repeat: "off",
    };
  }

  try {
    const trackId = localStorage.getItem(KEYS.TRACK_ID);
    const rawVolume = localStorage.getItem(KEYS.VOLUME);
    const rawMuted = localStorage.getItem(KEYS.MUTED);
    const rawShuffle = localStorage.getItem(KEYS.SHUFFLE);
    const rawRepeat = localStorage.getItem(KEYS.REPEAT) as RepeatMode | null;

    const volume =
      rawVolume !== null && !isNaN(parseFloat(rawVolume))
        ? Math.max(0, Math.min(1, parseFloat(rawVolume)))
        : 0.75;

    const repeat: RepeatMode =
      rawRepeat && ["off", "all", "one"].includes(rawRepeat) ? rawRepeat : "off";

    return {
      trackId,
      volume,
      muted: rawMuted === "true",
      shuffle: rawShuffle === "true",
      repeat,
    };
  } catch {
    return {
      trackId: null,
      volume: 0.75,
      muted: false,
      shuffle: false,
      repeat: "off",
    };
  }
}

export function saveMusicPreference<K extends keyof typeof KEYS>(
  key: K,
  value: string | number | boolean
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEYS[key], String(value));
  } catch {
    // Ignore localStorage quota/privacy errors
  }
}
