import React from "react";
import { CommandDefinition } from "@/commands/types";

export const lsCommand: CommandDefinition = {
  command: "ls",
  description: "List virtual filesystem modules",
  category: "system",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs sm:text-sm py-1" },
      React.createElement("span", { className: "text-cyan-400 font-semibold" }, "about.md"),
      React.createElement("span", { className: "text-cyan-400 font-semibold" }, "skills.json"),
      React.createElement("span", { className: "text-cyan-400 font-semibold" }, "stack.lock"),
      React.createElement("span", { className: "text-blue-400 font-semibold" }, "projects/"),
      React.createElement("span", { className: "text-blue-400 font-semibold" }, "music/"),
      React.createElement("span", { className: "text-purple-400 font-semibold" }, "discord.sock"),
      React.createElement("span", { className: "text-emerald-400 font-semibold" }, "socials.cfg"),
      React.createElement("span", { className: "text-zinc-400" }, "contact.txt")
    ),
  }),
};
