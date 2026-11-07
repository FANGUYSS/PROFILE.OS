import { GitHubRepository, GitHubUserProfile } from "@/types/github";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "FANGUYSS";

export interface GitHubTelemetry {
  available: boolean;
  profile: GitHubUserProfile | null;
  repos: GitHubRepository[];
  totalStars: number;
}

/**
 * Fetches public GitHub profile and top repositories with graceful fallback.
 */
export async function fetchGitHubTelemetry(
  username: string = GITHUB_USERNAME
): Promise<GitHubTelemetry> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok) {
      return { available: false, profile: null, repos: [], totalStars: 0 };
    }

    const profile = (await profileRes.json()) as GitHubUserProfile;
    const repos = reposRes.ok ? ((await reposRes.json()) as GitHubRepository[]) : [];

    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
      : 0;

    return {
      available: true,
      profile,
      repos: Array.isArray(repos) ? repos : [],
      totalStars,
    };
  } catch {
    return {
      available: false,
      profile: null,
      repos: [],
      totalStars: 0,
    };
  }
}
