import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "FANGUYSS";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok) {
      return NextResponse.json({ available: false, error: "GitHub profile not found" }, { status: 404 });
    }

    const profile = await profileRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    return NextResponse.json({
      available: true,
      profile,
      repos: Array.isArray(repos) ? repos : [],
    });
  } catch (error) {
    return NextResponse.json({ available: false, error: String(error) }, { status: 500 });
  }
}
