import { ReactNode } from "react";
import { ThemeMode } from "@/context/ThemeContext";
import { Track } from "@/types/music";

export type CommandCategory = "core" | "system" | "navigation" | "media" | "easter-egg";

export interface ParsedCommand {
  raw: string;
  normalizedInput: string;
  commandName: string;
  args: string[];
}

export interface CommandExecutionContext {
  history: string[];
  clearTerminal: () => void;
  resetHome: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  triggerMatrix: () => void;
  discordStatus: {
    connected: boolean;
    status: string;
    username: string;
    customStatus?: string;
    activities: { name: string; details?: string; state?: string; type: number }[];
    spotify?: { song: string; artist: string; album: string } | null;
  };
  music: {
    currentTrack: Track;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    error: string | null;
    playTrack: (query?: string) => boolean;
    pause: () => void;
    resume: () => void;
    next: () => void;
    previous: () => void;
    tracks: Track[];
  };
}

export interface CommandResult {
  output?: ReactNode | string;
  panel?: "about" | "skills" | "github" | "discord" | "music" | "socials" | "home" | null;
}

export interface CommandDefinition {
  command: string;
  description: string;
  category: CommandCategory;
  aliases?: string[];
  usage?: string;
  execute: (args: string[], ctx: CommandExecutionContext) => CommandResult;
}

export interface TerminalLogEntry {
  id: string;
  rawInput: string;
  output: React.ReactNode;
  timestamp: string;
}
