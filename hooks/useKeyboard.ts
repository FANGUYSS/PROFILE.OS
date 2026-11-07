"use client";

import { useEffect } from "react";

interface KeyboardShortcutOptions {
  onEscape?: () => void;
  onEnter?: () => void;
}

export function useKeyboard({ onEscape, onEnter }: KeyboardShortcutOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        onEscape();
      }
      if (e.key === "Enter" && onEnter) {
        onEnter();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEscape, onEnter]);
}
