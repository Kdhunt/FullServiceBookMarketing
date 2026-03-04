import { FeaturesConfig } from '@/lib/types';
import styles from './FeaturesBlock.module.css';

export default function FeaturesBlock({ config }: { config: FeaturesConfig }) {
  return (
    <section className={styles.features}>
      <div className="container">
        {config.heading && <h2 className={styles.heading}>{config.heading}</h2>}
        {config.subheading && (
          <p className={styles.subheading}>{config.subheading}</p>
        )}
        <div className={styles.grid}>
          {config.features?.map((feature, i) => (
            <div key={i} className={styles.card}>
              {feature.icon && (
                <div className={styles.icon}>{feature.icon}</div>
              )}
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
