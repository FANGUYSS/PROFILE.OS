import { CommandDefinition } from "@/commands/types";
import { resolveCommandAlias } from "./aliases";

// Core
import { helpCommand } from "./core/help";
import { clearCommand } from "./core/clear";
import { homeCommand } from "./core/home";
import { aboutCommand } from "./core/about";
import { whoamiCommand } from "./core/whoami";
import { projectsCommand } from "./core/projects";
import { skillsCommand } from "./core/skills";
import { stackCommand } from "./core/stack";
import { experienceCommand } from "./core/experience";
import { contactCommand } from "./core/contact";
import { socialsCommand } from "./core/socials";
import { discordCommand } from "./core/discord";
import { githubCommand } from "./core/github";

// System
import { statusCommand } from "./system/status";
import { neofetchCommand } from "./system/neofetch";
import { historyCommand } from "./system/history";
import { dateCommand } from "./system/date";
import { pwdCommand } from "./system/pwd";
import { lsCommand } from "./system/ls";

// Navigation
import { openCommand } from "./navigation/open";
import { visitCommand } from "./navigation/visit";

// Media
import { musicCommand } from "./media/music";
import { nowPlayingCommand } from "./media/nowplaying";
import { playCommand } from "./media/play";
import { pauseCommand } from "./media/pause";
import { resumeCommand } from "./media/resume";
import { nextCommand } from "./media/next";
import { previousCommand } from "./media/previous";

// Easter Eggs
import { matrixCommand } from "./easter-eggs/matrix";
import { coffeeCommand } from "./easter-eggs/coffee";
import { fortuneCommand } from "./easter-eggs/fortune";
import { themeCommand } from "./easter-eggs/theme";
import { asciiCommand } from "./easter-eggs/ascii";
import { secretCommand } from "./easter-eggs/secret";
import { sudoCommand } from "./easter-eggs/sudo";
import { konamiCommand } from "./easter-eggs/konami";
import { fortyTwoCommand } from "./easter-eggs/fortyTwo";

export const COMMAND_LIST: CommandDefinition[] = [
  helpCommand,
  clearCommand,
  homeCommand,
  aboutCommand,
  whoamiCommand,
  projectsCommand,
  skillsCommand,
  stackCommand,
  experienceCommand,
  contactCommand,
  socialsCommand,
  discordCommand,
  githubCommand,
  statusCommand,
  neofetchCommand,
  historyCommand,
  dateCommand,
  pwdCommand,
  lsCommand,
  openCommand,
  visitCommand,
  musicCommand,
  nowPlayingCommand,
  playCommand,
  pauseCommand,
  resumeCommand,
  nextCommand,
  previousCommand,
  matrixCommand,
  coffeeCommand,
  fortuneCommand,
  themeCommand,
  asciiCommand,
  secretCommand,
  sudoCommand,
  konamiCommand,
  fortyTwoCommand,
];

export const COMMAND_REGISTRY: Record<string, CommandDefinition> = {};

for (const def of COMMAND_LIST) {
  COMMAND_REGISTRY[def.command.toLowerCase()] = def;
  if (def.aliases) {
    for (const alias of def.aliases) {
      COMMAND_REGISTRY[alias.toLowerCase()] = def;
    }
  }
}

/**
 * Resolves a command definition given raw command name or alias.
 */
export function getCommandDefinition(name: string): CommandDefinition | undefined {
  const resolved = resolveCommandAlias(name);
  return COMMAND_REGISTRY[resolved];
}

export const PRIMARY_COMMAND_NAMES = COMMAND_LIST.map((c) => c.command);
