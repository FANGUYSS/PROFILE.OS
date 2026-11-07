import React from "react";
import { CommandDefinition } from "@/commands/types";

export const matrixCommand: CommandDefinition = {
  command: "matrix",
  description: "Trigger temporary digital rain visual effect",
  category: "easter-egg",
  execute: (_, ctx) => {
    ctx.triggerMatrix();
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-emerald-400" },
        "Initializing temporary digital rain projection (6s)..."
      ),
    };
  },
};
