import React from "react";
import { CommandDefinition } from "@/commands/types";

export const pwdCommand: CommandDefinition = {
  command: "pwd",
  description: "Print current working directory (/home/fanguyss)",
  category: "system",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "font-mono text-xs sm:text-sm text-zinc-200" },
      "/home/fanguyss"
    ),
  }),
};
