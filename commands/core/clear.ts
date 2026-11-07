import { CommandDefinition } from "@/commands/types";

export const clearCommand: CommandDefinition = {
  command: "clear",
  description: "Clear the terminal output buffer",
  category: "core",
  execute: (_, ctx) => {
    ctx.clearTerminal();
    return {};
  },
};
