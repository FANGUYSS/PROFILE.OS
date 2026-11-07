/**
 * Normalizes raw terminal input:
 * - trims leading and trailing whitespace
 * - collapses multiple consecutive spaces into a single space
 */
export function normalizeInput(raw: string): string {
  if (!raw) return "";
  return raw.trim().replace(/\s+/g, " ");
}

/**
 * Normalizes a command name token into lowercase for case-insensitive execution.
 */
export function normalizeCommandName(commandToken: string): string {
  return commandToken.trim().toLowerCase();
}
