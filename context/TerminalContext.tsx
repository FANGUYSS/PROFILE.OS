"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { parseCommandInput } from "@/commands/parser";
import { getCommandDefinition } from "@/commands/registry";
import { useTheme } from "./ThemeContext";
import { useDiscord } from "./DiscordContext";
import { useMusic } from "./MusicContext";
import { TerminalLogEntry } from "@/types/terminal";
import { loadCommandHistory, appendCommandToHistory } from "@/lib/terminal/history";

interface TerminalContextValue {
  logs: TerminalLogEntry[];
  history: string[];
  activePanel: string | null;
  matrixActive: boolean;
  executeCommand: (rawInput: string) => void;
  clearTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextValue | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<TerminalLogEntry[]>([]);
  const [history, setHistory] = useState<string[]>(() => loadCommandHistory());
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [matrixActive, setMatrixActive] = useState(false);

  const { theme, setTheme } = useTheme();
  const discord = useDiscord();
  const music = useMusic();

  const clearTerminal = useCallback(() => setLogs([]), []);

  const triggerMatrix = useCallback(() => {
    setMatrixActive(true);
    setTimeout(() => setMatrixActive(false), 6000);
  }, []);

  const executeCommand = useCallback(
    (rawInput: string) => {
      const parsed = parseCommandInput(rawInput);
      if (!parsed.commandName) return;

      const updatedHistory = appendCommandToHistory(history, parsed.normalizedInput);
      setHistory(updatedHistory);

      // Strictly block "social" and direct user to "socials" per Section 9
      if (parsed.commandName === "social") {
        setLogs((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            rawInput: parsed.normalizedInput,
            timestamp: new Date().toLocaleTimeString(),
            output: React.createElement(
              "span",
              { className: "text-amber-300 text-xs font-mono" },
              'Command "social" is deprecated. Did you mean socials?'
            ),
          },
        ]);
        return;
      }

      const definition = getCommandDefinition(parsed.commandName);

      if (!definition) {
        setLogs((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            rawInput: parsed.normalizedInput,
            timestamp: new Date().toLocaleTimeString(),
            output: React.createElement(
              "span",
              { className: "text-rose-400 text-xs font-mono" },
              `fanguyss-shell: command not found: ${parsed.commandName}. Type help for available commands.`
            ),
          },
        ]);
        return;
      }

      const result = definition.execute(parsed.args, {
        history: updatedHistory,
        clearTerminal,
        resetHome: () => setActivePanel(null),
        theme,
        setTheme,
        triggerMatrix,
        discordStatus: {
          connected: discord.connected,
          status: discord.status,
          username: discord.displayName,
          customStatus: discord.customStatus,
          activities: discord.activities,
          spotify: discord.spotify,
        },
        music: {
          currentTrack: music.currentTrack,
          isPlaying: music.isPlaying,
          currentTime: music.currentTime,
          duration: music.duration,
          error: music.error,
          playTrack: music.playTrack,
          pause: music.pause,
          resume: music.resume,
          next: music.next,
          previous: music.previous,
          tracks: music.tracks,
        },
      });

      if (result.panel !== undefined) {
        setActivePanel(result.panel === "home" ? null : result.panel);
      }

      if (parsed.commandName !== "clear" && result.output) {
        setLogs((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            rawInput: parsed.normalizedInput,
            timestamp: new Date().toLocaleTimeString(),
            output: result.output,
          },
        ]);
      }
    },
    [history, clearTerminal, theme, setTheme, triggerMatrix, discord, music]
  );

  return (
    <TerminalContext.Provider
      value={{
        logs,
        history,
        activePanel,
        matrixActive,
        executeCommand,
        clearTerminal,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used within TerminalProvider");
  return ctx;
}
