import Link from 'next/link';
import styles from './dashHome.module.css';

export default function DashboardHomePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to the Dashboard</h1>
      <p className={styles.sub}>
        Manage your marketing pages and site settings from here.
      </p>
      <div className={styles.cards}>
        <Link href="/dashboard/marketing/pages" className={styles.card}>
          <div className={styles.cardIcon}>📄</div>
          <div className={styles.cardTitle}>Pages</div>
          <div className={styles.cardDesc}>Create and manage marketing pages</div>
        </Link>
        <Link href="/dashboard/marketing/settings" className={styles.card}>
          <div className={styles.cardIcon}>⚙️</div>
          <div className={styles.cardTitle}>Settings</div>
          <div className={styles.cardDesc}>Update site name, links, and style</div>
        </Link>
      </div>
    </div>
  );
}
