import { COMMAND_METADATA, DEFAULT_COMMAND_SUGGESTIONS } from "@/data/commands";
import { MUSIC_LIBRARY } from "@/data/music";
import { SOCIAL_LINKS } from "@/data/socials";

const ALL_COMMANDS = COMMAND_METADATA.map((c) => c.command);

/**
 * Returns matching command suggestions for the current input string.
 */
export function getCommandSuggestions(partialInput: string, limit = 8): string[] {
  const trimmed = partialInput.trim().toLowerCase();
  if (!trimmed) {
    return DEFAULT_COMMAND_SUGGESTIONS.slice(0, limit);
  }

  const parts = trimmed.split(/\s+/);

  // Argument-level suggestions for specific commands
  if (parts.length >= 2) {
    const cmd = parts[0];
    const argPrefix = parts.slice(1).join(" ");

    if (cmd === "open" || cmd === "visit") {
      return Object.keys(SOCIAL_LINKS)
        .filter((k) => k.startsWith(argPrefix))
        .map((k) => `${cmd} ${k}`);
    }

    if (cmd === "play") {
      return MUSIC_LIBRARY.filter(
        (t) =>
          t.id.toLowerCase().startsWith(argPrefix) ||
          t.title.toLowerCase().includes(argPrefix)
      ).map((t) => `play ${t.id}`);
    }

    if (cmd === "theme") {
      return ["midnight", "purple", "cyan", "terminal"]
        .filter((t) => t.startsWith(argPrefix))
        .map((t) => `theme ${t}`);
    }
  }

  return ALL_COMMANDS.filter((cmd) => cmd.startsWith(trimmed)).slice(0, limit);
}

/**
 * Resolves Tab key autocomplete for partial command or argument input.
 */
export function resolveTabAutocomplete(partialInput: string): string {
  const suggestions = getCommandSuggestions(partialInput, 1);
  if (suggestions.length > 0) {
    return suggestions[0];
  }
  return partialInput;
}
