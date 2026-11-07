import { tokenizeCommand } from "@/lib/terminal/tokenizer";
import { ParsedCommand } from "@/types/terminal";

/**
 * Parses raw terminal input into a normalized, case-insensitive command token
 * and preserved argument list.
 */
export function parseCommandInput(rawInput: string): ParsedCommand {
  return tokenizeCommand(rawInput);
}
