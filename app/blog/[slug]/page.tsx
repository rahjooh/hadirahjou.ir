import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    return {
      title: 'Post not found'
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date
    }
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <article className="article">
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        <span style={{ color: 'var(--text-secondary)' }}>{post.readingTime}</span>
        <div className="tag-list" style={{ marginTop: '1rem' }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      {post.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}
