import Link from 'next/link';
import { projects } from '@/data/projects';

export const metadata = {
  title: 'Projects'
};

export default function ProjectsPage() {
  return (
    <div>
      <section className="section-header">
        <div>
          <h1>Projects</h1>
          <p>
            Selected engagements blending modern data engineering, operational analytics, and product
            leadership.
          </p>
        </div>
        <Link href="https://github.com/hadirahjou" target="_blank" rel="noreferrer" className="button">
          GitHub Profile
        </Link>
      </section>

      <section className="card-grid">
        {projects.map((project) => (
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
            <ul style={{ marginTop: '1.5rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
              {project.highlights.map((highlight) => (
                <li key={highlight} style={{ marginBottom: '0.75rem' }}>
                  {highlight}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
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
      </section>
    </div>
  );
}
