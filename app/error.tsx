"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profile";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PROFILE.OS Runtime Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6">
      <div className="w-full max-w-lg border border-rose-900/50 bg-zinc-950/90 p-6 rounded-xl shadow-2xl">
        <div className="text-rose-400 font-bold text-sm">
          KERNEL EXCEPTION // {PROFILE_DATA.osName}
        </div>

        <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
          An unexpected runtime error occurred in the execution context.
        </p>

        <div className="pt-4 flex gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-rose-600/20 border border-rose-500/30 text-rose-300 hover:bg-rose-600/30 transition-colors"
          >
            Reboot Subsystem
          </button>

          <Link
            href="/"
            className="px-4 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
