import Link from 'next/link';
import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import TagList from '@/components/TagList';
import { blogPosts } from '@/data/blogPosts';

export const metadata = {
  title: 'Blog'
};

export default function BlogPage() {
  return (
    <div>
      <Section>
        <PageHeader
          title="Blog"
          eyebrow="Signals from the field"
          description="Essays and field notes about data engineering, modern analytics, and leading technical teams."
          action={{ href: '/projects', label: 'Explore projects' }}
        />
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.slug} className="blog-card">
              <time dateTime={post.date} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {new Date(post.date).toLocaleDateString()}
              </time>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <TagList tags={post.tags} />
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{post.readingTime}</span>
              <Link href={`/blog/${post.slug}`} className="button button--ghost" style={{ width: 'fit-content' }}>
                Read article
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
