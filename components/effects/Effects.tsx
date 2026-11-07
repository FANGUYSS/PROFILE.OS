"use client";

import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTerminal } from "@/hooks/useTerminal";

const MATRIX_CHARS = "01{}[]<>/\\#$%&*+";

export function Effects() {
  const { effectsEnabled, reducedMotion } = useTheme();
  const { matrixActive } = useTerminal();

  const columns = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        key: index,
        left: `${index * 4.8 + (index % 2) * 1.2}%`,
        delay: `${(index % 7) * -0.45}s`,
        duration: `${3.8 + (index % 5) * 0.65}s`,
        text: Array.from({ length: 18 }, (_, char) => MATRIX_CHARS[(index * 7 + char * 3) % MATRIX_CHARS.length]).join("\n"),
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {effectsEnabled && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(circle_at_84%_82%,rgba(var(--os-accent-rgb),0.09),transparent_32%)]" />
          <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(var(--os-grid)_1px,transparent_1px),linear-gradient(90deg,var(--os-grid)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute inset-0 opacity-[0.022] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />
          {!reducedMotion && (
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-white/[0.025] to-transparent animate-[scan_9s_linear_infinite]" />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_43%,rgba(0,0,0,0.72)_100%)]" />
        </>
      )}

      {matrixActive && !reducedMotion && (
        <div className="absolute inset-0 overflow-hidden bg-black/25">
          {columns.map((column) => (
            <pre
              key={column.key}
              className="absolute top-0 whitespace-pre font-mono text-[10px] leading-4 text-emerald-300/60 drop-shadow-[0_0_7px_rgba(52,211,153,0.45)]"
              style={{
                left: column.left,
                animation: `matrix-fall ${column.duration} linear ${column.delay} infinite`,
              }}
            >
              {column.text}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
}

export default Effects;
