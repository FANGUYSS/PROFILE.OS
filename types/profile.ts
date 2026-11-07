export interface ExperienceItem {
  role: string;
  period: string;
  focus: string;
}

export interface ProfileData {
  brand: string;
  osName: string;
  version: string;
  domain: string;
  user: string;
  host: string;
  shell: string;
  prompt: string;
  lanyardId: string;
  email: string;
  headline: string;
  subheadline: string;
  bio: string;
  experience: ExperienceItem[];
}
