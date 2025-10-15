import Link from 'next/link';
import {
  certifications,
  education,
  experience,
  interests,
  skills,
  summary
} from '@/data/profile';

export const metadata = {
  title: 'Profile & CV'
};

export default function ProfilePage() {
  return (
    <div id="cv">
      <section className="section-header">
        <div>
          <h1>Profile & CV</h1>
          <p>
            A strategist-engineer hybrid with a decade of experience building resilient analytics
            ecosystems.
          </p>
        </div>
        <Link href="mailto:hadi@hadirahjou.ir" className="button">
          Request full CV
        </Link>
      </section>

      <section>
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>About</h2>
          <p>{summary}</p>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Experience</h2>
          <p>Leading high-performing data teams from discovery to production excellence.</p>
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
      </section>

      <section>
        <div className="section-header">
          <h2>Skills Matrix</h2>
          <p>Balanced across engineering rigor, product mindset, and storytelling.</p>
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
      </section>

      <section>
        <div className="section-header">
          <h2>Education & Certifications</h2>
        </div>
        <div className="card-grid">
          <div className="card">
            <h3>Education</h3>
            {education.map((item) => (
              <p key={item.degree}>
                <strong>{item.degree}</strong>
                <br />
                {item.institution} · {item.year}
              </p>
            ))}
          </div>
          <div className="card">
            <h3>Certifications</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {certifications.map((cert) => (
                <li key={cert} style={{ marginBottom: '0.75rem' }}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Outside the Terminal</h2>
        </div>
        <div className="card">
          <p>
            I recharge by exploring the outdoors, mentoring early-career engineers, and experimenting
            with analog photography.
          </p>
          <div className="tag-list">
            {interests.map((interest) => (
              <span key={interest} className="tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
