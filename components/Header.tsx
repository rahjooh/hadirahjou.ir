'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav>
        <Link href="/" className="nav-brand">
          <span>Hadi Rahjou</span>
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/profile#cv" className="button">
            View CV
          </Link>
        </div>
      </nav>
    </header>
  );
}
