import { normalizeCommandName, normalizeInput } from "./normalize";
import { ParsedCommand } from "@/types/terminal";

/**
 * Splits normalized terminal input into command and arguments,
 * preserving quoted strings (e.g., play "Midnight Protocol").
 */
export function tokenizeCommand(rawInput: string): ParsedCommand {
  const normalizedInput = normalizeInput(rawInput);

  if (!normalizedInput) {
    return {
      raw: rawInput,
      normalizedInput: "",
      commandName: "",
      args: [],
    };
  }

  const tokens: string[] = [];
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(normalizedInput)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
  }

  const commandName = normalizeCommandName(tokens[0] || "");
  const args = tokens.slice(1);

  return {
    raw: rawInput,
    normalizedInput,
    commandName,
    args,
  };
}
