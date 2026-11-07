const HISTORY_STORAGE_KEY = "profile_os_command_history_v690";
const MAX_HISTORY_LENGTH = 100;

export function loadCommandHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCommandHistory(history: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const trimmed = history.slice(-MAX_HISTORY_LENGTH);
    sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota errors
  }
}

export function appendCommandToHistory(history: string[], command: string): string[] {
  const cleaned = command.trim();
  if (!cleaned) return history;
  const updated = [...history, cleaned].slice(-MAX_HISTORY_LENGTH);
  saveCommandHistory(updated);
  return updated;
}
