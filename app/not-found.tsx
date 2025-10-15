import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '6rem' }}>
      <span className="button" aria-hidden="true">
        404
      </span>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        The page you are looking for has drifted into a data swamp. Let&apos;s guide you back to the
        source of truth.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/" className="button">
          Return home
        </Link>
      </div>
    </div>
  );
}
