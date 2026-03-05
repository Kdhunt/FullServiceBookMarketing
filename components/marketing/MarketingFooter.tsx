import Link from 'next/link';
import { SiteSettings } from '@/lib/types';
import styles from './MarketingFooter.module.css';

export default function MarketingFooter({
  settings,
}: {
  settings: SiteSettings;
}) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>{settings.logoText || settings.siteName}</div>
          {settings.footerTagline && (
            <p className={styles.tagline}>{settings.footerTagline}</p>
          )}
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          {settings.footerLinks?.map((link, i) => (
            <Link key={i} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          {settings.footerCopyright}
        </p>
      </div>
    </footer>
  );
}
