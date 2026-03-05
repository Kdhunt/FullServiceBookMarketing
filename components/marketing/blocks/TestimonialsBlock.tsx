import { TestimonialsConfig } from '@/lib/types';
import styles from './TestimonialsBlock.module.css';

export default function TestimonialsBlock({
  config,
}: {
  config: TestimonialsConfig;
}) {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        {config.heading && (
          <h2 className={styles.heading}>{config.heading}</h2>
        )}
        <div className={styles.grid}>
          {config.testimonials?.map((t, i) => (
            <div key={i} className={styles.card}>
              <blockquote className={styles.quote}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className={styles.author}>
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
