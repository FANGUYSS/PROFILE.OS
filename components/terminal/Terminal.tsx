"use client";

import React, { useEffect, useRef } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import TerminalUI from "./TerminalUI";

export function Terminal() {
  const { executeCommand } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener("portfolio:focus-terminal", focusInput);
    return () => window.removeEventListener("portfolio:focus-terminal", focusInput);
  }, []);

  return (
    <TerminalUI
      inputRef={inputRef}
      onExecute={executeCommand}
      onFocus={() => inputRef.current?.focus()}
    />
  );
}

export default Terminal;
