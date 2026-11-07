import { Track } from "@/types/music";

/**
 * Finds a track in the library by exact ID or case-insensitive title match.
 */
export function findTrackByQuery(tracks: Track[], query?: string): { track: Track; index: number } | null {
  if (!tracks.length) return null;
  if (!query || !query.trim()) {
    return { track: tracks[0], index: 0 };
  }

  const normalized = query.trim().toLowerCase().replace(/^["']|["']$/g, "");

  // 1. Exact ID match (e.g. "track-01")
  const exactIdIndex = tracks.findIndex((t) => t.id.toLowerCase() === normalized);
  if (exactIdIndex !== -1) {
    return { track: tracks[exactIdIndex], index: exactIdIndex };
  }

  // 2. Partial title or artist match
  const titleIndex = tracks.findIndex(
    (t) =>
      t.title.toLowerCase().includes(normalized) ||
      t.artist.toLowerCase().includes(normalized)
  );
  if (titleIndex !== -1) {
    return { track: tracks[titleIndex], index: titleIndex };
  }

  return null;
}

/**
 * Safely creates an HTMLAudioElement on the client.
 */
export function createAudioElement(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const audio = new Audio();
  audio.preload = "metadata";
  return audio;
}
