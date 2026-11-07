"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Command, Maximize2, Minus, Terminal as TerminalIcon } from "lucide-react";
import { getCommandSuggestions, resolveTabAutocomplete } from "@/lib/terminal/autocomplete";
import { useTerminal } from "@/hooks/useTerminal";
import { SITE_CONFIG } from "@/lib/constants";

interface TerminalUIProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onExecute: (command: string) => void;
  onFocus?: () => void;
}

export function TerminalUI({ inputRef, onExecute, onFocus }: TerminalUIProps) {
  const { logs, history } = useTerminal();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(
    () => getCommandSuggestions(input, 7),
    [input]
  );

  const submit = useCallback(() => {
    const value = input.trim();
    if (!value) return;
    onExecute(value);
    setInput("");
    setHistoryIndex(-1);
  }, [input, onExecute]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const completed = resolveTabAutocomplete(input);
      if (completed !== input) {
        setInput(completed);
        requestAnimationFrame(() => {
          const el = inputRef?.current;
          if (el) {
            el.focus();
            el.setSelectionRange(completed.length, completed.length);
          }
        });
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[history.length - 1 - next] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(history[history.length - 1 - next] ?? "");
    }

    if (event.key === "Escape") {
      setInput("");
      setHistoryIndex(-1);
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [logs]);

  return (
    <section
      aria-label="PROFILE.OS terminal"
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07080d]/90 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      onClick={onFocus}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.10),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(34,211,238,0.08),transparent_35%)]" />

      <header className="relative flex h-11 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/[0.06]">
            <TerminalIcon className="h-3.5 w-3.5 text-cyan-300" />
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-zinc-200">PROFILE.OS</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">terminal</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-600">
          <Minus className="h-3.5 w-3.5" />
          <Maximize2 className="h-3 w-3" />
        </div>
      </header>

      <div ref={scrollRef} className="relative min-h-[300px] max-h-[520px] overflow-y-auto px-4 py-4 sm:px-5 font-mono text-[12px] leading-6">
        <div className="mb-5 space-y-1 text-zinc-500">
          <div className="flex items-center gap-2 text-zinc-400">
            <Command className="h-3.5 w-3.5 text-cyan-400" />
            <span>{SITE_CONFIG.name} v{SITE_CONFIG.version}</span>
          </div>
          <div className="pl-5 text-zinc-600">
            Type <span className="text-cyan-400">help</span> to explore the system.
          </div>
        </div>

        {logs.map((log) => (
          <div key={log.id} className="mb-4">
            <div className="flex items-start gap-2 text-zinc-300">
              <span className="shrink-0 text-purple-400">fanguyss@portfolio:~$</span>
              <span className="break-all">{log.rawInput}</span>
            </div>
            <div className="mt-1 overflow-x-auto pl-0 sm:pl-4">{log.output}</div>
          </div>
        ))}

        <div className="flex items-center gap-2 text-zinc-200">
          <span className="shrink-0 text-purple-400">fanguyss@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setHistoryIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-zinc-100 outline-none placeholder:text-zinc-700"
            placeholder="type a command..."
          />
          <span className="h-4 w-px animate-pulse bg-cyan-400/80" aria-hidden />
        </div>
      </div>

      <footer className="relative border-t border-white/[0.06] px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setInput(suggestion);
                requestAnimationFrame(() => {
                  inputRef?.current?.focus();
                });
              }}
              className="inline-flex shrink-0 items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[10px] text-zinc-500 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
            >
              <ChevronRight className="h-3 w-3" />
              {suggestion}
            </button>
          ))}
        </div>
      </footer>
    </section>
  );
}

export default TerminalUI;
