'use client';

import { useState } from 'react';
import { FaqConfig } from '@/lib/types';
import styles from './FaqBlock.module.css';

export default function FaqBlock({ config }: { config: FaqConfig }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.faq}>
      <div className="container">
        {config.heading && <h2 className={styles.heading}>{config.heading}</h2>}
        <div className={styles.list}>
          {config.items?.map((item, i) => (
            <div key={i} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className={styles.icon}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className={styles.answer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
