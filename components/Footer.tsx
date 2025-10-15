import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Hadi Rahjou. Crafted with curiosity.</span>
        <div className="nav-links">
          <Link href="https://github.com/hadirahjou" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/hadi-rahjou" target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href="mailto:hadi@hadirahjou.ir">Email</Link>
        </div>
      </div>
    </footer>
  );
}
