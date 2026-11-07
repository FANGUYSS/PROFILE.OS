import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";

export const whoamiCommand: CommandDefinition = {
  command: "whoami",
  description: "Print effective user and workstation identity",
  category: "core",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "font-mono text-xs sm:text-sm space-y-1 text-zinc-300" },
      React.createElement(
        "div",
        null,
        React.createElement("span", { className: "text-cyan-400 font-bold" }, PROFILE_DATA.brand),
        React.createElement(
          "span",
          { className: "text-zinc-500 ml-2" },
          `(${PROFILE_DATA.user}@${PROFILE_DATA.host} // ${PROFILE_DATA.osName} v${PROFILE_DATA.version})`
        )
      ),
      React.createElement("div", { className: "text-zinc-400" }, PROFILE_DATA.headline)
    ),
  }),
};
