import { CommandCategory } from "@/types/terminal";

export interface CommandMetadataItem {
  command: string;
  description: string;
  category: CommandCategory;
  usage?: string;
}

export const COMMAND_METADATA: CommandMetadataItem[] = [
  // Core Portfolio Commands
  { command: "help", description: "Show all available PROFILE.OS commands", category: "core" },
  { command: "clear", description: "Clear the terminal output buffer", category: "core" },
  { command: "home", description: "Return to the main PROFILE.OS workspace", category: "core" },
  { command: "about", description: "Display identity, bio, and engineering philosophy", category: "core" },
  { command: "whoami", description: "Print effective user and workstation identity", category: "core" },
  { command: "projects", description: "View project philosophy and GitHub source of truth", category: "core" },
  { command: "skills", description: "Display categorized technology stack and capabilities", category: "core" },
  { command: "stack", description: "Render architectural stack blueprint", category: "core" },
  { command: "experience", description: "Show engineering focus and experience timeline", category: "core" },
  { command: "contact", description: "Display direct email contact card", category: "core" },
  { command: "socials", description: "List official public links (GitHub, YouTube, Instagram, Email)", category: "core" },
  { command: "discord", description: "Inspect live Discord presence via Lanyard", category: "core" },
  { command: "github", description: "Open GitHub profile summary and repository link", category: "core" },

  // System Commands
  { command: "status", description: "Check real-time subsystem telemetry", category: "system" },
  { command: "neofetch", description: "Display system information and custom ASCII emblem", category: "system" },
  { command: "history", description: "Display commands used during the current session", category: "system" },
  { command: "date", description: "Print current UTC and local workstation date/time", category: "system" },
  { command: "pwd", description: "Print current working directory (/home/fanguyss)", category: "system" },
  { command: "ls", description: "List virtual filesystem modules", category: "system" },

  // Navigation Commands
  { command: "open", description: "Open external profile or internal panel", category: "navigation", usage: "open <github|youtube|instagram|discord|email>" },
  { command: "visit", description: "Alias for open command", category: "navigation", usage: "visit <github|youtube|instagram|discord|email>" },

  // Media / Local Music Commands
  { command: "music", description: "Open local music library and player controls", category: "media" },
  { command: "nowplaying", description: "Show currently active track and timestamp", category: "media" },
  { command: "play", description: "Play current track or search by ID/title", category: "media", usage: 'play [track-01 | "song name"]' },
  { command: "pause", description: "Pause local audio playback", category: "media" },
  { command: "resume", description: "Resume local audio playback", category: "media" },
  { command: "next", description: "Skip to the next track in the queue", category: "media" },
  { command: "previous", description: "Return to the previous track", category: "media" },

  // Easter Eggs
  { command: "theme", description: "Inspect or switch subtle PROFILE.OS visual themes", category: "easter-egg", usage: "theme [midnight|purple|cyan|terminal]" },
  { command: "matrix", description: "Trigger temporary digital rain visual effect", category: "easter-egg" },
  { command: "coffee", description: "Brew 3am developer fuel", category: "easter-egg" },
  { command: "fortune", description: "Print a random engineering aphorism", category: "easter-egg" },
  { command: "ascii", description: "Render full FANGUYSS ASCII banner", category: "easter-egg" },
  { command: "secret", description: "Reveal classified Konami sequence hint", category: "easter-egg" },
  { command: "sudo", description: "Attempt superuser privilege escalation", category: "easter-egg" },
  { command: "konami", description: "Unlock overdrive protocol visual surprise", category: "easter-egg" },
  { command: "42", description: "Query the Ultimate Answer to Life, the Universe, and Everything", category: "easter-egg" },
];

export const DEFAULT_COMMAND_SUGGESTIONS: string[] = [
  "help",
  "about",
  "skills",
  "projects",
  "discord",
  "music",
  "github",
  "socials",
];
