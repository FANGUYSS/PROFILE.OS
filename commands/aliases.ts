/**
 * Command alias registry.
 * Note: "social" is intentionally NOT aliased to "socials" per Section 9 specification:
 * "There should be socials, not both social and socials."
 */
export const COMMAND_ALIASES: Record<string, string> = {
  visit: "open",
  nowplaying: "music",
  np: "music",
  cls: "clear",
};

/**
 * Resolves a normalized command name through the alias map.
 */
export function resolveCommandAlias(commandName: string): string {
  const lower = commandName.toLowerCase();
  return COMMAND_ALIASES[lower] || lower;
}
