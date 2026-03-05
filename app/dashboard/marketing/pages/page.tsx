import Link from 'next/link';
import { getPages } from '@/lib/data';
import styles from './pages.module.css';

export default function PagesListPage() {
  const pages = getPages();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Marketing Pages</h1>
          <p className={styles.sub}>Create and manage your marketing pages</p>
        </div>
        <Link href="/dashboard/marketing/pages/new" className={styles.createBtn}>
          + New Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className={styles.empty}>
          <p>No pages yet.</p>
          <Link href="/dashboard/marketing/pages/new" className={styles.createBtn}>
            Create your first page
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className={styles.titleCell}>{page.title}</td>
                  <td>
                    <code className={styles.slug}>/{page.slug}</code>
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        page.status === 'published'
                          ? styles.published
                          : styles.draft
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/dashboard/marketing/pages/${page.id}`}
                        className={styles.actionBtn}
                      >
                        Edit
                      </Link>
                      {page.status === 'published' && (
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtn}
                        >
                          Preview ↗
                        </a>
                      )}
                      <DeletePageButton pageId={page.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Client component for delete
import DeletePageButton from './DeletePageButton';
