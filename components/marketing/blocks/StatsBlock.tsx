import { StatsConfig } from '@/lib/types';
import styles from './StatsBlock.module.css';

export default function StatsBlock({ config }: { config: StatsConfig }) {
  const sectionStyle: React.CSSProperties = {};
  if (config.bgColor) sectionStyle.backgroundColor = config.bgColor;

  return (
    <section className={styles.stats} style={sectionStyle}>
      <div className={`container ${styles.grid}`}>
        {config.stats?.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.value}>{stat.value}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
