export interface SkillGroup {
  category: string;
  items: string[];
  isExploring?: boolean;
}

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  },
  {
    category: "Web",
    items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    category: "Discord",
    items: ["Discord.js", "Discord API", "Lavalink", "Kazagumo", "Shoukaku"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Linux", "Termux", "Vercel", "Netlify"],
  },
  {
    category: "Exploring",
    items: ["AI", "Automation", "Cloud", "DevOps", "WebSockets", "APIs"],
    isExploring: true,
  },
];

export const STACK_BLUEPRINT = [
  {
    title: "LANGUAGES",
    items: ["JavaScript", "TypeScript", "Python"],
  },
  {
    title: "WEB",
    items: ["React", "Next.js", "Node.js", "Express", "Tailwind"],
  },
  {
    title: "INFRASTRUCTURE",
    items: ["Linux", "Git", "Vercel", "Netlify"],
  },
  {
    title: "DISCORD",
    items: ["Discord.js", "Lavalink", "Kazagumo", "Shoukaku"],
  },
  {
    title: "EXPLORING",
    items: ["AI", "Cloud", "DevOps", "WebSockets", "Automation"],
  },
] as const;
