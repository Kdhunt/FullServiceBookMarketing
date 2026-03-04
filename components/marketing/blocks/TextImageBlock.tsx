import { TextImageConfig } from '@/lib/types';
import styles from './TextImageBlock.module.css';

export default function TextImageBlock({
  config,
}: {
  config: TextImageConfig;
}) {
  const isLeft = config.imagePosition === 'left';

  return (
    <section className={styles.section}>
      <div
        className={`container ${styles.inner} ${isLeft ? styles.imageLeft : styles.imageRight}`}
      >
        <div className={styles.textCol}>
          <h2 className={styles.heading}>{config.heading}</h2>
          <p className={styles.text}>{config.text}</p>
        </div>
        <div className={styles.imageCol}>
          {config.imageUrl ? (
            <img
              src={config.imageUrl}
              alt={config.imageAlt || ''}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>No image set</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
