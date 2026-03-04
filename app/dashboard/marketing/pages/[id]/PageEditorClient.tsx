'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { MarketingPage, Block, BlockType } from '@/lib/types';
import BlockConfigForm from './BlockConfigForm';
import styles from './editor.module.css';

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: 'hero', label: 'Hero', icon: '🎯' },
  { type: 'features', label: 'Features', icon: '⚡' },
  { type: 'testimonials', label: 'Testimonials', icon: '💬' },
  { type: 'cta', label: 'Call to Action', icon: '📣' },
  { type: 'text-image', label: 'Text + Image', icon: '🖼️' },
  { type: 'stats', label: 'Stats', icon: '📊' },
  { type: 'faq', label: 'FAQ', icon: '❓' },
  { type: 'rich-text', label: 'Rich Text', icon: '📝' },
];

function defaultConfig(type: BlockType): Record<string, unknown> {
  switch (type) {
    case 'hero':
      return {
        heading: 'Your Headline Here',
        subheading: 'A compelling subheading that describes your offer.',
        ctaLabel: 'Get Started',
        ctaHref: '/',
        bgColor: '#1a1a2e',
      };
    case 'features':
      return {
        heading: 'Our Features',
        subheading: 'Everything you need to succeed.',
        features: [
          { icon: '⭐', title: 'Feature One', description: 'Description of this feature.' },
          { icon: '🚀', title: 'Feature Two', description: 'Description of this feature.' },
          { icon: '🔒', title: 'Feature Three', description: 'Description of this feature.' },
        ],
      };
    case 'testimonials':
      return {
        heading: 'What Our Customers Say',
        testimonials: [
          { name: 'Jane Doe', role: 'Author', quote: 'This service changed my book sales!', avatar: '' },
        ],
      };
    case 'cta':
      return {
        heading: 'Ready to Get Started?',
        subtext: 'Join thousands of satisfied customers today.',
        buttonLabel: 'Start Now',
        buttonHref: '/',
        bgColor: '#6366f1',
      };
    case 'text-image':
      return {
        heading: 'Our Story',
        text: 'Tell your story here. What makes you different? Why should readers care?',
        imageUrl: '',
        imageAlt: '',
        imagePosition: 'right',
      };
    case 'stats':
      return {
        stats: [
          { value: '100+', label: 'Clients' },
          { value: '50K', label: 'Books Sold' },
          { value: '99%', label: 'Satisfaction' },
        ],
      };
    case 'faq':
      return {
        heading: 'Frequently Asked Questions',
        items: [
          { question: 'What is your return policy?', answer: 'We offer a 30-day money-back guarantee.' },
        ],
      };
    case 'rich-text':
      return {
        content: '<p>Add your rich text content here. You can use HTML.</p>',
      };
    default:
      return {};
  }
}

interface Props {
  initialPage: MarketingPage;
  isNew: boolean;
}

export default function PageEditorClient({ initialPage, isNew }: Props) {
  const router = useRouter();
  const [page, setPage] = useState<MarketingPage>(initialPage);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId) ?? null;

  function addBlock(type: BlockType) {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      config: defaultConfig(type),
    };
    setPage((p) => ({ ...p, blocks: [...p.blocks, newBlock] }));
    setSelectedBlockId(newBlock.id);
  }

  function removeBlock(id: string) {
    setPage((p) => ({ ...p, blocks: p.blocks.filter((b) => b.id !== id) }));
    if (selectedBlockId === id) setSelectedBlockId(null);
  }

  function moveBlock(id: string, direction: 'up' | 'down') {
    setPage((p) => {
      const blocks = [...p.blocks];
      const idx = blocks.findIndex((b) => b.id === id);
      if (idx < 0) return p;
      if (direction === 'up' && idx === 0) return p;
      if (direction === 'down' && idx === blocks.length - 1) return p;
      const swap = direction === 'up' ? idx - 1 : idx + 1;
      [blocks[idx], blocks[swap]] = [blocks[swap], blocks[idx]];
      return { ...p, blocks };
    });
  }

  function updateBlockConfig(id: string, config: Record<string, unknown>) {
    setPage((p) => ({
      ...p,
      blocks: p.blocks.map((b) => (b.id === id ? { ...b, config } : b)),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      let res: Response;
      if (isNew) {
        res = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(page),
        });
      } else {
        res = await fetch(`/api/pages/${page.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(page),
        });
      }

      if (res.ok) {
        const saved = await res.json();
        setPage(saved);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        if (isNew) {
          router.replace(`/dashboard/marketing/pages/${saved.id}`);
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save page');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.editor}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <button
            onClick={() => router.push('/dashboard/marketing/pages')}
            className={styles.backBtn}
          >
            ← Back
          </button>
          <input
            type="text"
            value={page.title}
            onChange={(e) => setPage((p) => ({ ...p, title: e.target.value }))}
            className={styles.titleInput}
            placeholder="Page Title"
          />
          <div className={styles.slugField}>
            <span className={styles.slugPrefix}>/</span>
            <input
              type="text"
              value={page.slug}
              onChange={(e) =>
                setPage((p) => ({ ...p, slug: e.target.value }))
              }
              className={styles.slugInput}
              placeholder="page-slug"
            />
          </div>
          <select
            value={page.status}
            onChange={(e) =>
              setPage((p) => ({
                ...p,
                status: e.target.value as 'draft' | 'published',
              }))
            }
            className={styles.statusSelect}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className={styles.topBarRight}>
          {error && <span className={styles.errorMsg}>{error}</span>}
          {saved && <span className={styles.savedMsg}>✓ Saved</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className={styles.saveBtn}
          >
            {saving ? 'Saving…' : 'Save Page'}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className={styles.body}>
        {/* Left Sidebar: Block Types */}
        <div className={styles.blockPicker}>
          <h3 className={styles.pickerTitle}>Add Block</h3>
          <div className={styles.blockTypes}>
            {BLOCK_TYPES.map((bt) => (
              <button
                key={bt.type}
                onClick={() => addBlock(bt.type)}
                className={styles.blockTypeBtn}
              >
                <span className={styles.blockTypeIcon}>{bt.icon}</span>
                <span>{bt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Block List */}
        <div className={styles.blockList}>
          <h3 className={styles.sectionTitle}>
            Page Blocks ({page.blocks.length})
          </h3>
          {page.blocks.length === 0 ? (
            <div className={styles.emptyBlocks}>
              <p>No blocks yet.</p>
              <p className={styles.emptyHint}>
                Click a block type on the left to add it.
              </p>
            </div>
          ) : (
            <div className={styles.blocks}>
              {page.blocks.map((block, i) => {
                const bt = BLOCK_TYPES.find((t) => t.type === block.type);
                const isSelected = selectedBlockId === block.id;
                return (
                  <div
                    key={block.id}
                    className={`${styles.blockItem} ${
                      isSelected ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedBlockId(block.id)}
                  >
                    <div className={styles.blockItemLeft}>
                      <span className={styles.blockItemIcon}>
                        {bt?.icon ?? '📦'}
                      </span>
                      <div>
                        <div className={styles.blockItemType}>{bt?.label}</div>
                        <div className={styles.blockItemPreview}>
                          {getBlockPreview(block)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.blockItemActions}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(block.id, 'up');
                        }}
                        disabled={i === 0}
                        className={styles.moveBtn}
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(block.id, 'down');
                        }}
                        disabled={i === page.blocks.length - 1}
                        className={styles.moveBtn}
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBlockId(block.id);
                        }}
                        className={styles.editBlockBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBlock(block.id);
                        }}
                        className={styles.deleteBlockBtn}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Panel: Config */}
        <div className={styles.configPanel}>
          {selectedBlock ? (
            <>
              <h3 className={styles.sectionTitle}>
                {BLOCK_TYPES.find((t) => t.type === selectedBlock.type)?.label} Config
              </h3>
              <BlockConfigForm
                block={selectedBlock}
                onChange={(config) =>
                  updateBlockConfig(selectedBlock.id, config)
                }
              />
            </>
          ) : (
            <div className={styles.noSelection}>
              <p>Select a block to edit its settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getBlockPreview(block: Block): string {
  const c = block.config as Record<string, unknown>;
  switch (block.type) {
    case 'hero':
      return (c.heading as string) || '';
    case 'features':
      return (c.heading as string) || '';
    case 'testimonials':
      return (c.heading as string) || '';
    case 'cta':
      return (c.heading as string) || '';
    case 'text-image':
      return (c.heading as string) || '';
    case 'stats': {
      const stats = c.stats as Array<{ value: string; label: string }> | undefined;
      return stats?.map((s) => s.value).join(', ') || '';
    }
    case 'faq':
      return (c.heading as string) || '';
    case 'rich-text': {
      const content = (c.content as string) || '';
      return content.replace(/<[^>]+>/g, '').slice(0, 60);
    }
    default:
      return '';
  }
}
