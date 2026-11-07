export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubUserProfile {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
}
