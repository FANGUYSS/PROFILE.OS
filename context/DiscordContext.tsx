"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { fetchLanyardPresence } from "@/lib/discord/lanyard";
import { createLanyardSocket } from "@/lib/discord/websocket";
import {
  INITIAL_DISCORD_PRESENCE,
  normalizeLanyardPresence,
} from "@/lib/discord/presence";
import { DiscordPresenceState } from "@/types/discord";

const DiscordContext = createContext<DiscordPresenceState>(INITIAL_DISCORD_PRESENCE);

export function DiscordProvider({ children }: { children: React.ReactNode }) {
  const [presence, setPresence] = useState<DiscordPresenceState>(INITIAL_DISCORD_PRESENCE);
  const socketCleanupRef = useRef<{ disconnect: () => void } | null>(null);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial REST snapshot fetch
    fetchLanyardPresence(SITE_CONFIG.lanyardId).then((data) => {
      if (isMounted && data) {
        setPresence(normalizeLanyardPresence(data));
      } else if (isMounted) {
        setPresence((prev) => ({ ...prev, loading: false, connected: false }));
      }
    });

    // 2. Real-time WebSocket connection
    socketCleanupRef.current = createLanyardSocket({
      userId: SITE_CONFIG.lanyardId,
      onPresenceUpdate: (data) => {
        if (isMounted) {
          setPresence(normalizeLanyardPresence(data));
        }
      },
      onConnectionChange: (connected) => {
        if (isMounted && !connected) {
          setPresence((prev) => ({ ...prev, connected: false }));
        }
      },
    });

    return () => {
      isMounted = false;
      socketCleanupRef.current?.disconnect();
    };
  }, []);

  return (
    <DiscordContext.Provider value={presence}>{children}</DiscordContext.Provider>
  );
}

export function useDiscord() {
  return useContext(DiscordContext);
}
