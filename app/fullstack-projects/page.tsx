import Link from 'next/link';
import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import TagList from '@/components/TagList';
import { fullstackProjects } from '@/data/fullstack-projects';
import { getRepositoryMetrics, repositorySlugFromUrl } from '@/lib/github';

export const metadata = {
  title: 'Fullstack Projects'
};

export default async function FullstackProjectsPage() {
  const repoSlugs = fullstackProjects
    .map((project) => repositorySlugFromUrl(project.repository))
    .filter((repo): repo is string => Boolean(repo));

  const repoMetrics = await getRepositoryMetrics(repoSlugs);
  const metricsLookup = new Map(repoMetrics.map((metric) => [metric.repo, metric]));

  return (
    <div>
      <Section>
        <PageHeader
          title="Fullstack Projects"
          eyebrow="End-to-end product delivery"
          description="Fullstack engagements spanning front-end experiences, API platforms, and infrastructure automation. Each project links to its GitHub repository for deeper technical detail."
          action={{ href: 'https://github.com/rahjooh', label: 'GitHub profile', external: true }}
        />
        <div className="card-grid">
          {fullstackProjects.map((project) => {
            const repo = repositorySlugFromUrl(project.repository);
            const metrics = repo ? metricsLookup.get(repo) : undefined;

            return (
              <article key={project.title} className="card" style={{ gap: '1.1rem' }}>
                <div>
                  <span className="eyebrow">{project.period}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description}</p>
                <TagList tags={project.stack} />
                {metrics ? (
                  <div className="repo-metrics" aria-label="Repository metrics">
                      {metrics.watchers > 0 ? (
                          <span>{metrics.watchers.toLocaleString()} 👀 Watchers</span>
                      ) : null}
                    {metrics.lastPushedAt ? (
                      <span>
                        Updated{' '}
                        {new Date(metrics.lastPushedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <p>{project.impact}</p>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1.2rem',
                    color: 'var(--color-text-muted)',
                    display: 'grid',
                    gap: '0.75rem'
                  }}
                >
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href={project.repository} target="_blank" rel="noreferrer">
                    Repository ↗
                  </Link>
                  {project.live ? (
                    <Link href={project.live} target="_blank" rel="noreferrer">
                      Live demo ↗
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
