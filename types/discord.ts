export interface LanyardActivityTimestamps {
  start?: number;
  end?: number;
}

export interface LanyardActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: LanyardActivityTimestamps;
  application_id?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardSpotify {
  song: string;
  artist: string;
  album: string;
  album_art_url?: string;
  track_id?: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardDiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot?: boolean;
  global_name?: string;
  display_name?: string;
}

export interface LanyardData {
  spotify: LanyardSpotify | null;
  listening_to_spotify: boolean;
  discord_user: LanyardDiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_web: boolean;
}

export interface LanyardApiResponse {
  success: boolean;
  data: LanyardData;
}

export interface DiscordPresenceState {
  connected: boolean;
  loading: boolean;
  status: "online" | "idle" | "dnd" | "offline";
  username: string;
  displayName: string;
  avatarUrl: string | null;
  customStatus?: string;
  activities: LanyardActivity[];
  spotify: {
    song: string;
    artist: string;
    album: string;
    albumArtUrl?: string;
    timestamps?: { start: number; end: number };
  } | null;
}
