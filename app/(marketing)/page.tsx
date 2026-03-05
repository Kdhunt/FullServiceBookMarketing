import { getPageBySlug } from '@/lib/data';
import BlockRenderer from '@/components/marketing/BlockRenderer';
import styles from './home.module.css';

export default function HomePage() {
  const page = getPageBySlug('home') ?? getPageBySlug('');

  if (!page || page.status !== 'published') {
    return (
      <div className={styles.fallback}>
        <div className="container">
          <h1>Welcome to BookMarketing Pro</h1>
          <p>
            Expert book marketing services to help authors and publishers grow
            their readership and revenue.
          </p>
          <a href="/dashboard" className={styles.link}>
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {page.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
