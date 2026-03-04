import { RichTextConfig } from '@/lib/types';
import styles from './RichTextBlock.module.css';

export default function RichTextBlock({ config }: { config: RichTextConfig }) {
  return (
    <section className={styles.richText}>
      <div className="container">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: config.content || '' }}
        />
      </div>
    </section>
  );
}
