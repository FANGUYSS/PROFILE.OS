import React from "react";
import { CommandDefinition } from "@/commands/types";
import { SOCIAL_LINKS } from "@/data/socials";

export const socialsCommand: CommandDefinition = {
  command: "socials",
  description: "List official public links (GitHub, YouTube, Instagram, Email)",
  category: "core",
  execute: () => ({
    panel: "socials",
    output: React.createElement(
      "div",
      {
        className:
          "border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-md space-y-2.5 font-mono text-xs sm:text-sm",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider" },
        "┌─ SOCIALS // PUBLIC CHANNELS ─────────┐"
      ),
      React.createElement(
        "div",
        { className: "space-y-2 pl-1 py-1" },
        ...[
          SOCIAL_LINKS.github,
          SOCIAL_LINKS.youtube,
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.email,
        ].map((item) =>
          React.createElement(
            "div",
            {
              key: item.id,
              className:
                "flex items-center justify-between gap-4 border-b border-zinc-900/90 pb-1.5",
            },
            React.createElement("span", { className: "text-zinc-400" }, item.label),
            React.createElement(
              "a",
              {
                href: item.url,
                target: item.id === "email" ? undefined : "_blank",
                rel: item.id === "email" ? undefined : "noopener noreferrer",
                className:
                  "text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors",
              },
              item.handle
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider" },
        "└──────────────────────────────────────┘"
      )
    ),
  }),
};
