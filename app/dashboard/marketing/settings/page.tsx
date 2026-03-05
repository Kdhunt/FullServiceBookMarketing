import { getSiteSettings } from '@/lib/data';
import SiteSettingsClient from './SiteSettingsClient';

export default function SiteSettingsPage() {
  const settings = getSiteSettings();
  return <SiteSettingsClient initialSettings={settings} />;
}
