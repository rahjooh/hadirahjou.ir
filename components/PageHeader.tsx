import Link from 'next/link';
import type { ReactNode } from 'react';

interface PageHeaderAction {
  href: string;
  label: string;
  external?: boolean;
}

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  action?: PageHeaderAction;
  align?: 'start' | 'center';
}

export default function PageHeader({ title, eyebrow, description, action, align = 'start' }: PageHeaderProps) {
  return (
    <header className={`page-header page-header--${align}`}>
      <div className="page-header__content">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="button button--ghost"
          target={action.external ? '_blank' : undefined}
          rel={action.external ? 'noreferrer' : undefined}
        >
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}
