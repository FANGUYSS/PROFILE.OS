import { SITE_CONFIG } from "@/lib/constants";
import { LanyardData } from "@/types/discord";

const LANYARD_WS_URL =
  process.env.NEXT_PUBLIC_LANYARD_WS_URL || "wss://api.lanyard.rest/socket";

export interface LanyardSocketHandlers {
  userId?: string;
  onPresenceUpdate: (data: LanyardData) => void;
  onConnectionChange?: (connected: boolean) => void;
}

/**
 * Creates a managed Lanyard WebSocket connection with automatic heartbeat and reconnect.
 */
export function createLanyardSocket({
  userId = SITE_CONFIG.lanyardId,
  onPresenceUpdate,
  onConnectionChange,
}: LanyardSocketHandlers) {
  let ws: WebSocket | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let isDisposed = false;

  const clearTimers = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  };

  const connect = () => {
    if (isDisposed || typeof window === "undefined") return;

    try {
      ws = new WebSocket(LANYARD_WS_URL);

      ws.onopen = () => {
        onConnectionChange?.(true);
      };

      ws.onmessage = (event) => {
        if (isDisposed) return;
        try {
          const payload = JSON.parse(event.data);

          // Opcode 1: Hello -> start heartbeat & send Opcode 2 (Initialize)
          if (payload.op === 1) {
            const interval = payload.d?.heartbeat_interval || 30000;
            ws?.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: userId },
              })
            );

            if (heartbeatTimer) clearInterval(heartbeatTimer);
            heartbeatTimer = setInterval(() => {
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, interval);
          }

          // Opcode 0: Event (INIT_STATE or PRESENCE_UPDATE)
          if (
            payload.op === 0 &&
            (payload.t === "INIT_STATE" || payload.t === "PRESENCE_UPDATE") &&
            payload.d
          ) {
            onPresenceUpdate(payload.d as LanyardData);
          }
        } catch {
          // Ignore malformed frames
        }
      };

      ws.onerror = () => {
        onConnectionChange?.(false);
      };

      ws.onclose = () => {
        clearTimers();
        onConnectionChange?.(false);
        if (!isDisposed) {
          reconnectTimer = setTimeout(connect, 5000);
        }
      };
    } catch {
      onConnectionChange?.(false);
    }
  };

  connect();

  return {
    disconnect: () => {
      isDisposed = true;
      clearTimers();
      if (ws) {
        ws.close();
        ws = null;
      }
    },
  };
}
