import { cookies } from 'next/headers';
import Sidebar from '@/components/dashboard/Sidebar';
import LogoutButton from '@/components/dashboard/LogoutButton';
import styles from './dashboard.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('dashboard_auth');

  // Not authenticated → middleware will redirect, but render children (login page) without sidebar
  if (!auth || auth.value !== 'true') {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarInner}>
            <span className={styles.topbarTitle}>Dashboard</span>
            <LogoutButton />
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
