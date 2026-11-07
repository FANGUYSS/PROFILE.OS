import React from "react";
import { CommandDefinition } from "@/commands/types";

export const pauseCommand: CommandDefinition = {
  command: "pause",
  description: "Pause local audio playback",
  category: "media",
  execute: (_, ctx) => {
    ctx.music.pause();
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-zinc-400" },
        "⏸ Audio playback paused."
      ),
    };
  },
};
