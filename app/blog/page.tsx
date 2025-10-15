import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

export const metadata = {
  title: 'Blog'
};

export default function BlogPage() {
  return (
    <div>
      <section className="section-header">
        <div>
          <h1>Blog</h1>
          <p>
            Essays and field notes about data engineering, modern analytics, and leading technical
            teams.
          </p>
        </div>
        <Link href="/projects" className="button">
          Explore Projects
        </Link>
      </section>

      <section className="blog-grid">
        {blogPosts.map((post) => (
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
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{post.readingTime}</span>
            <Link href={`/blog/${post.slug}`} className="button" style={{ width: 'fit-content' }}>
              Read article
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
