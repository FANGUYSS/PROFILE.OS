import { RepeatMode, Track } from "@/types/music";

/**
 * Calculates the next track index based on current index, shuffle, and repeat mode.
 */
export function getNextTrackIndex(
  currentIndex: number,
  totalTracks: number,
  shuffle: boolean,
  repeat: RepeatMode
): number | null {
  if (totalTracks <= 0) return null;

  if (repeat === "one") {
    return currentIndex;
  }

  if (shuffle && totalTracks > 1) {
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * totalTracks);
    }
    return nextIndex;
  }

  if (currentIndex + 1 < totalTracks) {
    return currentIndex + 1;
  }

  if (repeat === "all") {
    return 0;
  }

  return null;
}

/**
 * Calculates the previous track index.
 */
export function getPreviousTrackIndex(currentIndex: number, totalTracks: number): number {
  if (totalTracks <= 0) return 0;
  return (currentIndex - 1 + totalTracks) % totalTracks;
}

/**
 * Returns the upcoming tracks ordered from the current position.
 */
export function getUpcomingQueue(tracks: Track[], currentIndex: number): Track[] {
  if (!tracks.length) return [];
  return [...tracks.slice(currentIndex + 1), ...tracks.slice(0, currentIndex)];
}
