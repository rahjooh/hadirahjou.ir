import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '6rem', display: 'grid', gap: '1rem' }}>
      <span className="eyebrow">404 — Page not found</span>
      <h1 style={{ fontSize: '3rem', margin: 0 }}>This page drifted into a data swamp.</h1>
      <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
        Let&apos;s guide you back to the source of truth and the insights you came for.
      </p>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/" className="button">
          Return home
        </Link>
      </div>
    </div>
  );
}
