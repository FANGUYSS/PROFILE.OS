import React from "react";
import { CommandDefinition } from "@/commands/types";
import { SOCIAL_LINKS } from "@/data/socials";

export const openCommand: CommandDefinition = {
  command: "open",
  description: "Open external profile or internal panel",
  category: "navigation",
  usage: "open <github|youtube|instagram|discord|email>",
  execute: (args) => {
    const target = (args[0] || "").trim().toLowerCase();

    if (!target) {
      return {
        output: React.createElement(
          "div",
          { className: "font-mono text-xs text-amber-300 space-y-1" },
          React.createElement(
            "div",
            null,
            "Usage: ",
            React.createElement(
              "code",
              { className: "text-zinc-200" },
              "open <github | youtube | instagram | discord | email>"
            )
          )
        ),
      };
    }

    const social = SOCIAL_LINKS[target];
    if (social) {
      if (typeof window !== "undefined") {
        window.open(social.url, "_blank", "noopener,noreferrer");
      }
      return {
        output: React.createElement(
          "div",
          { className: "font-mono text-xs text-emerald-400" },
          `→ Opening ${social.label} (${social.handle})...`
        ),
      };
    }

    // Internal panel navigation fallback
    const internalPanels = ["about", "skills", "projects", "music", "socials", "home"] as const;
    if ((internalPanels as readonly string[]).includes(target)) {
      return {
        panel: target === "projects" ? "github" : (target as "about" | "skills" | "music" | "socials" | "home"),
        output: React.createElement(
          "div",
          { className: "font-mono text-xs text-cyan-400" },
          `→ Mounted ${target.toUpperCase()} module.`
        ),
      };
    }

    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-rose-400" },
        `Target "${target}" not found. Try: open github, open youtube, open instagram, or open discord.`
      ),
    };
  },
};
