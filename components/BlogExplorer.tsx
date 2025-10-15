'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import TagList from './TagList';
import type { BlogPost } from '@/data/blogPosts';

interface BlogExplorerProps {
  posts: BlogPost[];
}

export default function BlogExplorer({ posts }: BlogExplorerProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (normalisedQuery.length > 0) {
        const haystack = `${post.title} ${post.summary} ${post.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(normalisedQuery)) {
          return false;
        }
      }

      const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
      return matchesTag;
    });
  }, [posts, query, activeTag]);

  const queryLabel = query.trim();

  return (
    <div className="blog-explorer">
      <div className="blog-controls" role="search">
        <label className="visually-hidden" htmlFor="blog-search">
          Search blog posts
        </label>
        <input
          id="blog-search"
          type="search"
          placeholder="Search playbooks, patterns, or tools"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="tag-filter" aria-label="Filter by topic">
          <button
            type="button"
            className={!activeTag ? 'active' : ''}
            onClick={() => setActiveTag(null)}
          >
            All topics
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={activeTag === tag ? 'active' : ''}
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="blog-results" aria-live="polite">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'entry' : 'entries'}
          {activeTag ? ` tagged with ${activeTag}` : ''}
          {queryLabel ? ` matching “${queryLabel}”` : ''}.
        </p>
      </div>

      <div className="blog-grid">
        {filteredPosts.map((post) => (
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
        {filteredPosts.length === 0 ? (
          <div className="card" role="status" style={{ gridColumn: '1 / -1' }}>
            <p>No posts found. Try broadening your search or clearing filters.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
