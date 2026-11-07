"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "midnight" | "purple" | "cyan" | "terminal";

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  reducedMotion: boolean;
  effectsEnabled: boolean;
  setEffectsEnabled: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("midnight");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile_os_theme") as ThemeMode | null;
      if (saved && ["midnight", "purple", "cyan", "terminal"].includes(saved)) {
        setThemeState(saved);
      }
    } catch {
      // Private browsing/storage restrictions are harmless here.
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) setEffectsEnabled(false);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) setEffectsEnabled(false);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
    try {
      localStorage.setItem("profile_os_theme", next);
    } catch {
      // Ignore storage failures.
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, reducedMotion, effectsEnabled, setEffectsEnabled }}>
      <div
        data-theme={theme}
        className="min-h-screen bg-[var(--os-bg)] text-zinc-100 selection:bg-[var(--os-accent)]/20 selection:text-white transition-colors duration-500"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
