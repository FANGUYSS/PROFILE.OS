"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-white/[0.07] bg-[#08090f]/80 backdrop-blur-xl", className)} {...props}>{children}</div>;
}

export function Button({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 font-mono text-xs text-zinc-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30", className)} {...props}>{children}</button>;
}

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300", className)} {...props}>{children}</span>;
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-white/[0.06]", className)} aria-hidden />;
}

export const UI = { Card, Button, Badge, Divider };

export default UI;
