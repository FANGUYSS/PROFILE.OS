import React from "react";
import { CommandDefinition } from "@/commands/types";
import { SUDO_RESPONSE } from "@/data/easterEggs";

export const sudoCommand: CommandDefinition = {
  command: "sudo",
  description: "Attempt superuser privilege escalation",
  category: "easter-egg",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "font-mono text-xs text-amber-300 whitespace-pre-line space-y-1" },
      SUDO_RESPONSE
    ),
  }),
};
