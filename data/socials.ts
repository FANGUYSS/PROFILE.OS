export interface SocialLink {
  id: "github" | "youtube" | "instagram" | "email" | "discord";
  label: string;
  handle: string;
  url: string;
}

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  github: {
    id: "github",
    label: "GitHub",
    handle: "github.com/FANGUYSS",
    url: "https://github.com/FANGUYSS",
  },
  youtube: {
    id: "youtube",
    label: "YouTube",
    handle: "youtube.com/@fanguysss",
    url: "https://youtube.com/@fanguysss",
  },
  instagram: {
    id: "instagram",
    label: "Instagram",
    handle: "instagram.com/fanguyss",
    url: "https://www.instagram.com/fanguyss",
  },
  email: {
    id: "email",
    label: "Email",
    handle: "fanguyss523@gmail.com",
    url: "mailto:fanguyss523@gmail.com",
  },
  discord: {
    id: "discord",
    label: "Discord",
    handle: "FANGUYSS",
    url: "https://discord.com/users/1237229822371958908",
  },
};
