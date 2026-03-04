import Link from 'next/link';
import { SiteSettings } from '@/lib/types';
import styles from './MarketingHeader.module.css';

export default function MarketingHeader({
  settings,
}: {
  settings: SiteSettings;
}) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          {settings.logoText || settings.siteName}
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          {settings.headerLinks?.map((link, i) => (
            <Link key={i} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/pricing" className={styles.cta}>
          Get Started
        </Link>
      </div>
    </header>
  );
}
