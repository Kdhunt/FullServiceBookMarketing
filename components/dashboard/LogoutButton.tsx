'use client';

import { useRouter } from 'next/navigation';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/dashboard/login');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Logout
    </button>
  );
}
