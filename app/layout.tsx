import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://hadirahjou.ir'),
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
  keywords: [
    'data engineer',
    'analytics engineer',
    'portfolio',
    'blog',
    'hadi rahjou',
    'data platforms'
  ],
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport: Viewport = {
  themeColor: '#0f172a'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable}`}>
        <div className="page-wrapper">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
