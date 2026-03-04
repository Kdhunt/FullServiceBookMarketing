import { getSiteSettings } from '@/lib/data';
import MarketingHeader from '@/components/marketing/MarketingHeader';
import MarketingFooter from '@/components/marketing/MarketingFooter';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();

  return (
    <>
      <MarketingHeader settings={settings} />
      <main>{children}</main>
      <MarketingFooter settings={settings} />
    </>
  );
}
