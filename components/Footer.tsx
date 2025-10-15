import Link from 'next/link';

const footerLinks = [
  { href: 'https://github.com/rahjooh', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/hadi-rahjou', label: 'LinkedIn' },
  { href: 'mailto:hadi@hadirahjou.ir', label: 'Email' }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <span className="eyebrow">Currently open to advisory partnerships</span>
          <p>
            © {new Date().getFullYear()} Hadi Rahjou. Crafted with curiosity and a love for reliable data.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
