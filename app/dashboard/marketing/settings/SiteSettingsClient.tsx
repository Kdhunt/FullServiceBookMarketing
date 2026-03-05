'use client';

import { useState } from 'react';
import { SiteSettings, NavLink } from '@/lib/types';
import styles from './settings.module.css';

const DEFAULT_CSS_VARS: { key: string; label: string }[] = [
  { key: '--color-primary', label: 'Primary Color' },
  { key: '--color-secondary', label: 'Secondary Color' },
  { key: '--color-accent', label: 'Accent Color' },
  { key: '--color-bg', label: 'Background Color' },
  { key: '--color-text', label: 'Text Color' },
  { key: '--color-text-light', label: 'Light Text Color' },
  { key: '--color-border', label: 'Border Color' },
  { key: '--color-success', label: 'Success Color' },
  { key: '--color-danger', label: 'Danger Color' },
];

interface Props {
  initialSettings: SiteSettings;
}

export default function SiteSettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function updateField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function updateCssVar(varName: string, value: string) {
    setSettings((s) => ({
      ...s,
      cssVars: { ...s.cssVars, [varName]: value },
    }));
  }

  function updateNavLink(
    field: 'headerLinks' | 'footerLinks',
    index: number,
    key: keyof NavLink,
    value: string
  ) {
    setSettings((s) => {
      const links = [...s[field]];
      links[index] = { ...links[index], [key]: value };
      return { ...s, [field]: links };
    });
  }

  function addNavLink(field: 'headerLinks' | 'footerLinks') {
    setSettings((s) => ({
      ...s,
      [field]: [...s[field], { label: 'New Link', href: '/' }],
    }));
  }

  function removeNavLink(field: 'headerLinks' | 'footerLinks', index: number) {
    setSettings((s) => ({
      ...s,
      [field]: s[field].filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError('Failed to save settings');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Site Settings</h1>
          <p className={styles.sub}>Configure your site name, navigation, and design</p>
        </div>
        <div className={styles.headerActions}>
          {error && <span className={styles.error}>{error}</span>}
          {saved && <span className={styles.savedMsg}>✓ Saved</span>}
          <button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className={styles.sections}>
        {/* General */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>General</h2>
          <div className={styles.grid2}>
            <Field label="Site Name">
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => updateField('siteName', e.target.value)}
                className={styles.input}
              />
            </Field>
            <Field label="Logo Text">
              <input
                type="text"
                value={settings.logoText}
                onChange={(e) => updateField('logoText', e.target.value)}
                className={styles.input}
              />
            </Field>
          </div>
        </section>

        {/* Header Nav Links */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Header Navigation</h2>
            <button className={styles.addBtn} onClick={() => addNavLink('headerLinks')}>
              + Add Link
            </button>
          </div>
          <div className={styles.linkList}>
            {settings.headerLinks.map((link, i) => (
              <div key={i} className={styles.linkRow}>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateNavLink('headerLinks', i, 'label', e.target.value)}
                  placeholder="Label"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateNavLink('headerLinks', i, 'href', e.target.value)}
                  placeholder="/page-slug"
                  className={styles.input}
                />
                <button
                  onClick={() => removeNavLink('headerLinks', i)}
                  className={styles.removeLinkBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Footer</h2>
          <div className={styles.grid2}>
            <Field label="Tagline">
              <input
                type="text"
                value={settings.footerTagline}
                onChange={(e) => updateField('footerTagline', e.target.value)}
                className={styles.input}
              />
            </Field>
            <Field label="Copyright Text">
              <input
                type="text"
                value={settings.footerCopyright}
                onChange={(e) => updateField('footerCopyright', e.target.value)}
                className={styles.input}
              />
            </Field>
          </div>
          <div className={styles.sectionHeader} style={{ marginTop: '1.5rem' }}>
            <h3 className={styles.subSectionTitle}>Footer Links</h3>
            <button className={styles.addBtn} onClick={() => addNavLink('footerLinks')}>
              + Add Link
            </button>
          </div>
          <div className={styles.linkList}>
            {settings.footerLinks.map((link, i) => (
              <div key={i} className={styles.linkRow}>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateNavLink('footerLinks', i, 'label', e.target.value)}
                  placeholder="Label"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateNavLink('footerLinks', i, 'href', e.target.value)}
                  placeholder="/page-slug"
                  className={styles.input}
                />
                <button
                  onClick={() => removeNavLink('footerLinks', i)}
                  className={styles.removeLinkBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CSS Variables */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Design Tokens (CSS Variables)</h2>
          <p className={styles.sectionDesc}>
            Customize the color scheme. Changes will be applied to the marketing site.
          </p>
          <div className={styles.cssVarsGrid}>
            {DEFAULT_CSS_VARS.map(({ key, label }) => (
              <div key={key} className={styles.cssVarRow}>
                <label className={styles.cssVarLabel}>{label}</label>
                <code className={styles.cssVarKey}>{key}</code>
                <div className={styles.colorRow}>
                  <input
                    type="color"
                    value={settings.cssVars?.[key] || '#000000'}
                    onChange={(e) => updateCssVar(key, e.target.value)}
                    className={styles.colorPicker}
                  />
                  <input
                    type="text"
                    value={settings.cssVars?.[key] || ''}
                    onChange={(e) => updateCssVar(key, e.target.value)}
                    className={styles.input}
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}
