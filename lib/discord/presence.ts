import { SITE_CONFIG } from "@/lib/constants";
import { DiscordPresenceState, LanyardActivity, LanyardData } from "@/types/discord";

export const INITIAL_DISCORD_PRESENCE: DiscordPresenceState = {
  connected: false,
  loading: true,
  status: "offline",
  username: SITE_CONFIG.brand,
  displayName: SITE_CONFIG.brand,
  avatarUrl: null,
  customStatus: undefined,
  activities: [],
  spotify: null,
};

/**
 * Transforms raw Lanyard payload into normalized PROFILE.OS DiscordPresenceState.
 */
export function normalizeLanyardPresence(data: LanyardData | null): DiscordPresenceState {
  if (!data) {
    return {
      ...INITIAL_DISCORD_PRESENCE,
      loading: false,
      connected: false,
    };
  }

  const user = data.discord_user;
  const userId = user?.id || SITE_CONFIG.lanyardId;
  const avatarHash = user?.avatar;

  const avatarUrl = avatarHash
    ? `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${
        avatarHash.startsWith("a_") ? "gif" : "png"
      }?size=128`
    : null;

  const rawActivities: LanyardActivity[] = Array.isArray(data.activities)
    ? data.activities
    : [];

  // Type 4 is Custom Status on Discord
  const customActivity = rawActivities.find((act) => act.type === 4);
  const filteredActivities = rawActivities.filter(
    (act) => act.type !== 4 && act.name !== "Spotify"
  );

  return {
    connected: true,
    loading: false,
    status: data.discord_status || "offline",
    username: user?.username || SITE_CONFIG.brand,
    displayName:
      user?.global_name || user?.display_name || user?.username || SITE_CONFIG.brand,
    avatarUrl,
    customStatus: customActivity?.state,
    activities: filteredActivities,
    spotify:
      data.listening_to_spotify && data.spotify
        ? {
            song: data.spotify.song,
            artist: data.spotify.artist,
            album: data.spotify.album,
            albumArtUrl: data.spotify.album_art_url,
            timestamps: data.spotify.timestamps,
          }
        : null,
  };
}
