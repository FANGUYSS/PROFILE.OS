import React from "react";
import { CommandDefinition } from "@/commands/types";

export const homeCommand: CommandDefinition = {
  command: "home",
  description: "Return to the main PROFILE.OS workspace",
  category: "core",
  execute: (_, ctx) => {
    ctx.resetHome();
    return {
      panel: "home",
      output: React.createElement(
        "span",
        { className: "text-zinc-400 font-mono text-xs" },
        "Returned to primary PROFILE.OS workspace."
      ),
    };
  },
};
