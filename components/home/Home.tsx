"use client";

import React from "react";
import { Hero } from "./Hero";
import { Terminal } from "@/components/terminal/Terminal";
import { useTerminal } from "@/hooks/useTerminal";

export function Home() {
  const { executeCommand } = useTerminal();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
      <Hero onCommand={executeCommand} />
      <Terminal />
    </div>
  );
}

export default Home;
