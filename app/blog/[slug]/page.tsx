import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TagList from '@/components/TagList';
import { blogPosts } from '@/data/blogPosts';

type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; language?: string; content: string };

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

function parseContent(content: string[]): ContentBlock[] {
  const lines = content.join('\n').split('\n');
  const blocks: ContentBlock[] = [];
  let paragraphBuffer: string[] = [];
  let inCode = false;
  let codeLanguage = '';
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      blocks.push({ type: 'paragraph', text: paragraphBuffer.join(' ') });
      paragraphBuffer = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      if (inCode) {
        blocks.push({
          type: 'code',
          language: codeLanguage || undefined,
          content: codeLines.join('\n')
        });
        inCode = false;
        codeLanguage = '';
        codeLines = [];
      } else {
        flushParagraph();
        inCode = true;
        codeLanguage = line.replace('```', '').trim();
        codeLines = [];
      }
      return;
    }

    if (inCode) {
      codeLines.push(rawLine);
      return;
    }

    if (line === '') {
      flushParagraph();
      return;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      blocks.push({ type: 'heading', level: 3, text: line.slice(4) });
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      blocks.push({ type: 'heading', level: 2, text: line.slice(3) });
      return;
    }

    paragraphBuffer.push(line);
  });

  if (paragraphBuffer.length) {
    blocks.push({ type: 'paragraph', text: paragraphBuffer.join(' ') });
  }

  return blocks;
}

function renderInline(text: string) {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens
    .filter(Boolean)
    .map((token, index) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={index}>
            {token.slice(2, -2)}
          </strong>
        );
      }

      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code key={index} className="inline-code">
            {token.slice(1, -1)}
          </code>
        );
      }

      if (token.startsWith('*') && token.endsWith('*')) {
        return (
          <em key={index}>
            {token.slice(1, -1)}
          </em>
        );
      }

      return <span key={index}>{token}</span>;
    });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
    return null;
  }

  const publishedDate = new Date(post.date);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const yearsAgo = Math.max(
    1,
    Math.round((Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
  );
  const relativeDateLabel = `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
  const contentBlocks = parseContent(post.content);

  return (
    <article className="article">
      <Link href="/blog" className="button button--ghost" style={{ width: 'fit-content' }}>
        ← Back to blog
      </Link>
      <header>
        <span className="eyebrow" style={{ gap: '0.5rem' }}>
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true">•</span>
          <span>{relativeDateLabel}</span>
        </span>
        <h1>{post.title}</h1>
        <span style={{ color: 'var(--color-text-muted)' }}>{post.readingTime}</span>
        <TagList tags={post.tags} />
      </header>
      <section className="article-content">
        {contentBlocks.map((block, index) => {
          if (block.type === 'heading') {
            const HeadingTag = block.level === 2 ? 'h2' : 'h3';
            return <HeadingTag key={`${block.text}-${index}`}>{renderInline(block.text)}</HeadingTag>;
          }

          if (block.type === 'code') {
            return (
              <pre key={`code-${index}`}>
                <code className={block.language ? `language-${block.language}` : undefined}>
                  {block.content}
                </code>
              </pre>
            );
          }

          return <p key={`paragraph-${index}`}>{renderInline(block.text)}</p>;
        })}
      </section>
    </article>
  );
}
