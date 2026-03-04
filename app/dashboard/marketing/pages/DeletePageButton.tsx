'use client';

import { useRouter } from 'next/navigation';
import styles from './pages.module.css';

export default function DeletePageButton({ pageId }: { pageId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this page?')) return;

    const res = await fetch(`/api/pages/${pageId}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete page.');
    }
  }

  return (
    <button onClick={handleDelete} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
      Delete
    </button>
  );
}
