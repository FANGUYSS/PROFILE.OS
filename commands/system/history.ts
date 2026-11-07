import React from "react";
import { CommandDefinition } from "@/commands/types";

export const historyCommand: CommandDefinition = {
  command: "history",
  description: "Display commands used during the current session",
  category: "system",
  execute: (_, ctx) => ({
    output: React.createElement(
      "div",
      { className: "font-mono text-xs space-y-1 text-zinc-400 py-1" },
      ctx.history.length === 0
        ? React.createElement("div", null, "No commands recorded in session history yet.")
        : ctx.history.map((item, idx) =>
            React.createElement(
              "div",
              { key: `${idx}-${item}` },
              React.createElement("span", { className: "text-zinc-600 inline-block w-8" }, idx + 1),
              React.createElement("span", { className: "text-zinc-200" }, item)
            )
          )
    ),
  }),
};
