import React from "react";
import { CommandDefinition } from "@/commands/types";

export const previousCommand: CommandDefinition = {
  command: "previous",
  description: "Return to the previous track",
  category: "media",
  execute: (_, ctx) => {
    ctx.music.previous();
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-cyan-400" },
        "⏮ Returned to previous track."
      ),
    };
  },
};
