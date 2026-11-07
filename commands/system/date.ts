import React from "react";
import { CommandDefinition } from "@/commands/types";

export const dateCommand: CommandDefinition = {
  command: "date",
  description: "Print current UTC and local workstation date/time",
  category: "system",
  execute: () => {
    const now = new Date();
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-zinc-300 space-y-0.5" },
        React.createElement(
          "div",
          null,
          React.createElement("span", { className: "text-cyan-400 mr-2" }, "LOCAL:"),
          now.toString()
        ),
        React.createElement(
          "div",
          { className: "text-zinc-500" },
          React.createElement("span", { className: "text-purple-400 mr-4" }, "UTC:"),
          now.toUTCString()
        )
      ),
    };
  },
};
