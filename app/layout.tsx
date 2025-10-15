import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Hadi Rahjou — Data Engineer & Storyteller',
    template: '%s | Hadi Rahjou'
  },
  description:
    'Portfolio, CV, and blog of Hadi Rahjou — a data engineer crafting resilient data products and sharing insights about modern data platforms.',
  openGraph: {
    title: 'Hadi Rahjou — Data Engineer & Storyteller',
    description:
      'Discover Hadi Rahjou\'s professional experience, highlighted projects, and essays about modern data engineering.',
    url: 'https://hadirahjou.ir',
    siteName: 'Hadi Rahjou',
    locale: 'en_US',
    type: 'website'
  },
  metadataBase: new URL('https://hadirahjou.ir'),
  keywords: [
    'data engineer',
    'analytics engineer',
    'portfolio',
    'blog',
    'hadi rahjou',
    'data platforms'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-wrapper">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
