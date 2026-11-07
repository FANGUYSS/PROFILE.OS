import { useTerminal as useTerminalContext } from "@/context/TerminalContext";

export function useTerminal() {
  return useTerminalContext();
}
