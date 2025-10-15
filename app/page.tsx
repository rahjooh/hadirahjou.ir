import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import TagList from '@/components/TagList';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blogPosts';

const stats = [
  { label: 'Years shaping data platforms', value: '10+' },
  { label: 'Teams mentored to production', value: '14' },
  { label: 'Articles & talks published', value: '36' }
];

export default function HomePage() {
  const featuredProjects = projects.slice(0, 2);
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <div>
      <section className="hero">
        <div className="intro">
          <span className="eyebrow">Data Engineering Leadership</span>
          <h1>Designing resilient data platforms and telling the stories behind the signals.</h1>
          <p>
            I help organisations design modern analytics ecosystems, nurture dependable delivery teams, and translate complex
            systems into narratives leaders understand.
          </p>
          <TagList tags={['Data Platforms', 'Analytics Engineering', 'Observability', 'Narrative Storytelling']} />
          <div className="stats-grid" style={{ marginTop: '2.5rem' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="highlight-cards">
          <article className="highlight-card">
            <span className="eyebrow">Latest Work</span>
            <h3>PulseLake Platform</h3>
            <p>
              Steering a modular lakehouse with contract-first analytics, observability automation, and measurable business
              adoption.
            </p>
            <Link href="/projects" className="button" style={{ width: 'fit-content' }}>
              Explore projects
            </Link>
          </article>
          <article className="highlight-card">
            <span className="eyebrow">Fresh Insight</span>
            <h3>Reliability Patterns for Lakehouses</h3>
            <p>
              A playbook to keep pipelines trustworthy as organisations layer experimentation, governance, and rapid iteration.
            </p>
            <Link href="/blog/lakehouse-reliability-patterns" className="button button--ghost" style={{ width: 'fit-content' }}>
              Read the article
            </Link>
          </article>
        </div>
      </section>

      <Section>
        <PageHeader
          title="Highlighted Projects"
          description="A selection of shipped platforms and accelerators linking strategy, engineering, and enablement."
          action={{ href: '/projects', label: 'View all projects' }}
        />
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <article key={project.title} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <TagList tags={project.stack} />
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={project.repository} target="_blank" rel="noreferrer">
                  Repository ↗
                </Link>
                {project.live ? (
                  <Link href={project.live} target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <PageHeader
          title="Latest Writing"
          description="Field notes and frameworks for data platform leaders navigating scale."
          action={{ href: '/blog', label: 'Browse the archive' }}
        />
        <div className="blog-grid">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="blog-card">
              <time dateTime={post.date} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {new Date(post.date).toLocaleDateString()}
              </time>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <TagList tags={post.tags} />
              <Link href={`/blog/${post.slug}`} className="button button--ghost" style={{ width: 'fit-content' }}>
                Continue reading
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
