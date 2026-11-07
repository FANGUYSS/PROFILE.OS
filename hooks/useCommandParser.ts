import { useCallback } from "react";
import { parseCommandInput } from "@/commands/parser";
import { getCommandDefinition } from "@/commands/registry";
import { ParsedCommand } from "@/types/terminal";

export function useCommandParser() {
  const parse = useCallback((raw: string): ParsedCommand => {
    return parseCommandInput(raw);
  }, []);

  const resolveDefinition = useCallback((commandName: string) => {
    return getCommandDefinition(commandName);
  }, []);

  return {
    parse,
    resolveDefinition,
  };
}
