import { useState, useCallback } from "react";
import { loadCommandHistory, appendCommandToHistory } from "@/lib/terminal/history";

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>(() => loadCommandHistory());
  const [cursor, setCursor] = useState<number>(-1);

  const addHistory = useCallback((cmd: string) => {
    setHistory((prev) => appendCommandToHistory(prev, cmd));
    setCursor(-1);
  }, []);

  const getPrevious = useCallback(
    (currentInput: string) => {
      if (history.length === 0) return currentInput;
      const nextCursor = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(nextCursor);
      return history[nextCursor];
    },
    [history, cursor]
  );

  const getNext = useCallback(() => {
    if (cursor === -1) return "";
    if (cursor + 1 >= history.length) {
      setCursor(-1);
      return "";
    }
    const nextCursor = cursor + 1;
    setCursor(nextCursor);
    return history[nextCursor];
  }, [history, cursor]);

  const resetCursor = useCallback(() => setCursor(-1), []);

  return {
    history,
    addHistory,
    getPrevious,
    getNext,
    resetCursor,
  };
}
