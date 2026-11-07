import React from "react";
import { CommandDefinition } from "@/commands/types";
import { formatTime } from "@/lib/utils";

export const musicCommand: CommandDefinition = {
  command: "music",
  description: "Open local music library and player controls",
  category: "media",
  execute: (_, ctx) => {
    const { currentTrack, isPlaying, currentTime, duration, tracks, error } = ctx.music;

    return {
      panel: "music",
      output: React.createElement(
        "div",
        {
          className:
            "font-mono text-xs sm:text-sm space-y-3 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-md",
        },
        React.createElement(
          "div",
          { className: "text-cyan-400 font-semibold" },
          "┌─ NOW PLAYING // LOCAL AUDIO ─────────┐"
        ),
        React.createElement(
          "div",
          { className: "pl-2 space-y-1" },
          React.createElement(
            "div",
            { className: "text-zinc-100 font-bold" },
            `♪ ${currentTrack.title} ${isPlaying ? "(PLAYING)" : "(PAUSED)"}`
          ),
          React.createElement("div", { className: "text-zinc-400 text-xs" }, currentTrack.artist),
          React.createElement(
            "div",
            { className: "text-cyan-400 text-xs pt-0.5" },
            `${formatTime(currentTime)} / ${formatTime(duration || currentTrack.duration)}`
          ),
          error
            ? React.createElement("div", { className: "text-amber-400 text-xs pt-1" }, error)
            : null
        ),
        React.createElement(
          "div",
          { className: "space-y-1 pt-2 border-t border-zinc-900" },
          React.createElement(
            "div",
            { className: "text-[11px] text-zinc-500 uppercase tracking-wider" },
            "LIBRARY (/public/music/)"
          ),
          ...tracks.map((track) => {
            const isCurrent = track.id === currentTrack.id;
            return React.createElement(
              "div",
              {
                key: track.id,
                className: `flex items-center justify-between px-2 py-1 rounded text-xs ${
                  isCurrent
                    ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300"
                    : "text-zinc-400"
                }`,
              },
              React.createElement(
                "span",
                null,
                React.createElement("span", { className: "text-zinc-500 mr-2" }, `[${track.id}]`),
                track.title
              ),
              React.createElement("span", { className: "text-[11px]" }, formatTime(track.duration))
            );
          })
        ),
        React.createElement(
          "div",
          { className: "text-[11px] text-zinc-500 pt-1" },
          'Controls: play [id|"title"], pause, resume, next, previous'
        ),
        React.createElement(
          "div",
          { className: "text-cyan-400 font-semibold" },
          "└──────────────────────────────────────┘"
        )
      ),
    };
  },
};
