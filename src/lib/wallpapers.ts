export type WallpaperId = "nocturne" | "aurora";
export type Wallpaper = { id: WallpaperId; name: string; video: string; poster: string; tone: string };
export const WALLPAPERS: Wallpaper[] = [
  { id: "nocturne", name: "Nocturne", video: "/wallpapers/nocturne.mp4", poster: "/posters/nocturne.svg", tone: "dark" },
  { id: "aurora", name: "Aurora Drift", video: "/wallpapers/aurora.mp4", poster: "/posters/aurora.svg", tone: "light" },
];
export const DEFAULT_LOCK_WALLPAPER: WallpaperId = "nocturne";
export const DEFAULT_HOME_WALLPAPER: WallpaperId = "aurora";
