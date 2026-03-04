'use client';

import { Block, BlockType } from '@/lib/types';
import styles from './editor.module.css';

interface Props {
  block: Block;
  onChange: (config: Record<string, unknown>) => void;
}

export default function BlockConfigForm({ block, onChange }: Props) {
  const c = block.config as Record<string, unknown>;

  function update(key: string, value: unknown) {
    onChange({ ...c, [key]: value });
  }

  switch (block.type as BlockType) {
    case 'hero':
      return (
        <div className={styles.configForm}>
          <Field label="Heading">
            <input
              type="text"
              value={(c.heading as string) || ''}
              onChange={(e) => update('heading', e.target.value)}
              className={styles.input}
            />
          </Field>
          <Field label="Subheading">
            <textarea
              value={(c.subheading as string) || ''}
              onChange={(e) => update('subheading', e.target.value)}
              className={styles.textarea}
              rows={3}
            />
          </Field>
          <Field label="CTA Button Label">
            <input
              type="text"
              value={(c.ctaLabel as string) || ''}
              onChange={(e) => update('ctaLabel', e.target.value)}
              className={styles.input}
            />
          </Field>
          <Field label="CTA Button Link">
            <input
              type="text"
              value={(c.ctaHref as string) || ''}
              onChange={(e) => update('ctaHref', e.target.value)}
              className={styles.input}
            />
          </Field>
          <Field label="Background Color">
            <div className={styles.colorRow}>
              <input
                type="color"
                value={(c.bgColor as string) || '#1a1a2e'}
                onChange={(e) => update('bgColor', e.target.value)}
                className={styles.colorPicker}
              />
              <input
                type="text"
                value={(c.bgColor as string) || ''}
                onChange={(e) => update('bgColor', e.target.value)}
                className={styles.input}
                placeholder="#1a1a2e"
              />
            </div>
          </Field>
          <Field label="Background Image URL">
            <input
              type="text"
              value={(c.bgImage as string) || ''}
              onChange={(e) => update('bgImage', e.target.value)}
              className={styles.input}
              placeholder="https://..."
            />
          </Field>
        </div>
      );

    case 'features': {
      const features = (c.features as Array<{ icon: string; title: string; description: string }>) || [];
      return (
        <div className={styles.configForm}>
          <Field label="Section Heading">
            <input
              type="text"
              value={(c.heading as string) || ''}
              onChange={(e) => update('heading', e.target.value)}
              className={styles.input}
            />
          </Field>
          <Field label="Subheading">
            <input
              type="text"
              value={(c.subheading as string) || ''}
              onChange={(e) => update('subheading', e.target.value)}
              className={styles.input}
            />
          </Field>
          <div className={styles.arraySection}>
            <div className={styles.arraySectionHeader}>
              <span className={styles.arrayLabel}>Features</span>
              <button
                className={styles.addItemBtn}
                onClick={() =>
                  update('features', [
                    ...features,
                    { icon: '⭐', title: 'New Feature', description: 'Description here.' },
                  ])
                }
              >
                + Add
              </button>
            </div>
            {features.map((feat, i) => (
              <div key={i} className={styles.arrayItem}>
                <div className={styles.arrayItemHeader}>
                  <span className={styles.arrayItemNum}>#{i + 1}</span>
                  <button
                    className={styles.removeItemBtn}
                    onClick={() =>
                      update(
                        'features',
                        features.filter((_, fi) => fi !== i)
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
                <Field label="Icon (emoji)">
                  <input
                    type="text"
                    value={feat.icon}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[i] = { ...feat, icon: e.target.value };
                      update('features', updated);
                    }}
                    className={styles.input}
                  />
                </Field>
                <Field label="Title">
                  <input
                    type="text"
                    value={feat.title}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[i] = { ...feat, title: e.target.value };
                      update('features', updated);
                    }}
                    className={styles.input}
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    value={feat.description}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[i] = { ...feat, description: e.target.value };
                      update('features', updated);
                    }}
                    className={styles.textarea}
                    rows={2}
                  />
                </Field>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'testimonials': {
      const testimonials = (c.testimonials as Array<{ name: string; role: string; quote: string; avatar: string }>) || [];

      const updateTestimonial = (i: number, field: string, value: string) => {
        const u = [...testimonials];
        u[i] = { ...u[i], [field]: value };
        update('testimonials', u);
      }

      return (
        <div className={styles.configForm}>
          <Field label="Section Heading">
            <input
              type="text"
              value={(c.heading as string) || ''}
              onChange={(e) => update('heading', e.target.value)}
              className={styles.input}
            />
          </Field>
          <div className={styles.arraySection}>
            <div className={styles.arraySectionHeader}>
              <span className={styles.arrayLabel}>Testimonials</span>
              <button
                className={styles.addItemBtn}
                onClick={() =>
                  update('testimonials', [
                    ...testimonials,
                    { name: 'Customer Name', role: 'Author', quote: 'Great service!', avatar: '' },
                  ])
                }
              >
                + Add
              </button>
            </div>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.arrayItem}>
                <div className={styles.arrayItemHeader}>
                  <span className={styles.arrayItemNum}>#{i + 1}</span>
                  <button
                    className={styles.removeItemBtn}
                    onClick={() =>
                      update('testimonials', testimonials.filter((_, ti) => ti !== i))
                    }
                  >
                    ✕
                  </button>
                </div>
                <Field label="Name">
                  <input type="text" value={t.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} className={styles.input} />
                </Field>
                <Field label="Role">
                  <input type="text" value={t.role} onChange={(e) => updateTestimonial(i, 'role', e.target.value)} className={styles.input} />
                </Field>
                <Field label="Quote">
                  <textarea value={t.quote} onChange={(e) => updateTestimonial(i, 'quote', e.target.value)} className={styles.textarea} rows={3} />
                </Field>
                <Field label="Avatar URL">
                  <input type="text" value={t.avatar || ''} onChange={(e) => updateTestimonial(i, 'avatar', e.target.value)} className={styles.input} placeholder="https://..." />
                </Field>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'cta':
      return (
        <div className={styles.configForm}>
          <Field label="Heading">
            <input type="text" value={(c.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className={styles.input} />
          </Field>
          <Field label="Subtext">
            <textarea value={(c.subtext as string) || ''} onChange={(e) => update('subtext', e.target.value)} className={styles.textarea} rows={2} />
          </Field>
          <Field label="Button Label">
            <input type="text" value={(c.buttonLabel as string) || ''} onChange={(e) => update('buttonLabel', e.target.value)} className={styles.input} />
          </Field>
          <Field label="Button Link">
            <input type="text" value={(c.buttonHref as string) || ''} onChange={(e) => update('buttonHref', e.target.value)} className={styles.input} />
          </Field>
          <Field label="Background Color">
            <div className={styles.colorRow}>
              <input type="color" value={(c.bgColor as string) || '#6366f1'} onChange={(e) => update('bgColor', e.target.value)} className={styles.colorPicker} />
              <input type="text" value={(c.bgColor as string) || ''} onChange={(e) => update('bgColor', e.target.value)} className={styles.input} />
            </div>
          </Field>
        </div>
      );

    case 'text-image':
      return (
        <div className={styles.configForm}>
          <Field label="Heading">
            <input type="text" value={(c.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className={styles.input} />
          </Field>
          <Field label="Text">
            <textarea value={(c.text as string) || ''} onChange={(e) => update('text', e.target.value)} className={styles.textarea} rows={4} />
          </Field>
          <Field label="Image URL">
            <input type="text" value={(c.imageUrl as string) || ''} onChange={(e) => update('imageUrl', e.target.value)} className={styles.input} placeholder="https://..." />
          </Field>
          <Field label="Image Alt Text">
            <input type="text" value={(c.imageAlt as string) || ''} onChange={(e) => update('imageAlt', e.target.value)} className={styles.input} />
          </Field>
          <Field label="Image Position">
            <select
              value={(c.imagePosition as string) || 'right'}
              onChange={(e) => update('imagePosition', e.target.value)}
              className={styles.select}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </Field>
        </div>
      );

    case 'stats': {
      const stats = (c.stats as Array<{ value: string; label: string }>) || [];
      return (
        <div className={styles.configForm}>
          <Field label="Background Color">
            <div className={styles.colorRow}>
              <input type="color" value={(c.bgColor as string) || '#6366f1'} onChange={(e) => update('bgColor', e.target.value)} className={styles.colorPicker} />
              <input type="text" value={(c.bgColor as string) || ''} onChange={(e) => update('bgColor', e.target.value)} className={styles.input} />
            </div>
          </Field>
          <div className={styles.arraySection}>
            <div className={styles.arraySectionHeader}>
              <span className={styles.arrayLabel}>Stats</span>
              <button className={styles.addItemBtn} onClick={() => update('stats', [...stats, { value: '0', label: 'Stat Label' }])}>+ Add</button>
            </div>
            {stats.map((s, i) => (
              <div key={i} className={styles.arrayItem}>
                <div className={styles.arrayItemHeader}>
                  <span className={styles.arrayItemNum}>#{i + 1}</span>
                  <button className={styles.removeItemBtn} onClick={() => update('stats', stats.filter((_, si) => si !== i))}>✕</button>
                </div>
                <Field label="Value">
                  <input type="text" value={s.value} onChange={(e) => { const u = [...stats]; u[i] = { ...s, value: e.target.value }; update('stats', u); }} className={styles.input} />
                </Field>
                <Field label="Label">
                  <input type="text" value={s.label} onChange={(e) => { const u = [...stats]; u[i] = { ...s, label: e.target.value }; update('stats', u); }} className={styles.input} />
                </Field>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'faq': {
      const items = (c.items as Array<{ question: string; answer: string }>) || [];
      return (
        <div className={styles.configForm}>
          <Field label="Section Heading">
            <input type="text" value={(c.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className={styles.input} />
          </Field>
          <div className={styles.arraySection}>
            <div className={styles.arraySectionHeader}>
              <span className={styles.arrayLabel}>FAQ Items</span>
              <button className={styles.addItemBtn} onClick={() => update('items', [...items, { question: 'New question?', answer: 'Answer here.' }])}>+ Add</button>
            </div>
            {items.map((item, i) => (
              <div key={i} className={styles.arrayItem}>
                <div className={styles.arrayItemHeader}>
                  <span className={styles.arrayItemNum}>#{i + 1}</span>
                  <button className={styles.removeItemBtn} onClick={() => update('items', items.filter((_, ii) => ii !== i))}>✕</button>
                </div>
                <Field label="Question">
                  <input type="text" value={item.question} onChange={(e) => { const u = [...items]; u[i] = { ...item, question: e.target.value }; update('items', u); }} className={styles.input} />
                </Field>
                <Field label="Answer">
                  <textarea value={item.answer} onChange={(e) => { const u = [...items]; u[i] = { ...item, answer: e.target.value }; update('items', u); }} className={styles.textarea} rows={3} />
                </Field>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'rich-text':
      return (
        <div className={styles.configForm}>
          <Field label="HTML Content">
            <textarea
              value={(c.content as string) || ''}
              onChange={(e) => update('content', e.target.value)}
              className={styles.textarea}
              rows={12}
              placeholder="<p>Your HTML content here...</p>"
            />
          </Field>
          <p className={styles.hint}>You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.</p>
        </div>
      );

    default:
      return <div className={styles.configForm}><p>No config form for this block type.</p></div>;
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}
