import { CtaConfig } from '@/lib/types';
import styles from './CtaBlock.module.css';

export default function CtaBlock({ config }: { config: CtaConfig }) {
  const sectionStyle: React.CSSProperties = {};
  if (config.bgColor) sectionStyle.backgroundColor = config.bgColor;

  return (
    <section className={styles.cta} style={sectionStyle}>
      <div className={`container ${styles.content}`}>
        <h2 className={styles.heading}>{config.heading}</h2>
        {config.subtext && <p className={styles.subtext}>{config.subtext}</p>}
        {config.buttonLabel && config.buttonHref && (
          <a href={config.buttonHref} className={styles.button}>
            {config.buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}
