import { cache } from 'react';

const GITHUB_API_BASE = 'https://api.github.com';

export interface RepositoryMetrics {
  repo: string;
  url: string;
  stars: number;
  forks: number;
  watchers: number;
  language?: string;
  lastPushedAt?: string;
}

function resolveHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json'
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export function repositorySlugFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/').filter(Boolean);

    if (segments.length >= 2) {
      return `${segments[0]}/${segments[1]}`;
    }

    return null;
  } catch (error) {
    console.warn('Unable to parse repository url', url, error);
    return null;
  }
}

const fetchRepository = cache(async (repo: string) => {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${repo}`, {
    headers: resolveHeaders(),
    next: { revalidate: 60 * 60 }
  });

  if (!response.ok) {
    throw new Error(`GitHub responded with ${response.status} for ${repo}`);
  }

  return response.json();
});

export async function getRepositoryMetrics(repos: string[]): Promise<RepositoryMetrics[]> {
  const uniqueRepos = Array.from(new Set(repos));

  const results = await Promise.all(
    uniqueRepos.map(async (repo) => {
      try {
        const data = await fetchRepository(repo);

        return {
          repo,
          url: data.html_url ?? `https://github.com/${repo}`,
          stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : 0,
          forks: typeof data.forks_count === 'number' ? data.forks_count : 0,
          watchers: typeof data.subscribers_count === 'number' ? data.subscribers_count : 0,
          language: data.language ?? undefined,
          lastPushedAt: data.pushed_at ?? undefined
        } satisfies RepositoryMetrics;
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to load GitHub repository metadata for ${repo}: ${reason}`);

        return {
          repo,
          url: `https://github.com/${repo}`,
          stars: 0,
          forks: 0,
          watchers: 0
        } satisfies RepositoryMetrics;
      }
    })
  );

  return results;
}

export interface PortfolioSummary {
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  topLanguages: string[];
  lastUpdated?: string;
}

export async function getPortfolioSummary(repos: string[]): Promise<PortfolioSummary> {
  if (repos.length === 0) {
    return { totalStars: 0, totalForks: 0, totalWatchers: 0, topLanguages: [] };
  }

  const metrics = await getRepositoryMetrics(repos);

  const languageUsage = new Map<string, number>();

  for (const repo of metrics) {
    if (repo.language) {
      languageUsage.set(repo.language, (languageUsage.get(repo.language) ?? 0) + 1);
    }
  }

  const topLanguages = Array.from(languageUsage.entries())
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .slice(0, 3)
    .map(([language]) => language);

  const lastUpdated = metrics
    .map((repo) => repo.lastPushedAt)
    .filter(Boolean)
    .sort()
    .pop();

  return {
    totalStars: metrics.reduce((sum, repo) => sum + repo.stars, 0),
    totalForks: metrics.reduce((sum, repo) => sum + repo.forks, 0),
    totalWatchers: metrics.reduce((sum, repo) => sum + repo.watchers, 0),
    topLanguages,
    lastUpdated
  } satisfies PortfolioSummary;
}
