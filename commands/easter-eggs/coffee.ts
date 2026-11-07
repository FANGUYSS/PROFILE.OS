import React from "react";
import { CommandDefinition } from "@/commands/types";

export const coffeeCommand: CommandDefinition = {
  command: "coffee",
  description: "Brew 3am developer fuel",
  category: "easter-egg",
  execute: () => ({
    output: React.createElement(
      "pre",
      { className: "font-mono text-xs text-amber-300 leading-tight" },
      `    ( (
     ) )
  ........
  |      |]   HTTP/1.1 418 I'm a teapot (actually, espresso).
  \\      /    Caffeine daemon active: keeping infrastructure alive at 3am.
   '----'`
    ),
  }),
};
