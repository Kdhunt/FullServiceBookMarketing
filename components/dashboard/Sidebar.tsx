import Link from 'next/link';
import styles from './Sidebar.module.css';

const navItems = [
  { label: '📄 Pages', href: '/dashboard/marketing/pages' },
  { label: '⚙️ Settings', href: '/dashboard/marketing/settings' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/dashboard" className={styles.logoLink}>
          📚 BookMarketing
        </Link>
      </div>
      <nav className={styles.nav}>
        <p className={styles.sectionLabel}>Marketing</p>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.footer}>
        <Link href="/" className={styles.previewLink} target="_blank">
          ↗ View Site
        </Link>
      </div>
    </aside>
  );
}
