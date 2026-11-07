import React from "react";
import { CommandDefinition } from "@/commands/types";
import { ThemeMode } from "@/context/ThemeContext";

export const themeCommand: CommandDefinition = {
  command: "theme",
  description: "Inspect or switch subtle PROFILE.OS visual themes",
  category: "easter-egg",
  usage: "theme [midnight|purple|cyan|terminal]",
  execute: (args, ctx) => {
    const validThemes: ThemeMode[] = ["midnight", "purple", "cyan", "terminal"];
    const requested = (args[0] || "").toLowerCase() as ThemeMode;

    if (requested && validThemes.includes(requested)) {
      ctx.setTheme(requested);
      return {
        output: React.createElement(
          "div",
          { className: "font-mono text-xs text-cyan-400" },
          "PROFILE.OS visual profile updated to ",
          React.createElement("strong", { className: "uppercase" }, requested),
          "."
        ),
      };
    }

    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs space-y-1.5 text-zinc-300" },
        React.createElement(
          "div",
          { className: "text-cyan-400 font-semibold" },
          "Available themes:"
        ),
        React.createElement("div", null, "1. midnight (Default dark cinematic)"),
        React.createElement("div", null, "2. purple (Deep violet ambient)"),
        React.createElement("div", null, "3. cyan (High-contrast telemetry)"),
        React.createElement("div", null, "4. terminal (Minimalist monochrome)"),
        React.createElement(
          "div",
          { className: "text-zinc-500 pt-1" },
          "Usage: ",
          React.createElement("code", { className: "text-zinc-300" }, "theme <name>")
        )
      ),
    };
  },
};
