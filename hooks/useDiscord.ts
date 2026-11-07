import { useDiscord as useDiscordContext } from "@/context/DiscordContext";

export function useDiscord() {
  return useDiscordContext();
}
