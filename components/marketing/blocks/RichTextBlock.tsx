import sanitizeHtml from 'sanitize-html';
import { RichTextConfig } from '@/lib/types';
import styles from './RichTextBlock.module.css';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'strong', 'em', 'u', 's', 'b', 'i',
  'a', 'img',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span',
];

export default function RichTextBlock({ config }: { config: RichTextConfig }) {
  const safeHtml = sanitizeHtml(config.content || '', {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      '*': ['class', 'id', 'style'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });

  return (
    <section className={styles.richText}>
      <div className="container">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </div>
    </section>
  );
}
