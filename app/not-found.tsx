import React from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profile";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 font-mono text-zinc-300">
      <div className="border border-zinc-800 bg-zinc-950/90 p-6 rounded-xl max-w-md space-y-4 shadow-2xl">
        <div className="text-cyan-400 font-bold text-sm">
          404 // {PROFILE_DATA.osName} SECTOR NOT FOUND
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          The requested memory address or routing path does not exist on this node.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/25 text-xs font-semibold transition-colors"
          >
            Return to {PROFILE_DATA.osName} Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
