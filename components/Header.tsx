'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/projects', label: 'Projects' },
  { href: '/fullstack-projects', label: 'Fullstack' },
  { href: '/blog', label: 'Blog' }
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link href="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <span>Hadi Rahjou</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true">☰</span>
        </button>
        <div className={menuOpen ? 'nav-links is-open' : 'nav-links'} id="primary-navigation">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? 'active' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/profile#cv" className="button" onClick={() => setMenuOpen(false)}>
            View CV
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
