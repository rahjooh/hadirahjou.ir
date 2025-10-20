import Link from 'next/link';
import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import TagList from '@/components/TagList';
import {
  certifications,
  education,
  experience,
  interests,
  operatingPrinciples,
  skills,
  stats as profileStats,
  summary
} from '@/data/profile';

export const metadata = {
  title: 'Profile & CV'
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hadi Rahjou',
  jobTitle: 'Principal Data Engineer & Consultant',
  url: 'https://hadirahjou.ir',
  email: 'mailto:hadi@hadirahjou.ir',
  sameAs: ['https://github.com/rahjooh', 'https://www.linkedin.com/in/hadirahjou'],
  description: summary,
  knowsAbout: [...new Set(skills.flat())]
};

export default function ProfilePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Section id="cv">
        <PageHeader
          title="Profile & CV"
          eyebrow="Data platforms for exchanges, marketplaces, and growth teams"
          description="I pair streaming-first architecture with pragmatic product instincts so stakeholders always have trustworthy, real-time insight."
          action={{ href: 'mailto:hadi@hadirahjou.ir', label: 'Request project portfolio' }}
        />
        <div className="card" style={{ padding: '2.25rem' }}>
          <h2>About</h2>
          <p>{summary}</p>
        </div>
        <div className="stats-grid" style={{ marginTop: '2.5rem' }}>
          {profileStats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <div className="page-header__content">
            <span className="eyebrow">Experience</span>
            <h2>Delivering resilient data platforms</h2>
            <p>Engagements spanning crypto, e-commerce, and super-app ecosystems with a focus on dependable, observable delivery.</p>
          </div>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.company} className="timeline-item">
              <h3>
                {item.role} · {item.company}
              </h3>
              <span>{item.period}</span>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <div className="page-header__content">
            <span className="eyebrow">Operating Principles</span>
            <h2>How I show up as a partner</h2>
            <p>Practices that keep pipelines observable, roadmaps transparent, and teams shipping confidently.</p>
          </div>
        </div>
        <div className="card-grid">
          {operatingPrinciples.map((principle) => (
            <article key={principle.title} className="card">
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <div className="page-header__content">
            <span className="eyebrow">Skills Matrix</span>

            <h2>From stream ingestion to activation</h2>
            <p>Hands-on with languages, platforms, and governance tooling that keep data products fast and reliable.</p>
          </div>
        </div>
        <div className="list-grid">
          {skills.map((group, idx) => (
            <ul key={idx}>
              {group.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ))}
        </div>
      </Section>

      <Section>
        <div className="card-grid">
          <article className="card">
            <span className="eyebrow">Education</span>
            {education.map((item) => (
              <p key={item.degree}>
                <strong>{item.degree}</strong>
                <br />
                {item.institution} · {item.period}
              </p>
            ))}
          </article>
          <article className="card">
            <span className="eyebrow">Certifications</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section>
        <div className="card" style={{ padding: '2rem' }}>
          <span className="eyebrow">Outside the terminal</span>
          <p>
            Outside of shipping data products you can find me documenting crypto market structure, coaching emerging engineers, and chasing Tehran cycling climbs.
          </p>
          <TagList tags={interests} />
          <Link href="/blog" className="button button--ghost" style={{ width: 'fit-content', marginTop: '1.5rem' }}>
            Read my writing
          </Link>
        </div>
      </Section>
    </div>
  );
}
