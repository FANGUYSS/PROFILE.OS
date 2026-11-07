import React from "react";
import { CommandDefinition } from "@/commands/types";

export const playCommand: CommandDefinition = {
  command: "play",
  description: "Play current track or search by ID/title",
  category: "media",
  usage: 'play [track-01 | "song name"]',
  execute: (args, ctx) => {
    const query = args.join(" ").trim();
    const matched = ctx.music.playTrack(query || undefined);

    if (!matched) {
      return {
        output: React.createElement(
          "div",
          { className: "font-mono text-xs text-rose-400" },
          `Track matching "${query}" not found in library. Run music to see available tracks.`
        ),
      };
    }

    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-emerald-400" },
        `▶ Playing ${query ? `requested track` : ctx.music.currentTrack.title}...`
      ),
    };
  },
};
