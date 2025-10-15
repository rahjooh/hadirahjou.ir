import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TagList from '@/components/TagList';
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
      <Link href="/blog" className="button button--ghost" style={{ width: 'fit-content' }}>
        ← Back to blog
      </Link>
      <header>
        <span className="eyebrow">{new Date(post.date).toLocaleDateString()}</span>
        <h1>{post.title}</h1>
        <span style={{ color: 'var(--color-text-muted)' }}>{post.readingTime}</span>
        <TagList tags={post.tags} />
      </header>
      {post.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}
