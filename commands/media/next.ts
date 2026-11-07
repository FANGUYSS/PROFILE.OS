import React from "react";
import { CommandDefinition } from "@/commands/types";

export const nextCommand: CommandDefinition = {
  command: "next",
  description: "Skip to the next track in the queue",
  category: "media",
  execute: (_, ctx) => {
    ctx.music.next();
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-cyan-400" },
        "⏭ Skipped to next track."
      ),
    };
  },
};
