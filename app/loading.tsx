import React from "react";
import { PROFILE_DATA } from "@/data/profile";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#050508] flex items-center justify-center font-mono text-xs sm:text-sm text-zinc-300">
      <div className="space-y-3 text-center">
        <div className="text-cyan-400 font-bold tracking-widest animate-pulse">
          BOOTING {PROFILE_DATA.osName} v{PROFILE_DATA.version}...
        </div>
        <div className="text-zinc-500 text-xs">Mounting kernel & runtime environment</div>
      </div>
    </div>
  );
}
