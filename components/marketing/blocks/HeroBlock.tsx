import { HeroConfig } from '@/lib/types';
import styles from './HeroBlock.module.css';

export default function HeroBlock({ config }: { config: HeroConfig }) {
  const bgStyle: React.CSSProperties = {};
  if (config.bgColor) bgStyle.backgroundColor = config.bgColor;
  if (config.bgImage) {
    bgStyle.backgroundImage = `url(${config.bgImage})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  return (
    <section className={styles.hero} style={bgStyle}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <h1 className={styles.heading}>{config.heading}</h1>
        {config.subheading && (
          <p className={styles.subheading}>{config.subheading}</p>
        )}
        {config.ctaLabel && config.ctaHref && (
          <a href={config.ctaHref} className={styles.cta}>
            {config.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
