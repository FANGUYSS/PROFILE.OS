import { CommandDefinition } from "@/commands/types";
import { openCommand } from "./open";

export const visitCommand: CommandDefinition = {
  command: "visit",
  description: "Visit external profile or internal panel",
  category: "navigation",
  usage: "visit <github|youtube|instagram|discord|email>",
  execute: (args, ctx) => openCommand.execute(args, ctx),
};
