import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import { blogPosts } from '@/data/blogPosts';
import BlogExplorer from '@/components/BlogExplorer';

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
        <BlogExplorer posts={blogPosts} />
      </Section>
    </div>
  );
}
