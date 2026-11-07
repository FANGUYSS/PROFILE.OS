import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";

export const helpCommand: CommandDefinition = {
  command: "help",
  description: "Display available PROFILE.OS commands",
  category: "core",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "space-y-4 font-mono text-xs sm:text-sm py-1" },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider" },
        `Available Commands — ${PROFILE_DATA.osName} v${PROFILE_DATA.version}`
      ),
      React.createElement(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
        // Main Column
        React.createElement(
          "div",
          { className: "space-y-1.5 border border-zinc-800/80 bg-zinc-950/60 p-3 rounded-lg" },
          React.createElement("div", { className: "text-purple-400 font-semibold text-xs mb-2" }, "MAIN"),
          ...[
            ["help", "Show this help menu"],
            ["about", "Identity & bio"],
            ["whoami", "Current user identity"],
            ["projects", "Source of truth (GitHub)"],
            ["skills", "Technical capabilities"],
            ["stack", "Visual stack blueprint"],
            ["experience", "Engineering focus"],
            ["socials", "Public social links"],
            ["discord", "Live Lanyard presence"],
            ["github", "GitHub profile"],
            ["contact", "Get in touch"],
            ["home", "Return to main OS screen"],
            ["clear", "Clear terminal output"],
          ].map(([cmd, desc]) =>
            React.createElement(
              "div",
              { key: cmd, className: "flex items-start gap-2 text-xs" },
              React.createElement("span", { className: "text-cyan-400 font-medium w-20 shrink-0" }, cmd),
              React.createElement("span", { className: "text-zinc-400" }, `— ${desc}`)
            )
          )
        ),
        // System & Navigation Column
        React.createElement(
          "div",
          { className: "space-y-1.5 border border-zinc-800/80 bg-zinc-950/60 p-3 rounded-lg" },
          React.createElement("div", { className: "text-purple-400 font-semibold text-xs mb-2" }, "SYSTEM & MEDIA"),
          ...[
            ["neofetch", "System info & ASCII"],
            ["status", "Subsystem telemetry"],
            ["history", "Session command log"],
            ["date", "Current workstation time"],
            ["pwd", "Working directory"],
            ["ls", "List directory contents"],
            ["open", "Open external profile"],
            ["visit", "Visit external profile"],
            ["music", "Local audio player"],
            ["nowplaying", "Current track info"],
            ["play", "Play track by ID/title"],
            ["pause", "Pause playback"],
            ["resume", "Resume playback"],
            ["next", "Next track"],
            ["previous", "Previous track"],
          ].map(([cmd, desc]) =>
            React.createElement(
              "div",
              { key: cmd, className: "flex items-start gap-2 text-xs" },
              React.createElement("span", { className: "text-cyan-400 font-medium w-20 shrink-0" }, cmd),
              React.createElement("span", { className: "text-zinc-400" }, `— ${desc}`)
            )
          )
        ),
        // Easter Eggs Column
        React.createElement(
          "div",
          { className: "space-y-1.5 border border-zinc-800/80 bg-zinc-950/60 p-3 rounded-lg" },
          React.createElement("div", { className: "text-purple-400 font-semibold text-xs mb-2" }, "EASTER EGGS"),
          ...[
            ["theme", "Switch visual theme"],
            ["ascii", "Generate ASCII emblem"],
            ["coffee", "Brew 3am fuel"],
            ["fortune", "Engineering quote"],
            ["matrix", "Digital rain mode"],
            ["secret", "Hidden surprise hint"],
            ["sudo", "Try your luck"],
            ["konami", "Overdrive protocol"],
            ["42", "Ultimate answer"],
          ].map(([cmd, desc]) =>
            React.createElement(
              "div",
              { key: cmd, className: "flex items-start gap-2 text-xs" },
              React.createElement("span", { className: "text-cyan-400 font-medium w-20 shrink-0" }, cmd),
              React.createElement("span", { className: "text-zinc-400" }, `— ${desc}`)
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "text-zinc-500 text-xs" },
        "Tip: Commands are case-insensitive. Press TAB for autocomplete or ↑ / ↓ to cycle history."
      )
    ),
  }),
};
