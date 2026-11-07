import React from "react";
import { CommandDefinition } from "@/commands/types";

export const resumeCommand: CommandDefinition = {
  command: "resume",
  description: "Resume local audio playback",
  category: "media",
  execute: (_, ctx) => {
    ctx.music.resume();
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-emerald-400" },
        `▶ Resumed playback: ${ctx.music.currentTrack.title}`
      ),
    };
  },
};
