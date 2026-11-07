import React from "react";
import { CommandDefinition } from "@/commands/types";
import { formatTime } from "@/lib/utils";

export const nowPlayingCommand: CommandDefinition = {
  command: "nowplaying",
  description: "Show the currently active local track",
  category: "media",
  execute: (_, ctx) => {
    const { currentTrack, currentTime, duration, isPlaying } = ctx.music;
    return {
      panel: "music",
      output: React.createElement(
        "div",
        { className: "font-mono text-xs space-y-1.5 text-zinc-300" },
        React.createElement("div", { className: "text-cyan-300 font-semibold" }, "NOW PLAYING"),
        React.createElement("div", null, `${isPlaying ? "▶" : "Ⅱ"} ${currentTrack.title}`),
        React.createElement("div", { className: "text-zinc-500" }, currentTrack.artist),
        React.createElement(
          "div",
          { className: "text-zinc-600" },
          `${formatTime(currentTime)} / ${formatTime(duration || currentTrack.duration)}`
        )
      ),
    };
  },
};
