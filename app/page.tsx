import Link from 'next/link';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blogPosts';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 2);
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <div>
      <section className="hero">
        <div className="intro">
          <span className="button" aria-hidden="true">
            Data Engineering Leadership
          </span>
          <h1>
            Building dependable data products and telling the stories behind the signals.
          </h1>
          <p>
            I help organizations design modern data platforms, nurture analytics excellence, and
            translate complex systems into narratives that inform decisions.
          </p>
          <div className="tag-list" style={{ marginTop: '2rem' }}>
            <span className="tag">Data Platforms</span>
            <span className="tag">Analytics Engineering</span>
            <span className="tag">Technical Writing</span>
            <span className="tag">Leadership</span>
          </div>
        </div>
        <div className="highlight-cards">
          <article className="highlight-card">
            <span>Latest Work</span>
            <h3>PulseLake Platform</h3>
            <p>
              Led the design of an adaptive lakehouse with contract-first analytics and automated
              observability.
            </p>
            <Link href="/projects" className="button" style={{ width: 'fit-content' }}>
              Explore Projects
            </Link>
          </article>
          <article className="highlight-card">
            <span>Fresh Insights</span>
            <h3>Reliability Patterns for Lakehouses</h3>
            <p>
              My playbook for keeping pipelines trustworthy as complexity explodes across teams and
              domains.
            </p>
            <Link
              href="/blog/lakehouse-reliability-patterns"
              className="button"
              style={{ width: 'fit-content' }}
            >
              Read the story
            </Link>
          </article>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Highlighted Projects</h2>
          <Link href="/projects" className="button">
            View all
          </Link>
        </div>
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <article key={project.title} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
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
      </section>

      <section>
        <div className="section-header">
          <h2>Latest Writing</h2>
          <Link href="/blog" className="button">
            Visit blog
          </Link>
        </div>
        <div className="blog-grid">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="blog-card">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="tag-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="button" style={{ width: 'fit-content' }}>
                Continue reading
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
